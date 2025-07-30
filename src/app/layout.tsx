import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/context/QueryProvider";
import { ThemeProvider } from "@/context/ThemeProvider";

export const metadata: Metadata = {
  title: "SkyCast",
  description: "The Only Weather App You Need",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
