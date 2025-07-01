"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/setup", label: "Get Set Up" },
    { href: "/projects", label: "Projects" },
    { href: "/prompts", label: "Tips" },
    { href: "/debug", label: "Debug" }
  ];

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-2 md:top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1rem)] md:w-[95%] max-w-7xl"
      >
        <div className="bg-white/80 backdrop-blur-md rounded-full shadow-sm px-4 md:px-8 py-2 md:py-3 border border-white/20">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="hover:opacity-70 transition-opacity"
            >
              <img
                src="/fire-fireball.gif"
                alt="Fire"
                className="h-8 md:h-10 w-auto"
              />
            </Link>

            {/* Desktop Navigation Items */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm transition-opacity ${pathname === item.href
                    ? "opacity-100"
                    : "opacity-60 hover:opacity-100"
                    }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 -mr-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-[80%] max-w-sm bg-white shadow-xl z-50 md:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Menu Header */}
                <div className="flex items-center justify-between p-6 border-b">
                  <span className="text-lg font-light">Menu</span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 -mr-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Close menu"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Menu Items */}
                <nav className="flex-1 px-6 py-8">
                  <div className="space-y-6">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`block text-lg transition-opacity ${pathname === item.href
                          ? "opacity-100 font-medium"
                          : "opacity-60"
                          }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </nav>

                {/* Menu Footer */}
                <div className="p-6 border-t">
                  <Link
                    href="/"
                    className="text-sm text-black hover:opacity-70 transition-colors"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
} 