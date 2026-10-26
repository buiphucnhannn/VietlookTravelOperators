"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { href } from "@/i18n/config";
import { smoothScrollTo } from "@/components/fx/SmoothScroll";

/**
 * Logo ngang: biểu tượng chim hạc + chữ VIETLOOK TRAVEL (cắt từ logo gốc).
 * light: chữ chuyển trắng (trên nền ảnh/tối). compact: cỡ nhỏ cho header thấp.
 */
export default function Logo({ lang = "en", small, compact, light, className, onNavigate }) {
  const pathname = usePathname();
  const home = href(lang);
  return (
    <Link
      href={home}
      // Đang ở trang chủ: lướt mượt lên đầu hero thay vì tải lại
      onClick={(e) => {
        onNavigate?.();
        if (pathname === home || pathname === `/${lang}`) {
          e.preventDefault();
          smoothScrollTo(0);
        }
      }}
      className={cn("flex shrink-0 items-center gap-2.5", className)}
      aria-label="Vietlook Travel – Home"
    >
      <Image
        src="/images/logo/vietlook-icon.png"
        alt=""
        width={210}
        height={210}
        priority
        className={cn(
          "h-auto",
          small ? "w-10" : compact ? "w-9 min-[380px]:w-10 lg:w-11" : "w-12 lg:w-14",
        )}
      />
      <Image
        src="/images/logo/vietlook-wordmark.png"
        alt="Vietlook Travel"
        width={527}
        height={59}
        priority
        className={cn(
          "h-auto transition-[filter] duration-500",
          small ? "w-36" : compact ? "w-32 min-[380px]:w-36 lg:w-40" : "w-40 lg:w-48",
          light && "brightness-0 invert",
        )}
      />
    </Link>
  );
}
