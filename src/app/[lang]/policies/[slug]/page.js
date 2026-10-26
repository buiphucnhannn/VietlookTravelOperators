import { Suspense } from "react";
import PageSkeleton from "@/components/ui/PageSkeleton";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { siteConfig } from "@/constants/site";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/dictionaries";
import { href, locales, lp, tr } from "@/i18n/config";
import { cn } from "@/lib/utils";
import { pageMetadata, notFoundMetadata } from "@/lib/seo";
import { policies } from "@/data/company";
import { Container } from "@/components/ui";
import { BannerHero } from "@/components/ui/PageHero";

export function generateStaticParams() {
  return locales.flatMap((lang) => Object.keys(policies).map((slug) => ({ lang, slug })));
}

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const p = policies[slug];
  if (!p) return notFoundMetadata();
  return pageMetadata({
    lang,
    path: `/policies/${slug}`,
    title: tr(p.title, lang),
    description: tr(p.body, lang)
      .replace(/<[^>]+>/g, " ")
      .slice(0, 155),
  });
}

/** Các trang chính sách: thanh toán, hủy/đổi tour, bảo mật. */
async function PolicyPageContent({ params }) {
  const { lang, slug } = await params;
  const policy = policies[slug];
  if (!policy) notFound();
  const dict = await getDictionary(lang);
  const t = dict.policy;

  // Gắn id cho các đề mục <h2> để làm mục lục "On this page" ở cột phải
  const toc = [];
  const body = tr(policy.body, lang).replace(/<h2>(.*?)<\/h2>/g, (_, text) => {
    const id = `section-${toc.length + 1}`;
    toc.push({ id, text: text.replace(/<[^>]+>/g, "") });
    return `<h2 id="${id}">${text}</h2>`;
  });

  return (
    <>
      <BannerHero
        title={tr(policy.title, lang)}
        subtitle={tr(policy.subtitle, lang)}
        images={[policy.image, ...Object.values(policies).map((x) => x.image)]}
        breadcrumbs={[{ label: "Vietlook", href: href(lang) }, { label: tr(policy.title, lang) }]}
      />
      <Container className="grid gap-10 py-12 lg:grid-cols-[240px_minmax(0,1fr)] lg:py-14 xl:grid-cols-[240px_minmax(0,1fr)_290px] xl:gap-12">
        <nav className="space-y-1 lg:sticky lg:top-32 lg:self-start">
          {Object.entries(policies).map(([key, p]) => (
            <Link
              key={key}
              href={`${lp(lang)}/policies/${key}`}
              className={cn(
                "block rounded-lg px-4 py-3 font-medium transition",
                key === slug ? "bg-brand-600 text-white" : "text-ink hover:bg-surface",
              )}
            >
              {tr(p.title, lang)}
            </Link>
          ))}
        </nav>
        <article className="prose-guide max-w-3xl" dangerouslySetInnerHTML={{ __html: body }} />

        {/* Cột phải dính theo khi cuộn: mục lục + hỗ trợ (chỉ trên màn rộng) */}
        <aside className="hidden space-y-6 xl:sticky xl:top-32 xl:block xl:self-start">
          {toc.length > 0 && (
            <div className="rounded-2xl border border-border p-5">
              <p className="mb-3 text-xs font-bold tracking-[0.18em] text-brand-700 uppercase">
                {t.onThisPage}
              </p>
              <ol className="space-y-1 border-l-2 border-brand-100">
                {toc.map((x) => (
                  <li key={x.id}>
                    <a
                      href={`#${x.id}`}
                      className="-ml-0.5 block border-l-2 border-transparent py-1.5 pl-4 text-[0.95rem] text-muted transition hover:border-sun-500 hover:text-ink"
                    >
                      {x.text}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          )}

          <div className="relative overflow-hidden rounded-2xl bg-brand-950 p-6 text-white">
            <div className="absolute -top-16 -right-16 size-40 rounded-full bg-amber-brand/15 blur-2xl" />
            <p className="relative text-lg font-bold">{t.helpTitle}</p>
            <p className="relative mt-1.5 text-sm leading-relaxed text-white/70">{t.helpText}</p>
            {/* 3 kênh liên hệ gọn trên một hàng */}
            <div className="relative mt-5 grid grid-cols-3 gap-2 text-xs">
              {[
                {
                  href: siteConfig.messaging.whatsapp,
                  icon: WhatsAppIcon,
                  label: "WhatsApp",
                  title: "WhatsApp",
                  color: "text-[#25d366]",
                  ext: true,
                },
                {
                  href: `tel:${siteConfig.contact.hotlineRaw}`,
                  icon: Phone,
                  label: "Hotline",
                  title: siteConfig.contact.hotline,
                  color: "text-amber-brand",
                },
                {
                  href: `mailto:${siteConfig.contact.email}`,
                  icon: Mail,
                  label: "Email",
                  title: siteConfig.contact.email,
                  color: "text-amber-brand",
                },
              ].map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  title={c.title}
                  className="flex flex-col items-center gap-1.5 rounded-xl bg-white/5 py-3 font-semibold ring-1 ring-white/10 transition hover:bg-white/10"
                >
                  <c.icon className={cn("size-5", c.color)} />
                  {c.label}
                </a>
              ))}
            </div>
            <Link
              href={href(lang, "/plan-your-trip")}
              className="relative mt-5 flex h-11 items-center justify-center rounded-xl bg-sun-500 text-sm font-semibold transition hover:bg-sun-600"
            >
              {dict.nav.planTrip}
            </Link>
          </div>
        </aside>
      </Container>
    </>
  );
}

// Đọc params bên trong <Suspense> để điều hướng hiển thị tức thì (khung chờ),
// nội dung vẫn được prerender sẵn nhờ generateStaticParams.
export default function PolicyPage(props) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <PolicyPageContent {...props} />
    </Suspense>
  );
}
