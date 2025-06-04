import { render, screen } from "@testing-library/react";
import { ProductsPage } from "./products";
import "@testing-library/jest-dom";

jest.mock("@/components/products/product-form", () => ({
  ProductForm: () => (
    <div data-testid="product-form-mock">Product Form Mock</div>
  ),
}));

jest.mock("@/components/products/product-list", () => ({
  ProductList: () => (
    <div data-testid="product-list-mock">Product List Mock</div>
  ),
}));

describe("ProductsPage", () => {
  it("renders the page title and mocked components", () => {
    render(<ProductsPage />);

    expect(
      screen.getByRole("heading", { name: /product management/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/manage your store products with full crud operations/i)
    ).toBeInTheDocument();

    expect(screen.getByTestId("product-form-mock")).toBeInTheDocument();
    expect(screen.getByTestId("product-list-mock")).toBeInTheDocument();
  });
});
