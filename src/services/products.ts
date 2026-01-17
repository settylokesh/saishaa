import type { Product, ProductCategory, ProductFilters, PaginatedResponse, CategoryInfo } from '@/types';

// ===========================================
// MOCK DATA - Replace with API calls later
// ===========================================

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Ocean Wave Resin Ring',
    slug: 'ocean-wave-resin-ring',
    description: 'A stunning handcrafted resin ring featuring mesmerizing ocean wave patterns. Each piece is unique with swirling blues and whites that capture the essence of the sea.',
    price: 899,
    compareAtPrice: 1199,
    category: 'resin',
    images: ['/products/resin-ring-1.jpg'],
    tags: ['ring', 'ocean', 'blue', 'bestseller'],
    featured: true,
    createdAt: '2024-01-15',
    stock: 25,
    options: [
      { name: 'Size', values: ['5', '6', '7', '8', '9'] },
    ],
  },
  {
    id: '2',
    name: 'Galaxy Swirl Resin Band',
    slug: 'galaxy-swirl-resin-band',
    description: 'A beautiful resin band with deep purple and gold galaxy patterns. Perfect for those who love celestial aesthetics.',
    price: 749,
    category: 'resin',
    images: ['/products/resin-band-1.jpg'],
    tags: ['band', 'galaxy', 'purple', 'gold'],
    featured: true,
    createdAt: '2024-01-20',
    stock: 30,
    options: [
      { name: 'Size', values: ['S', 'M', 'L'] },
    ],
  },
  {
    id: '3',
    name: 'Rose Garden Resin Bangle',
    slug: 'rose-garden-resin-bangle',
    description: 'Delicate dried rose petals suspended in crystal-clear resin. A romantic piece that brings nature to your wrist.',
    price: 1299,
    category: 'resin',
    images: ['/products/resin-bangle-1.jpg'],
    tags: ['bangle', 'flowers', 'romantic', 'gift'],
    featured: false,
    createdAt: '2024-02-01',
    stock: 15,
  },
  {
    id: '4',
    name: 'Teddy Bear Soy Candle',
    slug: 'teddy-bear-soy-candle',
    description: 'An adorable teddy bear shaped candle made from 100% natural soy wax. Scented with warm vanilla and honey.',
    price: 599,
    category: 'candles',
    images: ['/products/candle-bear-1.jpg'],
    tags: ['candle', 'bear', 'vanilla', 'gift', 'cute'],
    featured: true,
    createdAt: '2024-01-10',
    stock: 40,
    options: [
      { name: 'Scent', values: ['Vanilla Honey', 'Lavender', 'Cinnamon'] },
    ],
  },
  {
    id: '5',
    name: 'Heart Pillar Candle Set',
    slug: 'heart-pillar-candle-set',
    description: 'A set of three heart-shaped pillar candles in graduating sizes. Perfect for creating a romantic ambiance.',
    price: 849,
    compareAtPrice: 999,
    category: 'candles',
    images: ['/products/candle-heart-1.jpg'],
    tags: ['candle', 'heart', 'set', 'romantic', 'bestseller'],
    featured: true,
    createdAt: '2024-01-25',
    stock: 20,
    options: [
      { name: 'Color', values: ['Pink', 'Red', 'White', 'Lavender'] },
    ],
  },
  {
    id: '6',
    name: 'Geometric Crystal Candle',
    slug: 'geometric-crystal-candle',
    description: 'Modern geometric shaped candle that resembles a crystal formation. Unscented for those with sensitivities.',
    price: 699,
    category: 'candles',
    images: ['/products/candle-geo-1.jpg'],
    tags: ['candle', 'geometric', 'modern', 'unscented'],
    featured: false,
    createdAt: '2024-02-05',
    stock: 35,
  },
  {
    id: '7',
    name: 'Custom Photo Resin Frame',
    slug: 'custom-photo-resin-frame',
    description: 'Preserve your precious memories in a beautiful resin frame with dried flowers. Custom-made with your photo.',
    price: 1499,
    category: 'crafts',
    images: ['/products/frame-1.jpg'],
    tags: ['frame', 'custom', 'photo', 'flowers', 'gift'],
    featured: true,
    createdAt: '2024-01-05',
    stock: 10,
    options: [
      { name: 'Size', values: ['4x6', '5x7', '8x10'] },
      { name: 'Flower Color', values: ['Pink', 'Blue', 'Mixed'] },
    ],
  },
  {
    id: '8',
    name: 'Macramé Wall Hanging',
    slug: 'macrame-wall-hanging',
    description: 'Handwoven macramé wall hanging with intricate patterns. Adds a bohemian touch to any room.',
    price: 1199,
    category: 'crafts',
    images: ['/products/macrame-1.jpg'],
    tags: ['macrame', 'wall art', 'boho', 'handwoven'],
    featured: false,
    createdAt: '2024-02-10',
    stock: 8,
    options: [
      { name: 'Size', values: ['Small', 'Medium', 'Large'] },
    ],
  },
  {
    id: '9',
    name: 'Resin Coaster Set',
    slug: 'resin-coaster-set',
    description: 'Set of 4 beautiful resin coasters with gold leaf accents. Protects your surfaces in style.',
    price: 999,
    category: 'crafts',
    images: ['/products/coasters-1.jpg'],
    tags: ['coasters', 'resin', 'gold', 'home decor', 'set'],
    featured: true,
    createdAt: '2024-01-30',
    stock: 22,
    options: [
      { name: 'Color Theme', values: ['Ocean Blue', 'Forest Green', 'Sunset Orange', 'Galaxy Purple'] },
    ],
  },
  {
    id: '10',
    name: 'Pressed Flower Bookmark',
    slug: 'pressed-flower-bookmark',
    description: 'Delicate pressed flowers laminated in a beautiful bookmark. A thoughtful gift for book lovers.',
    price: 299,
    category: 'crafts',
    images: ['/products/bookmark-1.jpg'],
    tags: ['bookmark', 'flowers', 'gift', 'affordable'],
    featured: false,
    createdAt: '2024-02-15',
    stock: 50,
  },
];

