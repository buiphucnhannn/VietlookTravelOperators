import Image from "next/image";
import BgImage from "@/components/ui/BgImage";
import {
  CalendarDays,
  Clock3,
  FileCheck2,
  Info,
  Plane,
  Send,
  Stamp,
  UserCheck,
} from "lucide-react";
import { getDictionary } from "@/i18n/dictionaries";
import { tr } from "@/i18n/config";
import { JsonLd, pageMetadata } from "@/lib/seo";
import { airports, fastTrackLevels, visaFaq, visaTypes } from "@/data/visa";
import { Container, Reveal, SectionHeading } from "@/components/ui";
import { BrushHero } from "@/components/ui/PageHero";
import VisaForm from "@/components/forms/VisaForm";
import FastTrackPicker from "@/components/visa/FastTrackPicker";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return pageMetadata({
    lang,
    path: "/visa-fast-track",
    title: dict.visa.title,
    description: dict.visa.intro,
    image: "/images/tours/welcome-vietlook.png",
  });
}

export default async function VisaPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const v = dict.visa;
  const c = { ...dict.common, fullName: dict.tour.fullName, phone: dict.tour.phone };
  const levels = fastTrackLevels.map((l) => ({
    ...l,
    label: tr(l.name, lang),
    text: tr(l.text, lang),
  }));
  const ap = airports.map((a) => ({ ...a, label: tr(a.name, lang) }));
  const faq = visaFaq[lang] || visaFaq.en;
  const stepIcons = [Send, UserCheck, Stamp, Plane];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />

      <BrushHero
        title={v.title}
        subtitle={v.intro}
        images={[
          "/images/tours/welcome-vietlook.png",
          "/images/tours/airport-pick-up-one-way.jpg",
          "/images/tours/hcm-tour-1.jpg",
        ]}
        breadcrumbs={[{ label: "Vietlook", href: "/" + lang }, { label: v.title }]}
      >
        <p className="mt-3 text-lg font-bold text-amber-brand drop-shadow">{v.subtitle}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href="#fast-track"
            className="inline-flex h-12 items-center rounded-md bg-sun-500 px-6 font-semibold shadow-lg hover:bg-sun-600"
          >
            {v.fastTitle}
          </a>
          <a
            href="#visa"
            className="inline-flex h-12 items-center rounded-md border-2 border-white/70 px-6 font-semibold hover:bg-white hover:text-brand-800"
          >
            {v.typesTitle}
          </a>
        </div>
      </BrushHero>

      <section id="fast-track" className="scroll-mt-32 py-14 lg:py-[4.5rem]">
        <Container>
          <SectionHeading title={v.fastTitle} subtitle={v.fastSubtitle} />
          <FastTrackPicker
            airports={ap}
            levels={levels}
            labels={{
              from: dict.common.from,
              perPax: v.perPax,
              book: dict.common.bookNow,
              popular: v.popular,
              contactPrice: dict.common.contactPrice,
            }}
          />
          <p className="mt-6 flex items-center justify-center gap-2 text-sm text-muted">
            <Info className="size-4" /> {v.priceNote}
          </p>
        </Container>
      </section>

      <section className="relative isolate overflow-hidden bg-surface py-14 lg:py-[4.5rem]">
        <BgImage src="/images/tours/airport-pick-up-one-way.jpg" tone="light" />
        <Container>
          <SectionHeading title={v.howTitle} />
          <ol className="grid gap-6 md:grid-cols-4">
            {v.how.map((s, i) => {
              const Icon = stepIcons[i];
              return (
                <Reveal
                  as="li"
                  key={s.title}
                  delay={i * 90}
                  className="relative rounded-2xl bg-white p-6 shadow-sm ring-1 ring-border"
                >
                  <span className="absolute top-5 right-5 text-5xl font-extrabold text-brand-50">
                    {i + 1}
                  </span>
                  <span className="relative grid size-12 place-items-center rounded-xl bg-brand-600 text-white">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="relative mt-4 text-lg font-bold text-ink">{s.title}</h3>
                  <p className="relative mt-1.5 text-muted">{s.text}</p>
                </Reveal>
              );
            })}
          </ol>
        </Container>
      </section>

      <section id="visa" className="scroll-mt-32 py-14 lg:py-[4.5rem]">
        <Container>
          <SectionHeading title={v.typesTitle} />
          <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-border">
            <div className="hidden grid-cols-[minmax(0,1.6fr)_minmax(0,0.8fr)_minmax(0,0.9fr)_minmax(0,1fr)] gap-6 border-b border-border bg-brand-50 px-6 py-3.5 text-xs font-bold tracking-[0.12em] text-brand-700 uppercase md:grid">
              <span>{dict.visa.typeCol}</span>
              <span>{v.stay}</span>
              <span>{v.processing}</span>
              <span>{v.fee}</span>
            </div>
            {visaTypes.map((x) => {
              // "Phí chính phủ · phí dịch vụ" → 2 dòng: dòng chính đậm, dòng phụ nhạt
              const [feeMain, feeSub] = tr(x.fee, lang).split(" · ");
              return (
                <div
                  key={x.key}
                  className="grid items-start gap-3 border-t border-border px-6 py-5 transition-colors first:border-0 hover:bg-surface/60 md:grid-cols-[minmax(0,1.6fr)_minmax(0,0.8fr)_minmax(0,0.9fr)_minmax(0,1fr)] md:gap-6"
                >
                  <div className="flex gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                      <FileCheck2 className="size-5" />
                    </span>
                    <div>
                      <p className="font-bold text-ink">{tr(x.name, lang)}</p>
                      <p className="mt-0.5 text-sm leading-relaxed text-muted">
                        {tr(x.note, lang)}
                      </p>
                    </div>
                  </div>
                  <div>
                    <span className="mb-1 block text-xs text-muted md:hidden">{v.stay}</span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-sm font-medium text-brand-800">
                      <CalendarDays className="size-3.5" /> {tr(x.stay, lang)}
                    </span>
                  </div>
                  <div>
                    <span className="mb-1 block text-xs text-muted md:hidden">{v.processing}</span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-sun-100/70 px-3 py-1 text-sm font-medium text-sun-700">
                      <Clock3 className="size-3.5 shrink-0" /> {tr(x.processing, lang)}
                    </span>
                  </div>
                  <div>
                    <span className="mb-1 block text-xs text-muted md:hidden">{v.fee}</span>
                    <p className="font-bold text-ink">{feeMain}</p>
                    {feeSub && <p className="text-sm text-muted">{feeSub}</p>}
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-4 flex items-start gap-2 text-sm text-muted">
            <Info className="mt-0.5 size-4 shrink-0" /> {v.note}
          </p>
        </Container>
      </section>

      <section
        id="book-visa"
        className="relative isolate scroll-mt-32 overflow-clip bg-surface py-14 lg:py-[4.5rem]"
      >
        <BgImage src="/images/tours/hcm-tour-1.jpg" tone="mist" />
        <Container className="grid items-start gap-10 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-border sm:p-8">
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-ink">{v.formTitle}</h2>
            <VisaForm lang={lang} t={v} c={c} airports={ap} levels={levels} />
          </div>
          {/* Cột ngắn hơn dính theo khi cuộn form */}
          <div className="lg:sticky lg:top-32">
            <h2 className="mb-5 text-2xl font-bold text-ink">{v.faqTitle}</h2>
            <div className="space-y-3">
              {faq.map((f, i) => (
                <details
                  key={f.q}
                  open={i === 0}
                  className="group rounded-2xl bg-white ring-1 ring-border"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-5 font-semibold text-ink">
                    {f.q}
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600 transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="px-5 pb-5 text-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
