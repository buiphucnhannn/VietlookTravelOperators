// Thông tin doanh nghiệp – lấy từ hồ sơ khách hàng & website hiện tại vietlooktravel.com
export const siteConfig = {
  name: "Vietlook Travel",
  legalName: "Vietlook Travel And Trade Company Limited",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  since: 2009,
  contact: {
    hotline: "+84 98 339 3588",
    hotlineRaw: "+84983393588",
    hotline2: "+84 98 339 3488",
    hotline2Raw: "+84983393488",
    email: "infovietlooktravel@gmail.com",
    address: {
      en: "No 58, Yen Nghia Ward, Ha Dong, Hanoi, Vietnam",
      zh: "越南河内市河东郡安义坊58号",
    },
    hours: {
      en: "Mon – Sat: 9:00 – 18:00 (GMT+7) · Hotline 24/7",
      zh: "周一至周六 9:00 – 18:00（越南时间）· 热线24小时",
    },
  },
  social: {
    facebook: "https://www.facebook.com/vietlooktravelhanoi",
    tripadvisor: "https://www.tripadvisor.com/Attraction_Review-Vietlook_Travel-Ha_Dong_Hanoi.html",
    google: "https://maps.app.goo.gl/ar5pqAHXgeW42U7W9",
    youtube: "https://www.youtube.com/@VietlookTravel",
  },
  // Video giới thiệu chính chủ (kênh @VietlookTravel)
  youtubeIds: ["-Si4zYv7gKs"],
  tripadvisorRating: { label: "Excellent", reviews: 35 },
  messaging: {
    whatsapp: "https://wa.me/84983393588",
    zalo: "https://zalo.me/84983393588",
    wechatId: "+84983393588",
  },
  maps: {
    link: "https://maps.app.goo.gl/ar5pqAHXgeW42U7W9",
    // Nhúng theo mã địa điểm (CID) của doanh nghiệp trên Google → hiện thẻ tên công ty, đánh giá, chỉ đường
    embed: "https://maps.google.com/maps?cid=12890319484623913190&z=17&hl=en&output=embed",
  },
};
