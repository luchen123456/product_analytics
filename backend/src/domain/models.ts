export type PotentialLabel = 'High' | 'Med' | 'Low';

export type Product = {
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
  analysisLabel: PotentialLabel;
  drop?: string;
};

export type CrawlJobStatus = 'queued' | 'running' | 'succeeded' | 'failed';

export type CrawlJob = {
  id: string;
  type: 'crawl';
  createdAt: string;
  updatedAt: string;
  status: CrawlJobStatus;
  progress: number;
  input: {
    keyword?: string;
    productUrl?: string;
    shopId?: string;
    pages: number;
  };
  result?: unknown;
  error?: { message: string };
};

