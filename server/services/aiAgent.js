const { GoogleGenerativeAI } = require('@google/generative-ai');

let genAIInstance = null;
let modelInstance = null;

const getModel = () => {
  if (!genAIInstance && process.env.GEMINI_API_KEY) {
    genAIInstance = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // Use gemini-1.5-flash for fast, free tier text generation
    modelInstance = genAIInstance.getGenerativeModel({ model: "gemini-1.5-flash" });
  }
  return modelInstance;
};

const SYSTEM_PROMPT = `You are the official AI assistant for Pixeloro, a web design agency that exclusively builds websites for Italian restaurants.
Your tone is professional, extremely friendly, and concise (keep answers under 3 sentences).

Key Business Information to remember:
- We build the initial website for FREE in 24-48 hours. No upfront costs.
- If the restaurant owner loves it, they pay €55/month (Pixeloro Pro plan).
- The €55/month covers premium hosting, SSL security, continuous maintenance, SEO, and unlimited minor updates.
- There are no long-term contracts. They can cancel anytime.
- Our goal is to get them to send us their current menu so we can start building their draft.

If they ask a question you don't know the answer to, politely let them know that Shifat (the founder) will get back to them shortly.`;

const generateWhatsAppResponse = async (userMessage, senderId) => {
  try {
    const model = getModel();
    
    if (!model) {
      console.warn("GEMINI API key is missing. Please set GEMINI_API_KEY in environment variables.");
      return "Hi there! I am currently undergoing maintenance. Please leave a message and our human team will get back to you shortly!";
    }

    const prompt = `${SYSTEM_PROMPT}\n\nUser Message: ${userMessage}\n\nYour Reply:`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
    
  } catch (error) {
    console.error("AI Generation Error:", error);
    return "I'm sorry, I'm having a little trouble connecting right now. We will respond manually as soon as possible!";
  }
};

module.exports = { generateWhatsAppResponse };
