// Product Types
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  category: ProductCategory;
  images: string[];
  modelUrl?: string; // GLB/GLTF 3D model URL
  options?: ProductOption[];
  tags: string[];
  featured: boolean;
  createdAt: string;
  stock: number;
}

export type ProductCategory = 'resin' | 'candles' | 'crafts';

export interface ProductOption {
  name: string;
  values: string[];
}

// Cart Types
export interface CartItem {
  product: Product;
  quantity: number;
  selectedOptions?: Record<string, string>;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

// Filter Types
export interface ProductFilters {
  category?: ProductCategory;
  priceRange?: [number, number];
  sortBy: 'newest' | 'price-low' | 'price-high' | 'popular';
  search?: string;
}

// Category Info
export interface CategoryInfo {
  id: ProductCategory;
  name: string;
  description: string;
  image: string;
}

// API Response Types (for backend integration)
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
