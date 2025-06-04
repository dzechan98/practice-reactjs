import { render, screen } from "@testing-library/react";
import { ServicePage } from "./service";

describe("ServicePage", () => {
  it("renders the service page heading", () => {
    render(<ServicePage />);
    const headingElement = screen.getByRole("heading", {
      name: /Our Services/i,
      level: 1,
    });
    expect(headingElement).toBeInTheDocument();
  });

  it("renders the introductory paragraph", () => {
    render(<ServicePage />);
    expect(
      screen.getByText(/Welcome to our services page/i)
    ).toBeInTheDocument();
  });

  it("renders service titles", () => {
    render(<ServicePage />);
    expect(
      screen.getByRole("heading", { name: /Service One/i, level: 2 })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Service Two/i, level: 2 })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Service Three/i, level: 2 })
    ).toBeInTheDocument();
  });

  it("renders service descriptions", () => {
    render(<ServicePage />);
    expect(screen.getByText(/Description of service one/i)).toBeInTheDocument();
    expect(screen.getByText(/Description of service two/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Description of service three/i)
    ).toBeInTheDocument();
  });
});
