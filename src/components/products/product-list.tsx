import type React from "react";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductItem } from "./product-item";
import { fetchProducts, clearError } from "@/store/product-slice";
import type { RootState, AppDispatch } from "@/store";

export const ProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleRetry = () => {
    dispatch(clearError());
    dispatch(fetchProducts());
  };

  if (loading && products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
        <p className="text-gray-600 dark:text-gray-400">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4">
        <AlertCircle className="h-12 w-12 text-red-500" />
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Failed to load products
          </h3>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
        </div>
        <Button
          onClick={handleRetry}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Products ({products.length})
        </h2>
        <Button
          onClick={() => dispatch(fetchProducts())}
          variant="outline"
          size="sm"
          disabled={loading}
          className="hover:bg-purple-50 dark:hover:bg-purple-900/20"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <RefreshCw className="h-4 w-4 mr-2" />
          )}
          Refresh
        </Button>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-16 animate-fade-in">
          <div className="text-gray-400 dark:text-gray-500 text-lg font-medium">
            No products found
          </div>
          <p className="text-gray-300 dark:text-gray-600 text-sm mt-2">
            Create your first product to get started!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="animate-slide-in-from-left"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductItem product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
