import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const resolveSrc = (src) => {
  if (!src) return null;
  if (typeof src !== "string") return src; 
  const s = src.trim();
  if (s.startsWith("http://") || s.startsWith("https://") || s.startsWith("/")) return s;
  return `/articulos/${encodeURIComponent(s)}`;
};

const Banner = ({ bannerImage = null, onClick = null, ariaLabel = "Banner publicitario" }) => {
  const leftSrc = resolveSrc(bannerImage) || assets.jbl_soundbox_image;

  const handleKey = (e) => {
    if (!onClick) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={ariaLabel}
      onClick={onClick ?? undefined}
      onKeyDown={handleKey}
      className="flex flex-col md:flex-row items-center justify-between md:pl-20 py-14 md:py-0 bg-[#E6E9F2] my-16 rounded-xl overflow-hidden cursor-pointer"
    >
      {/* Imagen principal: reemplazable desde admin (bannerImage) */}
      <div className="relative w-auto max-w-[300px] md:max-w-[220px] flex-shrink-0">
        <Image
          className="max-w-56"
          src={leftSrc}
          alt="banner-left"
          unoptimized
        />
      </div>


      <div className="md:hidden">
        <Image
          className=""
          src={assets.sm_controller_image}
          alt="sm_controller_image"
          unoptimized
        />
      </div>
    </div>
  );
};

export default Banner;