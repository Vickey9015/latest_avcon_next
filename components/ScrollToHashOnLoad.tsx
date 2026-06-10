"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function scrollToContact() {
  if (window.location.hash !== "#contact") return;
  requestAnimationFrame(() => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

export default function ScrollToHashOnLoad() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;

    scrollToContact();
    window.addEventListener("hashchange", scrollToContact);
    return () => window.removeEventListener("hashchange", scrollToContact);
  }, [pathname]);

  return null;
}
