export interface PostMetadata {
  id: string;
  category: string;
  categoryEn: string;
  categoryAr: string;
  titleEn: string;
  titleAr: string;
  excerptEn: string;
  excerptAr: string;
  date: string;
  dateAr: string;
  readTime: string;
  readTimeAr: string;
  accent: string;
  featured: boolean;
}

export interface BlogDetail {
  id: string;
  categoryEn: string;
  categoryAr: string;
  accent: string;
  dateEn: string;
  dateAr: string;
  readTimeEn: string;
  readTimeAr: string;
  authorEn: string;
  authorAr: string;
  titleEn: string;
  titleAr: string;
  summaryEn: string[];
  summaryAr: string[];
  sectionsEn: { heading: string; body: string; highlights?: string[] }[];
  sectionsAr: { heading: string; body: string; highlights?: string[] }[];
  statBox?: { val: string; labelEn: string; labelAr: string }[];
  quoteEn?: string;
  quoteAr?: string;
}

export const POSTS: PostMetadata[] = [
  {
    id: "capital-appreciation-vs-rental-yield",
    category: "guide",
    categoryEn: "Investment Guide",
    categoryAr: "دليل الاستثمار",
    titleEn: "Capital Appreciation vs Rental Yield: Which Investment Strategy Works Best in Saudi Arabia?",
    titleAr: "نمو رأس المال مقابل عائد الإيجار: أي الاستراتيجيات الاستثمارية أفضل في السعودية؟",
    excerptEn: "Rental yield generates recurring income, while capital appreciation builds long-term wealth. We break down the data to see which strategy wins in Saudi Arabia's high-growth districts.",
    excerptAr: "يوفر عائد الإيجار سيولة مستقرة وفورية، بينما يبني نمو رأس المال ثروة طويلة الأجل عبر الأجيال. نستعرض أداء الاستراتيجيتين عبر مدن المملكة.",
    date: "August 12, 2026",
    dateAr: "١٢ أغسطس ٢٠٢٦",
    readTime: "6 min read",
    readTimeAr: "٦ دقائق قراءة",
    accent: "#B8873B",
    featured: true,
  },
  {
    id: "choosing-family-property-saudi-arabia",
    category: "guide",
    categoryEn: "Home Buying Guide",
    categoryAr: "دليل شراء المنزل",
    titleEn: "How to Choose the Right Property for Your Family in Saudi Arabia",
    titleAr: "كيف تختار العقار السكني المناسب لعائلتك في السعودية",
    excerptEn: "Location, total cost of ownership, and multi-generational spatial design determine the long-term lifestyle success of a family home.",
    excerptAr: "يحدد اختيار الموقع، والتكلفة الإجمالية للتملك، وتصميم المساحة لعدة أجيال مدى نجاح المسكن العائلي ونمط الحياة على المدى الطويل.",
    date: "August 11, 2026",
    dateAr: "١١ أغسطس ٢٠٢٦",
    readTime: "8 min read",
    readTimeAr: "٨ دقائق قراءة",
    accent: "#7FA8B3",
    featured: false,
  },
  {
    id: "furnished-apartment-vs-hotel-suite",
    category: "lifestyle",
    categoryEn: "Lifestyle",
    categoryAr: "أسلوب الحياة",
    titleEn: "Furnished Apartment vs Hotel Suite: Which Is Better for Your Stay?",
    titleAr: "شقة مفروشة أم جناح فندقي: أيهما أفضل لإقامتك في السعودية؟",
    excerptEn: "Understanding the balance between hotel conveniences and furnished apartment space, privacy, and cost-efficiency for mid-to-long-term stays.",
    excerptAr: "فهم الفرق بين الخدمات الفندقية المريحة ومساحة وخصوصية الشقق المفروشة والجدوى الاقتصادية للإقامات المتوسطة والطويلة.",
    date: "August 10, 2026",
    dateAr: "١٠ أغسطس ٢٠٢٦",
    readTime: "7 min read",
    readTimeAr: "٧ دقائق قراءة",
    accent: "#B8873B",
    featured: false,
  },
  {
    id: "how-to-read-saudi-real-estate-market",
    category: "market",
    categoryEn: "Market Insights",
    categoryAr: "رؤى السوق",
    titleEn: "How to Read Saudi Arabia's Real Estate Market Before Investing",
    titleAr: "كيف تحلل سوق العقارات السعودي قبل البدء بالاستثمار",
    excerptEn: "Successful investors rely on structural market indicators, velocity data, infrastructure catalysts, and regulatory frameworks.",
    excerptAr: "يعتمد المستثمرون الناجحون على مؤشرات السوق الهيكلية، وبيانات سرعة نمو الأسعار، ومحفزات البنية التحتية، والأطر التنظيمية للحد من المخاطر.",
    date: "August 9, 2026",
    dateAr: "٩ أغسطس ٢٠٢٦",
    readTime: "9 min read",
    readTimeAr: "٩ دقائق قراءة",
    accent: "#7FA8B3",
    featured: false,
  },
  {
    id: "vision-2030-real-estate",
    category: "market",
    categoryEn: "Market Insights",
    categoryAr: "رؤى السوق",
    titleEn: "Vision 2030 & Real Estate: Where the Capital is Flowing in 2025",
    titleAr: "رؤية 2030 والعقارات: أين يتدفق رأس المال في 2025",
    excerptEn: "As Saudi Arabia's transformation accelerates, we break down the top investment corridors and which asset classes are outperforming the market.",
    excerptAr: "مع تسارع التحول في المملكة العربية السعودية، نستعرض أبرز ممرات الاستثمار وفئات الأصول التي تتفوق على السوق.",
    date: "July 2025",
    dateAr: "يوليو 2025",
    readTime: "6 min read",
    readTimeAr: "6 دقائق قراءة",
    accent: "#B8873B",
    featured: false,
  },
  {
    id: "neom-investment-guide",
    category: "guide",
    categoryEn: "Investment Guide",
    categoryAr: "دليل الاستثمار",
    titleEn: "NEOM 2025: A Complete Investor's Guide to the World's Most Ambitious Project",
    titleAr: "نيوم 2025: الدليل الكامل للمستثمر في أكثر مشاريع العالم طموحاً",
    excerptEn: "NEOM is no longer a concept — it's under construction. We explain what investors need to know before the pricing reflects the hype.",
    excerptAr: "نيوم لم تعد مجرد فكرة — بل تحت الإنشاء. نشرح ما يحتاج المستثمرون معرفته قبل أن تعكس الأسعار المبالغة.",
    date: "June 2025",
    dateAr: "يونيو 2025",
    readTime: "10 min read",
    readTimeAr: "10 دقائق قراءة",
    accent: "#7FA8B3",
    featured: false,
  },
  {
    id: "riyadh-rental-yields",
    category: "market",
    categoryEn: "Market Insights",
    categoryAr: "رؤى السوق",
    titleEn: "Riyadh Rental Yields 2025: Where Are the 10%+ Returns Hiding?",
    titleAr: "عوائد الإيجار في الرياض 2025: أين تختبئ العوائد التي تتجاوز 10%؟",
    excerptEn: "North Riyadh is the headline, but savvy investors are finding 10%+ yields in districts most brokers are overlooking.",
    excerptAr: "شمال الرياض هو العنوان الرئيسي، لكن المستثمرين الأذكياء يجدون عوائد تتجاوز 10% في أحياء يتجاهلها معظم الوسطاء.",
    date: "May 2025",
    dateAr: "مايو 2025",
    readTime: "8 min read",
    readTimeAr: "8 دقائق قراءة",
    accent: "#B8873B",
    featured: false,
  },
  {
    id: "legal-guide-foreigners",
    category: "legal",
    categoryEn: "Legal",
    categoryAr: "قانوني",
    titleEn: "Buying Property in Saudi Arabia as a Foreigner: 2025 Legal Guide",
    titleAr: "شراء عقار في المملكة العربية السعودية كأجنبي: دليل قانوني 2025",
    excerptEn: "Can foreigners own real estate in Saudi Arabia? Yes — with conditions. Here is what you need to know before signing anything.",
    excerptAr: "هل يمكن للأجانب امتلاك عقارات في المملكة؟ نعم — مع شروط. إليك ما تحتاج معرفته قبل التوقيع على أي شيء.",
    date: "April 2025",
    dateAr: "أبريل 2025",
    readTime: "12 min read",
    readTimeAr: "12 دقيقة قراءة",
    accent: "#7FA8B3",
    featured: false,
  },
  {
    id: "villa-vs-apartment",
    category: "guide",
    categoryEn: "Investment Guide",
    categoryAr: "دليل الاستثمار",
    titleEn: "Villa vs. Apartment: Which Saudi Asset Class Wins in 2025?",
    titleAr: "فيلا أم شقة: أي فئة أصول سعودية تنتصر في 2025؟",
    excerptEn: "Capital growth vs. rental yield — we run the numbers on Saudi Arabia's two most popular residential asset classes.",
    excerptAr: "نمو رأس المال مقابل العائد الإيجاري — نستعرض الأرقام لفئتي الأصول السكنية الأكثر شعبية في المملكة.",
    date: "March 2025",
    dateAr: "مارس 2025",
    readTime: "7 min read",
    readTimeAr: "7 دقائق قراءة",
    accent: "#B8873B",
    featured: false,
  },
  {
    id: "commercial-land-timing",
    category: "market",
    categoryEn: "Market Insights",
    categoryAr: "رؤى السوق",
    titleEn: "Commercial Land Banking: Why Timing Still Matters in 2025",
    titleAr: "تخزين الأراضي التجارية: لماذا لا يزال التوقيت مهماً في 2025",
    excerptEn: "The window for below-market commercial land in Vision 2030 corridors is closing. Here's the data behind the urgency.",
    excerptAr: "نافذة شراء الأراضي التجارية بأسعار أقل من السوق في ممرات رؤية 2030 آخذة في الإغلاق. إليك البيانات وراء الإلحاح.",
    date: "February 2025",
    dateAr: "فبراير 2025",
    readTime: "9 min read",
    readTimeAr: "9 دقائق قراءة",
    accent: "#7FA8B3",
    featured: false,
  },
];

