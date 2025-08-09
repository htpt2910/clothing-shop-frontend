import type { NextApiRequest, NextApiResponse } from 'next';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:4000/api/v1';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { page = 1, limit = 50 } = req.query;

  try {
    const response = await fetch(
      `${BACKEND_URL}/products?page=${page}&limit=${limit}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Backend returned ${response.status}`);
    }

    const data = await response.json();
    
    // Map the backend response to match frontend expectations
    const mappedData = Array.isArray(data) 
      ? data.map((item: any) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image_url || item.image || '',
          description: item.description,
        }))
      : data;
    
    res.status(200).json(mappedData);
  } catch (error) {
    console.error('Error fetching from backend:', error);
    res.status(500).json({
      error: 'Failed to fetch products from backend',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
