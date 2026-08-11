"use client";

import { useEffect, useState } from "react";
import HeroDesktop from "./HeroDesktop";
import HeroMobile from "./HeroMobile";

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 768px)").matches);
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-[#0B0E12] overflow-hidden">
      <div className="hidden md:block">
        <HeroDesktop />
      </div>
      <div className="block md:hidden">
        <HeroMobile />
      </div>
    </section>
  );
}
