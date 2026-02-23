"use client";
import { useEffect, useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const navItems = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#Skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const isDarkSystem = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    if (stored === "dark" || (!stored && isDarkSystem)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    document.documentElement.classList.toggle("dark", newDark);
    localStorage.setItem("theme", newDark ? "dark" : "light");
  };

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 px-4",
        isScrolled
          ? "py-3 bg-background/80 backdrop-blur-xl border-b border-border"
          : "py-6 bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a
          href="#"
          className="text-xl font-bold tracking-tighter shrink-0 relative z-50"
        >
          <span className="text-foreground">Magdy.</span>
          <span className="text-primary">Dev</span>
        </a>

        <div className="hidden md:flex items-center space-x-10">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {item.name}
            </a>
          ))}
          <button
            onClick={toggleTheme}
            className="p-2 cursor-pointer hover:bg-secondary rounded-full transition-colors"
          >
            {isDark ? (
              <Sun size={18} className="text-yellow-400" />
            ) : (
              <Moon size={18} className="text-blue-600" />
            )}
          </button>
        </div>

        <div className="flex items-center space-x-3 md:hidden relative z-50">
          <button onClick={toggleTheme} className="p-2 text-foreground">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-foreground transition-transform active:scale-90"
          >
            {/* استخدام AnimatePresence داخل الزر لجعل التبديل ناعماً */}
            <div className="relative w-6 h-6 flex items-center justify-center">
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </div>
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 bg-background z-40 flex flex-col items-center justify-center md:hidden"
            >
              <div className="flex flex-col space-y-8 text-center">
                {navItems.map((item, i) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-4xl font-black text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Nav;
