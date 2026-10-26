import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import { formatUSD } from "@/lib/utils";
import { Container } from "@/components/ui";
import Carousel from "@/components/ui/Carousel";
import { lp } from "@/i18n/config";

/**
 * Khối tour dài ngày trên trang chủ – theo lilystravelagency.com ("Best of Lily's Packages"):
 * slider mỗi lần một gói lớn: ảnh rộng, tên tour, giá gốc gạch + giá khuyến mãi, nút "Book Now" viền đỏ,
 * bên dưới là nút "View more packages".
 */
export default function LongTours({ lang, dict, cards, labels }) {
  const t = dict.home;
  return (
    <section className="pt-6 pb-14 lg:pt-8 lg:pb-[4.5rem]">
      <Container>
        <header className="mx-auto mb-10 max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-wide text-ink sm:text-[2rem]">
            {t.longToursTitle}
          </h2>
          <p className="mt-6 text-ink/70 italic">{t.longToursSubtitle}</p>
        </header>

        <Carousel itemClassName="basis-full" autoplay={7000} label={t.longToursTitle}>
          {cards.map((card) => {
            const url = `${lp(lang)}/tours/${card.slug}`;
            return (
              <article
                key={card.slug}
                className="group overflow-hidden rounded-md border border-border bg-white"
              >
                <Link
                  href={url}
                  className="relative block aspect-[16/9] overflow-hidden sm:aspect-[7/2]"
                >
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(min-width: 1280px) 1200px, 100vw"
                    className="object-cover transition-transform duration-[1500ms] group-hover:scale-105"
                  />
                </Link>
                <div className="p-4 sm:px-5">
                  <h3 className="text-lg font-semibold tracking-wide text-ink sm:text-xl">
                    <Link href={url} className="hover:text-sun-600">
                      {card.title}
                    </Link>
                  </h3>
                  <p className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="size-4 text-sun-500" />
                      {card.days} {labels.days} / {card.nights} {labels.nights}
                    </span>
                    {card.route.length > 0 && (
                      <span className="flex min-w-0 items-center gap-1.5">
                        <MapPin className="size-4 shrink-0 text-sun-500" />
                        <span className="line-clamp-1">{card.destinationNames.join(" – ")}</span>
                      </span>
                    )}
                  </p>
                  <div className="mt-3 flex items-center justify-between gap-4">
                    <p className="flex items-baseline gap-1.5">
                      {card.price ? (
                        <>
                          {card.originalPrice && (
                            <span className="text-sm text-ink/60 line-through">
                              {formatUSD(card.originalPrice)}
                            </span>
                          )}
                          <span className="text-xl font-bold text-sun-600">
                            {formatUSD(card.price)}
                          </span>
                        </>
                      ) : (
                        <span className="text-lg font-semibold text-sun-600">
                          {labels.contactPrice}
                        </span>
                      )}
                    </p>
                    <Link
                      href={`${url}#book`}
                      className="shrink-0 rounded-md border border-sun-600 px-6 py-2 text-[0.95rem] text-sun-600 transition-colors hover:bg-sun-600 hover:text-white"
                    >
                      {labels.bookNow}
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </Carousel>

        <div className="mt-10 text-center">
          <Link
            href={`${lp(lang)}/packages`}
            className="inline-block rounded-md border border-sun-600 px-6 py-2.5 text-sun-600 transition-colors hover:bg-sun-600 hover:text-white"
          >
            {t.longToursCta}
          </Link>
        </div>
      </Container>
    </section>
  );
}
