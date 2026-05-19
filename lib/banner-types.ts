export type BannerStatus = "Active" | "Inactive";

export interface Banner {
  id: number;
  image: string;
  alt: string;
  lines: string[];
  status: BannerStatus;
  order: number;
}

export interface BannerInput {
  image: string;
  alt: string;
  lines: string[];
  status: BannerStatus;
  order: number;
}

export function bannerTitle(banner: Banner): string {
  return banner.lines[0] ?? "";
}

export function bannerSubtitle(banner: Banner): string {
  return banner.lines.slice(1).join(" ");
}
