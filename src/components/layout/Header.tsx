import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store';
import logo from '@/assets/saishaa-logo.png';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/shop/resin', label: 'Resin' },
  { to: '/shop/candles', label: 'Candles' },
  { to: '/shop/crafts', label: 'Crafts' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { openDrawer, getTotalItems, cartAnimationTrigger } = useCartStore();
  const totalItems = getTotalItems();

  // Trigger animation when cartAnimationTrigger changes
  useEffect(() => {
    if (cartAnimationTrigger > 0) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 600);
      return () => clearTimeout(timer);
    }
  }, [cartAnimationTrigger]);

  return (
    <header className="sticky top-0 z-50 bg-brand-surface/80 backdrop-blur-lg border-b border-brand-border/20">
      <nav className="container-custom" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex-shrink-0 focus-ring rounded-lg"
            aria-label="Saishaa Art Home"
          >
            <img
              src={logo}
              alt="Saishaa Art"
              className="h-12 md:h-14 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-colors focus-ring ${isActive
                    ? 'text-brand-primary bg-brand-accent/50'
                    : 'text-gray-600 hover:text-brand-primary hover:bg-brand-accent/30'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Cart Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={openDrawer}
              className="relative p-2 rounded-xl hover:bg-brand-accent/30 transition-colors focus-ring"
              aria-label={`Shopping cart with ${totalItems} items`}
            >
              <motion.div
                animate={isAnimating ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </motion.div>
              <AnimatePresence mode="wait">
                {totalItems > 0 && (
                  <motion.span
                    key={totalItems}
                    initial={{ scale: 0 }}
                    animate={{
                      scale: 1,
                      backgroundColor: isAnimating ? '#22c55e' : '#9f7aea'
                    }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-brand-primary text-white text-xs font-bold rounded-full flex items-center justify-center"
                  >
                    {isAnimating ? (
                      <motion.svg
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </motion.svg>
                    ) : (
                      totalItems > 9 ? '9+' : totalItems
                    )}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl hover:bg-brand-accent/30 transition-colors focus-ring"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle mobile menu"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-1 border-t border-brand-border/20">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-xl text-base font-medium transition-colors ${isActive
                        ? 'text-brand-primary bg-brand-accent/50'
                        : 'text-gray-600 hover:text-brand-primary hover:bg-brand-accent/30'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
