import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Elysium Chronograph',
    brand: 'Rolex',
    price: 12500,
    rating: 4.9,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=800',
    description: 'A masterwork of horology, the Elysium Chronograph features a perpetual movement and a dial crafted from meteorite.',
    category: 'Watches',
    features: ['Automatic Movement', 'Sapphire Crystal', '100m Water Resistance'],
    vendor: { id: 'v1', name: 'Prestige Time', verified: true, rating: 4.9 }
  },
  {
    id: '2',
    name: 'AeroBlade Runner',
    brand: 'Nike x Off-White',
    price: 850,
    rating: 4.7,
    reviews: 340,
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=800',
    description: 'Limited edition sneakers designed for the urban avant-garde. Featuring self-lacing technology.',
    category: 'Footwear',
    features: ['Self-lacing', 'Reactive Foam', 'Limited Edition'],
    vendor: { id: 'v2', name: 'SneakerHeadz', verified: true, rating: 4.8 }
  },
  {
    id: '3',
    name: 'Leica Q3 Monochrom',
    brand: 'Leica',
    price: 5995,
    rating: 5.0,
    reviews: 45,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800',
    description: 'Capture the world in stunning black and white with the legendary Leica optics.',
    category: 'Cameras',
    features: ['47MP Sensor', 'Summilux Lens', 'OLED Viewfinder'],
    vendor: { id: 'v3', name: 'Camera Haus', verified: true, rating: 5.0 }
  },
  {
    id: '4',
    name: 'Eames Lounge Chair',
    brand: 'Herman Miller',
    price: 6400,
    rating: 4.9,
    reviews: 890,
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=800',
    description: 'The epitome of mid-century modern comfort. Hand-assembled with premium leather and wood.',
    category: 'Furniture',
    features: ['Walnut Veneer', 'Premium Leather', 'Ergonomic Design'],
    vendor: { id: 'v4', name: 'Modern Living', verified: true, rating: 4.7 }
  },
  {
    id: '5',
    name: 'MacBook Pro M3 Max',
    brand: 'Apple',
    price: 3199,
    rating: 4.8,
    reviews: 1200,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca4?auto=format&fit=crop&q=80&w=800',
    description: 'Mind-blowing performance for pros. The M3 Max chip tears through heavy workflows.',
    category: 'Electronics',
    features: ['M3 Max Chip', 'Liquid Retina XDR', '22h Battery Life'],
    vendor: { id: 'v5', name: 'Tech Giant', verified: true, rating: 4.6 }
  },
  {
    id: '6',
    name: 'Voyager Weekender',
    brand: 'Louis Vuitton',
    price: 2800,
    rating: 4.6,
    reviews: 56,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
    description: 'Travel in style with this iconic canvas duffle bag. Durable, spacious, and timeless.',
    category: 'Accessories',
    features: ['Monogram Canvas', 'Leather Trim', 'TSA Lock'],
    vendor: { id: 'v1', name: 'Prestige Time', verified: true, rating: 4.9 }
  }
];

export const CATEGORIES = ['All', 'Watches', 'Footwear', 'Cameras', 'Furniture', 'Electronics', 'Accessories'];
