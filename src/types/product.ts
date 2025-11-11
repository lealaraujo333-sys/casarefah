export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  category: string;
  inStock: boolean;
  featured?: boolean;
  images?: string[];
}

export interface CartItem extends Product {
  quantity: number;
}
