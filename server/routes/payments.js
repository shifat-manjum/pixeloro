const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const Setting = require('../models/Setting');
const Lead = require('../models/Lead');

// Helper to get active Stripe instance or keys
async function getStripeConfig() {
  try {
    const settingsDocs = await Setting.find({});
    const settings = {};
    settingsDocs.forEach(doc => {
      settings[doc.key] = doc.value;
    });

    const secretKey = settings.stripeSecretKey || process.env.STRIPE_SECRET_KEY || '';
    const publishableKey = settings.stripePublishableKey || process.env.STRIPE_PUBLISHABLE_KEY || '';
    const paymentLink = settings.stripePaymentLink || process.env.STRIPE_PAYMENT_LINK || '';
    const stripeLifetimePaymentLink = settings.stripeLifetimePaymentLink || process.env.STRIPE_LIFETIME_PAYMENT_LINK || '';
    const monthlyPrice = settings.monthlyPrice || '55';
    const lifetimePrice = settings.lifetimePrice || '399';

    let stripeInstance = null;
    if (secretKey && secretKey.trim().length > 5) {
      try {
        stripeInstance = new Stripe(secretKey.trim());
      } catch (e) {
        console.error('[Stripe Init Error]:', e.message);
      }
    }

    return { stripeInstance, secretKey, publishableKey, paymentLink, stripeLifetimePaymentLink, monthlyPrice, lifetimePrice };
  } catch (err) {
    console.error('[Stripe Config Error]:', err);
    return { stripeInstance: null, secretKey: '', publishableKey: '', paymentLink: '', stripeLifetimePaymentLink: '', monthlyPrice: '55', lifetimePrice: '399' };
  }
}

