import { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Button,
  Card,
  CardContent,
  CardTitle,
  Badge,
  Select,
  PageLoader,
} from '@/components/ui';
import { useFilterStore } from '@/store';
import { getProducts, getCategoryById } from '@/services';
import type { Product, ProductCategory, CategoryInfo, ProductFilters } from '@/types';
import { formatPrice } from '@/utils/cn';

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'popular', label: 'Most Popular' },
];

const priceRanges = [
  { value: '', label: 'All Prices' },
  { value: '0-500', label: 'Under ₹500' },
  { value: '500-1000', label: '₹500 - ₹1,000' },
  { value: '1000-2000', label: '₹1,000 - ₹2,000' },
  { value: '2000-', label: 'Over ₹2,000' },
];

export default function Category() {
  const { category } = useParams<{ category?: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryInfo, setCategoryInfo] = useState<CategoryInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const { sortBy, priceRange, setSortBy, setPriceRange, setCategory } = useFilterStore();

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const filters: ProductFilters = {
        category: category as ProductCategory | undefined,
        sortBy,
        priceRange,
      };
      const response = await getProducts(filters);
      setProducts(response.data);
      setTotal(response.total);
    } finally {
      setLoading(false);
    }
  }, [category, sortBy, priceRange]);

  useEffect(() => {
    if (category) {
      setCategory(category as ProductCategory);
      getCategoryById(category as ProductCategory).then(setCategoryInfo);
    } else {
      setCategory(undefined);
      setCategoryInfo(null);
    }
  }, [category, setCategory]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as ProductFilters['sortBy']);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (!value) {
      setPriceRange(undefined);
    } else {
      const [min, max] = value.split('-').map(Number);
      setPriceRange([min || 0, max || 99999]);
    }
  };

  const pageTitle = categoryInfo?.name || 'All Products';
  const pageDescription = categoryInfo?.description || 'Discover our complete collection of handcrafted treasures';

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-b from-brand-muted/30 to-brand-bg py-12">
        <div className="container-custom">
          {/* Breadcrumb */}
          <nav className="text-sm mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-gray-500">
              <li>
                <Link to="/" className="hover:text-brand-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link to="/shop" className="hover:text-brand-primary transition-colors">
                  Shop
                </Link>
              </li>
              {category && (
                <>
                  <li>/</li>
                  <li className="text-gray-800 font-medium capitalize">{category}</li>
                </>
              )}
            </ol>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              {pageTitle}
            </h1>
            <p className="mt-3 text-gray-600 max-w-2xl">
              {pageDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Products */}
      <section className="section-padding pt-8">
        <div className="container-custom">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-8 p-4 bg-brand-surface rounded-2xl border border-brand-border/20">
            <p className="text-sm text-gray-600">
              Showing <span className="font-medium text-gray-800">{total}</span> products
            </p>
            <div className="flex flex-wrap gap-3">
              <Select
                options={priceRanges}
                value={priceRange ? `${priceRange[0]}-${priceRange[1] === 99999 ? '' : priceRange[1]}` : ''}
                onChange={handlePriceChange}
                className="w-40"
                aria-label="Filter by price"
              />
              <Select
                options={sortOptions}
                value={sortBy}
                onChange={handleSortChange}
                className="w-44"
                aria-label="Sort products"
              />
            </div>
          </div>

          {/* Product Grid */}
          {loading ? (
            <PageLoader />
          ) : products.length === 0 ? (
            <div className="text-center py-16">
              <svg
                className="w-16 h-16 mx-auto text-brand-muted mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              <p className="text-gray-600 mb-4">No products found</p>
              <Button variant="outline" onClick={() => { setPriceRange(undefined); setSortBy('newest'); }}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <motion.div
              layout
              className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link to={`/product/${product.slug}`} className="block group">
                      <Card hover padding="none">
                        {/* Product Image Placeholder */}
                        <div className="aspect-square bg-gradient-to-br from-brand-bg to-brand-muted/30 flex items-center justify-center relative overflow-hidden rounded-t-2xl">
                          <div className="absolute inset-0 bg-brand-primary/5 group-hover:bg-brand-primary/10 transition-colors" />
                          <svg
                            className="w-16 h-16 text-brand-primary/30"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          {product.compareAtPrice && (
                            <Badge className="absolute top-3 left-3">Sale</Badge>
                          )}
                          {product.stock < 5 && product.stock > 0 && (
                            <Badge variant="warning" className="absolute top-3 right-3">
                              Low Stock
                            </Badge>
                          )}
                        </div>
                        <CardContent className="p-4">
                          <p className="text-xs text-brand-primary uppercase tracking-wider mb-1">
                            {product.category}
                          </p>
                          <CardTitle className="text-base group-hover:text-brand-primary transition-colors">
                            {product.name}
                          </CardTitle>
                          <p className="mt-1 text-sm text-gray-500 line-clamp-1">
                            {product.description}
                          </p>
                          <div className="mt-3 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-gray-800">
                                {formatPrice(product.price)}
                              </span>
                              {product.compareAtPrice && (
                                <span className="text-sm text-gray-400 line-through">
                                  {formatPrice(product.compareAtPrice)}
                                </span>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
