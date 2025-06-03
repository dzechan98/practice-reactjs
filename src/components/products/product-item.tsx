import React, { useState, memo, useCallback, useMemo } from "react";
import { Edit3, Trash2, Loader2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "@/store/product-slice";
import type { RootState, AppDispatch } from "@/store";
import type { Product } from "@/types/product";
import { ProductForm } from "./product-form";
import { toast } from "sonner";

interface ProductItemProps {
  product: Product;
}

const ProductItemComponent: React.FC<ProductItemProps> = ({ product }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.products);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = useCallback(async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${product.title}"?`
    );

    if (confirmDelete) {
      try {
        setIsDeleting(true);
        await dispatch(deleteProduct(product.id)).unwrap();
        toast.success("Product deleted successfully!", {
          duration: 3000,
          description: `"${product.title}" has been removed.`,
        });
      } catch (error) {
        console.log(error);
        toast.error("Failed to delete product", {
          duration: 3000,
          description: "Please try again.",
        });
      } finally {
        setIsDeleting(false);
      }
    }
  }, [dispatch, product.id, product.title]);

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "electronics":
        return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400";
      case "jewelery":
        return "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400";
      case "men's clothing":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400";
      case "women's clothing":
        return "bg-pink-100 text-pink-800 border-pink-200 dark:bg-pink-900/20 dark:text-pink-400";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "text-green-600 dark:text-green-400";
    if (rating >= 4.0) return "text-yellow-600 dark:text-yellow-400";
    if (rating >= 3.0) return "text-orange-600 dark:text-orange-400";
    return "text-red-600 dark:text-red-400";
  };

  const memoizedStars = useMemo(() => {
    const stars: React.ReactElement[] = [];
    if (!product.rating) return stars;

    const ratingValue = product.rating.rate;
    const fullStars = Math.floor(ratingValue);
    const hasHalfStar = ratingValue % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-3 w-3 fill-current" />);
    }

    if (hasHalfStar && stars.length < 5) {
      stars.push(
        <Star key="half" className="h-3 w-3 fill-current opacity-50" />
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-3 w-3 opacity-30" />);
    }
    return stars;
  }, [product.rating]);

  if (isEditing) {
    return (
      <div className="col-span-1 md:col-span-2 lg:col-span-3">
        <ProductForm
          editingProduct={product}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-t-4 border-t-purple-500 group">
      <CardContent className="p-3">
        <div className="flex flex-col space-y-3">
          {/* Product Image */}
          <div className="flex justify-center pt-2">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              className="w-24 h-24 object-contain rounded-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder.svg?height=96&width=96";
              }}
            />
          </div>

          {/* Product Details */}
          <div className="space-y-2">
            {/* Title */}
            <div className="relative">
              <h3 className="font-semibold text-sm leading-tight text-gray-800 dark:text-gray-200 line-clamp-2 pr-12">
                {product.title}
              </h3>

              {/* Action Buttons - Absolute positioned */}
              <div className="absolute top-0 right-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsEditing(true)}
                  className="h-6 w-6 p-0 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-full transition-all duration-200"
                  disabled={loading || isDeleting}
                >
                  <Edit3 className="h-3 w-3 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleDelete}
                  className="h-6 w-6 p-0 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-full transition-all duration-200"
                  disabled={loading || isDeleting}
                >
                  {isDeleting ? (
                    <Loader2 className="h-3 w-3 animate-spin text-gray-500" />
                  ) : (
                    <Trash2 className="h-3 w-3 text-gray-500 hover:text-red-600 dark:hover:text-red-400" />
                  )}
                </Button>
              </div>
            </div>

            {/* Price and Category */}
            <div className="flex items-center justify-between gap-2">
              <div className="text-base font-bold text-green-600 dark:text-green-400">
                ${product.price.toFixed(2)}
              </div>
              <Badge
                className={`${getCategoryColor(
                  product.category
                )} font-medium px-1.5 py-0.5 text-[10px]`}
              >
                {product.category}
              </Badge>
            </div>

            {/* Rating Section */}
            {product.rating && (
              <div className="flex items-center justify-between text-xs">
                <div
                  className={`flex items-center gap-1 ${getRatingColor(
                    product.rating.rate
                  )}`}
                >
                  {memoizedStars}
                  <span className="font-semibold ml-1">
                    {product.rating.rate.toFixed(1)}
                  </span>
                </div>
                <span className="text-gray-500 dark:text-gray-400">
                  ({product.rating.count})
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const ProductItem = memo(ProductItemComponent);
