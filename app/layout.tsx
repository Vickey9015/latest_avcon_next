import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import ScrollReveal from "@/components/ScrollReveal";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.avconexpo.com"),
  alternates: {
    languages: {
      "x-default": "/",
      "en-eg": "/egypt/",
      "en-ke": "/kenya/",
      "en-ne": "/niger/",
      "en-ng": "/nigeria/",
      "en-gn": "/guinea/",
      "en-gh": "/ghana/",
      "en-sl": "/sierra-leone/",
      "en-bi": "/burundi/",
      "en-rw": "/rwanda/",
      "en-tz": "/tanzania/",
      "en-et": "/ethiopia/",
      "en-ug": "/uganda/",
      "en-qa": "/qatar/en/",
      "en-bh": "/bahrain/en/",
      "en-ae": "/uae/en/",
      "en-om": "/oman/en/",
      "en-kw": "/kuwait/en/",
      "ar-qa": "/qatar/ar/",
      "ar-bh": "/bahrain/ar/",
      "ar-ae": "/uae/ar/",
      "ar-om": "/oman/ar/",
      "ar-kw": "/kuwait/ar/",
    },
  },
  title: "AVCONEXPO | Global Engineering, EPC & Sourcing Solutions",
  description:
    "Engineering-Technology, Supply-Chain Management, Architecture-Design, EPC, and industrial solutions — concept to consumer, scratch to shelf.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    title: "AVCONEXPO | Global Engineering, EPC & Sourcing Solutions",
    description:
      "Engineering-Technology, Supply-Chain Management, Architecture-Design, EPC, and industrial solutions — concept to consumer, scratch to shelf.",
    siteName: "AVCONEXPO",
    locale: "en_US",
    images: [
      {
        url: "/favicon.png",
      },
    ],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} scroll-smooth`} data-scroll-behavior="smooth">
      <head>
        <meta
          name="google-site-verification"
          content="2idd2VAY98jmcTtnQzeyulmi8LSM3zcbjO4PQNe8OO4"
        />
      </head>
      <body suppressHydrationWarning className="min-h-screen antialiased">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MJR9RZ7G"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Script
          id="gtm-head"
          strategy="beforeInteractive"
        >{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MJR9RZ7G');`}</Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-033K77JK27"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">{`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-033K77JK27');`}</Script>
        <Script id="clarity-tag" strategy="afterInteractive">{`(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "wx2xxs19p3");`}</Script>
        <ScrollReveal />
        {children}
      </body>
    </html>
  );
}
