# Saishaa Art - 3D E-Commerce Frontend

A modern, production-ready 3D e-commerce website frontend for **Saishaa Art** - an arts & crafts store featuring handmade resin jewelry, decorative candles, and unique crafts.

![Saishaa Art](./src/assets/saishaa-logo.png)

## Features

- **Modern 3D Product Viewer** - Interactive 3D product visualization using React Three Fiber
- **Responsive Design** - Beautiful UI that works on all devices
- **Smooth Animations** - Polished micro-interactions with Framer Motion
- **Cart Management** - Persistent shopping cart with Zustand
- **Clean Architecture** - Backend-ready service layer for easy API integration
- **TypeScript** - Full type safety throughout the codebase
- **Accessible** - Semantic HTML, ARIA labels, keyboard navigation

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.3.1 | UI Framework |
| Vite | 6.0.3 | Build Tool |
| TypeScript | 5.6.3 | Type Safety |
| Tailwind CSS | 3.4.15 | Styling |
| Three.js | 0.170.0 | 3D Graphics |
| @react-three/fiber | 8.17.10 | React Three.js Renderer |
| @react-three/drei | 9.120.3 | Three.js Helpers |
| Framer Motion | 11.15.0 | Animations |
| Zustand | 5.0.2 | State Management |
| React Router | 6.28.0 | Routing |

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm 9+

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd saishaa

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Project Structure

```
src/
├── assets/           # Static assets (logo, images)
├── components/
│   ├── ui/           # Reusable UI components (Button, Card, etc.)
│   ├── layout/       # Layout components (Header, Footer, CartDrawer)
│   └── 3d/           # 3D components (ProductViewer3D, FeaturedProduct3D)
├── pages/            # Page components
├── store/            # Zustand stores (cart, filters)
├── services/         # API service layer (mock data)
├── types/            # TypeScript type definitions
└── utils/            # Utility functions
```

## Brand Tokens

The design system uses these brand colors (defined in `tailwind.config.js`):

| Token | Hex | Usage |
|-------|-----|-------|
| brand.bg | #edf6f5 | Page background |
| brand.surface | #ffffff | Card/surface background |
| brand.primary | #78afad | Primary actions, links |
| brand.primaryDark | #4e9091 | Hover states |
| brand.accent | #bee0da | Light accent areas |
| brand.muted | #ceeae6 | Muted backgrounds |
| brand.border | #9cc7c4 | Borders |

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, featured products, categories |
| Shop | `/shop` | All products with filters |
| Category | `/shop/:category` | Products by category (resin/candles/crafts) |
| Product | `/product/:slug` | Product detail with 3D viewer |
| Cart | `/cart` | Shopping cart page |
| About | `/about` | Brand story |
| Contact | `/contact` | Contact form |

## Adding Real Products

### 1. Update Mock Data

Edit `src/services/products.ts` to modify the `mockProducts` array:

```typescript
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Your Product Name',
    slug: 'your-product-slug',
    description: 'Product description...',
    price: 999,
    compareAtPrice: 1299, // Optional - original price for sales
    category: 'resin', // 'resin' | 'candles' | 'crafts'
    images: ['/products/your-image.jpg'],
    modelUrl: '/models/your-model.glb', // Optional - 3D model
    tags: ['tag1', 'tag2'],
    featured: true,
    createdAt: '2024-01-15',
    stock: 25,
    options: [
      { name: 'Size', values: ['S', 'M', 'L'] },
    ],
  },
  // ... more products
];
```

### 2. Add Product Images

Place product images in `public/products/` directory.

### 3. Add 3D Models (Optional)

Place GLB/GLTF models in `public/models/` directory. The `ProductViewer3D` component will automatically load them.

## Connecting to a Backend

The services layer (`src/services/`) is designed to be easily replaceable with real API calls:

```typescript
// Example: Replace mock with real API
export async function getProducts(filters?: ProductFilters): Promise<PaginatedResponse<Product>> {
  // Before (mock):
  // await simulateDelay();
  // return { data: mockProducts, ... };

  // After (real API):
  const response = await fetch('/api/products?' + new URLSearchParams({
    category: filters?.category || '',
    sort: filters?.sortBy || 'newest',
  }));
  return response.json();
}
```

### API Endpoints to Implement

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/products` | GET | List products with filters |
| `/api/products/:slug` | GET | Single product |
| `/api/products/featured` | GET | Featured products |
| `/api/categories` | GET | All categories |
| `/api/products/:id/related` | GET | Related products |

## 3D Model Requirements

For best results with the 3D viewer:

- **Format**: GLB or GLTF
- **Size**: Under 5MB recommended
- **Complexity**: Under 100k polygons
- **Materials**: PBR materials work best

If no model is provided, the viewer displays a procedural placeholder based on product type:
- **Resin**: Torus shape with glass material
- **Candles**: Cylinder with wick/flame
- **Crafts**: Box shape (photo frame)

## Performance Optimization

The build includes:
- **Code splitting**: Pages and 3D components are lazy-loaded
- **Chunk optimization**: Three.js bundled separately
- **Image optimization**: Lazy loading for images
- **Tree shaking**: Unused code eliminated

## Browser Support

- Chrome 90+
- Firefox 90+
- Safari 14+
- Edge 90+

WebGL is required for 3D features. A graceful fallback is shown for unsupported browsers.

## License

Private - All rights reserved.

---

Made with love for Saishaa Art 🐘
