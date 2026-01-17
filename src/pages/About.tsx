import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button, Card } from '@/components/ui';
import logo from '@/assets/saishaa-logo.png';

const values = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: 'Made with Love',
    description: 'Every piece is handcrafted with passion and attention to detail.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    title: 'Unique Designs',
    description: 'No two pieces are exactly alike - each creation is one of a kind.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Eco-Conscious',
    description: 'We use sustainable materials and eco-friendly practices wherever possible.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
      </svg>
    ),
    title: 'Perfect for Gifting',
    description: 'Thoughtful, beautiful gifts that create lasting memories.',
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-brand-muted/30 to-brand-bg py-16 md:py-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <img
              src={logo}
              alt="Saishaa Art"
              className="h-20 md:h-24 w-auto mx-auto mb-8"
            />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
              Our Story
            </h1>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Saishaa Art was born from a love of creating beautiful, meaningful things by hand. 
              What started as a hobby has blossomed into a passion for crafting unique pieces 
              that bring joy to people's lives.
            </p>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-brand-accent/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-brand-primary/10 rounded-full blur-3xl" />
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-brand-surface">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInUp}>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                Crafted with Purpose
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Every piece at Saishaa Art tells a story. From delicate resin jewelry that 
                  captures nature's beauty to artisan candles that transform your space, 
                  we pour our heart into everything we create.
                </p>
                <p>
                  We believe in the power of handmade. In a world of mass production, 
                  there's something special about owning something that was crafted with 
                  care and intention, just for you.
                </p>
                <p>
                  Our journey began with a simple desire: to create beautiful things that 
                  make people smile. Today, we're proud to share our creations with 
                  customers who appreciate the art of handmade craftsmanship.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-brand-accent/50 to-brand-muted/30 rounded-3xl flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-8xl mb-4">🎨</div>
                  <p className="text-brand-primaryDark font-medium">Handmade with Love</p>
                </div>
              </div>
              {/* Decorative card */}
              <div className="absolute -bottom-6 -right-6 bg-brand-surface p-4 rounded-2xl shadow-lg border border-brand-border/20">
                <p className="text-sm text-gray-600">
                  <span className="text-2xl font-bold text-brand-primary">500+</span>
                  <br />Happy Customers
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              What We Stand For
            </h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              Our values guide everything we do, from selecting materials to packaging your order
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full text-center" hover>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-accent/50 text-brand-primaryDark mb-4">
                    {value.icon}
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-600">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-brand-surface">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Let's Create Something Beautiful
            </h2>
            <p className="mt-4 text-gray-600">
              Whether you're looking for a unique gift, a special piece for yourself, 
              or a custom creation, we'd love to help make it happen.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/shop">
                <Button size="lg">Explore Collection</Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg">Get in Touch</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
