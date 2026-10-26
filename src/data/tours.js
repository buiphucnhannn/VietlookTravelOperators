// Dữ liệu tour chuyển từ vietlooktravel.com (xem scratch script build-tours). Sau này thay bằng API/CMS.
import rawTours from "./generated/tours.json";
import { tr } from "@/i18n/config";
import { getDestination, getRegion } from "./destinations";

/**
 * Hiển thị kiểu khuyến mãi: giá gạch = giá hiện tại + MARKUP, làm tròn lên bội số 5.
 * Đặt PROMO_MARKUP = 0 để tắt toàn bộ (giá gạch & nhãn -%) ngay lập tức.
 * Tour nào đã có originalPrice thật trong dữ liệu thì giữ nguyên giá thật đó.
 */
export const PROMO_MARKUP = 0.2;
const listPrice = (p) => Math.ceil((p * (1 + PROMO_MARKUP)) / 5) * 5;
const tours = rawTours.map((t) =>
  t.price && !t.originalPrice && PROMO_MARKUP > 0 ? { ...t, originalPrice: listPrice(t.price) } : t,
);

export const allTours = tours;

export const getTour = (slug) => tours.find((t) => t.slug === slug);

export const toursByDestination = (slug) => {
  if (getRegion(slug)) return tours.filter((t) => t.regions.includes(slug));
  // Tour lấy điểm đến này làm điểm chính được ưu tiên lên đầu
  return tours
    .filter((t) => t.destinations.includes(slug))
    .sort(
      (a, b) =>
        a.destinations.indexOf(slug) - b.destinations.indexOf(slug) ||
        a.destinations.length - b.destinations.length,
    );
};

export const toursByTheme = (slug) => tours.filter((t) => t.themes.includes(slug));

export const cruiseTours = () =>
  tours.filter((t) => t.cruise || t.destinations.includes("halong-bay"));

// Ảnh bìa riêng cho slider tour dài ngày trên trang chủ (khung rất rộng): ảnh nét nhất trong kho
// (1200–1920px) khớp với một điểm đến trên lộ trình; ảnh gốc của tour chỉ 555–800px nên bị mờ.
const I = "/images/tours";
export const longTourCovers = {
  "nha-trang-da-lat-mui-ne-mekong-delta-ho-chi-minh": `${I}/hd/tourdulichnhatranggiare.jpg`,
  "ha-long-ninh-binh-sapa-8-days-7-nights-tour": `${I}/hd/hoang-su-phi-ha-giang.jpg`,
  "da-nang-phu-quoc-tour-8-days-7-nights": `${I}/hd/tourdulichphuquocgiare.jpg`,
  "ha-long-da-nang-9-days-8-nights-tour": `${I}/da-nang-tour-copy.jpg`,
  "northern-vietnam-tour-9-days-8-nights": `${I}/cao-bang.jpg`,
  "ha-long-ninh-binh-da-nang-hoi-an-10-days-9-nights-tour": `${I}/hd/dam-van-long-ninh-binh.jpg`,
  "hanoi-ha-long-sapa-da-nang-ho-chi-minh": `${I}/hd/the-best-lotus-viewing-spots-in-ninh-binh.jpg`,
  "hanoi-ha-long-ninh-binh-da-nang-phu-quoc": `${I}/hd/tourdulichphuquocgiare.jpg`,
};

export const longTours = () => tours.filter((t) => t.featuredLong).sort((a, b) => a.days - b.days);

/** Gói theo tuần: 1 tuần (5–8 ngày), 2 tuần (9–15), 3 tuần (16+). */
export const packagesByWeeks = (weeks) => {
  const range = { 1: [5, 8], 2: [9, 15], 3: [16, 60] }[weeks];
  return tours
    .filter((t) => t.days >= range[0] && t.days <= range[1])
    .sort((a, b) => (b.price ? 1 : 0) - (a.price ? 1 : 0) || a.days - b.days);
};

export function relatedTours(tour, limit = 4) {
  return tours
    .filter((t) => t.slug !== tour.slug)
    .map((t) => ({
      t,
      score:
        t.destinations.filter((d) => tour.destinations.includes(d)).length * 3 +
        t.themes.filter((d) => tour.themes.includes(d)).length +
        (Math.abs(t.days - tour.days) <= 2 ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.t);
}

export const countFor = (slug) => toursByDestination(slug).length;

/** Nội dung tour theo ngôn ngữ (tiếng Trung lấy từ bản dịch t.zh, thiếu thì dùng tiếng Anh). */
export function tourText(t, lang) {
  const z = lang === "zh" && t.zh ? t.zh : null;
  const pick = (k) => (z && z[k] != null && (!Array.isArray(z[k]) || z[k].length) ? z[k] : t[k]);
  return {
    title: tr(t.title, lang),
    summary: pick("summary"),
    route: pick("route"),
    highlights: pick("highlights"),
    itinerary: t.itinerary.map((d, i) => ({ ...d, ...(z?.itinerary?.[i] || {}) })),
    included: pick("included"),
    excluded: pick("excluded"),
    childPolicy: pick("childPolicy"),
    notes: pick("notes"),
    priceTables: pick("priceTables"),
  };
}

/** Dữ liệu gọn cho thẻ tour (truyền xuống client component). */
export function toCard(t, lang) {
  const dest = t.destinations.map((d) => tr(getDestination(d)?.name, lang)).filter(Boolean);
  return {
    slug: t.slug,
    title: tr(t.title, lang),
    days: t.days,
    nights: t.nights,
    halfDay: t.halfDay,
    price: t.price,
    originalPrice: t.originalPrice,
    image: t.image,
    summary: tourText(t, lang).summary,
    destinations: t.destinations,
    destinationNames: dest.slice(0, 3),
    regions: t.regions,
    themes: t.themes,
    cruise: t.cruise,
    rank: t.rank,
    code: t.code,
    route: tourText(t, lang).route.slice(0, 6),
  };
}
