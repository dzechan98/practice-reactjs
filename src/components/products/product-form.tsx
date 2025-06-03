import type React from "react";

import { useState } from "react";
import { Plus, X, Loader2, CheckCircle, AlertCircle, Star } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  defaultValues,
  productSchema,
  type ProductFormData,
} from "@/components/products/product-schema";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, updateProduct } from "@/store/product-slice";
import type { RootState, AppDispatch } from "@/store";
import type { Product } from "@/types/product";

const categories = [
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
];

interface ProductFormProps {
  editingProduct?: Product | null;
  onCancel?: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  editingProduct,
  onCancel,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.products);

  const [isFormVisible, setIsFormVisible] = useState(!!editingProduct);

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: editingProduct
      ? {
          title: editingProduct.title,
          price: editingProduct.price,
          description: editingProduct.description,
          category: editingProduct.category,
          image: editingProduct.image,
          rating: editingProduct.rating || { rate: 0, count: 0 },
        }
      : defaultValues,
  });

  const {
    reset,
    formState: { errors, isDirty },
    watch,
  } = form;

  const watchedTitle = watch("title");
  const watchedPrice = watch("price");
  const watchedRating = watch("rating");

  const onSubmit = async (data: ProductFormData) => {
    try {
      if (editingProduct) {
        await dispatch(
          updateProduct({
            id: editingProduct.id,
            ...data,
          })
        ).unwrap();
        toast.success("Product updated successfully!", {
          duration: 3000,
          description: `Product "${data.title}" has been updated.`,
        });
        onCancel?.();
      } else {
        await dispatch(createProduct(data)).unwrap();
        toast.success("Product created successfully!", {
          duration: 3000,
          description: `Product "${data.title}" has been added.`,
        });
        reset();
        setIsFormVisible(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        editingProduct
          ? "Failed to update product"
          : "Failed to create product",
        {
          duration: 3000,
          description: "Please try again.",
        }
      );
    }
  };

  const handleCancel = () => {
    if (isDirty) {
      const confirmDiscard = window.confirm(
        "You have unsaved changes. Are you sure you want to discard them?"
      );
      if (!confirmDiscard) return;
    }

    if (editingProduct) {
      onCancel?.();
    } else {
      setIsFormVisible(false);
      reset();
    }
  };

  if (!editingProduct && !isFormVisible) {
    return (
      <Button
        onClick={() => setIsFormVisible(true)}
        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
        disabled={loading}
      >
        <Plus className="h-5 w-5 mr-2" />
        Add New Product
      </Button>
    );
  }

  return (
    <div className="animate-in slide-in-from-top-2 duration-300">
      <Card className="border-purple-200 dark:border-purple-800 shadow-xl bg-white dark:bg-slate-800 overflow-hidden">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                {editingProduct ? "Edit Product" : "Create New Product"}
              </CardTitle>
              {watchedTitle && (
                <Badge variant="outline" className="text-xs">
                  {watchedTitle.length}/100
                </Badge>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancel}
              className="cursor-pointer hover:bg-red-100 dark:hover:bg-red-900/20 rounded-full"
              disabled={loading}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
              noValidate
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        Product Title
                        {!errors.title &&
                          field.value &&
                          field.value.length >= 3 && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter product title..."
                          {...field}
                          className={`transition-all duration-200 ${
                            errors.title
                              ? "border-red-500 focus:ring-red-500"
                              : field.value && field.value.length >= 3
                              ? "border-green-500 focus:ring-green-500"
                              : ""
                          }`}
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        {errors.title && <AlertCircle className="h-3 w-3" />}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        Price ($)
                        {watchedPrice > 0 && (
                          <Badge variant="outline" className="text-xs">
                            ${watchedPrice.toFixed(2)}
                          </Badge>
                        )}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          placeholder="0.00"
                          {...field}
                          onChange={(e) =>
                            field.onChange(
                              Number.parseFloat(e.target.value) || 0
                            )
                          }
                          className={`transition-all duration-200 ${
                            errors.price
                              ? "border-red-500 focus:ring-red-500"
                              : ""
                          }`}
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        {errors.price && <AlertCircle className="h-3 w-3" />}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      Description
                      {field.value && (
                        <Badge variant="outline" className="text-xs">
                          {field.value.length}/1000
                        </Badge>
                      )}
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Product description..."
                        rows={4}
                        className={`transition-all duration-200 resize-none ${
                          errors.description
                            ? "border-red-500 focus:ring-red-500"
                            : ""
                        }`}
                        {...field}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      {errors.description && (
                        <AlertCircle className="h-3 w-3" />
                      )}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Category
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={loading}
                      >
                        <FormControl>
                          <SelectTrigger
                            className={`w-full transition-all duration-200 ${
                              errors.category ? "border-red-500" : ""
                            }`}
                          >
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        {errors.category && <AlertCircle className="h-3 w-3" />}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Image URL
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com/image.jpg"
                          {...field}
                          className={`transition-all duration-200 ${
                            errors.image
                              ? "border-red-500 focus:ring-red-500"
                              : ""
                          }`}
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        {errors.image && <AlertCircle className="h-3 w-3" />}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>

              {/* Rating Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="rating.rate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        Rating (0-5)
                        {watchedRating?.rate && watchedRating.rate > 0 && (
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs">
                              {watchedRating.rate.toFixed(1)}
                            </span>
                          </div>
                        )}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.1"
                          min="0"
                          max="5"
                          placeholder="4.5"
                          {...field}
                          onChange={(e) =>
                            field.onChange(
                              Number.parseFloat(e.target.value) || 0
                            )
                          }
                          className={`transition-all duration-200 ${
                            errors.rating?.rate
                              ? "border-red-500 focus:ring-red-500"
                              : ""
                          }`}
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        {errors.rating?.rate && (
                          <AlertCircle className="h-3 w-3" />
                        )}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rating.count"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        Review Count
                        {watchedRating?.count && watchedRating.count > 0 && (
                          <Badge variant="outline" className="text-xs">
                            {watchedRating.count} reviews
                          </Badge>
                        )}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="500"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number.parseInt(e.target.value) || 0)
                          }
                          className={`transition-all duration-200 ${
                            errors.rating?.count
                              ? "border-red-500 focus:ring-red-500"
                              : ""
                          }`}
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        {errors.rating?.count && (
                          <AlertCircle className="h-3 w-3" />
                        )}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      {editingProduct ? "Updating..." : "Creating..."}
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      {editingProduct ? "Update Product" : "Create Product"}
                    </div>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={loading}
                  className="px-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
