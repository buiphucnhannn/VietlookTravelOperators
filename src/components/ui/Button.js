import Link from "next/link";
import { cn } from "@/lib/utils";

const variants = {
  primary: "bg-brand-600 text-white shadow-sm hover:bg-brand-700 focus-visible:outline-brand-600",
  cta: "bg-sun-500 text-white shadow-sm shadow-sun-500/25 hover:bg-sun-600 focus-visible:outline-sun-500",
  outline: "border-2 border-brand-600 text-brand-700 hover:bg-brand-600 hover:text-white",
  "outline-white": "border-2 border-white/80 text-white hover:bg-white hover:text-brand-800",
  white: "bg-white text-brand-800 shadow-sm hover:bg-brand-50",
  ghost: "text-foreground hover:bg-black/5",
  link: "px-0! text-brand-600 underline-offset-4 hover:underline",
};

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-[0.95rem]",
  lg: "h-13 px-8 text-base",
};

/** Truyền `href` để render thành Link, ngược lại là <button>. */
export default function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  external,
  ...props
}) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-md font-semibold whitespace-nowrap transition-all duration-200",
    "focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );

  if (href && external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...props} />
    );
  }
  if (href) return <Link href={href} className={classes} {...props} />;
  return <button type="button" className={classes} {...props} />;
}
