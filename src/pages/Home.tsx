import { useEffect, useState, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Card, CardContent, CardTitle, Badge, PageLoader } from '@/components/ui';
import { getFeaturedProducts, getCategories } from '@/services';
import type { Product, CategoryInfo } from '@/types';
import { formatPrice, isWebGLSupported } from '@/utils/cn';
import logo from '@/assets/saishaa-logo.png';

// Lazy load 3D component
const FeaturedProduct3D = lazy(() =>
  import('@/components/3d').then((m) => ({ default: m.FeaturedProduct3D }))
);

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<CategoryInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    setWebGLSupported(isWebGLSupported());
    
    async function loadData() {
      try {
        const [products, cats] = await Promise.all([
          getFeaturedProducts(),
          getCategories(),
        ]);
        setFeaturedProducts(products);
        setCategories(cats);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-bg via-brand-muted/20 to-brand-bg">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[70vh] py-12 lg:py-20">
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <img
                src={logo}
                alt="Saishaa Art"
                className="h-20 md:h-24 w-auto mx-auto lg:mx-0 mb-6"
              />
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
                Handcrafted with{' '}
                <span className="text-brand-primary">Love</span>
              </h1>
              <p className="mt-4 text-lg text-gray-600 max-w-lg mx-auto lg:mx-0">
                Discover unique resin jewelry, artisan candles, and beautiful handmade crafts. 
                Each piece tells a story, crafted just for you.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/shop">
                  <Button size="lg" className="w-full sm:w-auto">
                    Shop Collection
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Our Story
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Right: 3D Featured Products */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-[400px] lg:h-[500px]"
            >
              {webGLSupported ? (
                <Suspense
                  fallback={
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="animate-pulse text-brand-primary">Loading 3D...</div>
                    </div>
                  }
                >
                  <FeaturedProduct3D className="w-full h-full" />
                </Suspense>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-brand-accent/20 rounded-3xl">
                  <img
                    src={logo}
                    alt="Saishaa Art Products"
                    className="max-w-[60%] opacity-50"
                  />
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-brand-accent/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-brand-primary/10 rounded-full blur-3xl" />
      </section>

      {/* Categories Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeInUp} className="text-2xl md:text-3xl font-bold text-gray-800">
              Shop by Category
            </motion.h2>
            <motion.p variants={fadeInUp} className="mt-3 text-gray-600 max-w-2xl mx-auto">
              Explore our collection of handcrafted treasures
            </motion.p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-6 lg:gap-8"
          >
            {categories.map((category) => (
              <motion.div key={category.id} variants={fadeInUp}>
                <Link to={`/shop/${category.id}`} className="block group">
                  <Card hover padding="none" className="overflow-hidden">
                    {/* Category Image Placeholder */}
                    <div className="aspect-[4/3] bg-gradient-to-br from-brand-accent/50 to-brand-muted/30 flex items-center justify-center">
                      <div className="text-6xl opacity-60">
                        {category.id === 'resin' && '💎'}
                        {category.id === 'candles' && '🕯️'}
                        {category.id === 'crafts' && '🎨'}
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <CardTitle className="text-xl group-hover:text-brand-primary transition-colors">
                        {category.name}
                      </CardTitle>
                      <p className="mt-2 text-sm text-gray-600">
                        {category.description}
                      </p>
                      <span className="inline-flex items-center mt-4 text-sm font-medium text-brand-primary group-hover:gap-2 transition-all">
                        Explore
                        <svg
                          className="w-4 h-4 ml-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="section-padding bg-brand-surface">
        <div className="container-custom">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="flex flex-col md:flex-row md:items-end justify-between mb-12"
          >
            <div>
              <motion.h2 variants={fadeInUp} className="text-2xl md:text-3xl font-bold text-gray-800">
                Featured Products
              </motion.h2>
              <motion.p variants={fadeInUp} className="mt-3 text-gray-600">
                Our most loved handcrafted pieces
              </motion.p>
            </div>
            <motion.div variants={fadeInUp}>
              <Link to="/shop">
                <Button variant="ghost" className="mt-4 md:mt-0">
                  View All
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {featuredProducts.slice(0, 4).map((product) => (
              <motion.div key={product.id} variants={fadeInUp}>
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
                    </div>
                    <CardContent className="p-4">
                      <p className="text-xs text-brand-primary uppercase tracking-wider mb-1">
                        {product.category}
                      </p>
                      <CardTitle className="text-base group-hover:text-brand-primary transition-colors">
                        {product.name}
                      </CardTitle>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="font-semibold text-gray-800">
                          {formatPrice(product.price)}
                        </span>
                        {product.compareAtPrice && (
                          <span className="text-sm text-gray-400 line-through">
                            {formatPrice(product.compareAtPrice)}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-brand-primary to-brand-primaryDark rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden"
          >
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold">
                Custom Orders Welcome
              </h2>
              <p className="mt-3 text-white/90 max-w-xl mx-auto">
                Have something special in mind? We love creating custom pieces 
                tailored just for you. Get in touch to discuss your vision.
              </p>
              <Link to="/contact">
                <Button
                  variant="secondary"
                  size="lg"
                  className="mt-6 bg-white text-brand-primaryDark hover:bg-brand-bg"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
