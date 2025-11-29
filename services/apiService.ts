import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Article, StockData, TechBrief, WeatherData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const modelName = "gemini-2.5-flash";

// 1. Fetch Main Headlines (Simulating a News Wire API)
export const fetchHeadlines = async (): Promise<{ hero: Article; side: Article[] }> => {
  const response = await ai.models.generateContent({
    model: modelName,
    contents: "Generate 1 major breaking news headline about a fictional scientific breakthrough or geopolitical event, and 3 smaller side stories in Simplified Chinese (简体中文). Return as JSON.",
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          hero: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              headline: { type: Type.STRING },
              subhead: { type: Type.STRING },
              author: { type: Type.STRING },
              content: { type: Type.STRING },
              category: { type: Type.STRING },
              timestamp: { type: Type.STRING },
            }
          },
          side: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                headline: { type: Type.STRING },
                author: { type: Type.STRING },
                content: { type: Type.STRING },
                category: { type: Type.STRING },
                timestamp: { type: Type.STRING },
              }
            }
          }
        }
      }
    }
  });
  
  return JSON.parse(response.text);
};

// 2. Fetch Tech Briefs (Simulating a Tech Blog API)
export const fetchTechBriefs = async (): Promise<TechBrief[]> => {
  const response = await ai.models.generateContent({
    model: modelName,
    contents: "Generate 4 short, punchy tech news briefs about AI, Space, or Robotics in Simplified Chinese (简体中文). JSON format.",
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            summary: { type: Type.STRING },
            tag: { type: Type.STRING },
          }
        }
      }
    }
  });
  return JSON.parse(response.text);
};

// 3. Fetch Market Data (Simulating a Financial API)
export const fetchMarketData = async (): Promise<StockData[]> => {
  const response = await ai.models.generateContent({
    model: modelName,
    contents: "Generate 5 fictional or real stock ticker data points with realistic prices and changes. Use standard stock symbols (e.g. AAPL, NVDA) but ensure they are relevant to current tech trends. JSON.",
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            symbol: { type: Type.STRING },
            price: { type: Type.STRING },
            change: { type: Type.STRING },
            trend: { type: Type.STRING, enum: ['up', 'down', 'neutral'] },
          }
        }
      }
    }
  });
  return JSON.parse(response.text);
};

// 4. Fetch Weather (Simulating a Weather API)
export const fetchWeather = async (): Promise<WeatherData> => {
  const response = await ai.models.generateContent({
    model: modelName,
    contents: "Generate a weather report for a random major world city in Simplified Chinese (简体中文). JSON.",
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          city: { type: Type.STRING },
          temp: { type: Type.STRING },
          condition: { type: Type.STRING },
          forecast: { type: Type.STRING },
        }
      }
    }
  });
  return JSON.parse(response.text);
};