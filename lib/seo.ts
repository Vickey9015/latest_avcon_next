import type { Metadata } from "next";

import { SITE } from "@/lib/site";

export function toAbsoluteUrl(url: string): string {
  if (!url) return SITE;
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url.replace(/^https?:\/\/www\./i, (match) => match.replace("www.", ""));
  }
  // Treat as app-relative path
  if (url.startsWith("/")) return `${SITE}${url}`;
  return `${SITE}/${url}`;
}

export function seoForRoute(params: {
  pathname: string;
  title: string;
  description?: string;
  imageUrl?: string;
}): Metadata {
  const url = toAbsoluteUrl(params.pathname);
  const image = params.imageUrl ? toAbsoluteUrl(params.imageUrl) : `${SITE}/favicon.png`;

  return {
    metadataBase: new URL(SITE),
    alternates: {
      canonical: url,
    },
    title: params.title,
    description: params.description,
    openGraph: {
      title: params.title,
      description: params.description,
      type: "website",
      url,
      images: [
        {
          url: image,
        },
      ],
      siteName: "AVCONEXPO",
      locale: "en_US",
    },
  };
}

