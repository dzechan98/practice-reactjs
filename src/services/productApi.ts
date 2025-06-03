import axios, { type AxiosResponse, type AxiosError } from "axios";
import type {
  Product,
  CreateProductPayload,
  ProductQueryOptions,
  DeleteProductResponse,
} from "@/types/product";

const apiClient = axios.create({
  baseURL: "https://fakestoreapi.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    const errorMessage =
      typeof error.response?.data === "string"
        ? error.response.data
        : error.message || "An unknown error occurred";
    console.error("API Error:", errorMessage);
    return Promise.reject(new Error(errorMessage));
  }
);

export const productApi = {
  getAllProducts: async (): Promise<Product[]> => {
    try {
      const response: AxiosResponse<Product[]> = await apiClient.get(
        "/products"
      );
      return response.data;
    } catch (error) {
      throw new Error(
        `Failed to fetch products: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  },

  getProductById: async (id: number): Promise<Product> => {
    try {
      const response: AxiosResponse<Product> = await apiClient.get(
        `/products/${id}`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        `Failed to fetch product ${id}: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  },

  createProduct: async (product: CreateProductPayload): Promise<Product> => {
    try {
      const response: AxiosResponse<Product> = await apiClient.post(
        "/products",
        product
      );
      return response.data;
    } catch (error) {
      throw new Error(
        `Failed to create product: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  },

  updateProduct: async (
    id: number,
    product: CreateProductPayload
  ): Promise<Product> => {
    try {
      const response: AxiosResponse<Product> = await apiClient.put(
        `/products/${id}`,
        product
      );
      return response.data;
    } catch (error) {
      throw new Error(
        `Failed to update product ${id}: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  },

  patchProduct: async (
    id: number,
    updates: Partial<CreateProductPayload>
  ): Promise<Product> => {
    try {
      const response: AxiosResponse<Product> = await apiClient.patch(
        `/products/${id}`,
        updates
      );
      return response.data;
    } catch (error) {
      throw new Error(
        `Failed to patch product ${id}: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  },

  deleteProduct: async (id: number): Promise<DeleteProductResponse> => {
    try {
      await apiClient.delete(`/products/${id}`);
      return { success: true, id };
    } catch (error) {
      throw new Error(
        `Failed to delete product ${id}: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  },

  getProductsByCategory: async (category: string): Promise<Product[]> => {
    try {
      const response: AxiosResponse<Product[]> = await apiClient.get(
        `/products/category/${category}`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        `Failed to fetch products for category ${category}: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  },

  getCategories: async (): Promise<string[]> => {
    try {
      const response: AxiosResponse<string[]> = await apiClient.get(
        "/products/categories"
      );
      return response.data;
    } catch (error) {
      throw new Error(
        `Failed to fetch categories: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  },

  getProductsWithOptions: async (
    options: ProductQueryOptions = {}
  ): Promise<Product[]> => {
    try {
      const response: AxiosResponse<Product[]> = await apiClient.get(
        "/products",
        {
          params: {
            limit: options.limit,
            sort: options.sort,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(
        `Failed to fetch products with options: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  },

  getLimitedProducts: async (limit: number): Promise<Product[]> => {
    try {
      const response: AxiosResponse<Product[]> = await apiClient.get(
        "/products",
        {
          params: { limit },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(
        `Failed to fetch limited products: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  },

  getSortedProducts: async (
    sort: "asc" | "desc" = "asc"
  ): Promise<Product[]> => {
    try {
      const response: AxiosResponse<Product[]> = await apiClient.get(
        "/products",
        {
          params: { sort },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(
        `Failed to fetch sorted products: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  },
};

export { apiClient };

export type { AxiosResponse, AxiosError };
