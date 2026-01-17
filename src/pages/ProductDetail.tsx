import { useEffect, useState, lazy, Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Button,
  Badge,
  Select,
  PageLoader,
  Card,
  CardContent,
  CardTitle,
} from '@/components/ui';
import { useCartStore } from '@/store';
import { getProductBySlug, getRelatedProducts } from '@/services';
import type { Product } from '@/types';
import { formatPrice, isWebGLSupported } from '@/utils/cn';

// Lazy load 3D component
const ProductViewer3D = lazy(() =>
  import('@/components/3d').then((m) => ({ default: m.ProductViewer3D }))
);

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [webGLSupported, setWebGLSupported] = useState(true);

  const { addItem } = useCartStore();

  useEffect(() => {
    setWebGLSupported(isWebGLSupported());
  }, []);

  useEffect(() => {
    async function loadProduct() {
      if (!slug) return;
      setLoading(true);
      try {
        const productData = await getProductBySlug(slug);
        setProduct(productData);

        if (productData) {
          // Set default options
          const defaults: Record<string, string> = {};
          productData.options?.forEach((option) => {
            defaults[option.name] = option.values[0];
          });
          setSelectedOptions(defaults);

          // Load related products
          const related = await getRelatedProducts(productData.id);
          setRelatedProducts(related);
        }
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [slug]);

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity, selectedOptions);
    }
  };

  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptions((prev) => ({ ...prev, [optionName]: value }));
  };

  if (loading) {
    return <PageLoader />;
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <Link to="/shop">
            <Button>Back to Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  const discountPercent = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-brand-bg">
        <div className="container-custom py-4">
          <nav className="text-sm" aria-label="Breadcrumb">
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
              <li>/</li>
              <li>
                <Link
                  to={`/shop/${product.category}`}
                  className="hover:text-brand-primary transition-colors capitalize"
                >
                  {product.category}
                </Link>
              </li>
              <li>/</li>
              <li className="text-gray-800 font-medium truncate max-w-[150px]">
                {product.name}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Product Section */}
      <section className="section-padding pt-8">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left: 3D Product Viewer */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {webGLSupported ? (
                <Suspense
                  fallback={
                    <div className="aspect-square bg-brand-bg rounded-2xl flex items-center justify-center">
                      <div className="animate-pulse text-brand-primary">Loading 3D Viewer...</div>
                    </div>
                  }
                >
                  <ProductViewer3D
                    modelUrl={product.modelUrl}
                    productType={product.category}
                    autoRotate={false}
                    className="aspect-square"
                  />
                </Suspense>
              ) : (
                <div className="aspect-square bg-gradient-to-br from-brand-bg to-brand-muted/30 rounded-2xl flex items-center justify-center">
                  <svg
                    className="w-24 h-24 text-brand-primary/30"
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
                </div>
              )}
            </motion.div>

            {/* Right: Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col"
            >
              {/* Category & Badges */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm text-brand-primary uppercase tracking-wider font-medium">
                  {product.category}
                </span>
                {product.compareAtPrice && (
                  <Badge>Save {discountPercent}%</Badge>
                )}
                {product.stock < 5 && product.stock > 0 && (
                  <Badge variant="warning">Only {product.stock} left</Badge>
                )}
              </div>

              {/* Title */}
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                {product.name}
              </h1>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-3xl font-bold text-brand-primaryDark">
                  {formatPrice(product.price)}
                </span>
                {product.compareAtPrice && (
                  <span className="text-lg text-gray-400 line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="mt-6 text-gray-600 leading-relaxed">
                {product.description}
              </p>

              {/* Options */}
              {product.options && product.options.length > 0 && (
                <div className="mt-6 space-y-4">
                  {product.options.map((option) => (
                    <div key={option.name}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {option.name}
                      </label>
                      <Select
                        options={option.values.map((v) => ({ value: v, label: v }))}
                        value={selectedOptions[option.name] || option.values[0]}
                        onChange={(e) => handleOptionChange(option.name, e.target.value)}
                        className="max-w-xs"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Quantity & Add to Cart */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                {/* Quantity Selector */}
                <div className="flex items-center border border-brand-border/50 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-4 py-3 hover:bg-brand-accent/30 transition-colors text-gray-600"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-6 py-3 font-medium text-center min-w-[60px]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    className="px-4 py-3 hover:bg-brand-accent/30 transition-colors text-gray-600"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <Button
                  size="lg"
                  className="flex-1 sm:flex-none sm:min-w-[200px]"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </Button>
              </div>

              {/* Tags */}
              {product.tags.length > 0 && (
                <div className="mt-8 pt-6 border-t border-brand-border/20">
                  <p className="text-sm text-gray-500 mb-2">Tags:</p>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 bg-brand-bg rounded-full text-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Shipping Info */}
              <div className="mt-6 p-4 bg-brand-bg rounded-xl">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                  <span>Free shipping on orders over ₹999</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="section-padding bg-brand-surface">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">
              You May Also Like
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.slug}`}
                  className="block group"
                >
                  <Card hover padding="none">
                    <div className="aspect-square bg-gradient-to-br from-brand-bg to-brand-muted/30 flex items-center justify-center relative overflow-hidden rounded-t-2xl">
                      <svg
                        className="w-12 h-12 text-brand-primary/30"
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
                    </div>
                    <CardContent className="p-4">
                      <CardTitle className="text-sm group-hover:text-brand-primary transition-colors">
                        {relatedProduct.name}
                      </CardTitle>
                      <p className="mt-1 font-semibold text-gray-800">
                        {formatPrice(relatedProduct.price)}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
