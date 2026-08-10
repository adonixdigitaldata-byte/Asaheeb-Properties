export interface Landmark {
  nameEn: string;
  nameAr: string;
  distEn: string;
  distAr: string;
}

export interface Amenity {
  badge: string; // Emoji / initial indicator (no SVG needed)
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
}

export interface ProjectDetail {
  id: string;
  nameEn: string;
  nameAr: string;
  developerEn?: string;
  developerAr?: string;
  cityEn: string;
  cityAr: string;
  districtEn: string;
  districtAr: string;
  
  // Pricing
  startingPriceEn: string; // for main cards ("from SAR 600K")
  startingPriceAr: string;
  priceRangeEn: string;    // for detail page ("SAR 600K – 838K")
  priceRangeAr: string;
  
  // Stats
  sizeEn: string;
  sizeAr: string;
  typeEn: string;
  typeAr: string;
  statusEn: string;
  statusAr: string;
  expectedDeliveryEn?: string;
  expectedDeliveryAr?: string;
  unitsCountEn?: string;
  unitsCountAr?: string;
  floorsEn?: string;
  floorsAr?: string;
  
  // Content
  overviewEn: string;
  overviewAr: string;
  highlightsEn?: string[];
  highlightsAr?: string[];
  
  // Media
  images: { url: string; captionEn?: string; captionAr?: string }[];
  videoUrl?: string; // YouTube embed or direct MP4 URL
  
  // Amenities (No SVG required, clean styled badges)
  amenities: Amenity[];
  
  // Location & Map
  mapEmbedUrl?: string; // Interactive Google Maps iframe URL
  landmarks: Landmark[];
  
  // Brochure
  brochureUrl?: string;
  brochureSizeEn?: string;
  brochureSizeAr?: string;
}

