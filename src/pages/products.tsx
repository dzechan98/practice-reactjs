import type React from "react";
import { ProductForm } from "@/components/products/product-form";
import { ProductList } from "@/components/products/product-list";
import { Separator } from "@/components/ui/separator";

export const ProductsPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Product Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your store products with full CRUD operations
        </p>
      </div>

      <div className="transform transition-all duration-300">
        <ProductForm />
      </div>

      <Separator className="my-8" />

      <div className="transform transition-all duration-300">
        <ProductList />
      </div>
    </div>
  );
};
