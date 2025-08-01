"use client";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import CitySearch from "./CitySearch";
import Image from "next/image";

const Header = () => {
  const { theme, setTheme } = useTheme();
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
        <div>
          <div className="flex gap-4">
            {/* Search cities Button */}
            <CitySearch />

            {/* Toggle Theme Button */}
            <div
              className="flex items-center cursor-pointer"
              onClick={() =>
                theme === "dark" ? setTheme("light") : setTheme("dark")
              }
            >
              {theme === "dark" ? (
                <Sun className="h-6 w-6 text-yellow-500" />
              ) : (
                <Moon className="h-6 w-6 text-blue-500" />
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
