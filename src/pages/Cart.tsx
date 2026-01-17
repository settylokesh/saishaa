import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Card } from '@/components/ui';
import { useCartStore } from '@/store';
import { formatPrice } from '@/utils/cn';

export default function Cart() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();
  const totalPrice = getTotalPrice();
  const shippingThreshold = 999;
  const freeShipping = totalPrice >= shippingThreshold;
  const shippingCost = freeShipping ? 0 : 99;

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Header */}
      <section className="bg-brand-surface py-8 border-b border-brand-border/20">
        <div className="container-custom">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Shopping Cart
          </h1>
          <p className="mt-2 text-gray-600">
            {items.length === 0
              ? 'Your cart is empty'
              : `${items.length} item${items.length > 1 ? 's' : ''} in your cart`}
          </p>
        </div>
      </section>

      <section className="section-padding pt-8">
        <div className="container-custom">
          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <svg
                className="w-24 h-24 mx-auto text-brand-muted mb-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Your cart is empty
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Looks like you haven't added any items to your cart yet. 
                Explore our collection and find something you'll love!
              </p>
              <Link to="/shop">
                <Button size="lg">Continue Shopping</Button>
              </Link>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <Card padding="none">
                  <div className="p-4 border-b border-brand-border/20 flex items-center justify-between">
                    <h2 className="font-semibold text-gray-800">Cart Items</h2>
                    <button
                      onClick={clearCart}
                      className="text-sm text-gray-500 hover:text-red-500 transition-colors"
                    >
                      Clear All
                    </button>
                  </div>
                  <AnimatePresence mode="popLayout">
                    <ul className="divide-y divide-brand-border/20">
                      {items.map((item) => (
                        <motion.li
                          key={item.product.id}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -100 }}
                          className="p-4 md:p-6"
                        >
                          <div className="flex gap-4 md:gap-6">
                            {/* Product Image Placeholder */}
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl bg-brand-bg flex items-center justify-center flex-shrink-0">
                              <svg
                                className="w-10 h-10 text-brand-primary/30"
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

                            {/* Product Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col md:flex-row md:items-start justify-between gap-2">
                                <div>
                                  <Link
                                    to={`/product/${item.product.slug}`}
                                    className="font-semibold text-gray-800 hover:text-brand-primary transition-colors line-clamp-1"
                                  >
                                    {item.product.name}
                                  </Link>
                                  <p className="text-sm text-gray-500 capitalize mt-1">
                                    {item.product.category}
                                  </p>
                                  {item.selectedOptions && Object.entries(item.selectedOptions).length > 0 && (
                                    <p className="text-sm text-gray-500 mt-1">
                                      {Object.entries(item.selectedOptions).map(([key, value]) => (
                                        <span key={key}>{key}: {value} </span>
                                      ))}
                                    </p>
                                  )}
                                </div>
                                <p className="text-lg font-semibold text-gray-800 md:text-right">
                                  {formatPrice(item.product.price * item.quantity)}
                                </p>
                              </div>

                              {/* Quantity & Remove */}
                              <div className="mt-4 flex items-center justify-between">
                                <div className="flex items-center border border-brand-border/50 rounded-lg overflow-hidden">
                                  <button
                                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                    className="px-3 py-1.5 hover:bg-brand-accent/30 transition-colors text-gray-600"
                                    aria-label="Decrease quantity"
                                  >
                                    -
                                  </button>
                                  <span className="px-4 py-1.5 font-medium text-center min-w-[50px]">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                    className="px-3 py-1.5 hover:bg-brand-accent/30 transition-colors text-gray-600"
                                    aria-label="Increase quantity"
                                  >
                                    +
                                  </button>
                                </div>
                                <button
                                  onClick={() => removeItem(item.product.id)}
                                  className="text-sm text-gray-500 hover:text-red-500 transition-colors flex items-center gap-1"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  </AnimatePresence>
                </Card>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <h2 className="font-semibold text-gray-800 pb-4 border-b border-brand-border/20">
                    Order Summary
                  </h2>

                  <div className="mt-4 space-y-3">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span>{freeShipping ? 'Free' : formatPrice(shippingCost)}</span>
                    </div>
                    {!freeShipping && (
                      <p className="text-xs text-brand-primary">
                        Add {formatPrice(shippingThreshold - totalPrice)} more for free shipping
                      </p>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t border-brand-border/20 flex justify-between items-center">
                    <span className="font-semibold text-gray-800">Total</span>
                    <span className="text-2xl font-bold text-brand-primaryDark">
                      {formatPrice(totalPrice + shippingCost)}
                    </span>
                  </div>

                  <Button className="w-full mt-6" size="lg">
                    Proceed to Checkout
                  </Button>

                  <Link to="/shop" className="block mt-4">
                    <Button variant="ghost" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>

                  {/* Trust Badges */}
                  <div className="mt-6 pt-6 border-t border-brand-border/20 space-y-3">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span>Secure checkout</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      <span>Multiple payment options</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
                      </svg>
                      <span>Easy returns within 7 days</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