// GET /api/payments/config - Check if Stripe is configured
router.get('/config', async (req, res) => {
  try {
    const { secretKey, publishableKey, paymentLink, stripeLifetimePaymentLink, monthlyPrice, lifetimePrice } = await getStripeConfig();
    res.json({
      configured: Boolean(secretKey || paymentLink || stripeLifetimePaymentLink),
      hasSecretKey: Boolean(secretKey),
      hasPaymentLink: Boolean(paymentLink),
      hasLifetimePaymentLink: Boolean(stripeLifetimePaymentLink),
      publishableKey: publishableKey || null,
      monthlyPrice: Number(monthlyPrice) || 55,
      lifetimePrice: Number(lifetimePrice) || 399
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch payment config' });
  }
});

// POST /api/payments/create-checkout-session
router.post('/create-checkout-session', async (req, res) => {
  try {
    const { 
      restaurantName, 
      customerEmail, 
      customerName, 
      phone, 
      leadId, 
      price,
      planType = 'monthly', // 'monthly' | 'lifetime'
      successUrl, 
      cancelUrl 
    } = req.body;

    const { 
      stripeInstance, 
      paymentLink, 
      stripeLifetimePaymentLink, 
      monthlyPrice: defaultMonthly, 
      lifetimePrice: defaultLifetime 
    } = await getStripeConfig();

    const isLifetime = planType === 'lifetime';
    const defaultPrice = isLifetime ? defaultLifetime : defaultMonthly;
    const finalPrice = Number(price || defaultPrice || (isLifetime ? 399 : 55));
    const origin = req.headers.origin || 'http://localhost:5173';

    // If direct Stripe Payment Link is provided in settings and no secret key
    const activePaymentLink = isLifetime ? (stripeLifetimePaymentLink || paymentLink) : paymentLink;
    if (!stripeInstance && activePaymentLink) {
      if (leadId) {
        await Lead.findByIdAndUpdate(leadId, { 
          status: 'pending_payment',
          planType: isLifetime ? 'lifetime' : 'monthly'
        }).catch(() => {});
      }
      return res.json({ 
        success: true, 
        url: activePaymentLink,
        mode: 'payment_link'
      });
    }

    // If Stripe Secret Key is active
    if (stripeInstance) {
      const lineItem = isLifetime ? {
        price_data: {
          currency: 'eur',
          product_data: {
            name: `Zentixx Proprietà a Vita - ${restaurantName || 'Sito Web Ristorante'}`,
            description: 'Acquisto una tantum con proprietà totale del sito web, codice sorgente e 2 anni di supporto tecnico gratuito incluso.',
          },
          unit_amount: Math.round(finalPrice * 100)
        },
        quantity: 1
      } : {
        price_data: {
          currency: 'eur',
          product_data: {
            name: `Zentixx Pro - ${restaurantName || 'Sito Web Ristorante'}`,
            description: 'Abbonamento mensile: Hosting ad alte prestazioni, manutenzione continua, certificato SSL e supporto modifiche.',
          },
          unit_amount: Math.round(finalPrice * 100),
          recurring: {
            interval: 'month'
          }
        },
        quantity: 1
      };

      const session = await stripeInstance.checkout.sessions.create({
        payment_method_types: ['card', 'sepa_debit', 'link'],
        mode: isLifetime ? 'payment' : 'subscription',
        customer_email: customerEmail && customerEmail.includes('@') ? customerEmail : undefined,
        line_items: [lineItem],
        metadata: {
          planType: isLifetime ? 'lifetime' : 'monthly',
          restaurantName: restaurantName || '',
          customerName: customerName || '',
          customerEmail: customerEmail || '',
          phone: phone || '',
          leadId: leadId || '',
          price: String(finalPrice)
        },
        success_url: successUrl || `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}&plan=${isLifetime ? 'lifetime' : 'monthly'}&price=${finalPrice}`,
        cancel_url: cancelUrl || `${origin}/#pricing`
      });

      if (leadId) {
        await Lead.findByIdAndUpdate(leadId, { 
          status: 'pending_payment',
          planType: isLifetime ? 'lifetime' : 'monthly',
          monthlyPricePaid: isLifetime ? 0 : finalPrice,
          lifetimePricePaid: isLifetime ? finalPrice : 0
        }).catch(() => {});
      }

      return res.json({ 
        success: true, 
        url: session.url, 
        sessionId: session.id,
        mode: 'stripe_checkout'
      });
    }

    // Fallback: Test / Demo mode when Stripe keys haven't been pasted yet
    return res.json({
      success: true,
      url: `${origin}/payment-success?demo=true&plan=${isLifetime ? 'lifetime' : 'monthly'}&price=${finalPrice}&restaurant=${encodeURIComponent(restaurantName || 'Il Mio Ristorante')}`,
      mode: 'demo_simulation',
      message: 'Stripe keys not set in settings yet. Running in demo mode.'
    });

  } catch (err) {
    console.error('[Stripe Checkout Error]:', err);
    res.status(500).json({ error: err.message || 'Failed to create Stripe checkout session' });
  }
});

// POST /api/payments/webhook
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    const event = req.body;

    // Handle checkout session completed
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const leadId = session.metadata?.leadId;
      const planType = session.metadata?.planType || 'monthly';
      const email = session.customer_details?.email || session.customer_email || session.metadata?.customerEmail;
      const customerId = session.customer;
      const subscriptionId = session.subscription || null;
      const paidPrice = Number(session.metadata?.price || (planType === 'lifetime' ? 399 : 55));

      console.log(`[Stripe Webhook] Payment completed for ${email} (${planType})`);

      const status = planType === 'lifetime' ? 'lifetime' : 'subscribed';

      const updateData = {
        status,
        planType,
        stripeCustomerId: customerId,
        stripeSubscriptionId: subscriptionId,
        monthlyPricePaid: planType === 'monthly' ? paidPrice : 0,
        lifetimePricePaid: planType === 'lifetime' ? paidPrice : 0,
        subscribedAt: new Date()
      };

      if (leadId) {
        await Lead.findByIdAndUpdate(leadId, updateData);
      } else if (email) {
        await Lead.findOneAndUpdate(
          { email: email.toLowerCase().trim() },
          updateData
        );
      }
    }

    // Handle subscription cancellation
    if (event.type === 'customer.subscription.deleted') {
      const subscription = event.data.object;
      await Lead.findOneAndUpdate(
        { stripeSubscriptionId: subscription.id },
        { status: 'canceled' }
      );
    }

    res.json({ received: true });
  } catch (err) {
    console.error('[Stripe Webhook Error]:', err);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});

module.exports = router;
