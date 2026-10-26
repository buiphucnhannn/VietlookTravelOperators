import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Stars({ value = 5, className, size = 16 }) {
  return (
    <span
      className={cn("inline-flex gap-0.5 text-amber-brand", className)}
      aria-label={`${value}/5`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          width={size}
          height={size}
          className={i < Math.round(value) ? "fill-current" : "fill-transparent opacity-40"}
        />
      ))}
    </span>
  );
}
