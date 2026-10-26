import { siteConfig } from "@/constants/site";
import { defaultLocale, href, localeMeta, locales } from "@/i18n/config";

/** Metadata chuẩn SEO: canonical, hreflang (en / zh-Hans / x-default), Open Graph. */
export function pageMetadata({ lang, path = "", title, description, image, type = "website" }) {
  // Tiếng Anh ở gốc (/tours), tiếng Trung có /zh (/zh/tours)
  const url = (l) => href(l, path || "/");
  const languages = Object.fromEntries(locales.map((l) => [localeMeta[l].hreflang, url(l)]));
  languages["x-default"] = url(defaultLocale);
  const img = image || "/images/tours/ha-long.png";

  return {
    title,
    description,
    alternates: { canonical: url(lang), languages },
    openGraph: {
      type,
      locale: localeMeta[lang].ogLocale,
      siteName: siteConfig.name,
      title,
      description,
      url: url(lang),
      images: [{ url: img }],
    },
    twitter: { card: "summary_large_image", title, description, images: [img] },
  };
}

export function JsonLd({ data }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
