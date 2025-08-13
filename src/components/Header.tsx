"use client";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import CitySearch from "./CitySearch";
import Image from "next/image";
import { useEffect, useState } from "react";

const Header = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // or a loader

  const isDark = resolvedTheme === "dark";

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex justify-between h-24 px-4 items-center">
        {/* Logo */}
        <Link href={"/"}>
          <Image
            src={theme === "dark" ? "/logo_night.png" : "/logo_day.png"}
            alt="SkyCast"
            height={96}
            width={96}
            className="object-contain"
          />
        </Link>
        <div className="flex items-center gap-4">
          {/* Search */}
          <CitySearch />

          {/* Theme toggle */}
          <button
            aria-label="Toggle theme"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="flex items-center"
          >
            {isDark ? (
              <Sun className="h-6 w-6 text-yellow-500" />
            ) : (
              <Moon className="h-6 w-6 text-blue-500" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
