import { GetServerSideProps } from 'next';
import { useState, useEffect, useCallback, useRef } from 'react';
import ProductCard from '@/components/ProductCard';
import { Product, HomeProps } from '@/lib/types/product';
import { fetchProducts } from '@/lib/api/products';

export default function ProductsPage({
  products: initialProducts,
  error: initialError,
}: HomeProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(initialError || null);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);

  const loadMoreProducts = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const { products: newProducts, hasMore: moreAvailable } =
        await fetchProducts(page, 50);

      if (newProducts.length > 0) {
        setProducts((prev) => [...prev, ...newProducts]);
        setPage((prev) => prev + 1);
        setHasMore(moreAvailable);
      } else {
        setHasMore(false);
      }
      setError(null);
    } catch (err) {
      setError(
        'Failed to load more products. Please check if backend is running.'
      );
      console.error('Error loading more products:', err);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !loading) {
          loadMoreProducts();
        }
      },
      {
        root: null,
        rootMargin: '100px',
        threshold: 0.1,
      }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [loadMoreProducts, hasMore, loading]);

  if (initialError && products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Products
          </h1>
          <p className="text-gray-600 mb-2">{initialError}</p>
          <p className="text-gray-500 text-sm">
            Please ensure the backend server is running on port 4000
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-screen mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Our Products</h1>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No products available. Please check if the backend server is
              running.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {products.map((product, index) => (
                <ProductCard key={`${product.id}-${index}`} product={product} />
              ))}
            </div>

            <div ref={loaderRef} className="flex justify-center py-8">
              {loading && (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
                  <span className="text-gray-600">
                    Loading more products...
                  </span>
                </div>
              )}
              {!hasMore && products.length > 0 && (
                <p className="text-gray-500">No more products to load</p>
              )}
              {error && (
                <div className="text-center">
                  <p className="text-red-500">{error}</p>
                  <button
                    onClick={loadMoreProducts}
                    className="mt-2 text-pink-500 hover:text-pink-600"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  try {
    const { products } = await fetchProducts(1, 50);

    return {
      props: {
        products: products || [],
      },
    };
  } catch (error) {
    console.error('Error fetching products on server:', error);

    return {
      props: {
        products: [],
        error:
          'Unable to connect to backend. Please ensure the backend server is running on port 4000.',
      },
    };
  }
};
