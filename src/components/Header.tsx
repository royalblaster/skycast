"use client";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = ({
  theme,
  setTheme,
}: {
  theme: string | undefined;
  setTheme: (theme: string) => void;
}) => {
  return (
    <div
      className={`flex items-center cursor-pointer transition-transform duration-500 ${
        theme === "dark" ? "rotate-180" : "rotate-0"
      }`}
      onClick={() => (theme === "dark" ? setTheme("light") : setTheme("dark"))}
    >
      {theme === "dark" ? (
        <Sun className="h-6 w-6 text-yellow-500" />
      ) : (
        <Moon className="h-6 w-6 text-blue-500" />
      )}
    </div>
  );
};

const Header = () => {
  const { theme, setTheme } = useTheme();
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex justify-between h-24 px-4 items-center">
        {/* Logo */}
        <Link href={"/"}>
          <img
            src={theme === "dark" ? "/logo_night.png" : "logo_day.png"}
            alt="SkyCast"
            className="h-24"
          />
        </Link>
        <div>
          <div className="flex gap-4">
            {/* Toggle Theme Button */}
            <ThemeToggle theme={theme} setTheme={setTheme} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
