import { getDictionary } from "@/i18n/dictionaries";
import { lp, tr } from "@/i18n/config";
import { cardLabels } from "@/lib/labels";
import { pageMetadata } from "@/lib/seo";
import { destinations, destinationsByRegion, plannerOptions, regions } from "@/data/destinations";
import { themes } from "@/data/themes";
import { countFor, longTours, toCard } from "@/data/tours";
import { allPosts, monthPosts } from "@/data/posts";
import { reviews } from "@/data/reviews";
import BgImage from "@/components/ui/BgImage";
import { Button, Container, HandNote, SectionHeading } from "@/components/ui";
import TrustStrip from "@/components/home/TrustStrip";
import Hero from "@/components/home/Hero";
import ServicesTrio from "@/components/home/ServicesTrio";
import LongTours from "@/components/home/LongTours";
import CustomTrip from "@/components/home/CustomTrip";
import ThemesMasonry from "@/components/home/ThemesMasonry";
import RegionTabs from "@/components/home/RegionTabs";
import { B2BBlock, WhyUs } from "@/components/home/WhyAndB2B";
import Reviews from "@/components/home/Reviews";
import GuideAndMonths from "@/components/home/GuideAndMonths";
import { AboutBlob, PlannerBlock } from "@/components/home/PlannerAndAbout";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return pageMetadata({
    lang,
    title: { absolute: dict.meta.title },
    description: dict.meta.description,
  });
}

export default async function HomePage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const labels = cardLabels(dict);

  const regionData = regions.map((r) => ({
    slug: r.slug,
    name: tr(r.name, lang),
    count: countFor(r.slug),
    tiles: [
      {
        href: `${lp(lang)}/destinations/${r.slug}`,
        name: tr(r.name, lang),
        count: countFor(r.slug),
        image: r.image,
      },
      ...destinationsByRegion(r.slug).map((d) => ({
        href: `${lp(lang)}/destinations/${d.slug}`,
        name: tr(d.name, lang),
        count: countFor(d.slug),
        image: d.image,
      })),
    ],
  }));

  const latestPosts = allPosts.filter((p) => p.category !== "vietnam-by-month").slice(0, 4);

  return (
    <>
      <Hero lang={lang} dict={dict} />
      <TrustStrip items={dict.home.trust} />
      <ServicesTrio lang={lang} dict={dict} />
      <LongTours
        lang={lang}
        dict={dict}
        labels={labels}
        cards={longTours()
          .slice(0, 8)
          .map((t) => toCard(t, lang))}
      />
      <CustomTrip lang={lang} dict={dict} />
      <ThemesMasonry lang={lang} dict={dict} themes={themes} />

      <section className="relative isolate overflow-hidden py-14 lg:py-[4.5rem]">
        <BgImage src="/images/tours/ha-long.png" tone="mist" position="50% 70%" />
        <Container className="relative">
          <SectionHeading
            eyebrow={dict.home.destEyebrow}
            title={dict.home.destTitle}
            subtitle={dict.home.destSubtitle}
          />
          <RegionTabs regions={regionData} tripsLabel={dict.common.trips} />
          <div className="mt-10 text-center">
            <Button href={`${lp(lang)}/tours`} variant="primary" size="lg">
              {dict.home.destCta}
            </Button>
          </div>
          <HandNote className="right-0 bottom-0 text-right" arrow="none">
            {dict.home.destNote}
          </HandNote>
        </Container>
      </section>

      <WhyUs dict={dict} />
      <B2BBlock lang={lang} dict={dict} />
      <Reviews lang={lang} dict={dict} reviews={reviews} />
      <GuideAndMonths
        lang={lang}
        dict={dict}
        posts={latestPosts}
        months={monthPosts()}
        destinations={destinations.slice(0, 12)}
      />
      <PlannerBlock lang={lang} dict={dict} destinationOptions={plannerOptions(lang)} />
      <AboutBlob lang={lang} dict={dict} />
    </>
  );
}
