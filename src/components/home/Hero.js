import { MapPin, Search } from "lucide-react";
import { lp, tr } from "@/i18n/config";
import { destinationsByRegion, regions } from "@/data/destinations";
import { Button, Container } from "@/components/ui";
import HeroVideos from "./HeroVideos";

// Video flycam Việt Nam (Pexels – miễn phí dùng thương mại), lưu tại public/videos
const videos = [
  {
    src: "/videos/halong-bay.mp4",
    poster: "/videos/halong-bay.webp",
    label: { en: "Halong Bay", zh: "下龙湾" },
  },
  {
    src: "/videos/ninh-binh-hang-mua.mp4",
    poster: "/videos/ninh-binh-hang-mua.webp",
    label: { en: "Mua Cave, Ninh Binh", zh: "宁平舞洞山" },
  },
  {
    src: "/videos/hoi-an.mp4",
    poster: "/videos/hoi-an.webp",
    label: { en: "Hoi An Ancient Town", zh: "会安古镇" },
  },
];

/**
 * Banner chính: video nền luân phiên, vừa đúng 1 màn hình (header trong suốt phủ lên trên).
 * Cỡ chữ co theo chiều cao màn hình để nội dung luôn nằm gọn trong khung đầu tiên.
 */
export default function Hero({ lang, dict }) {
  const t = dict.home;
  return (
    <section className="relative isolate flex h-[min(100svh,1000px)] min-h-[600px] items-center overflow-hidden text-white">
      <HeroVideos videos={videos.map((v) => ({ ...v, label: tr(v.label, lang) }))} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/60" />

      <Container className="relative z-10 flex flex-col items-center pt-16 pb-20 text-center lg:pt-[108px] lg:pb-32">
        <p className="animate-fade-up text-xs font-bold tracking-[0.35em] text-amber-brand uppercase sm:text-sm">
          {t.heroEyebrow}
        </p>
        <h1 className="mt-[clamp(0.5rem,1.5vh,1rem)] animate-fade-up [animation-delay:120ms]">
          <span className="block text-[clamp(2rem,5.2vh,3.75rem)] leading-none font-extrabold tracking-[-0.04em] drop-shadow-lg">
            {t.heroTitleTop}
          </span>
          <span className="block text-[clamp(3.5rem,min(15vh,22vw),9rem)] leading-[0.95] font-extrabold tracking-[-0.06em] drop-shadow-xl">
            {t.heroTitleMain}
          </span>
        </h1>
        <p className="mt-[clamp(0.75rem,2vh,1.25rem)] max-w-2xl animate-fade-up text-base text-white/90 [animation-delay:220ms] sm:text-lg">
          {t.heroText}
        </p>

        {/* Ô tìm kiếm tour theo từ khóa & điểm đến */}
        <form
          action={`${lp(lang)}/tours`}
          method="get"
          role="search"
          className="mt-[clamp(1.25rem,3.5vh,2.25rem)] grid w-full max-w-3xl animate-fade-up gap-2 rounded-2xl bg-white/95 p-2 text-left shadow-2xl ring-1 ring-white/40 backdrop-blur [animation-delay:320ms] sm:grid-cols-[1.4fr_1fr_auto]"
        >
          <label className="flex items-center gap-3 rounded-xl px-4 py-1.5 focus-within:bg-surface">
            <Search className="size-5 shrink-0 text-brand-500" />
            <span className="sr-only">{t.searchPlaceholder}</span>
            <input
              name="q"
              placeholder={t.searchPlaceholder}
              className="h-10 w-full bg-transparent text-ink placeholder:text-muted focus:outline-none"
            />
          </label>
          <label className="flex items-center gap-3 rounded-xl px-4 py-1.5 focus-within:bg-surface sm:border-l sm:border-border">
            <MapPin className="size-5 shrink-0 text-brand-500" />
            <span className="sr-only">{t.searchDestination}</span>
            <select
              name="destination"
              defaultValue=""
              className="h-10 w-full appearance-none bg-transparent text-ink focus:outline-none"
            >
              <option value="">{t.searchAny}</option>
              {regions.map((r) => (
                <optgroup key={r.slug} label={tr(r.name, lang)}>
                  <option value={r.slug}>{tr(r.name, lang)}</option>
                  {destinationsByRegion(r.slug).map((d) => (
                    <option key={d.slug} value={d.slug}>
                      {tr(d.name, lang)}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </label>
          <button
            type="submit"
            className="flex h-13 items-center justify-center gap-2 rounded-xl bg-sun-500 px-7 font-semibold text-white transition hover:bg-sun-600"
          >
            <Search className="size-5" />
            {t.searchButton}
          </button>
        </form>

        <div className="mt-[clamp(1rem,3vh,2rem)] flex animate-fade-up flex-wrap justify-center gap-3 [animation-delay:420ms]">
          <Button
            href={`${lp(lang)}/tours`}
            variant="primary"
            size="lg"
            className="max-sm:h-12 max-sm:px-5"
          >
            {t.heroCta}
          </Button>
          <Button
            href={`${lp(lang)}/plan-your-trip`}
            variant="outline-white"
            size="lg"
            className="max-sm:h-12 max-sm:px-5"
          >
            {t.heroCta2}
          </Button>
        </div>
      </Container>
    </section>
  );
}