export const BLOG_POSTS: Record<string, BlogDetail> = {
  "capital-appreciation-vs-rental-yield": {
    id: "capital-appreciation-vs-rental-yield",
    categoryEn: "Investment Guide",
    categoryAr: "دليل الاستثمار",
    accent: "#B8873B",
    dateEn: "August 12, 2026",
    dateAr: "١٢ أغسطس ٢٠٢٦",
    readTimeEn: "6 min read",
    readTimeAr: "٦ دقائق قراءة",
    authorEn: "Asaheeb Research Team · Riyadh, KSA",
    authorAr: "فريق أبحاث أصاهيب · الرياض، المملكة العربية السعودية",
    titleEn: "Capital Appreciation vs Rental Yield: Which Investment Strategy Works Best in Saudi Arabia?",
    titleAr: "نمو رأس المال مقابل عائد الإيجار: أي الاستراتيجيات الاستثمارية أفضل في السعودية؟",
    summaryEn: [
      "Rental yield delivers stable, immediate liquidity, while capital appreciation builds long-term multi-generational wealth.",
      "Riyadh's rapid expansion and corporate influx favor long-term appreciation, whereas mature zones in Jeddah offer consistent rental yields.",
      "The optimal strategy integrates both classes to balance monthly cash flow with equity growth."
    ],
    summaryAr: [
      "يوفر عائد الإيجار سيولة مستقرة وفورية، بينما يبني نمو رأس المال ثروة طويلة الأجل عبر الأجيال.",
      "التوسع السريع في الرياض وتدفق الشركات يدعمان نمو القيمة طويل الأجل، بينما توفر المناطق الناضجة بجدة عوائد إيجارية مستقرة.",
      "تدمج الاستراتيجية المثلى كلا الفئتين لموازنة التدفق النقدي الشهري مع نمو رأس المال."
    ],
    sectionsEn: [
      {
        heading: "1. The Core Differences: Yield vs. Appreciation",
        body: "Real estate returns are driven by two main engines: cash flow (rental yield) and equity growth (capital appreciation). Rental yield represents the net annual rental income divided by the property's acquisition cost. Capital appreciation is the increase in the asset's market value over time, realized upon resale. Choosing between them dictates your portfolio's cash profile."
      },
      {
        heading: "2. Capital Appreciation Drivers in KSA",
        body: "Under Vision 2030, Saudi Arabia is undergoing unprecedented structural growth. Infrastructure developments, such as the Riyadh Metro, KAFD expansion, and economic zone transformations, directly drive surrounding land and property values. Investors seeking high capital gains focus on early-stage developments where positioning prior to completion captures maximum valuation upside.",
        highlights: [
          "Riyadh North Corridors: Prime areas for commercial and residential value expansion.",
          "Vision 2030 Giga-Projects: Exponential growth potential for land adjacent to major hubs."
        ]
      },
      {
        heading: "3. Securing Consistent Rental Yields",
        body: "For investors prioritizing immediate cash flow, high-demand urban centers and corporate residential zones are ideal. Jeddah's luxury coastal apartments and Riyadh's executive districts benefit from a steady influx of international expatriates and professionals, sustaining net rental yields of 8.5% to 11%.",
        highlights: [
          "Jeddah Waterfront & Corniche: Premium luxury suites with high occupancy rates.",
          "Corporate Relocation Zones: Executive housing with multi-year corporate leases."
        ]
      },
      {
        heading: "4. Structuring a Balanced Portfolio",
        body: "Sophisticated portfolios do not choose one strategy over the other—they integrate both. Allocating a portion of capital to high-yield residential apartments provides the liquidity needed to fund long-term land banking or prime commercial development assets."
      }
    ],
    sectionsAr: [
      {
        heading: "١. الاختلاف الجوهري: العائد مقابل نمو القيمة",
        body: "تتحرك عوائد العقارات بمحركين رئيسيين: التدفق النقدي (عائد الإيجار) ونمو الملكية (نمو رأس المال). يمثل عائد الإيجار صافي الدخل الإيجاري السنوي مقسوماً على تكلفة الاستحواذ، بينما يمثل نمو رأس المال الزيادة في قيمة الأصول بمرور الوقت. يحدد الاختيار بينهما طبيعة تدفقاتك النقدية."
      },
      {
        heading: "٢. محركات نمو رأس المال في المملكة",
        body: "تحت مظلة رؤية 2030، تشهد المملكة نمواً هيكلياً غير مسبوق. مشاريع البنية التحتية مثل مترو الرياض، وتوسعة مركز الملك عبد الله المالي، والمناطق الاقتصادية الخاصة ترفع مباشرة قيم العقارات والأراضي المحيطة. يركز المستثمرون الباحثون عن نمو القيمة على المشاريع في مراحلها الأولى للاستفادة من أقصى ارتفاع في التقييم.",
        highlights: [
          "محاور شمال الرياض: مناطق رئيسية لنمو قيمة العقارات السكنية والتجارية.",
          "مشاريع رؤية 2030 العملاقة: إمكانات نمو هائلة للأراضي المجاورة للمراكز الحيوية."
        ]
      },
      {
        heading: "٣. تحقيق عوائد إيجارية مستقرة",
        body: "بالنسبة للمستثمرين الذين يمنحون الأولوية للتدفق النقدي الفوري، فإن المراكز الحضرية ذات الطلب العالي ومناطق إسكان الشركات هي الخيار المثالي. تستفيد شقق جدة الساحلية الفاخرة وأحياء الرياض التنفيذية من التدفق المستمر للوافدين والمهنيين، مما يدعم عوائد إيجارية صافية تتراوح بين 8.5% إلى 11%.",
        highlights: [
          "كورنيش وواجهة جدة البحرية: أجنحة فاخرة متميزة بمعدلات إشغال عالية.",
          "مناطق انتقال الشركات: إسكان تنفيذي بعقود إيجار مؤسسية متعددة السنوات."
        ]
      },
      {
        heading: "٤. هيكلة محفظة استثمارية متوازنة",
        body: "لا تختار المحافظ الذكية استراتيجية واحدة على حساب الأخرى، بل تدمج كلتيهما. يوفر تخصيص جزء من رأس المال للشقق السكنية عالية العائد السيولة اللازمة لتمويل تخزين الأراضي طويلة الأجل أو الأصول التجارية قيد التطوير."
      }
    ],
    statBox: [
      { val: "8.5–11%", labelEn: "Avg. Rental Yield", labelAr: "متوسط عائد الإيجار" },
      { val: "Vision 2030", labelEn: "Growth Engine", labelAr: "محرك النمو" },
      { val: "60 / 40", labelEn: "Yield / Growth Ratio", labelAr: "نسبة العائد / النمو" }
    ],
    quoteEn: "Sustainable wealth creation requires balancing the certainty of today's yields with the potential of tomorrow's appreciation.",
    quoteAr: "يتطلب بناء الثروة المستدامة موازنة يقين عوائد اليوم مع إمكانات نمو القيمة غداً."
  },

  "choosing-family-property-saudi-arabia": {
    id: "choosing-family-property-saudi-arabia",
    categoryEn: "Home Buying Guide",
    categoryAr: "دليل شراء المنزل",
    accent: "#7FA8B3",
    dateEn: "August 11, 2026",
    dateAr: "١١ أغسطس ٢٠٢٦",
    readTimeEn: "8 min read",
    readTimeAr: "٨ دقائق قراءة",
    authorEn: "Asaheeb Advisory Team · Jeddah, KSA",
    authorAr: "فريق استشارات أصاهيب · جدة، المملكة العربية السعودية",
    titleEn: "How to Choose the Right Property for Your Family in Saudi Arabia",
    titleAr: "كيف تختار العقار السكني المناسب لعائلتك في السعودية",
    summaryEn: [
      "Location selection dictates family lifestyle, school proximity, and long-term asset resale value.",
      "Total cost of ownership extends far beyond the purchase price, including community maintenance, utility setups, and tax layers.",
      "Analyzing community infrastructure and future masterplans prevents buying into stagnating neighborhoods."
    ],
    summaryAr: [
      "يحدد اختيار الموقع نمط حياة الأسرة، والقرب من المدارس، وقيمة إعادة بيع العقار على المدى الطويل.",
      "تمتد التكلفة الإجمالية للملكية إلى ما هو أبعد من سعر الشراء، لتشمل صيانة المجمع السكني ورسوم الخدمات والضرائب.",
      "يمنع تحليل البنية التحتية للمجتمع والمخططات الشاملة المستقبلية الشراء في أحياء راكدة."
    ],
    sectionsEn: [
      {
        heading: "1. Establishing the Total Cost of Ownership",
        body: "Acquiring a family home is a multi-layered financial commitment. Buyers must look beyond the initial listing price. A proper budget accounts for down payments, property registration fees (including Real Estate Transaction Tax - RETT), annual compound maintenance charges, and utility integrations. Structuring these costs early ensures long-term financial security."
      },
      {
        heading: "2. Prioritizing Proximity and Infrastructure",
        body: "A family's daily satisfaction depends heavily on the neighborhood’s connectivity. Proximity to international schools, advanced healthcare facilities, and central business districts reduces daily commute times. Furthermore, investing in areas with planned highway links or metro access protects the property's long-term resale value.",
        highlights: [
          "School District Integration: Proximity to top-rated educational institutions.",
          "Transit Connectivity: Accessibility via main arterial roads and public transport corridors."
        ]
      },
      {
        heading: "3. Planning for Multi-Generational Spatial Needs",
        body: "Family dynamics evolve over time. When choosing a property, consider future spatial requirements. A home should accommodate growing children, remote work environments, and guest spaces. Purchasing a villa or modular apartment with flexible layout configurations prevents the need for frequent relocations."
      },
      {
        heading: "4. Evaluating Community Amenities and Safety",
        body: "Modern Saudi masterplanned developments offer self-sustaining ecosystems. Gated communities and integrated developments provide secure spaces with pedestrian walkways, green parks, commercial retail, and recreation centers, significantly enhancing quality of life."
      }
    ],
    sectionsAr: [
      {
        heading: "١. تحديد التكلفة الإجمالية للتملك",
        body: "شراء منزل العائلة هو التزام مالي متعدد الجوانب. يجب على المشترين النظر إلى ما هو أبعد من سعر الشراء الأساسي؛ حيث تشمل الميزانية السليمة الدفعة المقدمة، ورسوم تسجيل العقار (بما في ذلك ضريبة التصرفات العقارية)، ورسوم صيانة المجمع السنوية، والخدمات العامة. تضمن هيكلة هذه التكاليف مبكراً الاستقرار المالي."
      },
      {
        heading: "٢. إعطاء الأولوية للموقع والبنية التحتية",
        body: "يعتمد الرضا اليومي للعائلة بشكل كبير على سهولة الاتصال بالحي. يقلل القرب من المدارس الدولية، والمرافق الصحية المتقدمة، ومراكز الأعمال من أوقات التنقل اليومية. علاوة على ذلك، فإن الاستثمار في مناطق ذات ربط مخطط بالطرق السريعة أو محطات المترو يحمي قيمة العقار المستقبلية.",
        highlights: [
          "القرب التعليمي: القرب السهل من المؤسسات التعليمية الرائدة.",
          "سهولة الانتقال: إمكانية الوصول السريع للمحاور الرئيسية وممرات النقل."
        ]
      },
      {
        heading: "٣. التخطيط للاحتياجات المساحية المستقبلية",
        body: "تتطور متطلبات الأسرة بمرور الوقت. عند اختيار العقار، ضع في اعتبارك الاحتياجات المساحية المستقبلية للنمو، أو للعمل عن بُعد، أو لاستضافة الزوار. شراء فيلا أو شقة مرنة يغني العائلة عن الحاجة للانتقال المتكرر."
      },
      {
        heading: "٤. تقييم مرافق المجتمع والأمان",
        body: "تقدم المجمعات السكنية الحديثة في المملكة بيئات متكاملة ومستدامة ذاتياً. توفر الأحياء المغلقة والمشاريع السكنية الحديثة بيئة آمنة تضم مسارات المشاة، والحدائق، والمراكز التجارية والترفيهية، مما يعزز جودة الحياة اليومية."
      }
    ],
    statBox: [
      { val: "5%", labelEn: "RETT Tax Rate", labelAr: "ضريبة التصرفات العقارية" },
      { val: "Gated", labelEn: "Security Standard", labelAr: "معيار الأمان" },
      { val: "15–20%", labelEn: "Appreciation Potential", labelAr: "نمو القيمة المتوقع" }
    ],
    quoteEn: "A home is not merely an asset; it is the physical foundation of your family's future and lifestyle.",
    quoteAr: "المنزل ليس مجرد أصل استثماري، بل هو الأساس المادي لمستقبل عائلتك ونمط حياتها."
  },

  "furnished-apartment-vs-hotel-suite": {
    id: "furnished-apartment-vs-hotel-suite",
    categoryEn: "Lifestyle",
    categoryAr: "أسلوب الحياة",
    accent: "#B8873B",
    dateEn: "August 10, 2026",
    dateAr: "١٠ أغسطس ٢٠٢٦",
    readTimeEn: "7 min read",
    readTimeAr: "٧ دقائق قراءة",
    authorEn: "Asaheeb Relocation Services · Riyadh, KSA",
    authorAr: "خدمات الانتقال بأصاهيب · الرياض، المملكة العربية السعودية",
    titleEn: "Furnished Apartment vs Hotel Suite: Which Is Better for Your Stay?",
    titleAr: "شقة مفروشة أم جناح فندقي: أيهما أفضل لإقامتك في السعودية؟",
    summaryEn: [
      "Hotel suites offer convenience for short visits, while furnished apartments provide superior cost-efficiency for extended stays.",
      "Furnished apartments provide home-like features, including full kitchens and larger, private living areas.",
      "The optimal choice aligns with your length of stay, workspace needs, and privacy preferences."
    ],
    summaryAr: [
      "توفر الأجنحة الفندقية أقصى درجات الراحة للزيارات القصيرة، بينما تقدم الشقق المفروشة كفاءة مالية أعلى للإقامات الطويلة.",
      "تتميز الشقق المفروشة بمرافق المنزل مثل المطابخ الكاملة والمساحات المعيشية الواسعة والخصوصية.",
      "يعتمد الاختيار الأمثل على مدة الإقامة، والاحتياجات المهنية للعمل، وتفضيلات الخصوصية."
    ],
    sectionsEn: [
      {
        heading: "1. Space, Privacy, and Functionality",
        body: "For extended stays, spatial layout directly impacts comfort. Furnished apartments feature separate bedrooms, functional workspaces, and fully equipped kitchens. This home-like structure offers greater privacy and flexibility compared to standard hotel suite layouts, which can feel restrictive over longer periods."
      },
      {
        heading: "2. Cost-Efficiency of Extended Stays",
        body: "When comparing costs, hotel suites carry premium daily rates and service fees. Furnished apartments typically operate on flexible weekly or monthly leases, offering significant savings for stays exceeding two weeks, along with lower costs for dining and laundry.",
        highlights: [
          "Flexible Lease Terms: Weekly, monthly, or seasonal contract options.",
          "Reduced Secondary Costs: Private cooking and laundry facilities save on luxury service markups."
        ]
      },
      {
        heading: "3. Services and Convenience Comparison",
        body: "Hotel suites excel in concierge services, room service, and daily housekeeping. If your schedule demands zero operational responsibilities, hotels are ideal. Furnished apartments, while offering periodic cleaning options, cater to those who prefer self-sufficiency and an independent lifestyle."
      },
      {
        heading: "4. Making the Strategic Choice",
        body: "Corporate travelers and relocating families benefit from analyzing their schedule. For stays under seven days, hotels provide seamless convenience. For mid-to-long-term stays, furnished apartments offer a balanced, lifestyle-aligned solution."
      }
    ],
    sectionsAr: [
      {
        heading: "١. المساحة، الخصوصية، والعملية",
        body: "بالنسبة للإقامات الطويلة، تؤثر مساحة السكن وتصميمه مباشرة على الراحة. تتميز الشقق المفروشة بغرف نوم منفصلة، ومساحات عمل عملية، ومطابخ مجهزة بالكامل. يوفر هذا الهيكل الشبيه بالمنزل خصوصية ومرونة أكبر مقارنة بالأجنحة الفندقية التي قد تشعرك بالضيق بمرور الوقت."
      },
      {
        heading: "٢. الجدوى الاقتصادية للإقامات الممتدة",
        body: "عند مقارنة التكاليف، تفرض الفنادق أسعاراً يومية مرتفعة ورسوم خدمات إضافية. في المقابل، تعتمد الشقق المفروشة على عقود مرنة أسبوعية أو شهرية تحقق وفورات كبيرة للإقامات التي تتجاوز أسبوعين، بالإضافة إلى تقليل مصاريف الطعام والغسيل.",
        highlights: [
          "عقود مرنة: خيارات إيجار أسبوعية أو شهرية أو موسمية.",
          "تقليل المصاريف الجانبية: يغنيك وجود مطبخ وخسالة خاصة عن تكاليف الخدمات الفندقية."
        ]
      },
      {
        heading: "٣. مقارنة الخدمات والراحة الفندقية",
        body: "تتميز الأجنحة الفندقية بخدمات الاستقبال والكونسيرج وتوصيل الطلبات والغرف والتنظيف اليومي. إذا كان جدول أعمالك يتطلب راحة تامة دون مسؤوليات تشغيلية، فإن الفندق هو الخيار الأنسب. في المقابل، توفر الشقق المفروشة تنظيفاً دورياً وتناسب من يفضلون الاستقلالية التامة."
      },
      {
        heading: "٤. اتخاذ القرار الاستراتيجي",
        body: "يستفيد رجال الأعمال والعائلات الوافدة من تحليل طبيعة زيارتهم. للإقامات الأقل من أسبوع، توفر الفنادق راحة سلسة وسريعة. أما للإقامات المتوسطة والطويلة، فإن الشقق المفروشة تمنح تجربة سكن متوازنة ومريحة."
      }
    ],
    statBox: [
      { val: "14+ Days", labelEn: "Apartment Threshold", labelAr: "عتبة الشقق المفروشة" },
      { val: "35%+", labelEn: "Est. Savings", labelAr: "نسبة التوفير المقدرة" },
      { val: "Full", labelEn: "Kitchen & Laundry", labelAr: "مطبخ وغسيل كامل" }
    ],
    quoteEn: "True comfort is about finding a space that adapts to your daily routine, rather than forcing you to adapt to its constraints.",
    quoteAr: "تكمن الراحة الحقيقية في العثور على مساحة تتكيف مع روتينك اليومي، بدلاً من إجبارك على التكيف مع قيودها."
  },

  "how-to-read-saudi-real-estate-market": {
    id: "how-to-read-saudi-real-estate-market",
    categoryEn: "Market Insights",
    categoryAr: "رؤى السوق",
    accent: "#7FA8B3",
    dateEn: "August 9, 2026",
    dateAr: "٩ أغسطس ٢٠٢٦",
    readTimeEn: "9 min read",
    readTimeAr: "٩ دقائق قراءة",
    authorEn: "Asaheeb Market Intelligence · Jeddah, KSA",
    authorAr: "ذكاء السوق بأصاهيب · جدة، المملكة العربية السعودية",
    titleEn: "How to Read Saudi Arabia's Real Estate Market Before Investing",
    titleAr: "كيف تحلل سوق العقارات السعودي قبل البدء بالاستثمار",
    summaryEn: [
      "Data-driven decisions outperform speculative or emotional property acquisitions.",
      "Monitoring regional infrastructure projects and corporate relocations reveals high-growth districts.",
      "Rigorous legal due diligence and zoning verifications are essential to mitigate investment risks."
    ],
    summaryAr: [
      "القرارات المبنية على البيانات تتفوق على الاستحواذات العقارية المبنية على التخمين أو العاطفة.",
      "يكشف رصد مشاريع البنية التحتية وانتقال الشركات العالمية عن الأحياء ذات النمو المرتفع.",
      "تُعد العناية القانونية الواجبة والتحقق من التراخيص أمراً ضرورياً للحد من المخاطر الاستثمارية."
    ],
    sectionsEn: [
      {
        heading: "1. Price Velocity and Historical Data",
        body: "Entering a real estate market requires assessing price trends. Investors should analyze price per square meter velocity, historical growth patterns, and recent transaction records. Understanding these trends helps distinguish fairly valued properties from those inflated by temporary market excitement."
      },
      {
        heading: "2. Analyzing Supply and Demand Dynamics",
        body: "Capital growth is fundamentally driven by supply constraints and growing demand. Review occupancy rates, upcoming project pipelines, population influx, and corporate expansions. Districts near key economic and business zones often maintain strong occupancy and rental demand.",
        highlights: [
          "Vacancy Metrics: District-level data showing actual rental demand.",
          "Future Influx: Corporate expansions driving influx of executive professionals."
        ]
      },
      {
        heading: "3. Infrastructure Integration as a Growth Catalyst",
        body: "Real estate values do not rise in isolation; they are catalysed by nearby infrastructure developments. Aligning your acquisitions with planned transportation expansions, financial hubs, and recreation corridors ensures capital appreciation ahead of completion."
      },
      {
        heading: "4. Legal Due Diligence and Title Verification",
        body: "Regulatory compliance protects your investment. In Saudi Arabia, verify digital title deeds through authorized platforms, check zoning rules, examine utility plans, and review developer track records. Ensuring legal clarity prevents costly delays and disputes."
      }
    ],
    sectionsAr: [
      {
        heading: "١. سرعة تغير الأسعار والبيانات التاريخية",
        body: "يتطلب دخول السوق العقاري دراسة اتجاهات الأسعار بدقة. يجب على المستثمرين تحليل سعر المتر المربع، ومعدلات النمو التاريخية، وسجلات الصفقات العقارية الأخيرة. يساعد فهم هذه البيانات في تمييز العقارات ذات التقييم العادل عن تلك المتأثرة بالمضاربات المؤقتة."
      },
      {
        heading: "٢. تحليل ديناميكيات العرض والطلب",
        body: "تتحرك عوائد رأس المال دائماً بقلة العرض وزيادة الطلب. ابحث في معدلات الإشغال، وحجم المشاريع القادمة، والنمو السكاني، وتوسع الشركات. تحافظ الأحياء القريبة من مراكز الأعمال على طلب إيجاري ونسب إشغال عالية باستمرار.",
        highlights: [
          "مؤشرات الشواغر: بيانات الأحياء المحدثة التي توضح الطلب الإيجاري الفعلي.",
          "معدلات التدفق: توسع الشركات الذي يجذب التنفيذيين والمهنيين."
        ]
      },
      {
        heading: "٣. تكامل البنية التحتية كمحفز للنمو",
        body: "لا ترتفع قيم العقارات بمعزل عن محيطها، بل تحفزها مشاريع البنية التحتية المجاورة. يضمن ربط استثماراتك بمشاريع النقل العام المخطط لها، والمراكز المالية، والواجهات الترفيهية نمواً رأسمالياً استباقياً قبل اكتمال المشاريع."
      },
      {
        heading: "٤. العناية القانونية الواجبة والتحقق من الصكوك",
        body: "الالتزام التنظيمي يحمي استثماراتك. في السعودية، تحقق من صكوك الملكية الرقمية عبر المنصات المعتمدة، وتأكد من أنظمة البناء والتراخيص، وراجع سيرة المطورين لضمان سلامة وجودة المشروع."
      }
    ],
    statBox: [
      { val: "1.3T", labelEn: "Vision 2030 Pipeline", labelAr: "مشاريع رؤية 2030" },
      { val: "RERA", labelEn: "Regulatory Authority", labelAr: "الهيئة العامة للعقار" },
      { val: "40-Point", labelEn: "Due Diligence Check", labelAr: "نقطة فحص للعناية الواجبة" }
    ],
    quoteEn: "Successful real estate investing is about identifying structural growth before the wider market reacts.",
    quoteAr: "يتحقق النجاح في الاستثمار العقاري من خلال تحديد النمو الهيكلي قبل أن يتفاعل السوق العام معه."
  },

  "vision-2030-real-estate": {
    id: "vision-2030-real-estate",
    categoryEn: "Market Insights",
    categoryAr: "رؤى السوق",
    accent: "#B8873B",
    dateEn: "July 14, 2025",
    dateAr: "١٤ يوليو ٢٠٢٥",
    readTimeEn: "6 min read",
    readTimeAr: "٦ دقائق قراءة",
    authorEn: "Asaheeb Research Team · Jeddah, KSA",
    authorAr: "فريق أبحاث أصاهيب · جدة، المملكة العربية السعودية",
    titleEn: "Vision 2030 & Real Estate: Where the Capital is Flowing in 2025",
    titleAr: "رؤية 2030 والعقارات: أين يتدفق رأس المال في عام 2025",
    summaryEn: [
      "Saudi Arabia's $1.3 Trillion Vision 2030 real estate pipeline is entering its highest execution phase.",
      "Jeddah's Red Sea coastal developments and North Riyadh corridors are yielding 8.5%–12% net rental returns.",
      "Early institutional investors are shifting capital toward development-ready commercial land banking."
    ],
    summaryAr: [
      "يدخل أنبوب العقارات لرؤية 2030 بقيمة 1.3 تريليون دولار مرحلة التنفيذ الأعلى.",
      "مشاريع جدة الساحلية ومحاور شمال الرياض تحقق عوائد إيجارية صافية بين 8.5% إلى 12%.",
      "المستثمرون المؤسسيون الأوائل يوجهون رؤوس الأموال نحو تخزين الأراضي التجارية الجاهزة للتطوير."
    ],
    sectionsEn: [
      {
        heading: "1. The Macro Shift in Saudi Real Estate",
        body: "The Saudi real estate landscape has evolved beyond speculation into an institutional asset class. Supported by direct foreign ownership reforms, legislative transparency via RERA, and massive state infrastructure spending, capital allocation in 2025 is concentrated along primary connectivity corridors."
      },
      {
        heading: "2. Key Growth Hubs: Jeddah & Coastal Development",
        body: "While Riyadh remains the administrative and financial engine, Jeddah has solidified its position as the premier luxury and commercial gateway along the Red Sea. Waterfront luxury apartments and mixed-use commercial headquarters in Jeddah are witnessing unmatched capital appreciation due to limited supply and high domestic demand.",
        highlights: [
          "Jeddah Waterfront & Corniche: Premium residential rental yields averaging 9.2% p.a.",
          "North Riyadh Logistics & Transport Corridors: High demand for industrial & office parks.",
          "NEOM Coastal Adjacent Land Parcels: Strategic long-term capital growth potential."
        ]
      },
      {
        heading: "3. Institutional Advisory & Title Security",
        body: "With high returns comes the imperative for rigorous due diligence. Asaheeb Properties conducts full 40-point title checks, zoning verifications, and exit yield stress-testing for every curated transaction."
      }
    ],
    sectionsAr: [
      {
        heading: "١. التحول الكلي في العقارات السعودية",
        body: "تطور المشهد العقاري السعودي إلى فئة أصول مؤسسية. بفضل إصلاحات التملك الحر للأجانب، والشفافية التشريعية عبر الهيئة العامة للعقار، والإنفاق الحكومي الضخم على البنية التحتية، يتركز تخصيص رؤوس الأموال في 2025 على المحاور الرئيسية."
      },
      {
        heading: "٢. مراكز النمو الرئيسية: جدة والتطوير الساحلي",
        body: "بينما تظل الرياض المحرك المالي، تركت جدة بصمتها كبوابة فاخرة وتجارية على البحر الأحمر. تشهد الشقق السكنية الفاخرة والمقرات التجارية متعددة الاستخدامات في جدة نمواً رأسمالياً غير مسبوق نظراً لمحدودية العرض وارتفاع الطلب.",
        highlights: [
          "واجهة جدة البحرية والكورنيش: متوسط عوائد إيجارية 9.2% سنوياً.",
          "محاور اللوجستيات شمال الرياض: طلب عالٍ على المجمعات المكتبية والصناعية.",
          "الأراضي المجاورة لنيوم: فرص نمو رأسمالي استراتيجية طويلة الأجل."
        ]
      },
      {
        heading: "٣. الاستشارة المؤسسية وأمان الملكية",
        body: "مع العوائد المرتفعة تبرز الحاجة للعناية الواجبة الصارمة. تجري أصاهيب العقارية فحصاً كاملاً لـ 40 نقطة قانونية وفنية لكل صفقة."
      }
    ],
    statBox: [
      { val: "$1.3T", labelEn: "Vision 2030 Pipeline", labelAr: "مشاريع رؤية 2030" },
      { val: "9.2%", labelEn: "Avg. Jeddah Yield", labelAr: "متوسط عائد جدة" },
      { val: "100%", labelEn: "Legal Title Guarantee", labelAr: "ضمان الملكية القانونية" }
    ],
    quoteEn: "Capital does not wait for infrastructure to complete; it positions itself where the foundation is being poured.",
    quoteAr: "رأس المال لا ينتظر اكتمال البنية التحتية، بل يتمركز حيث يُصَب الأساس."
  },

  "neom-investment-guide": {
    id: "neom-investment-guide",
    categoryEn: "Investment Guide",
    categoryAr: "دليل الاستثمار",
    accent: "#7FA8B3",
    dateEn: "June 28, 2025",
    dateAr: "٢٨ يونيو ٢٠٢٥",
    readTimeEn: "10 min read",
    readTimeAr: "١٠ دقائق قراءة",
    authorEn: "Asaheeb Research Team · Jeddah, KSA",
    authorAr: "فريق أبحاث أصاهيب · جدة، المملكة العربية السعودية",
    titleEn: "NEOM 2025: A Complete Investor's Guide to the World's Most Ambitious Project",
    titleAr: "نيوم 2025: الدليل الكامل للمستثمر في أكثر مشاريع العالم طموحاً",
    summaryEn: [
      "NEOM is progressing from ground preparation to vertical construction across THE LINE, Oxagon, and Sindalah.",
      "Commercial land parcels situated along the primary access corridors represent the highest liquidity entry point.",
      "Early positioning allows investors to lock in valuation baselines prior to major tenant handovers."
    ],
    summaryAr: [
      "تنتقل نيوم من تجهيز الموقع إلى البناء العمودي في ذا لاين وأوكساجون وسندالة.",
      "الأراضي التجارية الواقعة على ممرات الوصول الرئيسية تمثل نقطة السيولة الأعلى دخولاً.",
      "التمركز المبكر يتيح للمستثمرين تثبيت التقييمات الأساسية قبل تسليم المستأجرين الرئيسية."
    ],
    sectionsEn: [
      {
        heading: "1. Understanding the NEOM Ecosystem",
        body: "NEOM is not a single city—it is a 26,500 square kilometer semi-autonomous economic zone. Understanding where to allocate capital requires analyzing the distinct commercial drivers of Sindalah Island, Oxagon Industrial Hub, Trojena, and THE LINE."
      },
      {
        heading: "2. Commercial Land Banking Strategies",
        body: "For private investors and family offices, land banking adjacent to NEOM’s primary transport nodes offers unmatched long-term appreciation. Asaheeb provides vetted parcel sourcing with clear zoning permissions and verified government utility hookup plans."
      },
      {
        heading: "3. Legal Structure & Regulatory Framework",
        body: "Special economic rules apply within the NEOM boundary. Working with registered advisors ensures compliant title ownership and seamless capital repatriations."
      }
    ],
    sectionsAr: [
      {
        heading: "١. فهم منظومة نيوم الاستثمارية",
        body: "نيوم ليست مدينة واحدة، بل هي منطقة اقتصادية شبه مستقلة بمساحة 26,500 كم مربع. يتطلب تخصيص رأس المال تحليل المحركات التجارية الفريدة لجزيرة سندالة، ومجمع أوكساجون، وتوريجنا، وذا لاين."
      },
      {
        heading: "٢. استراتيجيات تخزين الأراضي التجارية",
        body: "بالنسبة للمستثمرين والمكاتب العائلية، توفر الأراضي المجاورة لعقد النقل الرئيسية في نيوم نمواً رأسمالياً استثنائياً. توفر أصاهيب قطع أراضي مدققة مع تراخيص واضحة."
      },
      {
        heading: "٣. الهيكل القانوني والتنظيمي",
        body: "تطبق لوائح اقتصادية خاصة داخل حدود نيوم. يضمن التعاون مع مستشارين مرخصين تملكاً قانونياً سليماً وسلاسة في تحويل الأموال."
      }
    ],
    statBox: [
      { val: "26.5k km²", labelEn: "Total Area", labelAr: "المساحة الإجمالية" },
      { val: "15–22%", labelEn: "Est. IRR", labelAr: "معدل العائد الداخلي" },
      { val: "100%", labelEn: "Zoning Verified", labelAr: "اعتماد التراخيص" }
    ],
    quoteEn: "Pioneering investment requires looking past present sand to see future skylines.",
    quoteAr: "الاستثمار الريادي يتطلب النظر لما وراء الرمال الحالية لرؤية أفق المستقبل."
  },

  "riyadh-rental-yields": {
    id: "riyadh-rental-yields",
    categoryEn: "Market Insights",
    categoryAr: "رؤى السوق",
    accent: "#B8873B",
    dateEn: "May 19, 2025",
    dateAr: "١٩ مايو ٢٠٢٥",
    readTimeEn: "8 min read",
    readTimeAr: "٨ دقائق قراءة",
    authorEn: "Asaheeb Advisory · Jeddah, KSA",
    authorAr: "استشارات أصاهيب · جدة، المملكة العربية السعودية",
    titleEn: "Riyadh Rental Yields 2025: Where Are the 10%+ Returns Hiding?",
    titleAr: "عوائد الإيجار في الرياض 2025: أين تختبئ العوائد التي تتجاوز 10%؟",
    summaryEn: [
      "High corporate relocation demand driven by Regional Headquarters (RHQ) mandates is fueling double-digit rental yields.",
      "Executive residential apartments in North Riyadh are seeing sustained multi-year lease commitments.",
      "Structuring multi-unit residential portfolios yields consistent cash flows with strong exit liquidity."
    ],
    summaryAr: [
      "انتقال مقرات الشركات المقرات الإقليمية يرفع العوائد الإيجارية لمستويات قياسية.",
      "الشقق السكنية الفاخرة للتنفيذيين شمال الرياض تشهد التزامات إيجارية طويلة الأجل.",
      "هيكلة المحافظ السكنية متعددة الوحدات تضمن تدفقات نقدية مستقرة وسيولة عند الخروج."
    ],
    sectionsEn: [
      {
        heading: "1. The Regional HQ Mandate Effect",
        body: "With over 500 multinational corporations establishing regional headquarters in Saudi Arabia, demand for high-spec, turnkey executive housing in primary Riyadh districts has far surpassed market projections."
      },
      {
        heading: "2. District Analysis: Yield Hotspots",
        body: "While prime central districts command premium entry prices, northern growth corridors near King Salman Park and KAFD offer superior gross yields exceeding 10.4% p.a."
      }
    ],
    sectionsAr: [
      {
        heading: "١. تأثير المقرات الإقليمية للشركات العالمية",
        body: "مع تأسيس أكثر من 500 شركة متعددة الجنسيات لمقراتها الإقليمية في المملكة، فاق الطلب على السكن الفاخر للتنفيذيين بالرياض جميع التوقعات."
      },
      {
        heading: "٢. تحليل الأحياء: بؤر العائد الأعلى",
        body: "بينما تتطلب الأحياء المركزية أسعار دخول أعلى، توفر المحاور الشمالية قرب حديقة الملك سلمان ومركز الملك عبد الله المالي عوائد إجمالية تتجاوز 10.4% سنوياً."
      }
    ],
    statBox: [
      { val: "10.4%", labelEn: "Peak Yield", labelAr: "أعلى عائد إيجاري" },
      { val: "500+", labelEn: "RHQ Companies", labelAr: "شركات المقرات الإقليمية" },
      { val: "3-Yr", labelEn: "Avg. Corporate Lease", labelAr: "متوسط عقود الشركات" }
    ],
    quoteEn: "High-yield real estate is built on tenant demand, not speculation.",
    quoteAr: "العقارات عالية العائد تُبنى على الطلب الحقيقي للمستأجرين، لا على المضاربة."
  },

  "legal-guide-foreigners": {
    id: "legal-guide-foreigners",
    categoryEn: "Legal",
    categoryAr: "قانوني",
    accent: "#7FA8B3",
    dateEn: "April 10, 2025",
    dateAr: "١٠ أبريل ٢٠٢٥",
    readTimeEn: "12 min read",
    readTimeAr: "١٢ دقيقة قراءة",
    authorEn: "Asaheeb Legal Advisory · Jeddah, KSA",
    authorAr: "الاستشارات القانونية بأصاهيب · جدة، المملكة العربية السعودية",
    titleEn: "Buying Property in Saudi Arabia as a Foreigner: 2025 Legal Guide",
    titleAr: "شراء عقار في المملكة العربية السعودية كأجنبي: دليل قانوني 2025",
    summaryEn: [
      "Foreign natural and legal persons can now purchase real estate in Saudi Arabia under clear Premium Residency and investment laws.",
      "RERA digital title deeds guarantee 100% legal security and instant registration.",
      "Asaheeb handles the entire process from Ministry of Investment (MISA) clearance to title transfer."
    ],
    summaryAr: [
      "يمكن للأجانب والأشخاص الاعتباريين الشراء وفق قوانين الإقامة المميزة والاستثمار الجديدة.",
      "صكوك الملكية الرقمية عبر منصة إحكام والهيئة العامة للعقار تضمن الأمان القانوني 100%.",
      "تتولى أصاهيب العملية بالكامل من موافقة وزارة الاستثمار وحتى نقل الصك."
    ],
    sectionsEn: [
      {
        heading: "1. New Ownership Regulations Overview",
        body: "Saudi Arabia's modernized Real Estate Ownership Law empowers international investors to acquire residential, commercial, and land assets with complete regulatory protection."
      },
      {
        heading: "2. The Premium Residency Pathway",
        body: "Holders of Premium Residency categories (including Real Estate Owner Residency) enjoy direct title ownership rights without requiring local corporate conduits."
      }
    ],
    sectionsAr: [
      {
        heading: "١. نظرة عامة على نظام تملك العقار الجديد",
        body: "يمكّن نظام تملك العقار المحدث في السعودية المستثمرين الدوليين من الاستحواذ على الأصول السكنية والتجارية والأراضي بحماية تنظيمية كاملة."
      },
      {
        heading: "٢. مسار الإقامة المميزة",
        body: "يتمتع حاملو فئات الإقامة المميزة (بما فيها إقامة مالك عقار) بحقوق الملكية المباشرة للصكوك دون الحاجة إلى تأسيس كيانات محلية."
      }
    ],
    statBox: [
      { val: "100%", labelEn: "Legal Security", labelAr: "أمان قانوني كامل" },
      { val: "RERA", labelEn: "Regulated Framework", labelAr: "مرخص من هيئة العقار" },
      { val: "0%", labelEn: "Personal Income Tax", labelAr: "ضريبة دخل شخصي" }
    ],
    quoteEn: "Security of title is the bedrock upon which institutional capital expands.",
    quoteAr: "أمان الملكية هو الحجر الأساس الذي يتوسع عليه رأس المال المؤسسي."
  },

  "villa-vs-apartment": {
    id: "villa-vs-apartment",
    categoryEn: "Investment Guide",
    categoryAr: "دليل الاستثمار",
    accent: "#B8873B",
    dateEn: "March 22, 2025",
    dateAr: "٢٢ مارس ٢٠٢٥",
    readTimeEn: "7 min read",
    readTimeAr: "٧ دقائق قراءة",
    authorEn: "Asaheeb Research Team · Jeddah, KSA",
    authorAr: "فريق أبحاث أصاهيب · جدة، المملكة العربية السعودية",
    titleEn: "Villa vs. Apartment: Which Saudi Asset Class Wins in 2025?",
    titleAr: "فيلا أم شقة: أي فئة أصول سعودية تنتصر في 2025؟",
    summaryEn: [
      "Villas offer superior long-term capital appreciation driven by land value growth.",
      "Apartments deliver higher immediate net rental yields and lower entry threshold.",
      "Balanced wealth portfolios combine both asset classes across Jeddah and Riyadh."
    ],
    summaryAr: [
      "تتيح الفلل نمواً رأسمالياً أعلى طويلاً الأجل مدفوعاً بقيمة الأرض.",
      "تمنح الشقق عوائد إيجارية صافية أعلى فورية وحد دخول أقل.",
      "المحافظ المتوازنة تجمع بين الفئتين عبر جدة والرياض."
    ],
    sectionsEn: [
      {
        heading: "1. Comparing Capital Growth vs Cash Yields",
        body: "When building a Saudi real estate strategy, matching your timeline to the right asset class is critical. Land-backed standalone luxury villas in Jeddah compounds deliver strong wealth protection, while high-density apartments maximize annual liquidity."
      },
      {
        heading: "2. Strategic Portfolio Allocation",
        body: "We advise sophisticated investors to allocate 60% of capital into high-yield residential apartments for liquid cash flow, and 40% into prime coastal villas or land for long-term equity growth."
      }
    ],
    sectionsAr: [
      {
        heading: "١. مقارنة النمو الرأسمالي مقابل التدفق النقدي",
        body: "عند بناء استراتيجية عقارية، يُعد مطابقة جدولك الزمني مع فئة الأصول أمراً حاسماً. توفر الفلل الفاخرة في مجمعات جدة حماية للثروة، بينما تحقق الشقق أعلى تدفق نقدي سنوي."
      },
      {
        heading: "٢. التخصيص الاستراتيجي للمحفظة",
        body: "ننصح المستثمرين بتخصيص 60% من رأس المال في شقق سكنية عالية العائد للتدفق النقدي، و40% في فلل أو أراضٍ ساحلية لنمو الثروة طويل الأجل."
      }
    ],
    statBox: [
      { val: "60 / 40", labelEn: "Recommended Allocation", labelAr: "التوزيع الموصى به" },
      { val: "12–16%", labelEn: "Villa Appreciation", labelAr: "نمو قيمة الفلل" },
      { val: "9–11%", labelEn: "Apartment Yield", labelAr: "عائد الشقق" }
    ]
  },

  "commercial-land-timing": {
    id: "commercial-land-timing",
    categoryEn: "Market Insights",
    categoryAr: "رؤى السوق",
    accent: "#7FA8B3",
    dateEn: "February 15, 2025",
    dateAr: "١٥ فبراير ٢٠٢٥",
    readTimeEn: "9 min read",
    readTimeAr: "٩ دقائق قراءة",
    authorEn: "Asaheeb Advisory · Jeddah, KSA",
    authorAr: "استشارات أصاهيب · جدة، المملكة العربية السعودية",
    titleEn: "Commercial Land Banking: Why Timing Still Matters in 2025",
    titleAr: "تخزين الأراضي التجارية: لماذا لا يزال التوقيت مهماً في 2025",
    summaryEn: [
      "Undeveloped commercial land parcels along Vision 2030 corridors represent asymmetric upside.",
      "Infrastructure completion triggers exponential valuation re-ratings.",
      "Asaheeb provides off-market parcel acquisition with full zoning verification."
    ],
    summaryAr: [
      "الأراضي التجارية الخام على محاور رؤية 2030 توفر فرص نمو استثنائية.",
      "اكتمال البنية التحتية يطلق إعادة تقييم تصاعدية للأسعار.",
      "تتيح أصاهيب الاستحواذ على قطع الأراضي خارج السوق مع التحقق الكامل من التراخيص."
    ],
    sectionsEn: [
      {
        heading: "1. The Commercial Land Playbook",
        body: "Acquiring commercial development land requires deep knowledge of municipal expansion plans and transport infrastructure timelines. Timing entry before public announcements captures maximum alpha."
      },
      {
        heading: "2. Key Risk Mitigation Strategies",
        body: "Every land banking deal with Asaheeb undergoes strict municipal zoning clearance, soil testing review, and utility access confirmation before funds are committed."
      }
    ],
    sectionsAr: [
      {
        heading: "١. استراتيجية الاستثمار في الأراضي التجارية",
        body: "يتطلب الاستحواذ على الأراضي التجارية معرفة عميقة بخطط التوسع البلدي ومواعيد البنية التحتية. الدخول المبكر يحقق أعلى نسبة ربحية."
      },
      {
        heading: "٢. استراتيجيات الحد من المخاطر",
        body: "تخضع كل صفقة أراضٍ مع أصاهيب لفحص بلدي دقيق واعتماد التراخيص وتأكيد خدمات البنية التحتية قبل إيداع الأموال."
      }
    ],
    statBox: [
      { val: "18–25%", labelEn: "Targeted IRR", labelAr: "العائد الداخلي المستهدف" },
      { val: "100%", labelEn: "Zoning Cleared", labelAr: "تراخيص معتمدة" }
    ]
  }
};
