import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from "../constants";

let ai: GoogleGenAI | null = null;

const getAIClient = () => {
  if (!ai) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }
  return ai;
};

export const generateProductAdvice = async (userQuery: string, chatHistory: string) => {
  const client = getAIClient();
  const productContext = JSON.stringify(PRODUCTS.map(p => ({ 
    id: p.id, 
    name: p.name, 
    brand: p.brand, 
    price: p.price, 
    description: p.description,
    features: p.features
  })));

  const systemPrompt = `
    You are 'Lumina', an expert luxury shopping assistant. 
    You are helpful, sophisticated, and concise.
    Your goal is to recommend products from the provided catalog based on the user's query.
    
    Catalog: ${productContext}
    
    If the user asks for a recommendation, analyze the catalog and suggest the best matches.
    Return your response in pure JSON format with this schema:
    {
      "message": "Your conversational response here...",
      "recommendedProductIds": ["id1", "id2"]
    }
    
    Do not output markdown code blocks. Just the raw JSON string.
  `;

  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { role: 'user', parts: [{ text: `System: ${systemPrompt}\nHistory: ${chatHistory}\nUser: ${userQuery}` }] }
      ],
      config: {
        responseMimeType: 'application/json'
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      message: "I apologize, but I'm currently unable to access the styling mainframe. Please try again in a moment.",
      recommendedProductIds: []
    };
  }
};
