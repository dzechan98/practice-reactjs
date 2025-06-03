export interface ProductRating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: ProductRating;
}

export interface CreateProductPayload {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: ProductRating;
}

export interface UpdateProductPayload extends CreateProductPayload {
  id: number;
}

export type ProductCategory =
  | "electronics"
  | "jewelery"
  | "men's clothing"
  | "women's clothing";

export interface ProductFilters {
  category?: ProductCategory;
  minPrice?: number;
  maxPrice?: number;
  searchTerm?: string;
  minRating?: number;
  maxRating?: number;
}

export interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  selectedProduct: Product | null;
  filters: ProductFilters;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ProductApiError {
  message: string;
  status: number;
  code?: string;
}

export interface ProductFormData {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

export type ProductSortBy = "title" | "price" | "category" | "id" | "rating";
export type SortOrder = "asc" | "desc";

export interface ProductSort {
  sortBy: ProductSortBy;
  order: SortOrder;
}

export interface ProductQueryOptions {
  limit?: number;
  sort?: "asc" | "desc";
  category?: string;
}

export interface DeleteProductResponse {
  success: boolean;
  id: number;
}

export interface ApiErrorResponse {
  message: string;
  status: number;
  data?: unknown;
}

export interface RatingStats {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    [key: number]: number;
  };
}

export interface ProductWithStats extends Product {
  isHighRated: boolean;
  isPopular: boolean;
  priceCategory: "budget" | "mid-range" | "premium";
}
