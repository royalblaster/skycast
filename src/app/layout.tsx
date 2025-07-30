import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/context/QueryProvider";
import { ThemeProvider } from "@/context/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
            <div className="bg-gradient-to-br from-background to-muted">
              <Header />
              <main className="min-h-screen container mx-auto px-2 py-8">
                {children}
              </main>
              <Footer />
            </div>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
