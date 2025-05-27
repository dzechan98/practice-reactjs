import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export default function Navbar({ darkMode, setDarkMode }: NavbarProps) {
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Blog", path: "/blog" },
    { name: "Service", path: "/service" },
  ];

  return (
    <header className="w-full bg-transparent border-b border-gray-200 dark:border-gray-700">
      <div className="container p-4 mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-2xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
          Task Manager Pro
        </div>

        <nav>
          <ul className="flex flex-wrap justify-center gap-4">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Button
                  asChild
                  variant="link"
                  className={
                    location.pathname === link.path
                      ? "text-purple-600 dark:text-purple-400 font-bold"
                      : ""
                  }
                >
                  <Link to={link.path}>{link.name}</Link>
                </Button>
              </li>
            ))}
          </ul>
        </nav>

        <ThemeToggle
          darkMode={darkMode}
          onToggle={() => setDarkMode(!darkMode)}
        />
      </div>
    </header>
  );
}
