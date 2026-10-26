import Image from "next/image";
import BgImage from "@/components/ui/BgImage";
import { Quote } from "lucide-react";
import { siteConfig } from "@/constants/site";
import { tr } from "@/i18n/config";
import { Container, SectionHeading, Stars } from "@/components/ui";
import Carousel from "@/components/ui/Carousel";
import { GoogleIcon, TripAdvisorIcon } from "@/components/ui/BrandIcons";

/** Đánh giá khách hàng kiểu "Guest Experiences" của localvietnam.com + liên kết TripAdvisor / Google. */
export default function Reviews({ lang, dict, reviews, bg = "surface" }) {
  const t = dict.home;
  return (
    <section className="relative isolate overflow-hidden py-14 lg:py-[4.5rem]" id="reviews">
      <BgImage src="/images/tours/hoi-an-9-copy.jpg" tone="light" />
      <Container>
        <SectionHeading
          eyebrow={t.reviewsEyebrow}
          title={t.reviewsTitle}
          subtitle={t.reviewsSubtitle}
        />
        <Carousel
          itemClassName="basis-[90%] md:basis-1/2 lg:basis-1/3"
          autoplay={7000}
          label={t.reviewsTitle}
        >
          {reviews.map((r) => (
            <figure
              key={r.title.en}
              className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-border"
            >
              <div className="relative aspect-[5/2]">
                <Image
                  src={r.photo}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, 90vw"
                  className="object-cover"
                />
                <span className="absolute -bottom-5 left-6 grid size-11 place-items-center rounded-full bg-white text-brand-600 shadow-md">
                  <Quote className="size-4 fill-current" />
                </span>
              </div>
              <div className="flex flex-1 flex-col px-6 pt-7 pb-5">
                <h3 className="text-lg font-bold text-ink">{tr(r.title, lang)}</h3>
                <blockquote className="mt-3 flex-1 leading-relaxed hyphens-auto text-ink/75 sm:text-justify">
                  {tr(r.text, lang)}
                </blockquote>
                <Stars value={r.rating} className="mt-5" />
                <figcaption className="mt-2 flex items-center justify-between gap-3">
                  <span className="text-sm font-bold text-ink">{tr(r.trip, lang)}</span>
                  {r.source === "google" ? (
                    <GoogleIcon className="size-5" />
                  ) : (
                    <TripAdvisorIcon className="size-6 text-[#00af87]" />
                  )}
                </figcaption>
              </div>
            </figure>
          ))}
        </Carousel>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <span className="rounded-full bg-white/85 px-4 py-1.5 text-sm font-medium text-ink/70 shadow-sm">
            {t.reviewsOn}
          </span>
          <a
            href={siteConfig.social.tripadvisor}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl bg-white px-5 py-3 shadow-sm ring-1 ring-border transition hover:shadow-md"
          >
            <TripAdvisorIcon className="size-8 text-[#00af87]" />
            <span className="leading-tight">
              <span className="block font-bold text-ink">Tripadvisor</span>
              <span className="text-xs text-muted">{dict.common.ratingText}</span>
            </span>
          </a>
          <a
            href={siteConfig.social.google}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl bg-white px-5 py-3 shadow-sm ring-1 ring-border transition hover:shadow-md"
          >
            <GoogleIcon className="size-7" />
            <span className="leading-tight">
              <span className="block font-bold text-ink">Google</span>
              <span className="text-xs text-muted">{dict.common.mapsReviews}</span>
            </span>
          </a>
        </div>
      </Container>
    </section>
  );
}
