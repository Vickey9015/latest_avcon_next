import Link from "next/link";
import Image from "next/image";

type LogoProps = {
  className?: string;
  /** onDark: for dark headers. onLight: for white headers. */
  variant?: "onDark" | "onLight";
  size?: "sm" | "md";
};

export default function Logo({ className = "", variant = "onDark", size = "md" }: LogoProps) {
  // Use relative sizes based on the size prop
  const logoHeight = size === "sm" ? 32 : 40;
  // Maintain aspect ratio 250:90 (~2.78:1)
  const logoWidth = Math.round(logoHeight * (250 / 90));

  return (
    <Link href="/" className={`flex items-center ${className}`}>
      <Image
        src="/brand-logo.png"
        alt="AVCONEXPO Logo"
        width={logoWidth}
        height={logoHeight}
        priority
        className="h-auto w-auto object-contain"
      />
    </Link>
  );
}
