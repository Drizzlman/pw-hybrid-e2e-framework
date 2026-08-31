export interface ApiResponse {
  responseCode: number;
  message: string;
}

export interface ProductCategory {
  usertype: { usertype: string };
  category: string;
}

export interface Product {
  id: number;
  name: string;
  price: string;
  brand: string;
  category: ProductCategory;
  image: string;
}

export interface ProductsListResponse {
  responseCode: number;
  products: Product[];
}
