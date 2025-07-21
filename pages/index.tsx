import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'

interface Product {
  id: number
  name: string
  price: number
  image: string
  description?: string
}

interface HomeProps {
  products: Product[]
  error?: string
}

export default function Home({ products, error }: HomeProps) {
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h1 className="text-2xl font-bold text-gray-900">My Shop</h1>
          </div>
        </header>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Products</h2>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <header className="bg-blue-600 shadow-lg border-b-4 border-yellow-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-4xl font-bold text-white animate-pulse">🛍️ My Awesome Shop 🛍️</h1>
        </div>
      </header>

      {!products || products.length === 0 ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No Products Available</h2>
            <p className="text-gray-600">Check back later for new items!</p>
          </div>
        </div>
      ) : (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-orange-300 hover:border-green-400"
              >
                <div className="aspect-square relative overflow-hidden rounded-t-lg bg-gray-200">
                  <Image
                    src={product.image || '/placeholder-image.jpg'}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = '/placeholder-image.jpg'
                    }}
                  />
                </div>
                <div className="p-4 bg-gradient-to-r from-cyan-50 to-blue-50">
                  <h3 className="text-lg font-semibold text-purple-800 group-hover:text-red-600 transition-colors duration-200">
                    {product.name}
                  </h3>
                  <p className="text-2xl font-bold text-green-600 mt-2 bg-yellow-200 px-2 py-1 rounded-lg inline-block">
                    ¥{product.price.toLocaleString('ja-JP')}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </main>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  try {
    // Replace with your actual API endpoint
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    
    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }

    const data = await response.json()
    
    // Transform the data to match our Product interface
    const products: Product[] = data.slice(0, 12).map((item: any, index: number) => ({
      id: item.id,
      name: item.title,
      price: Math.floor(Math.random() * 50000) + 1000, // Random price between ¥1,000 - ¥51,000
      image: `https://picsum.photos/400/400?random=${item.id}`,
      description: item.body
    }))

    return {
      props: {
        products
      }
    }
  } catch (error) {
    console.error('Error fetching products:', error)
    return {
      props: {
        products: [],
        error: 'Failed to load products. Please try again later.'
      }
    }
  }
}