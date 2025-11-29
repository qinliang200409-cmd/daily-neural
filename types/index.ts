export interface Article {
  id: string;
  headline: string;
  subhead?: string;
  author: string;
  content: string; // Summary
  category: 'World' | 'Tech' | 'Politics' | 'Science';
  timestamp: string;
}

export interface StockData {
  symbol: string;
  price: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
}

export interface WeatherData {
  city: string;
  temp: string;
  condition: string;
  forecast: string;
}

export interface TechBrief {
  title: string;
  summary: string;
  tag: string;
}

// Aggregated Data State
export interface NewspaperData {
  heroStory: Article;
  sideStories: Article[];
  techBriefs: TechBrief[];
  marketData: StockData[];
  weather: WeatherData;
}