import ProductCard from '@/components/ProductCard';
import { Product } from '@/lib/types/product';

const sampleProducts: Product[] = [
  {
    id: 1,
    name: 'Classic White T-Shirt',
    price: 29.99,
    image: 'https://picsum.photos/300/400?random=1',
    description: 'A comfortable classic white t-shirt',
  },
  {
    id: 2,
    name: 'Denim Jacket',
    price: 89.99,
    image: 'https://picsum.photos/300/400?random=2',
    description: 'Stylish denim jacket for all seasons',
  },
  {
    id: 3,
    name: 'Black Skinny Jeans',
    price: 59.99,
    image: 'https://picsum.photos/300/400?random=3',
    description: 'Modern fit black skinny jeans',
  },
  {
    id: 4,
    name: 'Floral Summer Dress',
    price: 49.99,
    image: 'https://picsum.photos/300/400?random=4',
    description: 'Light and breezy summer dress',
  },
  {
    id: 5,
    name: 'Leather Boots',
    price: 129.99,
    image: 'https://picsum.photos/300/400?random=5',
    description: 'Premium leather boots',
  },
  {
    id: 6,
    name: 'Wool Sweater',
    price: 79.99,
    image: 'https://picsum.photos/300/400?random=6',
    description: 'Warm wool sweater for cold days',
  },
  {
    id: 7,
    name: 'Sports Hoodie',
    price: 44.99,
    image: 'https://picsum.photos/300/400?random=7',
    description: 'Comfortable sports hoodie',
  },
  {
    id: 8,
    name: 'Casual Shorts',
    price: 34.99,
    image: 'https://picsum.photos/300/400?random=8',
    description: 'Casual shorts for summer',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="max-w-screen mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Our Products</h1>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {sampleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
