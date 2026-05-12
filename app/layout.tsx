import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import ScrollReveal from "@/components/ScrollReveal";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AVCONEXPO | Global Engineering, EPC & Sourcing Solutions",
  description:
    "Engineering-Technology, Supply-Chain Management, Architecture-Design, EPC, and industrial solutions — concept to consumer, scratch to shelf.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} scroll-smooth`} data-scroll-behavior="smooth">
      <body suppressHydrationWarning className="min-h-screen antialiased">
        <ScrollReveal />
        {children}
      </body>
    </html>
  );
}