export const PROJECTS_DATA: ProjectDetail[] = [
  // ── 1. ITLALA TOWERS ────────────────────────────────────────────────────────
  {
    id: "itlala-towers",
    nameEn: "ITLALA TOWERS",
    nameAr: "أبراج إطلالة",
    developerEn: "New Event Developments",
    developerAr: "شركة نيو إيفينت للتطوير العقاري",
    cityEn: "Jeddah",
    cityAr: "جدة",
    districtEn: "Darb Al-Haramain District",
    districtAr: "مخطط درب الحرمين",
    
    startingPriceEn: "from SAR 600K",
    startingPriceAr: "ابتداءً من ٦٠٠ ألف ر.س",
    priceRangeEn: "SAR 600K – 838K",
    priceRangeAr: "٦٠٠ ألف – ٨٣٨ ألف ر.س",
    
    sizeEn: "2,261.94 m² (Land Area: 32,045 m²)",
    sizeAr: "٢,٢٦١.٩٤ م² (مساحة الأرض: ٣٢,٠٤٥ م²)",
    typeEn: "Luxury Residential & Commercial Units",
    typeAr: "وحدات سكنية وتجارية فاخرة",
    statusEn: "Under Construction",
    statusAr: "قيد الإنشاء",
    expectedDeliveryEn: "Q4 2026",
    expectedDeliveryAr: "الربع الرابع ٢٠٢٦",
    unitsCountEn: "192 Units",
    unitsCountAr: "١٩٢ وحدة سكنية",
    floorsEn: "+13 Floors",
    floorsAr: "+١٣ طابقاً",
    
    overviewEn: "Itlala Towers is an iconic new residential address developed by New Event Developments. Situated in the heart of Jeddah within the vibrant Darb Al Haramain District, Itlala Towers offers an exceptional lifestyle where contemporary architectural design meets uncompromised comfort and convenience. Designed with exceptional precision and premium architectural standards, every space is built to embody sophistication while offering a compelling investment value.",
    overviewAr: "عنوانًا للفخامة العصرية في قلب جدة، حيث تلتقي أناقة التصميم بروعة التفاصيل لتصنع تجربة سكنية استثنائية. بمعايير معمارية رفيعة ومساحات مصممة بعناية فائقة، يقدم المشروع أسلوب حياة راقٍ يلبي تطلعات الباحثين عن التميز، ويمنح في الوقت ذاته قيمة استثمارية تنمو بثقة وثبات ضمن مخطط درب الحرمين.",
    
    highlightsEn: [
      "Hotel-style entrance and hospitality lobby",
      "Free Owners Union registration for the 1st year",
      "Smart Home system & keyless card entry",
      "25-year structural guarantee & 10-year insurance policy",
      "Panoramic soundproof thermal windows",
      "5-year services & maintenance guarantee"
    ],
    highlightsAr: [
      "مدخل وشوراع بنمط فندقي فاخر",
      "اتحاد الملاك مجاناً للسنة الأولى",
      "أنظمة السمارت هوم والدخول الذكي",
      "ضمان الهيكل الإنشائي لمدة ٢٥ عاماً ووثيقة تأمين ١٠ سنوات",
      "نوافذ بانورامية عازلة للصوت والحرارة",
      "ضمان الخدمات والصيانة لمدة ٥ سنوات"
    ],
    
    images: [
      {
        url: "https://res.cloudinary.com/dmfv1fyhp/image/upload/v1786368978/img280_zgq91x.webp",
        captionEn: "ITLALA TOWERS High-Rise Exterior Perspective",
        captionAr: "البرج الرئيسي والتصميم الخارجي لأبراج إطلالة"
      },
      {
        url: "https://res.cloudinary.com/dmfv1fyhp/image/upload/v1786368978/img347_wqz34d.webp",
        captionEn: "Front Facade & Private Balconies",
        captionAr: "الواجهة الأمامية والنيشات التراسية"
      },
      {
        url: "https://res.cloudinary.com/dmfv1fyhp/image/upload/v1786368978/img512_a5di81.webp",
        captionEn: "Executive Living Room & Formal Reception",
        captionAr: "صالة الاستقبال والمعيشة الفاخرة"
      },
      {
        url: "https://res.cloudinary.com/dmfv1fyhp/image/upload/v1786368978/img508_gj1aoz.webp",
        captionEn: "Classical Guest Majlis Salon",
        captionAr: "المجلس الرئيسي وصالون الضيافة الفاخر"
      },
      {
        url: "https://res.cloudinary.com/dmfv1fyhp/image/upload/v1786368978/img516_ez30eq.webp",
        captionEn: "Master Bedroom Suite",
        captionAr: "جناح النوم الرئيسي الفاخر"
      }
    ],
    
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    
    amenities: [
      {
        badge: "🏊",
        titleEn: "SWIMMING POOL",
        titleAr: "حمام سباحة",
        descEn: "Includes a dedicated swimming pool area for residents and families.",
        descAr: "يتضمن مسبحاً مخصصاً وحصرياً للسكان والعائلات."
      },
      {
        badge: "🏋️",
        titleEn: "FITNESS GYM",
        titleAr: "نادي رياضي",
        descEn: "Fully equipped health club and gym facilities.",
        descAr: "نادي رياضي متكامل مجهز بأحدث المعدات الرياضية."
      },
      {
        badge: "🛡️",
        titleEn: "24/7 SECURITY & SURVEILLANCE",
        titleAr: "حراسة وأمان 24 ساعة",
        descEn: "Round-the-clock security team and CCTV coverage.",
        descAr: "حراسة أمنية مستمرة وكاميرات مراقبة على مدار اليوم."
      },
      {
        badge: "🅿️",
        titleEn: "PRIVATE COVERED PARKING",
        titleAr: "مواقف سيارات مغطاة",
        descEn: "Designated covered parking slots for every unit owner.",
        descAr: "مواقف سيارات مخصصة ومغطاة لكل وحدة سكنية."
      },
      {
        badge: "🛗",
        titleEn: "HIGH-SPEED ELEVATORS",
        titleAr: "مصاعد فائقة السرعة",
        descEn: "8 modern high-speed elevators including service lifts.",
        descAr: "٨ مصاعد حديثة وفائقة السرعة شاملة مصاعد الخدمات."
      },
      {
        badge: "🌳",
        titleEn: "COMMUNAL LANDSCAPED GARDENS",
        titleAr: "حدائق ومساحات خضراء",
        descEn: "Lush green outdoor promenades for families and leisure.",
        descAr: "مساحات خضراء وممرات خارجية مخصصة للتنزه والراحة."
      }
    ],
    
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3711.458920439!2d39.2251!3d21.5033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3d01fb1137e59%3A0xe059579737b11844!2sDarb%20Alharamain%2C%20Jeddah%20Saudi%20Arabia!5e0!3m2!1sen!2ssa!4v1700000000000!5m2!1sen!2ssa",
    landmarks: [
      { nameEn: "Haramain High-Speed Railway Station", nameAr: "محطة قطار الحرمين السريع", distEn: "3 Mins", distAr: "٣ دقائق" },
      { nameEn: "King Abdulaziz University", nameAr: "جامعة الملك عبد العزيز", distEn: "5 Mins", distAr: "٥ دقائق" },
      { nameEn: "Andalus Mall & Salam Mall", nameAr: "الأندلس مول والسلام مول", distEn: "4 Mins", distAr: "٤ دقائق" },
      { nameEn: "King Fahd Medical Research Center", nameAr: "مركز الملك فهد للبحوث الطبية", distEn: "6 Mins", distAr: "٦ دقائق" }
    ]
  },

  // ── 2. JIDIA TOWERS ────────────────────────────────────────────────────────
  {
    id: "jidia-towers",
    nameEn: "JIDIA TOWERS",
    nameAr: "أبراج جذيا (جُذيا تاورز)",
    developerEn: "Asrid Developments",
    developerAr: "شركة أسريد للتطوير العقاري",
    cityEn: "Jeddah",
    cityAr: "جدة",
    districtEn: "Darb Al-Haramain District",
    districtAr: "مخطط درب الحرمين",
    
    startingPriceEn: "from SAR 370K",
    startingPriceAr: "ابتداءً من ٣٧٠ ألف ر.س",
    priceRangeEn: "SAR 370K – 650K",
    priceRangeAr: "٣٧٠ ألف – ٦٥٠ ألف ر.س",
    
    sizeEn: "185,677.45 SQFT (Land Area: 32,045 m²)",
    sizeAr: "١٨٥,٦٧٧.٤٥ قدم² (مساحة الأرض: ٣٢,٠٤٥ م²)",
    typeEn: "Residential, Premium Penthouse & Commercial",
    typeAr: "وحدات سكنية، بنتهاوس فاخر، وتجارية",
    statusEn: "Under Construction",
    statusAr: "قيد الإنشاء",
    expectedDeliveryEn: "Q4 2026",
    expectedDeliveryAr: "الربع الرابع ٢٠٢٦",
    unitsCountEn: "200 Units",
    unitsCountAr: "٢٠٠ وحدة سكنية",
    floorsEn: "+13 Floors",
    floorsAr: "+١٣ طابقاً",
    
    overviewEn: "Jidia Towers offers an integrated lifestyle concept that blends upscale living with promising investment opportunities in Jeddah, featuring contemporary architectural design and thoughtfully planned amenities that support everyday living and align with future aspirations. The project offers a tranquil residential environment that blends privacy with high quality construction, set in a strategic location close to Jeddah's key destinations and services. It delivers a balanced lifestyle for residents while presenting investors with a promising real estate opportunity and strong returns in both the short and long term.",
    overviewAr: "في موقع استثنائي بمدينة جدة، وتحديداً ضمن مخطط درب الحرمين، يتجسد مشروع جذيا تاورز - JIDIA TOWERS ليقدم تجربة سكنية متكاملة تجمع بين الهدوء والخصوصية. يتميز المشروع بإطلالات مباشرة على أكبر حديقة مركزية وأكبر ممشى سياحي في جدة، مع قربه من أبرز المعالم والخدمات الحيوية والمراكز التعليمية والطبية، وأشهر وجهات التسوق والترفيه. كما يبعد دقائق فقط عن محطة قطار الحرمين، ليجسد اختياراً ذكياً صُمم ليمنحك أسلوب حياة متوازناً.",
    
    highlightsEn: [
      "Overlooking the central park and tourist promenade in Jeddah",
      "Direct access to Haramain High-Speed Railway Station",
      "24/7 smart surveillance & digital access control",
      "Integrated health club, gym, paddle tennis, & running track",
      "Dedicated family BBQ areas & AC community gathering hall",
      "Prime location near King Abdulaziz University & major malls"
    ],
    highlightsAr: [
      "إطلالة مباشرة على الحديقة المركزية والممشى السياحي الأكبر بجدة",
      "وصول مباشر وسريع لمحطة قطار الحرمين السريع",
      "نظام مراقبة ذكي 24/7 ودخول رقمي مشفر",
      "مجمع رياضي متكامل يشمل جيم، ملعب بادل، ومسار ركض",
      "مناطق شواء عائلية مخصصة وصالة اجتماعية مكيفة",
      "موقع استراتيجي قرب جامعة الملك عبد العزيز والأندلس والسلام مول"
    ],
    
    images: [
      {
        url: "https://res.cloudinary.com/dmfv1fyhp/image/upload/v1786369780/3_dahkh6.webp",
        captionEn: "JIDIA TOWERS Main High-Rise Exterior Evening View",
        captionAr: "المنظور الخارجي الرئيسي لبرج جذيا عند المساء"
      },
      {
        url: "https://res.cloudinary.com/dmfv1fyhp/image/upload/v1786369780/43_cpqrzz.webp",
        captionEn: "Front Facade & Plaza Architecture",
        captionAr: "الواجهة المعمارية الأمامية والساحة الرئيسية"
      },
      {
        url: "https://res.cloudinary.com/dmfv1fyhp/image/upload/v1786369780/90_rmofpf.webp",
        captionEn: "Street Promenade & Retail Ground Level",
        captionAr: "الممشى التجاري والمحلات بالدور الأرضي"
      },
      {
        url: "https://res.cloudinary.com/dmfv1fyhp/image/upload/v1786369779/122_a5jilo.webp",
        captionEn: "Architectural Perspective View",
        captionAr: "منظور معمارى برج جذيا"
      },
      {
        url: "https://res.cloudinary.com/dmfv1fyhp/image/upload/v1786369779/Untitled-design-39_tvuobj.webp",
        captionEn: "Fitness Gym & Sports Lounge",
        captionAr: "الصالة الرياضية والجيم الحديث"
      },
      {
        url: "https://res.cloudinary.com/dmfv1fyhp/image/upload/v1786369779/Untitled-design-38_mqagch.webp",
        captionEn: "Luxury Entrance Lobby & Reception",
        captionAr: "البهو الفندقي الرئيسي وصالة الاستقبال"
      }
    ],
    
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    
    amenities: [
      {
        badge: "📹",
        titleEn: "SURVEILLANCE SYSTEM",
        titleAr: "أنظمة المراقبة والأمان",
        descEn: "24/7 active surveillance systems active throughout the property.",
        descAr: "أنظمة مراقبة وأمان تعمل على مدار الساعة ٢٤/٧ في جميع مرافق المشروع."
      },
      {
        badge: "🏛️",
        titleEn: "AC COMMUNITY HALL",
        titleAr: "صالة مناسبات مجتمعية",
        descEn: "A climate-controlled communal space for resident gatherings and events.",
        descAr: "صالة مغلقة ومكيفة مخصصة لفعاليات واجتماعات السكان."
      },
      {
        badge: "🧯",
        titleEn: "FIREFIGHTING SYSTEM",
        titleAr: "أنظمة المكافحة والسلامة",
        descEn: "Integrated safety systems built to high-quality construction standards.",
        descAr: "أنظمة سلامة وإطفاء متكاملة مبنية وفق أعلى معايير الجودة العالمية."
      },
      {
        badge: "🎠",
        titleEn: "CHILDREN'S PLAY AREA",
        titleAr: "منطقة ألعاب الأطفال",
        descEn: "Dedicated family zones designed for safety and recreation.",
        descAr: "منطقة ألعاب آمنة ومجهزة للأطفال والعائلات."
      },
      {
        badge: "🏊",
        titleEn: "SWIMMING POOL",
        titleAr: "حمام السباحة",
        descEn: "Dedicated pool area for residents and relaxation.",
        descAr: "حمام سباحة مخصص ومجهز لجميع السكان."
      },
      {
        badge: "🏋️",
        titleEn: "FITNESS GYM",
        titleAr: "النادي الرياضي",
        descEn: "A fully equipped fitness center with state-of-the-art machinery.",
        descAr: "مركز لياقة بدنية وجيم مجهز بالكامل بأحدث الأجهزة."
      },
      {
        badge: "🎾",
        titleEn: "PADDLE TENNIS COURT",
        titleAr: "ملعب بادل تينس",
        descEn: "On-site modern sports facilities for residents.",
        descAr: "ملعب رياضي مخصص لرياضة البادل تينس."
      },
      {
        badge: "🏃",
        titleEn: "RUNNING TRACK",
        titleAr: "مسار الجري والمشي",
        descEn: "Dedicated outdoor running path for daily exercise.",
        descAr: "مسار مخصص للركض والمشي في الهواء الطلق."
      },
      {
        badge: "📱",
        titleEn: "SMART HOME SYSTEM",
        titleAr: "أنظمة المنزل الذكي",
        descEn: "Enhanced security and convenience through digital access controls.",
        descAr: "تحكم رقمي بالمنزل وأنظمة دخول إلكترونية شفرية."
      },
      {
        badge: "🍖",
        titleEn: "BBQ AREAS",
        titleAr: "مناطق الشواء",
        descEn: "Designated spots for outdoor cooking and social gatherings.",
        descAr: "جلسات خارجية ومناطق مخصصة لإقامة حفلات الشواء."
      }
    ],
    
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3711.458920439!2d39.2251!3d21.5033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3d01fb1137e59%3A0xe059579737b11844!2sDarb%20Alharamain%2C%20Jeddah%20Saudi%20Arabia!5e0!3m2!1sen!2ssa!4v1700000000000!5m2!1sen!2ssa",
    landmarks: [
      { nameEn: "Haramain High-Speed Railway Station", nameAr: "محطة قطار الحرمين السريع", distEn: "3 Mins", distAr: "٣ دقائق" },
      { nameEn: "King Abdulaziz University", nameAr: "جامعة الملك عبد العزيز", distEn: "5 Mins", distAr: "٥ دقائق" },
      { nameEn: "Andalus Mall & Salam Mall", nameAr: "الأندلس مول والسلام مول", distEn: "4 Mins", distAr: "٤ دقائق" },
      { nameEn: "King Fahd Medical Research Center", nameAr: "مركز الملك فهد للبحوث الطبية", distEn: "6 Mins", distAr: "٦ دقائق" }
    ]
  },

  // ── 3. SAKAN VIEW ─────────────────────────────────────────────────────────
  {
    id: "sakan-view",
    nameEn: "SAKAN VIEW",
    nameAr: "سَكَن فيو (SAKAN VIEW)",
    developerEn: "Asrid Developments",
    developerAr: "شركة أسريد للتطوير العقاري",
    cityEn: "Jeddah",
    cityAr: "جدة",
    districtEn: "Shams Al-Arous District",
    districtAr: "مخطط شمس العروس",
    
    startingPriceEn: "from SAR 450K",
    startingPriceAr: "ابتداءً من ٤٥٠ ألف ر.س",
    priceRangeEn: "SAR 450K – 750K",
    priceRangeAr: "٤٥٠ ألف – ٧٥٠ ألف ر.س",
    
    sizeEn: "Building Area: 17,810 m²",
    sizeAr: "مساحة المباني: ١٧,٨١٠ م²",
    typeEn: "Upscale Residential & Multi-Building Complex",
    typeAr: "مجمع سكني راقٍ وعصري",
    statusEn: "Off-Plan",
    statusAr: "على المخطط",
    expectedDeliveryEn: "Q4 2026",
    expectedDeliveryAr: "الربع الرابع ٢٠٢٦",
    unitsCountEn: "90 Units (5 Buildings)",
    unitsCountAr: "٩٠ وحدة سكنية (٥ مباني)",
    floorsEn: "5 Buildings",
    floorsAr: "٥ مبانٍ سكنية",
    
    overviewEn: "SAKAN VIEW project introduces a new concept of upscale living in Jeddah, combining modern architectural design with integrated amenities to offer a comprehensive residential experience. Its strategic location provides residents with easy access to the city's key business and service hubs, making it the ideal choice for those seeking both comfort and distinction.",
    overviewAr: "يقدم مشروع سكن فيو مفهوماً جديداً للسكن الراقي في مدينة جدة، حيث يجمع بين التصميم المعماري الحديث والمرافق المتكاملة لتوفير تجربة سكنية متكاملة. يتميز المشروع بموقعه الاستراتيجي الذي يتيح للسكان سهولة الوصول إلى أهم المراكز الحيوية والخدمية في المدينة، مما يجعله الخيار المثالي لمن يبحث عن الراحة والتميز في آن واحد.",
    
    highlightsEn: [
      "Strategically located in Shams Al-Arous District, Jeddah",
      "5 integrated residential buildings featuring 90 premium units",
      "Direct access to Palestine Street, Tahlia Promenade, & King Abdullah Bridge",
      "Hotel-style entrance and luxury hospitality finishings",
      "Free Owners Union registration for the 1st year",
      "10-year building insurance policy & 25-year structural warranty"
    ],
    highlightsAr: [
      "موقع استراتيجي في مخطط شمس العروس بمدينة جدة",
      "٥ مبانٍ سكنية متكاملة تضم ٩٠ وحدة سكنية فاخرة",
      "سهولة الوصول إلى شارع فلسطين، ممشى التحلية، وجسر الملك عبد الله",
      "مدخل فندقي فاخر وتشطيبات راقية على أعلى معايير الجودة",
      "اتحاد ملاك مجاني للسنة الأولى",
      "وثيقة تأمين على المبنى لمدة ١٠ سنوات وضمان إنشائي ٢٥ عاماً"
    ],
    
    images: [
      {
        url: "https://res.cloudinary.com/dmfv1fyhp/image/upload/v1786371122/WhatsApp_Image_2026-08-10_at_7.40.58_PM_3_ujm9my.jpg",
        captionEn: "SAKAN VIEW Exterior Facade & Landscaping",
        captionAr: "الواجهة المعمارية واللاندسكيب لمشروع سكن فيو"
      },
      {
        url: "https://res.cloudinary.com/dmfv1fyhp/image/upload/v1786371122/WhatsApp_Image_2026-08-10_at_7.40.58_PM_xjwkxd.jpg",
        captionEn: "Sunset Perspective & Modern Architecture",
        captionAr: "منظور الغروب والتصميم المعماري الحديث"
      },
      {
        url: "https://res.cloudinary.com/dmfv1fyhp/image/upload/v1786371121/WhatsApp_Image_2026-08-10_at_7.40.58_PM_1_r0x4ry.jpg",
        captionEn: "Masterplan Promenade & Green Gardens",
        captionAr: "المخطط العام والمسطحات الخضراء"
      },
      {
        url: "https://res.cloudinary.com/dmfv1fyhp/image/upload/v1786371121/WhatsApp_Image_2026-08-10_at_7.40.58_PM_2_dxxkw1.jpg",
        captionEn: "District Location & Road Network Overview",
        captionAr: "الموقع الاستراتيجي في مخطط شمس العروس"
      }
    ],
    
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    
    amenities: [
      {
        badge: "🏨",
        titleEn: "HOTEL-STYLE LOBBY",
        titleAr: "مدخل فندقي فاخر",
        descEn: "Hospitality entrance lobby with marble finishes.",
        descAr: "مدخل بنمط فندقي فاخر وتشطيبات رخامية راقية."
      },
      {
        badge: "❄️",
        titleEn: "CENTRAL AIR CONDITIONING",
        titleAr: "تكييف مركزي",
        descEn: "Integrated climate control system across all units.",
        descAr: "نظام تكييف مركزي متكامل يغطي كافة الوحدات."
      },
      {
        badge: "📱",
        titleEn: "SMART HOME AUTOMATION",
        titleAr: "أنظمة سمارت هوم",
        descEn: "Digital access controls and smart automation.",
        descAr: "تحكم ذكي بالمنزل وأنظمة دخول إلكترونية شفرية."
      },
      {
        badge: "🚪",
        titleEn: "PREMIUM WPC DOORS",
        titleAr: "أبواب WPC فاخرة",
        descEn: "Durable moisture-resistant WPC wooden doors.",
        descAr: "أبواب خشبية فاخرة مقاومة للرطوبة والعوامل الجوية."
      },
      {
        badge: "🛡️",
        titleEn: "24/7 SECURITY & SURVEILLANCE",
        titleAr: "أمان ومراقبة 24 ساعة",
        descEn: "Round-the-clock CCTV cameras and security coverage.",
        descAr: "أنظمة أمان ومراقبة تعمل على مدار الساعة."
      },
      {
        badge: "🛗",
        titleEn: "ELEVATORS PER BUILDING",
        titleAr: "مصعدين لكل عمارة",
        descEn: "2 high-speed elevators dedicated per building.",
        descAr: "مصعدين مخصصين لكل عمارة سكنية."
      }
    ],
    
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3711.458920439!2d39.2251!3d21.5033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3d01fb1137e59%3A0xe059579737b11844!2sJeddah%20Saudi%20Arabia!5e0!3m2!1sen!2ssa!4v1700000000000!5m2!1sen!2ssa",
    landmarks: [
      { nameEn: "Palestine Street Corridor", nameAr: "شارع فلسطين الرئيسي", distEn: "2 Mins", distAr: "دقيقتان" },
      { nameEn: "Haramain High-Speed Train Station", nameAr: "محطة قطار الحرمين السريع", distEn: "5 Mins", distAr: "٥ دقائق" },
      { nameEn: "Tahlia Promenade", nameAr: "ممشى التحلية", distEn: "6 Mins", distAr: "٦ دقائق" },
      { nameEn: "King Abdullah Bridge", nameAr: "جسر الملك عبد الله", distEn: "4 Mins", distAr: "٤ دقائق" }
    ]
  },

  // ── 4. SAKAN VIEW 2 ───────────────────────────────────────────────────────
  {
    id: "sakan-view-2",
    nameEn: "SAKAN VIEW 2",
    nameAr: "سَكَن فيو 2 (SAKAN VIEW 2)",
    developerEn: "Asrid Developments",
    developerAr: "شركة أسريد للتطوير العقاري",
    cityEn: "Jeddah",
    cityAr: "جدة",
    districtEn: "Shams Al-Arous District",
    districtAr: "مخطط شمس العروس",
    
    startingPriceEn: "from SAR 450K",
    startingPriceAr: "ابتداءً من ٤٥٠ ألف ر.س",
    priceRangeEn: "SAR 450K – 750K",
    priceRangeAr: "٤٥٠ ألف – ٧٥٠ ألف ر.س",
    
    sizeEn: "Building Area: 5,200 m²",
    sizeAr: "مساحة المباني: ٥,٢٠٠ م²",
    typeEn: "Modern Residential Twin Buildings",
    typeAr: "مباني سكنية مزدوجة حديثة",
    statusEn: "Off-Plan",
    statusAr: "على المخطط",
    expectedDeliveryEn: "Q4 2026",
    expectedDeliveryAr: "الربع الرابع ٢٠٢٦",
    unitsCountEn: "36 Units (2 Buildings)",
    unitsCountAr: "٣٦ وحدة سكنية (مبنيين)",
    floorsEn: "2 Buildings",
    floorsAr: "مبنيان سكنيان",
    
    overviewEn: "SAKAN VIEW 2 project redefines modern living in Jeddah, blending contemporary architectural elegance with fully integrated facilities and services to offer residents a truly distinctive lifestyle. Its strategic location ensures easy access to the city's most prominent landmarks and essential destinations, making it the perfect choice for those seeking comfort, quality, and sophistication in one place.",
    overviewAr: "مشروع سكن فيو 2 يرتقي بمفهوم الحياة العصريّة في جدة، حيث يجمع بين روعة التصميم المعماري الحديث وتكامل المرافق والخدمات، ليمنح السكان تجربة سكنية مميزة. يتمتع المشروع بموقعه الاستراتيجي الذي يسهل الوصول إلى أبرز المراكز الحيوية والخدمية في المدينة، مما يجعله الخيار الأمثل لكل من يبحث عن الراحة، الجودة، والتميز في سكن متكامل.",
    
    highlightsEn: [
      "Strategically located in Shams Al-Arous District, Jeddah",
      "Twin residential buildings featuring 36 luxury units",
      "Direct access to Palestine Street, Tahlia Walk, & King Abdullah Bridge",
      "Hotel-style entrance and hospitality lobby finishings",
      "Free Owners Union registration for the 1st year",
      "10-year building insurance policy & 25-year structural warranty"
    ],
    highlightsAr: [
      "موقع استراتيجي في مخطط شمس العروس بمدينة جدة",
      "مبنيان سكنيان مزدوجان يضمان ٣٦ وحدة سكنية فاخرة",
      "سهولة الوصول إلى شارع فلسطين، ممشى التحلية، وجسر الملك عبد الله",
      "مدخل بنمط فندقي فاخر وتشطيبات راقية على أعلى معايير الجودة",
      "اتحاد ملاك مجاني للسنة الأولى",
      "وثيقة تأمين على المبنى لمدة ١٠ سنوات وضمان إنشائي ٢٥ عاماً"
    ],
    
    images: [
      {
        url: "https://res.cloudinary.com/dmfv1fyhp/image/upload/v1786371436/Sakan_view_2_img_1_fpx5vi.jpg",
        captionEn: "SAKAN VIEW 2 Twin Buildings Facade View",
        captionAr: "الواجهة المعمارية الرئيسية لمباني سكن فيو 2"
      },
      {
        url: "https://res.cloudinary.com/dmfv1fyhp/image/upload/v1786371436/Sakan_view_2_Img_2_p9mb6d.jpg",
        captionEn: "District Location & Road Access Overview",
        captionAr: "الموقع الاستراتيجي في مخطط شمس العروس"
      }
    ],
    
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    
    amenities: [
      {
        badge: "🏨",
        titleEn: "HOTEL-STYLE LOBBY",
        titleAr: "مدخل طابع فندقي",
        descEn: "Hospitality entrance lobby with marble finishes.",
        descAr: "مدخل بنمط فندقي فاخر وتشطيبات رخامية راقية."
      },
      {
        badge: "❄️",
        titleEn: "CENTRAL AIR CONDITIONING",
        titleAr: "تكييف مركزي",
        descEn: "Integrated climate control system across all units.",
        descAr: "نظام تكييف مركزي متكامل يغطي كافة الوحدات."
      },
      {
        badge: "📱",
        titleEn: "SMART HOME AUTOMATION",
        titleAr: "أنظمة سمارت هوم",
        descEn: "Digital access controls and smart automation.",
        descAr: "تحكم ذكي بالمنزل وأنظمة دخول إلكترونية شفرية."
      },
      {
        badge: "🚪",
        titleEn: "PREMIUM WPC DOORS",
        titleAr: "أبواب WPC فاخرة",
        descEn: "Durable moisture-resistant WPC wooden doors.",
        descAr: "أبواب خشبية فاخرة مقاومة للرطوبة والعوامل الجوية."
      },
      {
        badge: "🛡️",
        titleEn: "24/7 SECURITY & SURVEILLANCE",
        titleAr: "أمان ومراقبة 24 ساعة",
        descEn: "Round-the-clock CCTV cameras and security coverage.",
        descAr: "أنظمة أمان ومراقبة تعمل على مدار الساعة."
      },
      {
        badge: "🛗",
        titleEn: "ELEVATORS PER BUILDING",
        titleAr: "مصعدين لكل عمارة",
        descEn: "2 high-speed elevators dedicated per building.",
        descAr: "مصعدين مخصصين لكل عمارة سكنية."
      }
    ],
    
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3711.458920439!2d39.2251!3d21.5033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3d01fb1137e59%3A0xe059579737b11844!2sJeddah%20Saudi%20Arabia!5e0!3m2!1sen!2ssa!4v1700000000000!5m2!1sen!2ssa",
    landmarks: [
      { nameEn: "Palestine Street Corridor", nameAr: "شارع فلسطين الرئيسي", distEn: "2 Mins", distAr: "دقيقتان" },
      { nameEn: "Haramain High-Speed Train Station", nameAr: "محطة قطار الحرمين السريع", distEn: "5 Mins", distAr: "٥ دقائق" },
      { nameEn: "Tahlia Walk & Promenade", nameAr: "ممشى التحلية", distEn: "6 Mins", distAr: "٦ دقائق" },
      { nameEn: "King Abdullah Bridge", nameAr: "جسر الملك عبد الله", distEn: "4 Mins", distAr: "٤ دقائق" }
    ]
  },

  // ── 5. SAKAN VIEW 3 ───────────────────────────────────────────────────────
  {
    id: "sakan-view-3",
    nameEn: "SAKAN VIEW 3",
    nameAr: "سَكَن فيو 3 (SAKAN VIEW 3)",
    developerEn: "Asrid Developments",
    developerAr: "شركة أسريد للتطوير العقاري",
    cityEn: "Jeddah",
    cityAr: "جدة",
    districtEn: "Shams Al-Arous District",
    districtAr: "مخطط شمس العروس",
    
    startingPriceEn: "from SAR 450K",
    startingPriceAr: "ابتداءً من ٤٥٠ ألف ر.س",
    priceRangeEn: "SAR 450K – 780K",
    priceRangeAr: "٤٥٠ ألف – ٧٨٠ ألف ر.س",
    
    sizeEn: "Building Area: 14,240 m²",
    sizeAr: "مساحة المباني: ١٤,٢٤٠ م²",
    typeEn: "Modern Residential Complex (5 Buildings)",
    typeAr: "مجمع سكني راقٍ (٥ مبانٍ سكنية)",
    statusEn: "Off-Plan",
    statusAr: "على المخطط",
    expectedDeliveryEn: "Q4 2026",
    expectedDeliveryAr: "الربع الرابع ٢٠٢٦",
    unitsCountEn: "115 Units (5 Buildings)",
    unitsCountAr: "١١٥ وحدة سكنية (٥ مباني)",
    floorsEn: "5 Buildings",
    floorsAr: "٥ مبانٍ سكنية",
    
    overviewEn: "Sakan View 3 is a distinctive residential project that combines modern architecture, integrated amenities, and a strategic location in Jeddah, offering easy access to key destinations and an exceptional lifestyle of comfort and quality.",
    overviewAr: "سكن فيو 3 مشروع سكني استثنائي، صُمم ليلبي متطلبات الحياة العصرية وتطلعاتك المستقبلية، حيث يلتقي التصميم المعماري الأنيق مع تكامل الخدمات والمرافق في بيئة سكنية متكاملة. وبفضل موقعه الاستراتيجي في مدينة جدة، يمنحك المشروع سهولة الوصول إلى أهم الوجهات الحيوية والخدمية، ليكون الخيار الأمثل لمن يبحث عن جودة الحياة والراحة والتميز في عنوان واحد.",
    
    highlightsEn: [
      "Located within Shams Al-Arous masterplan, Jeddah",
      "5 integrated residential buildings featuring 115 premium units",
      "Just minutes from Palestine Street, King Abdulaziz University, & Tahlia Walk",
      "Hotel-style entrance and luxury hospitality lobby finishings",
      "Free Owners Union registration for the 1st year",
      "10-year building insurance policy & 25-year structural warranty"
    ],
    highlightsAr: [
      "موقع استراتيجي في مخطط شمس العروس بمدينة جدة",
      "٥ مبانٍ سكنية متكاملة تضم ١١٥ وحدة سكنية فاخرة",
      "دقائق معدودة من شارع فلسطين، جامعة الملك عبد العزيز، وممشى التحلية",
      "مدخل بنمط فندقي فاخر وتشطيبات راقية على أعلى معايير الجودة",
      "اتحاد ملاك مجاني للسنة الأولى",
      "وثيقة تأمين على المبنى لمدة ١٠ سنوات وضمان إنشائي ٢٥ عاماً"
    ],
    
    images: [
      {
        url: "https://res.cloudinary.com/dmfv1fyhp/image/upload/v1786371972/Image_1_uesovi.jpg",
        captionEn: "SAKAN VIEW 3 Streetscape & Evening Facade",
        captionAr: "الواجهة الخارجية والممشى السكني لمشروع سكن فيو 3"
      },
      {
        url: "https://res.cloudinary.com/dmfv1fyhp/image/upload/v1786371971/Image_2_rcdyhl.jpg",
        captionEn: "Modern Exterior Architectural Facade",
        captionAr: "منظور التصميم المعماري الحديث"
      },
      {
        url: "https://res.cloudinary.com/dmfv1fyhp/image/upload/v1786371970/Image_3_l7umbt.jpg",
        captionEn: "Residential Promenade Perspective",
        captionAr: "الواجهة المعمارية العامة ومواقف السيارات"
      }
    ],
    
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    
    amenities: [
      {
        badge: "🏨",
        titleEn: "HOTEL-STYLE LOBBY",
        titleAr: "مدخل طابع فندقي",
        descEn: "Hospitality entrance lobby with marble finishes.",
        descAr: "مدخل بنمط فندقي فاخر وتشطيبات رخامية راقية."
      },
      {
        badge: "❄️",
        titleEn: "CENTRAL AIR CONDITIONING",
        titleAr: "تكييف مركزي",
        descEn: "Integrated climate control system across all units.",
        descAr: "نظام تكييف مركزي متكامل يغطي كافة الوحدات."
      },
      {
        badge: "📱",
        titleEn: "SMART HOME AUTOMATION",
        titleAr: "أنظمة سمارت هوم",
        descEn: "Digital access controls and smart automation.",
        descAr: "تحكم ذكي بالمنزل وأنظمة دخول إلكترونية شفرية."
      },
      {
        badge: "🚪",
        titleEn: "PREMIUM WPC DOORS",
        titleAr: "أبواب WPC فاخرة",
        descEn: "Durable moisture-resistant WPC wooden doors.",
        descAr: "أبواب خشبية فاخرة مقاومة للرطوبة والعوامل الجوية."
      },
      {
        badge: "🛡️",
        titleEn: "24/7 SECURITY & SURVEILLANCE",
        titleAr: "أمان ومراقبة 24 ساعة",
        descEn: "Round-the-clock CCTV cameras and security coverage.",
        descAr: "أنظمة أمان ومراقبة تعمل على مدار الساعة."
      },
      {
        badge: "🛗",
        titleEn: "ELEVATORS PER BUILDING",
        titleAr: "مصعدين لكل عمارة",
        descEn: "2 high-speed elevators dedicated per building.",
        descAr: "مصعدين مخصصين لكل عمارة سكنية."
      }
    ],
    
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3711.458920439!2d39.2251!3d21.5033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3d01fb1137e59%3A0xe059579737b11844!2sJeddah%20Saudi%20Arabia!5e0!3m2!1sen!2ssa!4v1700000000000!5m2!1sen!2ssa",
    landmarks: [
      { nameEn: "Palestine Street Corridor", nameAr: "شارع فلسطين الرئيسي", distEn: "2 Mins", distAr: "دقيقتان" },
      { nameEn: "King Abdulaziz University", nameAr: "جامعة الملك عبد العزيز", distEn: "5 Mins", distAr: "٥ دقائق" },
      { nameEn: "Haramain High-Speed Train Station", nameAr: "محطة قطار الحرمين السريع", distEn: "5 Mins", distAr: "٥ دقائق" },
      { nameEn: "Tahlia Walk & Promenade", nameAr: "ممشى التحلية", distEn: "6 Mins", distAr: "٦ دقائق" }
    ]
  }
];

export function getProjectById(id: string): ProjectDetail {
  const found = PROJECTS_DATA.find((p) => p.id === id);
  return found || PROJECTS_DATA[0];
}
