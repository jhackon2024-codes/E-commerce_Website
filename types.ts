export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  category: string;
  features: string[];
  vendor: Vendor;
}

export interface Vendor {
  id: string;
  name: string;
  verified: boolean;
  rating: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export type ViewState = 'HOME' | 'SHOP' | 'PRODUCT_DETAILS' | 'CART' | 'CHECKOUT';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  products?: Product[];
}
