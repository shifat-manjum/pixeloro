const { GoogleGenerativeAI } = require('@google/generative-ai');

let genAIInstance = null;
let modelInstance = null;

const getModel = () => {
  if (!genAIInstance && process.env.GEMINI_API_KEY) {
    try {
      genAIInstance = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      modelInstance = genAIInstance.getGenerativeModel({ model: "gemini-1.5-flash" });
    } catch (e) {
      console.error("[Gemini Init Error]:", e);
    }
  }
  return modelInstance;
};

const SYSTEM_PROMPT = `You are the official AI assistant for Pixeloro (pixeloro.it), a luxury web design agency that exclusively builds high-converting mobile websites and digital menus for restaurants (especially Italian restaurants, pizzerias, trattorias).

Your Persona & Tone:
- Professional, warm, respectful, and concise (keep answers under 3-4 sentences max).
- Match the language of the incoming message (Default to Italian if the user speaks Italian, English if English).

Key Business Offer to Explain:
1. €0 Upfront / 100% Free Custom Build: We create a complete, luxury custom demo website for their restaurant within 24 to 48 hours for FREE.
2. Pixeloro Pro Plan: If they love the result and want to keep it live on their domain, it is just €55/month with zero upfront fees.
3. Included in €55/mo: Ultra-fast cloud hosting, SSL certificate, 1-tap WhatsApp booking button, Google SEO optimization, and unlimited menu/price updates.
4. No Long-Term Contract: Cancel anytime.
5. Primary Call-to-Action: Invite them to send their current menu (PDF, photo, or link) right here on WhatsApp so the team can build their free draft in 48 hours.

Founder Contact:
If they ask for a custom quote, technical integration, or something specific, let them know that Shifat (Founder of Pixeloro) will reach out to them directly.`;

const generateWhatsAppResponse = async (userMessage, senderId) => {
  try {
    const model = getModel();
    
    if (!model) {
      console.warn("[WhatsApp AI] GEMINI_API_KEY is not set in server/.env. Using intelligent fallback reply.");
      
      const lower = userMessage.toLowerCase();
      if (lower.includes('ciao') || lower.includes('info') || lower.includes('menu') || lower.includes('sito') || lower.includes('costo') || lower.includes('prezzo')) {
        return "Ciao! 👋 Benvenuto in Pixeloro. Creiamo il nuovo sito web per il tuo ristorante al 100% GRATIS in 48 ore (senza anticipo). Se ti piace, costa solo 55€/mese tutto incluso. Inviaci qui una foto o il PDF del tuo menu per iniziare la bozza gratuita!";
      }
      
      return "Ciao! Grazie per aver contattato Pixeloro. Inviaci il tuo menu o la tua richiesta qui su WhatsApp e il nostro team ti risponderà subito con la bozza gratuita del tuo nuovo sito web!";
    }

    const prompt = `${SYSTEM_PROMPT}\n\nIncoming Customer WhatsApp Message: "${userMessage}"\n\nYour Natural & Concise Response:`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
    
  } catch (error) {
    console.error("[WhatsApp AI Generation Error]:", error);
    return "Grazie per aver contattato Pixeloro! Riceviamo la tua richiesta e Shifat ti risponderà direttamente a breve. Puoi già inviarci il tuo menu qui su WhatsApp!";
  }
};

module.exports = { generateWhatsAppResponse };
