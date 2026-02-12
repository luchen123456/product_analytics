export interface Product {
  id: string;
  name: string;
  shop: string;
  price: number;
  sales: string;
  sales30d: number;
  rating: number;
  ratingCount: string;
  image: string;
  analysisScore: number;
  analysisLabel: 'High' | 'Med' | 'Low';
  drop?: string;
}

export interface Competitor {
  id: string;
  name: string;
  shop: string;
  price: number;
  salesMo: number;
  rating: number;
  potential: 'High' | 'Med' | 'Low';
  image: string;
  selected?: boolean;
}

export enum NavItem {
  Dashboard = 'Dashboard',
  ProductSearch = 'Product Search',
  CompetitorAnalysis = 'Competitor Analysis',
  AiSuggestions = 'AI Suggestions',
  DataAnalysis = 'Data Analysis' // Added to match the requested tab
}