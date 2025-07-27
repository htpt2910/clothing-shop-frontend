import Image from 'next/image';
import { Product } from '@/lib/types/product';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white hover:shadow-md transition-shadow duration-200 p-2">
      <div className="flex justify-center mb-6">
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={500}
          className="object-cover rounded-3xl"
        />
      </div>
      <div>
        <h3 className="text-lg font-medium text-red-900 truncate text-left">
          {product.name}
        </h3>
        <div className="flex justify-between items-center mt-1">
          <p className="text-lg font-semibold text-gray-900">
            ${product.price.toFixed(2)}
          </p>
          <button className="p-2 hover:bg-gray-100 rounded">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 16 16"
              height="1em"
              width="1em"
              className="w-6 h-6 text-pink-500"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
