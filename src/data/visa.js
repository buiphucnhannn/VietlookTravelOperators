// Visa & Fast-track. Gói dịch vụ & sân bay lấy từ trang "Fast Track And Visa" của vietlooktravel.com.
// Chỉ ghi phí chính phủ công khai; phí dịch vụ & giá fast-track do doanh nghiệp nhập trong CMS (chưa có -> "Giá liên hệ").

export const visaTypes = [
  {
    key: "evisa-single",
    name: { en: "E-visa – single entry", zh: "电子签证 – 单次入境" },
    stay: { en: "Up to 90 days", zh: "最长90天" },
    processing: { en: "3–5 working days", zh: "3–5个工作日" },
    fee: { en: "Gov. fee US$25 · service fee on request", zh: "政府费25美元 · 服务费请咨询" },
    note: {
      en: "For all nationalities. Apply online, enter at any international border gate.",
      zh: "适用所有国籍，在线申请，可从任一国际口岸入境。",
    },
  },
  {
    key: "evisa-multiple",
    name: { en: "E-visa – multiple entry", zh: "电子签证 – 多次入境" },
    stay: { en: "Up to 90 days", zh: "最长90天" },
    processing: { en: "3–5 working days", zh: "3–5个工作日" },
    fee: { en: "Gov. fee US$50 · service fee on request", zh: "政府费50美元 · 服务费请咨询" },
    note: {
      en: "Ideal for trips combining Vietnam with Cambodia or Laos.",
      zh: "适合越南与柬埔寨、老挝联游。",
    },
  },
  {
    key: "urgent",
    name: { en: "Urgent e-visa", zh: "加急电子签证" },
    stay: { en: "Up to 90 days", zh: "最长90天" },
    processing: { en: "Faster than standard – ask us", zh: "加急办理，请咨询" },
    fee: { en: "Gov. fee · urgent fee on request", zh: "政府费 · 加急费请咨询" },
    note: {
      en: "When your flight is very soon – we follow up with immigration for you.",
      zh: "航班临近时使用——我们为您跟进出入境审批。",
    },
  },
  {
    key: "exemption",
    name: { en: "Visa exemption check", zh: "免签资格核查" },
    stay: { en: "14–45 days (by nationality)", zh: "14–45天（视国籍）" },
    processing: { en: "Same day advice", zh: "当天答复" },
    fee: { en: "Free advice", zh: "免费咨询" },
    note: {
      en: "We confirm whether your passport is visa-free and how long you may stay.",
      zh: "我们为您确认护照是否免签及可停留天数。",
    },
  },
];

export const fastTrackLevels = [
  {
    key: "stamping",
    name: { en: "Visa stamping assistance", zh: "落地签盖章协助" },
    text: {
      en: "For Visa-on-Arrival holders – fast visa stamping without queuing.",
      zh: "适用落地签持有人——免排队快速盖签。",
    },
    price: null,
  },
  {
    key: "immigration",
    name: { en: "Immigration fast-track", zh: "入境快速通关" },
    text: {
      en: "Meet & escort through the priority immigration lane.",
      zh: "迎接并陪同走优先入境通道。",
    },
    price: null,
    popular: true,
  },
  {
    key: "combo",
    name: { en: "Visa stamping + immigration", zh: "盖签 + 快速入境" },
    text: {
      en: "Combined fast visa stamping and priority immigration clearance.",
      zh: "快速盖签与优先入境二合一。",
    },
    price: null,
  },
  {
    key: "full",
    name: { en: "Full fast-track package", zh: "全程快速通关套餐" },
    text: {
      en: "Stamping (if needed), priority immigration, baggage help and escort to your car.",
      zh: "盖签（如需）、优先入境、协助取行李并送至车辆。",
    },
    price: null,
  },
  {
    key: "vip",
    name: { en: "Business class / VIP", zh: "商务舱 / VIP 服务" },
    text: {
      en: "Full airport handling from the aircraft door – minimal effort for you.",
      zh: "从机舱门开始全程协助——您几乎无需操心。",
    },
    price: null,
    vip: true,
  },
  {
    key: "transit",
    name: { en: "Transit fast-track", zh: "中转快速通关" },
    text: {
      en: "Immigration, security, baggage and check-in for your next flight.",
      zh: "协助入境、安检、行李与下一航班值机。",
    },
    price: null,
  },
];

export const airports = [
  {
    code: "HAN",
    name: { en: "Noi Bai – Hanoi", zh: "内排 – 河内" },
    factor: 1,
    image: "/images/tours/hanoi6.png",
  },
  {
    code: "SGN",
    name: { en: "Tan Son Nhat – Ho Chi Minh City", zh: "新山一 – 胡志明市" },
    factor: 1,
    image: "/images/tours/hcm-tour-1.jpg",
  },
  {
    code: "DAD",
    name: { en: "Da Nang", zh: "岘港" },
    factor: 0.9,
    image: "/images/tours/da-nang-tour-copy.jpg",
  },
  {
    code: "CXR",
    name: { en: "Cam Ranh – Nha Trang", zh: "金兰 – 芽庄" },
    factor: 0.9,
    image: "/images/tours/tourdulichnhatrang4n3d.jpg",
  },
  {
    code: "PQC",
    name: { en: "Phu Quoc", zh: "富国岛" },
    factor: 0.9,
    image: "/images/tours/airport-pick-up-one-way.jpg",
  },
];

export const visaFaq = {
  en: [
    {
      q: "Who is fast-track suitable for?",
      a: "Business travellers, families with young children, elderly or pregnant passengers, groups and anyone with a short connection time.",
    },
    {
      q: "Which services are available?",
      a: "Fast-track for arrival into Vietnam, departure from Vietnam and transit (connecting flights).",
    },
    {
      q: "What do you need from me?",
      a: "A passport photo page, your flight number and arrival time, and the visa approval (if you have one).",
    },
    {
      q: "How do I pay?",
      a: "No online payment. Pay by bank transfer before arrival or in cash to our staff at the airport.",
    },
  ],
  zh: [
    {
      q: "哪些人适合快速通关？",
      a: "商务旅客、带幼儿的家庭、老人或孕妇、团队以及转机时间紧张的旅客。",
    },
    { q: "提供哪些服务？", a: "入境越南、离境越南及中转（联程航班）快速通关。" },
    { q: "需要提供哪些资料？", a: "护照照片页、航班号与抵达时间，以及签证批准函（如有）。" },
    { q: "如何付款？", a: "无需在线支付。可提前银行转账，或在机场现金支付给我们的工作人员。" },
  ],
};
