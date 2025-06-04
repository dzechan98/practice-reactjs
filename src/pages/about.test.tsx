import { render, screen } from "@testing-library/react";
import { AboutPage } from "./about";

describe("AboutPage", () => {
  it("renders the about page heading", () => {
    render(<AboutPage />);
    const headingElement = screen.getByText(/About Task Manager Pro/i);
    expect(headingElement).toBeInTheDocument();
  });

  it("renders the introductory paragraphs", () => {
    render(<AboutPage />);
    expect(
      screen.getByText(/simple task manager application/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/demonstrates various React concepts/i)
    ).toBeInTheDocument();
  });
});
