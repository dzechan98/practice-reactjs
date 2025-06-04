import { render, screen } from "@testing-library/react";
import { BlogPage } from "./blog";

describe("BlogPage", () => {
  it("renders the blog page heading", () => {
    render(<BlogPage />);
    const headingElement = screen.getByRole("heading", {
      name: /Blog/i,
      level: 1,
    });
    expect(headingElement).toBeInTheDocument();
  });

  it("renders the introductory paragraph", () => {
    render(<BlogPage />);
    expect(screen.getByText(/Welcome to our blog/i)).toBeInTheDocument();
  });

  it("renders blog post titles", () => {
    render(<BlogPage />);
    expect(screen.getByText(/Blog Post Title One/i)).toBeInTheDocument();
    expect(screen.getByText(/Blog Post Title Two/i)).toBeInTheDocument();
    expect(screen.getByText(/Blog Post Title Three/i)).toBeInTheDocument();
  });

  it('renders "Read more..." links for each post', () => {
    render(<BlogPage />);
    const readMoreLinks = screen.getAllByText(/Read more.../i);
    expect(readMoreLinks).toHaveLength(3);
    readMoreLinks.forEach((link) => {
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "#");
    });
  });

  it("renders publication dates and authors", () => {
    render(<BlogPage />);
    expect(
      screen.getByText(/Published on May 27, 2025 by Admin/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Published on May 26, 2025 by Contributor/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Published on May 25, 2025 by Guest Author/i)
    ).toBeInTheDocument();
  });

  it("renders blog post summaries", () => {
    render(<BlogPage />);
    expect(
      screen.getByText(/This is a summary of the first blog post./i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/A brief insight into another interesting topic./i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Discover new perspectives and ideas in this thought-provoking piece./i
      )
    ).toBeInTheDocument();
  });
});
