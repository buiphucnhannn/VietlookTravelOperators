"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Video nền hero chạy luân phiên (cross-fade).
 * - Chỉ tải video đang phát + video kế tiếp (tiết kiệm băng thông).
 * - Hết video (hoặc tối đa `maxMs`) thì chuyển sang video sau.
 * - Ảnh poster (khung hình đầu) hiển thị ngay khi trang mở.
 */
export default function HeroVideos({ videos, maxMs = 14000 }) {
  const [i, setI] = useState(0);
  const refs = useRef([]);
  const n = videos.length;
  const next = (i + 1) % n;

  useEffect(() => {
    const v = refs.current[i];
    if (!v) return;
    v.currentTime = 0;
    v.play().catch(() => {});
    const advance = () => setI((x) => (x + 1) % n);
    v.addEventListener("ended", advance);
    const t = setTimeout(advance, maxMs);
    return () => {
      v.removeEventListener("ended", advance);
      clearTimeout(t);
    };
  }, [i, n, maxMs]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-brand-950">
      {videos.map((vid, idx) => {
        const load = idx === i || idx === next;
        return (
          <video
            key={vid.src}
            ref={(el) => (refs.current[idx] = el)}
            className={cn(
              "absolute inset-0 size-full object-cover transition-opacity duration-[1400ms] ease-out",
              idx === i ? "opacity-100" : "opacity-0",
            )}
            src={load ? vid.src : undefined}
            poster={vid.poster}
            muted
            playsInline
            preload={idx === i ? "auto" : "metadata"}
            aria-hidden
          />
        );
      })}

      {/* Chấm chuyển video + tên địa danh */}
      <div className="absolute inset-x-0 bottom-6 z-10 flex flex-col items-center gap-2.5 lg:bottom-8">
        <span
          key={i}
          className="animate-fade-up text-sm font-semibold tracking-wide text-white/90 [text-shadow:0_1px_6px_rgba(0,0,0,.6)]"
        >
          {videos[i].label}
        </span>
        <div className="flex gap-2">
          {videos.map((vid, idx) => (
            <button
              key={vid.src}
              type="button"
              aria-label={vid.label}
              onClick={() => setI(idx)}
              className={cn(
                "relative h-1.5 rounded-full transition-all duration-500 after:absolute after:-inset-x-1 after:-inset-y-3 after:content-['']",
                idx === i ? "w-8 bg-white" : "w-3 bg-white/50 hover:bg-white/80",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
