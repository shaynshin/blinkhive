export interface Product {
  id: string;
  gumroadUrl: string;
  name: string;
  seller: string;
  price: number;
  rating: number;
  imageUrl: string;
  commission: number;
}

export interface EnhancedProduct extends Product {
  blinkId: string | null;
}

export interface Blink {
  id: string;
  productId: string;
}