const categories: CategoryInfo[] = [
  {
    id: 'resin',
    name: 'Resin Jewelry',
    description: 'Handcrafted resin rings, bands, and bangles with unique designs',
    image: '/categories/resin.jpg',
  },
  {
    id: 'candles',
    name: 'Decorative Candles',
    description: 'Artisan candles in adorable shapes and scents',
    image: '/categories/candles.jpg',
  },
  {
    id: 'crafts',
    name: 'Handmade Crafts',
    description: 'Custom frames, home decor, and unique artisan creations',
    image: '/categories/crafts.jpg',
  },
];

// ===========================================
// SERVICE FUNCTIONS - API-ready layer
// ===========================================

/**
 * Simulates API delay for realistic loading states
 */
const simulateDelay = (ms: number = 300): Promise<void> => 
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Get all products with optional filters
 * Ready to be replaced with: GET /api/products?category=...&sort=...
 */
export async function getProducts(
  filters?: ProductFilters,
  page: number = 1,
  pageSize: number = 12
): Promise<PaginatedResponse<Product>> {
  await simulateDelay();

  let filtered = [...mockProducts];

  // Apply category filter
  if (filters?.category) {
    filtered = filtered.filter((p) => p.category === filters.category);
  }

  // Apply search filter
  if (filters?.search) {
    const search = filters.search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search) ||
        p.tags.some((tag) => tag.toLowerCase().includes(search))
    );
  }

  // Apply price range filter
  if (filters?.priceRange) {
    const [min, max] = filters.priceRange;
    filtered = filtered.filter((p) => p.price >= min && p.price <= max);
  }

  // Apply sorting
  switch (filters?.sortBy) {
    case 'price-low':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'popular':
      filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
      break;
    case 'newest':
    default:
      filtered.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }

  // Pagination
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedData = filtered.slice(start, end);

  return {
    data: paginatedData,
    total: filtered.length,
    page,
    pageSize,
    hasMore: end < filtered.length,
  };
}

/**
 * Get featured products for homepage
 * Ready to be replaced with: GET /api/products/featured
 */
export async function getFeaturedProducts(): Promise<Product[]> {
  await simulateDelay();
  return mockProducts.filter((p) => p.featured);
}

/**
 * Get single product by slug
 * Ready to be replaced with: GET /api/products/:slug
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  await simulateDelay();
  return mockProducts.find((p) => p.slug === slug) || null;
}

/**
 * Get single product by ID
 * Ready to be replaced with: GET /api/products/:id
 */
export async function getProductById(id: string): Promise<Product | null> {
  await simulateDelay();
  return mockProducts.find((p) => p.id === id) || null;
}

/**
 * Get all categories
 * Ready to be replaced with: GET /api/categories
 */
export async function getCategories(): Promise<CategoryInfo[]> {
  await simulateDelay();
  return categories;
}

/**
 * Get category by ID
 * Ready to be replaced with: GET /api/categories/:id
 */
export async function getCategoryById(id: ProductCategory): Promise<CategoryInfo | null> {
  await simulateDelay();
  return categories.find((c) => c.id === id) || null;
}

/**
 * Get related products
 * Ready to be replaced with: GET /api/products/:id/related
 */
export async function getRelatedProducts(productId: string, limit: number = 4): Promise<Product[]> {
  await simulateDelay();
  const product = mockProducts.find((p) => p.id === productId);
  if (!product) return [];
  
  return mockProducts
    .filter((p) => p.id !== productId && p.category === product.category)
    .slice(0, limit);
}

/**
 * Search products
 * Ready to be replaced with: GET /api/products/search?q=...
 */
export async function searchProducts(query: string): Promise<Product[]> {
  await simulateDelay();
  const search = query.toLowerCase();
  return mockProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(search) ||
      p.tags.some((tag) => tag.toLowerCase().includes(search))
  );
}
