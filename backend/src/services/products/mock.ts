import type { Product } from '../../domain/models.js';

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Baseus Bowie E3 TWS Wireless Earbuds',
    shop: 'Baseus Official Store',
    price: 18.9,
    sales: '12.5k',
    sales30d: 450,
    rating: 4.9,
    ratingCount: '3.2k',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&h=200&fit=crop',
    analysisScore: 9.2,
    analysisLabel: 'High',
    drop: '-12% drop'
  },
  {
    id: '2',
    name: 'Lenovo TH30 Wireless Headphones Bluetooth 5.0',
    shop: 'Lenovo Thinkplus',
    price: 14.5,
    sales: '8.2k',
    sales30d: 820,
    rating: 4.8,
    ratingCount: '1.1k',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
    analysisScore: 8.8,
    analysisLabel: 'High'
  },
  {
    id: '3',
    name: 'Generic i12 TWS Matte Colors Inpods 12',
    shop: 'Gadget World Global',
    price: 4.9,
    sales: '32k',
    sales30d: 1200,
    rating: 4.5,
    ratingCount: '5.8k',
    image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=200&h=200&fit=crop',
    analysisScore: 6.4,
    analysisLabel: 'Med'
  }
];

export function getMockProducts(): Product[] {
  return PRODUCTS;
}

