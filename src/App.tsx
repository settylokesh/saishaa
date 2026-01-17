import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { PageLoader } from '@/components/ui';

// Lazy load pages for better performance
const Home = lazy(() => import('@/pages/Home'));
const Category = lazy(() => import('@/pages/Category'));
const ProductDetail = lazy(() => import('@/pages/ProductDetail'));
const Cart = lazy(() => import('@/pages/Cart'));
const About = lazy(() => import('@/pages/About'));
const Contact = lazy(() => import('@/pages/Contact'));

// 404 Page
function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-brand-primary mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">Page not found</p>
        <a
          href="/"
          className="inline-flex items-center px-5 py-2.5 bg-brand-primary text-white font-medium rounded-xl hover:bg-brand-primaryDark transition-colors"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}

function App() {
  return (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />
          
          {/* Shop / Category */}
          <Route path="/shop" element={<Category />} />
          <Route path="/shop/:category" element={<Category />} />
          
          {/* Product Detail */}
          <Route path="/product/:slug" element={<ProductDetail />} />
          
          {/* Cart */}
          <Route path="/cart" element={<Cart />} />
          
          {/* Static Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Placeholder routes for footer links */}
          <Route path="/shipping" element={<About />} />
          <Route path="/returns" element={<About />} />
          <Route path="/faq" element={<About />} />
          
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
