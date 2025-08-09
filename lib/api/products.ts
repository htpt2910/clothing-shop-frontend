import { Product } from '../types/product';

const getApiUrl = () => {
  if (typeof window === 'undefined') {
    return process.env.BACKEND_URL || 'http://localhost:4000/api/v1';
  } else {
    // Client-side: use Next.js API proxy to avoid CORS
    return '/api';
  }
};

export async function fetchProducts(
  page: number = 1,
  limit: number = 50
): Promise<{
  products: Product[];
  hasMore: boolean;
  total: number;
}> {
  try {
    const apiUrl = getApiUrl();
    const fetchUrl = `${apiUrl}/products?page=${page}&limit=${limit}`;
    const headers: HeadersInit = {};

    const response = await fetch(fetchUrl, { headers });

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    const data = await response.json();

    // Map the API response to match our Product interface
    const products = (data.products || data.data || data || []).map((item: any) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image_url || item.image || '',
      description: item.description,
    }));

    return {
      products,
      hasMore:
        data.hasMore !== undefined
          ? data.hasMore
          : products.length === limit,
      total: data.total || products.length || 0,
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}
