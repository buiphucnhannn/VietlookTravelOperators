import Image from "next/image";
import BgImage from "@/components/ui/BgImage";
import {
  CheckCircle2,
  Clock4,
  Handshake,
  Headphones,
  Layers,
  MapPinned,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { Button, Container, Reveal, SectionHeading } from "@/components/ui";
import { lp } from "@/i18n/config";

const whyIcons = [Layers, Wallet, MapPinned, ShieldCheck, Headphones, Handshake];

export function WhyUs({ dict }) {
  const t = dict.home;
  return (
    <section className="relative isolate overflow-hidden py-14 lg:py-[4.5rem]">
      <BgImage src="/images/tours/hd/du-lich.jpg" tone="light" />
      <Container>
        <SectionHeading title={t.whyTitle} subtitle={t.whySubtitle} />
        <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {t.why.map((w, i) => {
            const Icon = whyIcons[i];
            return (
              <Reveal key={w.title} delay={(i % 3) * 80} className="flex gap-4">
                <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-lg shadow-brand-600/25">
                  <Icon className="size-6" />
                </span>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-ink">{w.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-muted">{w.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/** Khối B2B: thể hiện Vietlook là DMC/đối tác mặt đất cho đại lý (khách hàng hướng B2B). */
export function B2BBlock({ lang, dict }) {
  const t = dict.home;
  return (
    <section className="relative isolate overflow-hidden bg-brand-950 py-14 text-white lg:py-[4.5rem]">
      <BgImage src="/images/tours/hd/tourduthuyenhalong1ngay1-2.jpg" tone="dark" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(23,128,193,0.45),transparent_50%),radial-gradient(circle_at_90%_90%,rgba(238,59,53,0.25),transparent_45%)]" />
      <Container className="relative grid items-center gap-12 lg:grid-cols-2">
        <Reveal className="relative mx-auto h-[380px] w-full max-w-lg sm:h-[440px]">
          <div className="absolute top-0 left-0 h-[68%] w-[64%] overflow-hidden rounded-2xl shadow-2xl ring-4 ring-white/10">
            <Image
              src="/images/tours/coktail-crusie.jpg"
              alt=""
              fill
              sizes="320px"
              className="object-cover"
            />
          </div>
          <div className="absolute right-0 bottom-0 h-[62%] w-[58%] overflow-hidden rounded-2xl shadow-2xl ring-4 ring-white/10">
            <Image
              src="/images/tours/tourdulichphuquoc4ngay3demtet1.png"
              alt=""
              fill
              sizes="300px"
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-[8%] left-[6%] flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-ink shadow-xl">
            <Clock4 className="size-8 text-sun-500" />
            <div className="leading-tight">
              <p className="text-2xl font-extrabold">24h</p>
              <p className="text-xs text-muted">
                {lang === "zh" ? "报价回复" : "quote turnaround"}
              </p>
            </div>
          </div>
          <div className="absolute top-[10%] right-[4%] rounded-xl bg-sun-500 px-4 py-3 text-center shadow-xl">
            <p className="text-2xl font-extrabold">2–200+</p>
            <p className="text-xs text-white/85">{dict.common.paxGroup}</p>
          </div>
        </Reveal>
        <div>
          <p className="text-xs font-bold tracking-[0.25em] text-amber-brand uppercase">
            {t.b2bEyebrow}
          </p>
          <h2 className="heading-lg mt-3 text-white">{t.b2bTitle}</h2>
          <p className="mt-5 text-lg leading-relaxed text-white/80">{t.b2bText}</p>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {t.b2bPoints.map((p) => (
              <li key={p} className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-amber-brand" />
                <span className="text-white/90">{p}</span>
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href={`${lp(lang)}/partners`} variant="cta" size="lg">
              <Handshake className="size-5" /> {t.b2bCta}
            </Button>
            <Button href={`${lp(lang)}/group-tailor-made-tours`} variant="outline-white" size="lg">
              {dict.nav.groupTours}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
