"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

type ContactScrollLinkProps = Omit<ComponentProps<typeof Link>, "href">;

export default function ContactScrollLink({ onClick, ...props }: ContactScrollLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      href="/#contact"
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;

        if (pathname === "/") {
          event.preventDefault();
          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
          window.history.replaceState(null, "", "#contact");
        }
      }}
    />
  );
}
