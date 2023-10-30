import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AntFood — AI-Powered Meals",
  description:
    "AntFood creates personalized, detailed meal plans for Anteaters of all shapes and sizes! View detailed nutrition information, upcoming meals at Brandywine and Anteatery, and stay mindful of your eating habits!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col place-content-center bg-background text-text">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
