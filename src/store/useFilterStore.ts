import { create } from 'zustand';
import type { ProductCategory, ProductFilters } from '@/types';

interface FilterState extends ProductFilters {
  // Actions
  setCategory: (category?: ProductCategory) => void;
  setPriceRange: (range?: [number, number]) => void;
  setSortBy: (sort: ProductFilters['sortBy']) => void;
  setSearch: (search?: string) => void;
  resetFilters: () => void;
}

const initialState: ProductFilters = {
  category: undefined,
  priceRange: undefined,
  sortBy: 'newest',
  search: undefined,
};

export const useFilterStore = create<FilterState>()((set) => ({
  ...initialState,

  setCategory: (category) => set({ category }),
  
  setPriceRange: (priceRange) => set({ priceRange }),
  
  setSortBy: (sortBy) => set({ sortBy }),
  
  setSearch: (search) => set({ search }),
  
  resetFilters: () => set(initialState),
}));
