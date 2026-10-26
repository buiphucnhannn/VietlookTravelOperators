import { Suspense } from "react";
import PageSkeleton from "@/components/ui/PageSkeleton";
import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/dictionaries";
import { locales, tr } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import { getGuideCategory, guideCategories } from "@/data/guide-categories";
import GuideIndex from "@/components/guide/GuideIndex";

export function generateStaticParams() {
  return locales.flatMap((lang) => guideCategories.map((c) => ({ lang, slug: c.slug })));
}

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const cat = getGuideCategory(slug);
  if (!cat) return {};
  return pageMetadata({
    lang,
    path: `/travel-guide/category/${slug}`,
    title: tr(cat.name, lang),
    description: tr(cat.description, lang),
  });
}

async function GuideCategoryPageContent({ params }) {
  const { lang, slug } = await params;
  const category = getGuideCategory(slug);
  if (!category) notFound();
  const dict = await getDictionary(lang);
  return <GuideIndex lang={lang} dict={dict} category={category} />;
}

// Đọc params bên trong <Suspense> để điều hướng hiển thị tức thì (khung chờ),
// nội dung vẫn được prerender sẵn nhờ generateStaticParams.
export default function GuideCategoryPage(props) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <GuideCategoryPageContent {...props} />
    </Suspense>
  );
}
