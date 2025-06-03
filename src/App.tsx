import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import { HomePage } from "@/pages/home";
import { AboutPage } from "@/pages/about";
import { BlogPage } from "@/pages/blog";
import { ServicePage } from "@/pages/service";
import { ProductsPage } from "@/pages/products";
import Navbar from "@/components/navbar";
import ErrorBoundary from "@/components/ErrorBoundary";

function App() {
  const [darkMode, setDarkMode] = useLocalStorage<boolean>("darkMode", false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        darkMode
          ? "dark bg-slate-900 text-slate-50"
          : "bg-gray-50 text-slate-900"
      }`}
    >
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="container mx-auto px-4 py-8">
        <ErrorBoundary
          fallbackRender={(error) => (
            <p>Something went wrong: {error.message}</p>
          )}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/service" element={<ServicePage />} />
            <Route path="/products" element={<ProductsPage />} />
          </Routes>
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default App;
