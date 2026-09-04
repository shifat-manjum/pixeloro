const { OpenAI } = require('openai');

let openaiInstance = null;

const getOpenAI = () => {
  if (!openaiInstance && process.env.OPENAI_API_KEY) {
    openaiInstance = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return openaiInstance;
};

const SYSTEM_PROMPT = `You are the official AI assistant for Pixeloro, a web design agency that exclusively builds websites for Italian restaurants.
Your tone is professional, extremely friendly, and concise (keep answers under 3 sentences).

Key Business Information to remember:
- We build the initial website for FREE in 24-48 hours. No upfront costs.
- If the restaurant owner loves it, they pay €85/month (Pixeloro Pro plan).
- The €85/month covers premium hosting, SSL security, continuous maintenance, SEO, and unlimited minor updates.
- There are no long-term contracts. They can cancel anytime.
- Our goal is to get them to send us their current menu so we can start building their draft.

If they ask a question you don't know the answer to, politely let them know that Shifat (the founder) will get back to them shortly.`;

const generateWhatsAppResponse = async (userMessage, senderId) => {
  try {
    const openai = getOpenAI();
    
    if (!openai) {
      console.warn("OpenAI API key is missing. Please set OPENAI_API_KEY in environment variables.");
      return "Hi there! I am currently undergoing maintenance. Please leave a message and our human team will get back to you shortly!";
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userMessage }
      ],
      max_tokens: 200,
      temperature: 0.7,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("AI Generation Error:", error);
    return "I'm sorry, I'm having a little trouble connecting right now. We will respond manually as soon as possible!";
  }
};

module.exports = { generateWhatsAppResponse };
