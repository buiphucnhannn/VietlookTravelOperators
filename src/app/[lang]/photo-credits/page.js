import Image from "next/image";
import { getDictionary } from "@/i18n/dictionaries";
import { href, tr } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import { fleet } from "@/data/cars";
import photos from "@/data/photo-credits.json";
import { Container } from "@/components/ui";
import { BannerHero } from "@/components/ui/PageHero";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return pageMetadata({
    lang,
    path: "/photo-credits",
    title: dict.footer.photoCredits,
    description: dict.footer.creditsIntro,
  });
}

/** Ghi nguồn ảnh dùng theo giấy phép tự do (Wikimedia Commons). */
export default async function PhotoCreditsPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const f = dict.footer;

  // Ảnh xe trong khối "Choose your ride" + ảnh phong cảnh / điểm đến
  const cars = fleet.flatMap((c) =>
    (c.credits || []).map((cr, i) => ({
      image: c.images[i],
      title: `${tr(c.name, lang)} ${i + 1}`,
      author: cr.author,
      license: "CC BY-SA 4.0",
      url: cr.url,
    })),
  );
  const all = [...photos, ...cars];

  return (
    <>
      <BannerHero
        title={f.photoCredits}
        subtitle={f.creditsIntro}
        images={photos.slice(0, 3).map((p) => p.image)}
        breadcrumbs={[{ label: "Vietlook", href: href(lang) }, { label: f.photoCredits }]}
      />
      <section className="py-14 lg:py-[4.5rem]">
        <Container>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {all.map((p) => (
              <li
                key={p.image + p.url}
                className="flex items-center gap-4 rounded-2xl border border-border bg-white p-3"
              >
                <span className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-surface">
                  <Image src={p.image} alt="" fill sizes="64px" className="object-cover" />
                </span>
                <span className="min-w-0 text-sm leading-snug">
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="line-clamp-2 font-semibold text-ink hover:text-brand-600"
                  >
                    {p.title}
                  </a>
                  <span className="mt-0.5 block truncate text-muted">
                    {p.author} · {p.license}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
