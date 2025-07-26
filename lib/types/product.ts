export interface Product {
  id: number
  name: string
  price: number
  image: string
  description?: string
}

export interface HomeProps {
  products: Product[]
  error?: string
}
