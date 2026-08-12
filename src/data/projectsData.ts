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

  // ── 3. SUHAIL COMPOUND ───────────────────────────────────────────────────
  {
    id: "suhail-compound",
    nameEn: "Suhail Compound",
    nameAr: "مجمع سهيل السكني",
    developerEn: "Suhail Developments",
    developerAr: "شركة سهيل للتطوير العقاري",
    cityEn: "Madinah",
    cityAr: "المدينة المنورة",
    districtEn: "Southeast Madinah",
    districtAr: "جنوب شرق المدينة المنورة",
    
    startingPriceEn: "from SAR 249K",
    startingPriceAr: "ابتداءً من ٢٤٩ ألف ر.س",
    priceRangeEn: "SAR 249K – 390K",
    priceRangeAr: "٢٤٩ ألف – ٣٩٠ ألف ر.س",
    
    sizeEn: "2 - 3 Bedroom Modern Units",
    sizeAr: "شقق سكنية ٢ - ٣ غرف نوم",
    typeEn: "Gated Residential Compound",
    typeAr: "مجمع سكني مغلق ومتكامل",
    statusEn: "Off-Plan",
    statusAr: "على المخطط",
    expectedDeliveryEn: "Q1 2027",
    expectedDeliveryAr: "الربع الأول ٢٠٢٧",
    unitsCountEn: "2 Layouts (2-3 Beds)",
    unitsCountAr: "نموذجان سكنيان (٢-٣ غرف)",
    floorsEn: "Gated Community",
    floorsAr: "مجمع سكني خاص",
    
    overviewEn: "Strategically situated in the southeast of Madinah with fast connectivity to major routes like the Riyadh-Qassim Fast Route, Prince Mugrin bin Abdulaziz Road, and the Third Ring Road, this premium gated compound offers an exceptional residential experience designed to deliver luxury, comfort, and ultimate privacy. The development is ideally located just five minutes from essential public services, seven minutes from King Abdullah Road (Second Ring Road), ten minutes from the Haramain High-Speed Railway Station, and twelve minutes from both Al-Masjid an-Nabawi and the historic Quba Mosque.",
    overviewAr: "يتميز هذا المشروع السكني بموقع استراتيجي استثنائي في جنوب شرق المدينة المنورة بالقرب من طريق الرياض-القصيم السريع، طريق الأمير مقرن بن عبدالعزيز، والطريق الدائري الثالث، مما يمنح السكان توازناً مثالياً بين هدوء المسكن وسهولة الوصول لأهم المحاور الحيوية. يقع المجمع على بعد ٥ دقائق فقط من الخدمات العامة، و٧ دقائق من طريق الملك عبدالله (الدائري الثاني)، و١٠ دقائق من محطة قطار الحرمين السريع، و١٢ دقيقة فقط من الحرم النبوي الشريف ومسجد قباء.",
    
    highlightsEn: [
      "12 minutes to Al-Masjid an-Nabawi & Quba Mosque",
      "10 minutes to Haramain High-Speed Railway Station",
      "Private water tank (upper & lower) and independent electric meter",
      "Smart home entry automation & digital keyless access",
      "20-year structural warranty & 15-year plumbing and electrical warranty",
      "10-year comprehensive Tawuniya cooperative insurance coverage"
    ],
    highlightsAr: [
      "١٢ دقيقة فقط من المسجد النبوي الشريف ومسجد قباء",
      "١٠ دقائق من محطة قطار الحرمين السريع",
      "خزان مياه مستقل (علوي وسفلي) وعداد كهرباء خاص بكل وحدة",
      "أنظمة دخول ذكي وسمارت هوم متكاملة",
      "ضمان ٢٠ عاماً على الهيكل الإنشائي و١٥ عاماً على السباكة والكهرباء",
      "وثيقة تأمين شاملة لمدة ١٠ سنوات من شركة التعاونية ضد العيوب الخفية"
    ],
    
    images: [
      {
        url: "https://res.cloudinary.com/dmfv1fyhp/image/upload/v1786507306/Suhail_1_mjbezd.webp",
        captionEn: "Suhail Compound Main Promenade & Evening Facade",
        captionAr: "الواجهة الرئيسية والممشى المسائي لمجمع سهيل"
      },
      {
        url: "https://res.cloudinary.com/dmfv1fyhp/image/upload/v1786507309/Suhaill2_xt5osk.png",
        captionEn: "Interior Residential Layouts & Living Spaces",
        captionAr: "التصميم الداخلي والمساحات السكنية وصالة المعيشة"
      },
      {
        url: "https://res.cloudinary.com/dmfv1fyhp/image/upload/v1786507310/Suhaill3_ghzzny.png",
        captionEn: "Gated Community Architecture, Courtyard & Rooftop Terrace",
        captionAr: "بوابة المجمع السكني، الفناء الداخلي وجلسات السطح الترفيهية"
      }
    ],
    
    amenities: [
      {
        badge: "🅿️",
        titleEn: "COVERED PARKING",
        titleAr: "مواقف مغطاة",
        descEn: "Dedicated covered parking slots assigned for each residential unit.",
        descAr: "مواقف سيارات خاصة ومغطاة مخصصة لكل وحدة سكنية."
      },
      {
        badge: "🛡️",
        titleEn: "24/7 SECURITY",
        titleAr: "أمان وحراسة 24/7",
        descEn: "Round-the-clock integrated security and CCTV surveillance monitoring.",
        descAr: "أنظمة أمان وحراسة متواصلة وكاميرات مراقبة على مدار الساعة."
      },
      {
        badge: "📱",
        titleEn: "SMART HOME",
        titleAr: "أنظمة المنزل الذكي",
        descEn: "Advanced digital keyless access and automated smart home controls.",
        descAr: "أنظمة تحكم ودخول ذكي إلكترونية حديثة لكافة الوحدات."
      },
      {
        badge: "🌳",
        titleEn: "PRIVATE GARDEN",
        titleAr: "حديقة خاصة ولاندسكيب",
        descEn: "Thoughtfully designed internal landscape gardens and green spaces.",
        descAr: "حديقة داخلية ومساحات خضراء مصممة بعناية فائقة."
      },
      {
        badge: "🏢",
        titleEn: "SHARED ROOFTOP",
        titleAr: "أسطح ترفيهية مشتركة",
        descEn: "Shared leisure rooftop sitting areas with open panoramic views.",
        descAr: "أسطح ترفيهية وجلسات مشتركة بإطلالات رحبة ومفتوحة."
      },
      {
        badge: "🏙️",
        titleEn: "LANDMARK VIEW",
        titleAr: "إطلالات على المعالم",
        descEn: "Scenic open views overlooking vibrant Madinah city landmarks.",
        descAr: "إطلالات بانورامية مفتوحة على أهم معالم المدينة المنورة."
      },
      {
        badge: "💧",
        titleEn: "INDEPENDENT TANKS",
        titleAr: "خزانات مياه مستقلة",
        descEn: "Dedicated upper and lower private water tanks for complete independence.",
        descAr: "خزان مياه مستقل (علوي وسفلي) لكل شقة لضمان الاستقلالية التامة."
      },
      {
        badge: "⚡",
        titleEn: "PRIVATE POWER METER",
        titleAr: "عداد كهرباء مستقل",
        descEn: "Dedicated smart electricity meter assigned to each apartment.",
        descAr: "عداد كهرباء مستقل وخاص بكل وحدة سكنية."
      },
      {
        badge: "📜",
        titleEn: "STRUCTURAL GUARANTEES",
        titleAr: "ضمانات إنشائية وتأمين",
        descEn: "20-year structural framework warranty, 15-year MEP, and 10-year Tawuniya insurance.",
        descAr: "ضمان ٢٠ عاماً على الهيكل الإنشائي و١٥ عاماً على التمديدات وتأمين التعاونية."
      },
      {
        badge: "🛋️",
        titleEn: "INTERNAL SITTING AREAS",
        titleAr: "جلسات واستراحات داخلية",
        descEn: "Elegantly furnished community seating lounges and family waiting spaces.",
        descAr: "مساحات جلوس واستراحات عائلية داخلية مصممة بأناقة وراحة."
      }
    ],
    
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3400.6689365607936!2d39.6983056!3d24.436027799999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjTCsDI2JzA5LjciTiAzOcKwNDEnNTMuOSJF!5e1!3m2!1sen!2sin!4v1782909993578!5m2!1sen!2sin",
    landmarks: [
      { nameEn: "King Abdullah Road (2nd Ring)", nameAr: "طريق الملك عبدالله (الدائري الثاني)", distEn: "7 Mins", distAr: "٧ دقائق" },
      { nameEn: "Haramain High-Speed Railway Station", nameAr: "محطة قطار الحرمين السريع", distEn: "10 Mins", distAr: "١٠ دقائق" },
      { nameEn: "Al-Masjid an-Nabawi", nameAr: "المسجد النبوي الشريف", distEn: "12 Mins", distAr: "١٢ دقيقة" },
      { nameEn: "Historic Quba Mosque", nameAr: "مسجد قباء التاريخي", distEn: "12 Mins", distAr: "١٢ دقيقة" }
    ],
    
    brochureUrl: "https://res.cloudinary.com/dmfv1fyhp/image/upload/v1782909932/kinioevhhm4dndp9y1mb.pdf",
    brochureSizeEn: "12.4 MB PDF",
    brochureSizeAr: "١٢.٤ ميجابايت PDF"
  },

  // ── 4. SHURFAH ───────────────────────────────────────────────────────────
  {
    id: "shurfah",
    nameEn: "Shurfah",
    nameAr: "شرفة",
    developerEn: "Darb Al-Haramain Developments",
    developerAr: "شركة درب الحرمين للتطوير العقاري",
    cityEn: "Jeddah",
    cityAr: "جدة",
    districtEn: "Al Fayhaa (Darb Al-Haramain)",
    districtAr: "حي الفيحاء (درب الحرمين)",
    
    startingPriceEn: "from SAR 199K",
    startingPriceAr: "ابتداءً من ١٩٩ ألف ر.س",
    priceRangeEn: "SAR 199K – 580K",
    priceRangeAr: "١٩٩ ألف – ٥٨٠ ألف ر.س",
    
    sizeEn: "Smart Suites to 4-Bedroom Units",
    sizeAr: "أجنحة ذكية إلى شقق ٤ غرف",
    typeEn: "Park-Facing Residential Tower",
    typeAr: "برج سكني فاخر مطل على الحديقة",
    statusEn: "Off-Plan",
    statusAr: "على المخطط",
    expectedDeliveryEn: "Q2 2027",
    expectedDeliveryAr: "الربع الثاني ٢٠٢٧",
    unitsCountEn: "24 Custom Layouts",
    unitsCountAr: "٢٤ نموذج سكني متاح",
    floorsEn: "High-Rise Tower",
    floorsAr: "برج سكني حديث",
    
    overviewEn: "Located in the heart of the vibrant Darb Al-Haramain area within Jeddah's Al-Fayhaa District, this premier residential project seamlessly blends contemporary architectural elegance with natural serenity, offering an exceptional lifestyle crafted for those seeking high-end urban living with peaceful green views. The development is ideally situated just minutes away from Jeddah's most iconic landmarks, offering effortless connectivity to the Haramain High-Speed Railway Station, King Abdulaziz University, the International Airport, Dr. Sulaiman Al-Habib Hospital, and premier shopping destinations including Al-Salam and Al-Andalus Malls.",
    overviewAr: "يقع هذا المشروع السكني الرائد في قلب منطقة درب الحرمين الحيوية بحي الفيحاء في جدة، ليقدم نموذجاً فريداً للفخامة المعمارية والتصميم الذكي الذي يدمج بأناقة بين حيوية المدينة العصرية وهدوء الطبيعة المحيطة. يتميز المشروع بموقع استراتيجي يضعه على مقربة من جامعة الملك عبدالعزيز، محطة قطار الحرمين، ومراكز التسوق الكبرى مثل السلام مول والأندلس مول، ويوفر بيئة سكنية متكاملة بمساحات خضراء ممتدة وأندية رياضية منفصلة للرجال والنساء.",
    
    highlightsEn: [
      "Direct park-facing views with landscaped green zones",
      "Minutes to Haramain High-Speed Railway & King Abdulaziz University",
      "Separate fully equipped male and female fitness gyms",
      "Multi-purpose sports court, on-site mini-market & luxury lounge",
      "20-year structural warranty & 25-year electrical warranty",
      "Central gas network, smart access, and private water tank"
    ],
    highlightsAr: [
      "إطلالات مباشرة على الحديقة المركزية والمسطحات الخضراء",
      "دقائق من محطة قطار الحرمين السريع وجامعة الملك عبدالعزيز",
      "أندية رياضية مجهزة بالكامل ومنفصلة للرجال والنساء",
      "ملعب رياضي متعدد الاستخدامات وميني ماركت وصالة ضيافة",
      "ضمان ٢٠ عاماً على الهيكل الخرساني و٢٥ عاماً على الأنظمة الكهربائية",
      "أنظمة دخول ذكية وشبكة غاز مركزي وخزان مياه مستقل"
    ],
    
    images: [
      {
        url: "https://res.cloudinary.com/dmfv1fyhp/image/upload/v1786508255/Shurfah_1_jwzk4l.png",
        captionEn: "Shurfah Tower Exterior Architectural Perspectives",
        captionAr: "الواجهة المعمارية لبرج شرفة والمناظير الخارجية"
      },
      {
        url: "https://res.cloudinary.com/dmfv1fyhp/image/upload/v1786508254/Shurfah_3_erxsvs.png",
        captionEn: "Evening Illuminated High-Rise Elevation & Plaza",
        captionAr: "المنظور الليلي المضيء للبرج وساحة المدخل"
      },
      {
        url: "https://res.cloudinary.com/dmfv1fyhp/image/upload/v1786508247/Shurfah_2_vwxge7.png",
        captionEn: "Building S Master Floor Plan & Layout Distribution",
        captionAr: "المخطط العام وتوزيع الوحدات السكنية لمبنى S"
      },
      {
        url: "https://res.cloudinary.com/dmfv1fyhp/image/upload/v1786508241/Shurfah_4_fjeipu.jpg",
        captionEn: "Detailed Residential Unit Configuration & Floor Layout",
        captionAr: "مخطط الأدوار السكنية وتفاصيل النماذج"
      },
      {
        url: "https://res.cloudinary.com/dmfv1fyhp/image/upload/v1786508241/Shurfah_5_i5ryk3.jpg",
        captionEn: "Building H Masterplan & Residential Zoning",
        captionAr: "المخطط المعماري وتوزيع الوحدات لمبنى H"
      }
    ],
    
    amenities: [
      {
        badge: "🔥",
        titleEn: "CENTRAL GAS",
        titleAr: "شبكة غاز مركزي",
        descEn: "Safe and modern centralized piped gas distribution infrastructure.",
        descAr: "شبكة غاز مركزي حديثة وآمنة لكافة الوحدات السكنية."
      },
      {
        badge: "🏋️",
        titleEn: "GYM / FITNESS CENTER",
        titleAr: "نادي رياضي متكامل",
        descEn: "Modern health club equipped with advanced cardiovascular and strength machinery.",
        descAr: "مركز لياقة بدنية مجهز بأحدث الأجهزة الرياضية المتطورة."
      },
      {
        badge: "📹",
        titleEn: "CCTV SECURITY",
        titleAr: "كاميرات مراقبة أمنية",
        descEn: "High-definition 24/7 security surveillance covering all shared facilities.",
        descAr: "كاميرات مراقبة عالية الدقة تعمل على مدار الساعة لضمان الأمان."
      },
      {
        badge: "🧺",
        titleEn: "LAUNDRY ROOM",
        titleAr: "غرفة غسيل مخصصة",
        descEn: "Dedicated on-site laundry and drying services for residents.",
        descAr: "مرافق وغرفة غسيل متكاملة مخصصة لخدمة السكان."
      },
      {
        badge: "🅿️",
        titleEn: "COVERED PARKING",
        titleAr: "مواقف سيارات مغطاة",
        descEn: "Secure private covered parking bays assigned to each apartment.",
        descAr: "مواقف سيارات خاصة ومغطاة مخصصة لكل شقة سكنية."
      },
      {
        badge: "🛗",
        titleEn: "HIGH-SPEED ELEVATORS",
        titleAr: "مصاعد فائقة السرعة",
        descEn: "Modern automated passenger and service elevators.",
        descAr: "مصاعد حديثة وسريعة ومصاعد خدمات مخصصة."
      },
      {
        badge: "🛡️",
        titleEn: "24/7 SECURITY",
        titleAr: "حراسة أمنية 24/7",
        descEn: "Round-the-clock trained security personnel and gated access control.",
        descAr: "طاقم حراسة أمنية متواجد على مدار اليوم مع بوابات دخول آمنة."
      },
      {
        badge: "📱",
        titleEn: "SMART HOME",
        titleAr: "أنظمة سمارت هوم",
        descEn: "Comprehensive digital access controls and smart automation systems.",
        descAr: "أنظمة تحكم رقمية ودخول ذكي إلكتروني مشفر."
      },
      {
        badge: "🛒",
        titleEn: "MINI MARKET",
        titleAr: "ميني ماركت داخلي",
        descEn: "On-site convenience grocery store fulfilling daily household needs.",
        descAr: "متجر تمويني داخل المجمع لتلبية الاحتياجات اليومية بكل يسر."
      },
      {
        badge: "🕌",
        titleEn: "PRAYER ROOM",
        titleAr: "مصلى خاص",
        descEn: "Quiet, dedicated on-site community prayer hall for residents.",
        descAr: "مصلى هادئ ومجهز لأداء الصلوات لسكان المجمع."
      },
      {
        badge: "🚿",
        titleEn: "CAR WASH AREA",
        titleAr: "منطقة غسيل سيارات",
        descEn: "Designated community car wash and detailing service bay.",
        descAr: "مساحة مجهزة ومخصصة لغسيل وتنظيف السيارات."
      },
      {
        badge: "🌳",
        titleEn: "PRIVATE GARDEN",
        titleAr: "حديقة خاصة ولاندسكيب",
        descEn: "Peaceful landscaped garden retreats and lush outdoor sitting spaces.",
        descAr: "حدائق خضراء خاصة ومساحات جلوس طبيعية هادئة."
      },
      {
        badge: "🏞️",
        titleEn: "PARK FACING VIEW",
        titleAr: "إطلالات مباشرة على الحديقة",
        descEn: "Open panoramic views directly overlooking the central landscaped park.",
        descAr: "إطلالات بانورامية مفتوحة ومباشرة على الحديقة المركزية."
      },
      {
        badge: "🏀",
        titleEn: "MULTI PURPOSE SPORTS COURT",
        titleAr: "ملعب رياضي متعدد الاستخدامات",
        descEn: "Versatile sports court designed for basketball, tennis, and recreation.",
        descAr: "ملعب رياضي متعدد الأغراض لممارسة مختلف الأنشطة الرياضية."
      },
      {
        badge: "⚡",
        titleEn: "SEPARATE MALE & FEMALE GYMS",
        titleAr: "نوادي رياضية منفصلة للرجال والنساء",
        descEn: "Private, distinct fitness centers tailored for men and women.",
        descAr: "صالات رياضية مجهزة بالكامل ومنفصلة للرجال والنساء للخصوصية التامة."
      }
    ],
    
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.0698424375914!2d39.23242619999999!3d21.5050262!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3cf692bf0b0c9%3A0x30bf4385dd4fc010!2sDarb%20Alharamain!5e1!3m2!1sen!2sin!4v1781695036672!5m2!1sen!2sin",
    landmarks: [
      { nameEn: "Salam Mall & Andalus Mall", nameAr: "السلام مول والأندلس مول", distEn: "3 Mins", distAr: "٣ دقائق" },
      { nameEn: "King Abdulaziz University", nameAr: "جامعة الملك عبدالعزيز", distEn: "4 Mins", distAr: "٤ دقائق" },
      { nameEn: "Haramain High-Speed Train Station", nameAr: "محطة قطار الحرمين السريع", distEn: "4 Mins", distAr: "٤ دقائق" },
      { nameEn: "Dr. Sulaiman Al-Habib Hospital", nameAr: "مستشفى د. سليمان الحبيب", distEn: "6 Mins", distAr: "٦ دقائق" }
    ],
    
    brochureUrl: "https://res.cloudinary.com/dmfv1fyhp/image/upload/v1781687243/waxv6n8w6bzu1f5kw0kg.pdf",
    brochureSizeEn: "16.8 MB PDF",
    brochureSizeAr: "١٦.٨ ميجابايت PDF"
  },

  // ── 5. AL EZZ PROJECT (101) ───────────────────────────────────────────────
  {
    id: "al-ezz-101",
    nameEn: "Al Ezz Project (101)",
    nameAr: "مشروع العز (١٠١)",
    developerEn: "Al Ezz Developments",
    developerAr: "شركة العز للتطوير العقاري",
    cityEn: "Jeddah",
    cityAr: "جدة",
    districtEn: "Al-Fayhaa (Darb Al-Haramain)",
    districtAr: "حي الفيحاء (درب الحرمين)",
    
    startingPriceEn: "from SAR 319K",
    startingPriceAr: "ابتداءً من ٣١٩ ألف ر.س",
    priceRangeEn: "SAR 319K – 620K",
    priceRangeAr: "٣١٩ ألف – ٦٢٠ ألف ر.س",
    
    sizeEn: "2 - 5 Bedroom Luxury Units",
    sizeAr: "شقق فاخرة ٢ - ٥ غرف نوم",
    typeEn: "Luxury Residential Complex",
    typeAr: "مجمع سكني فاخر",
    statusEn: "Off-Plan",
    statusAr: "على المخطط",
    expectedDeliveryEn: "Q2 2027",
    expectedDeliveryAr: "الربع الثاني ٢٠٢٧",
    unitsCountEn: "7 Custom Layouts",
    unitsCountAr: "٧ نماذج سكنية",
    floorsEn: "King Abdullah Road Facing",
    floorsAr: "موقع على طريق الملك عبدالله",
    
    overviewEn: "Strategically situated on King Abdullah Road within the highly developing Al-Fayhaa District and Darb Al-Haramain masterplan, this luxury residential development presents an exceptional modern living experience in Jeddah. The location provides quick, unparalleled transit options, placing residents just two minutes from Al Salam Mall, four minutes from Al Andalus Mall, King Abdulaziz University, Al Fayhaa Park, and the Haramain High-Speed Train Station, with the International Airport reachable in twenty minutes. Architecturally, the towers frame a beautifully integrated sixteen-meter central landscaped green space adorned with private pedestrian walkways and custom ambient lighting designed to fuse residential comfort with nature.",
    overviewAr: "يتميز هذا المشروع السكني الفاخر بموقع استراتيجي استثنائي على طريق الملك عبدالله مباشرة ضمن مخطط درب الحرمين بحي الفيحاء، مما يجعله أحد أكثر المشاريع تميزاً في النسيج العمراني الحديث لمدينة جدة. يضمن الموقع اتصالاً سريعاً ومريحاً بأهم معالم المدينة، حيث يقع على بعد دقيقتين فقط من السلام مول، وأربع دقائق من الأندلس مول، جامعة الملك عبدالعزيز، حديقة الفيحاء، ومحطة قطار الحرمين السريع. تتوزع مباني المشروع بتناغم يحيط بمنطقة مسطحات خضراء مركزية ممتدة بعرض ١٦ متراً مع ممشى أنيق ونادٍ رياضي مكيف.",
    
    highlightsEn: [
      "Direct location on King Abdullah Road in Darb Al-Haramain",
      "16-meter central landscaped promenade with ambient lighting",
      "2 minutes to Al Salam Mall & 4 minutes to Haramain Railway Station",
      "Fully air-conditioned fitness gym and ground-floor commercial showrooms",
      "10-year Tawuniya insurance, 25-year warranty on switches & sockets",
      "Independent water tank and private smart electricity meter for each unit"
    ],
    highlightsAr: [
      "موقع استراتيجي على طريق الملك عبدالله مباشرة ضمن درب الحرمين",
      "مسطحات خضراء ولاندسكيب مركزي بعرض ١٦ متراً مع ممشى وإضاءة هادئة",
      "دقيقتان فقط من السلام مول و٤ دقائق من محطة قطار الحرمين",
      "نادي رياضي مكيف بالكامل ومعارض تجارية بالدور الأرضي",
      "تأمين ١٠ سنوات من التعاونية و٢٥ عاماً على المفاتيح والأفياش",
      "خزان مياه مستقل وعداد كهرباء خاص لكل وحدة سكنية"
    ],
    
    images: [
      {
        url: "https://res.cloudinary.com/dmfv1fyhp/image/upload/v1786509685/Al_ezz_1_vgvrhl.png",
        captionEn: "Al Ezz Project (101) Twin Towers Front Elevation",
        captionAr: "الواجهة المعمارية الرئيسية للأبراج المزدوجة لمشروع العز (١٠١)"
      },
      {
        url: "https://res.cloudinary.com/dmfv1fyhp/image/upload/v1786509694/Al_ezz_2_ffsc9g.png",
        captionEn: "16-Meter Central Landscaped Promenade & Sitting Courtyard",
        captionAr: "الممشى والمسطحات الخضراء المركزية بعرض ١٦ متراً"
      },
      {
        url: "https://res.cloudinary.com/dmfv1fyhp/image/upload/v1786509692/Al_ezz_3_kxcbeu.png",
        captionEn: "Grand Double-Height Entrance Lobby & Water Feature",
        captionAr: "صالة الاستقبال والبهو الفندقي الفاخر مع الشلال المائي"
      },
      {
        url: "https://res.cloudinary.com/dmfv1fyhp/image/upload/v1786509685/Al_ezz_5_zjdpih.png",
        captionEn: "Sunset Aerial Masterplan & Urban Skyline Perspective",
        captionAr: "المنظور الجوي الشامل للأبراج عند الغروب"
      }
    ],
    
    amenities: [
      {
        badge: "🔥",
        titleEn: "CENTRAL GAS",
        titleAr: "شبكة غاز مركزي",
        descEn: "Centralized piped gas network infrastructure delivering convenience and maximum safety.",
        descAr: "شبكة غاز مركزي حديثة وآمنة وفق أعلى معايير السلامة."
      },
      {
        badge: "🏋️",
        titleEn: "GYM / FITNESS CENTER",
        titleAr: "نادي رياضي متكامل",
        descEn: "Fully air-conditioned fitness club equipped with state-of-the-art exercise machinery.",
        descAr: "صالة رياضية وجيم مكيف بالكامل ومجهز بأحدث الأجهزة الرياضية."
      },
      {
        badge: "🅿️",
        titleEn: "COVERED PARKING",
        titleAr: "مواقف مغطاة",
        descEn: "Dedicated private covered parking spaces allocated for every apartment.",
        descAr: "مواقف سيارات خاصة ومغطاة مخصصة لكل وحدة سكنية."
      },
      {
        badge: "🚶",
        titleEn: "WALKWAY",
        titleAr: "ممرات مشاة مخصصة",
        descEn: "Dedicated paved pedestrian paths interwoven through the landscaped gardens.",
        descAr: "ممرات مشاة أنيقة ومريحة مخصصة للتنزه وسط المساحات الخضراء."
      },
      {
        badge: "❄️",
        titleEn: "CENTRAL AC",
        titleAr: "تكييف مركزي متطور",
        descEn: "Advanced central climate-controlled cooling systems across all residences.",
        descAr: "أنظمة تكييف وتبريد مركزية متطورة تغطي كافة الوحدات."
      },
      {
        badge: "📱",
        titleEn: "SMART HOME",
        titleAr: "أنظمة المنزل الذكي",
        descEn: "Integrated smart automation providing effortless control over lighting and appliances.",
        descAr: "أنظمة سمارت هوم حديثة للتحكم الذكي بالإضاءة والأجهزة المنزلية."
      },
      {
        badge: "🚪",
        titleEn: "SMART ENTRANCE",
        titleAr: "مداخل إلكترونية ذكية",
        descEn: "Secure keyless smart access control and automated building entry systems.",
        descAr: "بوابات ومداخل إلكترونية ذكية توفر أعلى مستويات الأمان والخصوصية."
      },
      {
        badge: "✨",
        titleEn: "LUXURY FINISHES",
        titleAr: "تشطيبات فاخرة",
        descEn: "High-grade architectural materials, porcelain tiles, and premium interior detailing.",
        descAr: "تشطيبات هندسية راقية ومواد بناء فاخرة على أعلى معايير الجودة."
      },
      {
        badge: "💡",
        titleEn: "AMBIENT LIGHTING",
        titleAr: "إضاءة محيطية هادئة",
        descEn: "Custom aesthetic landscape and facade lighting creating a warm evening ambiance.",
        descAr: "إضاءة هادئة ومدروسة تضفي طابعاً ساحراً على الواجهات والمسطحات الخضراء."
      },
      {
        badge: "🌳",
        titleEn: "CENTRAL LANDSCAPE (16M)",
        titleAr: "مسطحات خضراء ولاندسكيب مركزي",
        descEn: "Expansive 16-meter central green landscaped area creating a natural community oasis.",
        descAr: "مسطحات خضراء مركزية ممتدة بعرض ١٦ متراً تدمج الطبيعة بالحياة اليومية."
      },
      {
        badge: "🛍️",
        titleEn: "COMMERCIAL GROUND SHOWROOMS",
        titleAr: "معارض تجارية بالدور الأرضي",
        descEn: "Ground-floor boutique retail outlets, cafes, and essential community services.",
        descAr: "معارض ومحلات تجارية راقية بالدور الأرضي لخدمة السكان والزوار."
      },
      {
        badge: "💧",
        titleEn: "INDEPENDENT WATER",
        titleAr: "خزانات مياه مستقلة",
        descEn: "Private dedicated upper and lower water tanks ensuring complete utility independence.",
        descAr: "خزان مياه مستقل (علوي وسفلي) لكل وحدة سكنية لضمان الاستقلالية التامة."
      },
      {
        badge: "🛡️",
        titleEn: "EXTENDED WARRANTIES",
        titleAr: "ضمانات ممتدة وتأمين",
        descEn: "10-year Tawuniya insurance, 5-year MEP guarantee, and 25-year warranty on switches.",
        descAr: "تأمين شامل ١٠ سنوات من التعاونية و٢٥ عاماً على المفاتيح والأفياش."
      },
      {
        badge: "⚡",
        titleEn: "PRIVATE POWER METER",
        titleAr: "عداد كهرباء مستقل",
        descEn: "Individual digital electricity meter assigned directly to each property.",
        descAr: "عداد كهرباء ذكي ومستقل خاص بكل وحدة سكنية."
      }
    ],
    
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d7540.0931674691365!2d39.22291!3d21.5059233!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjHCsDMwJzE2LjAiTiAzOcKwMTMnMzcuOCJF!5e1!3m2!1sen!2sin!4v1781694689365!5m2!1sen!2sin",
    landmarks: [
      { nameEn: "Al Salam Mall", nameAr: "السلام مول", distEn: "2 Mins", distAr: "دقيقتان" },
      { nameEn: "Al Andalus Mall", nameAr: "الأندلس مول", distEn: "4 Mins", distAr: "٤ دقائق" },
      { nameEn: "King Abdulaziz University", nameAr: "جامعة الملك عبدالعزيز", distEn: "4 Mins", distAr: "٤ دقائق" },
      { nameEn: "Haramain High-Speed Train Station", nameAr: "محطة قطار الحرمين السريع", distEn: "4 Mins", distAr: "٤ دقائق" }
    ],
    
    brochureUrl: "https://res.cloudinary.com/dmfv1fyhp/image/upload/v1781691462/nhxveu4gyjbbzl766uvv.pdf",
    brochureSizeEn: "14.2 MB PDF",
    brochureSizeAr: "١٤.٢ ميجابايت PDF"
  },

  // ── 6. WAHJ AL OLAYA ─────────────────────────────────────────────────────
  {
    id: "wahj-al-olaya",
    nameEn: "Wahj Al Olaya (Project 129/130)",
    nameAr: "وهج العليا (مشروع ١٢٩/١٣٠)",
    developerEn: "Wahj Developments",
    developerAr: "شركة وهج العقارية",
    cityEn: "Jeddah",
    cityAr: "جدة",
    districtEn: "South Obhur (Al-Olaya Masterplan)",
    districtAr: "أبحر الجنوبية (مخطط العليا)",
    
    startingPriceEn: "from SAR 390K",
    startingPriceAr: "ابتداءً من ٣٩٠ ألف ر.س",
    priceRangeEn: "SAR 390K – 590K",
    priceRangeAr: "٣٩٠ ألف – ٥٩٠ ألف ر.س",
    
    sizeEn: "2-Bedroom Luxury Smart Residences",
    sizeAr: "شقق ذكية فاخرة (غرفتين نوم)",
    typeEn: "Contemporary Residential Development",
    typeAr: "مشروع سكني فاخر",
    statusEn: "Off-Plan",
    statusAr: "على المخطط",
    expectedDeliveryEn: "Q3 2027",
    expectedDeliveryAr: "الربع الثالث ٢٠٢٧",
    unitsCountEn: "10 Custom Layouts",
    unitsCountAr: "١٠ نماذج سكنية",
    floorsEn: "North Jeddah Landmark",
    floorsAr: "معلم سكني شمال جدة",
    
    overviewEn: "Perfectly positioned in a highly prestigious location in North Jeddah near the vibrant Obhur Waterfront, this premier residential landmark offers an all-inclusive modern living and investment experience crafted to deliver unparalleled comfort, luxury, and sophistication. The project boasts exceptional masterplan connectivity, placing residents just minutes away from major arteries like Madinah Road and Prince Khalid bin Abdullah Road, with immediate proximity to King Abdulaziz International Airport, King Faisal Specialist Hospital, King Abdullah Sports City, Jeddah Superdome, the scenic Obhur Creek, and the upcoming SEVEN entertainment destination.",
    overviewAr: "يتميز مشروع \"وهج العليا\" بموقع استثنائي فريد في شمال مدينة جدة بحي أبحر الجنوبية ضمن مخطط العليا الراقي، واضعاً جودة الحياة في مقدمة أولوياته ليقدم تجربة سكنية واستثمارية متكاملة تفتح فصلاً جديداً للحياة العصرية والراقية. يتمتع المجمع باتصاله المباشر بأهم المحاور والطرق الرئيسية مثل طريق المدينة المنورة وطريق الأمير خالد بن عبدالله، مع قربه الشديد من واجهة أبحر البحرية ومطار الملك عبدالعزيز ومستشفى الملك فيصل التخصصي ومدينة الملك عبدالله الرياضية ومشروع سفن الترفيهي.",
    
    highlightsEn: [
      "Minutes to Obhur Waterfront, Jeddah Superdome & SEVEN Project",
      "High structural ceilings and wide panoramic contemporary facades",
      "Fully integrated Smart Home automation systems",
      "Hotel-style AC lobbies and automated high-speed elevator systems",
      "10-year Tawuniya insurance & 25-year warranty on circuit breakers & switches",
      "Complimentary 2-year Owners Association (Mullak) membership"
    ],
    highlightsAr: [
      "دقائق معدودة من واجهة أبحر البحرية، سوبر دوم جدة، ومشروع سفن الترفيهي",
      "أسقف عالية ونوافذ بانورامية واسعة وواجهات عصرية أنيقة",
      "أنظمة بيوت ذكية متكاملة (Smart Home) للتحكم الكامل",
      "مداخل فندقية مكيفة ومصاعد أوتوماتيكية سريعة",
      "تأمين ١٠ سنوات من التعاونية و٢٥ عاماً على القواطع والأفياش",
      "عضوية مجانية لمدة سنتين في اتحاد الملاك (ملاك)"
    ],
    
    images: [
      {
        url: "https://res.cloudinary.com/dmfv1fyhp/image/upload/v1786509990/Wahj_Al_Olaya_1_qfj1kd.png",
        captionEn: "Wahj Al Olaya Boutique Facade & Architecture",
        captionAr: "الواجهة المعمارية العصرية لمشروع وهج العليا"
      },
      {
        url: "https://res.cloudinary.com/dmfv1fyhp/image/upload/v1786509973/Wahj_Al_Olaya_3_tmslxn.png",
        captionEn: "Hotel-Style Air-Conditioned Hospitality Lobby & Elevators",
        captionAr: "المدخل الفندقي الفاخر المكيف والمصاعد الحديثة"
      },
      {
        url: "https://res.cloudinary.com/dmfv1fyhp/image/upload/v1786509971/Wahj_Al_Olaya_2_uuf8ff.png",
        captionEn: "High-Ceiling Luxury Living Salon with Obhur Sunset Views",
        captionAr: "صالة المعيشة الفاخرة ذات الأسقف العالية وإطلالة الغروب"
      },
      {
        url: "https://res.cloudinary.com/dmfv1fyhp/image/upload/v1786509968/Wahj_Al_Olaya_4_fbbkaz.png",
        captionEn: "Private Rooftop Terrace Lounge Overlooking Obhur Coastline",
        captionAr: "جلسات التراس والسطح الخاصة بإطلالة ساحلية مسائية"
      }
    ],
    
    amenities: [
      {
        badge: "🔥",
        titleEn: "CENTRAL GAS",
        titleAr: "شبكة غاز مركزي",
        descEn: "Centralized piped gas network delivering maximum safety and constant availability.",
        descAr: "شبكة تمديدات غاز مركزي متطورة وآمنة تغذي كافة الوحدات السكنية."
      },
      {
        badge: "🅿️",
        titleEn: "COVERED PARKING",
        titleAr: "مواقف سيارات مغطاة",
        descEn: "Dedicated private covered parking bay assigned for each residential unit.",
        descAr: "موقف سيارات خاص ومظلل مخصص لكل شقة سكنية."
      },
      {
        badge: "🛗",
        titleEn: "HIGH-SPEED ELEVATOR",
        titleAr: "مصاعد أوتوماتيكية سريعة",
        descEn: "Modern automated high-speed elevator systems with advanced safety features.",
        descAr: "مصاعد حديثة عالية السرعة وأوتوماتيكية بالكامل مع أنظمة أمان متقدمة."
      },
      {
        badge: "🛡️",
        titleEn: "24/7 SECURITY",
        titleAr: "أمان وحراسة 24/7",
        descEn: "Round-the-clock integrated security personnel and continuous CCTV monitoring.",
        descAr: "أنظمة حراسة وأمان متواصلة مع كاميرات مراقبة على مدار الساعة."
      },
      {
        badge: "📱",
        titleEn: "SMART HOME",
        titleAr: "أنظمة سمارت هوم",
        descEn: "Comprehensive digital automation and mobile keyless access control.",
        descAr: "تحكم ذكي متكامل في الإضاءة والتكييف والدخول الإلكتروني."
      },
      {
        badge: "🏨",
        titleEn: "HOTEL LOBBY",
        titleAr: "مدخل واستقبال فندقي فاخر",
        descEn: "Fully air-conditioned luxury hospitality entrance and reception hall.",
        descAr: "مداخل واستقبال بنمط فندقي فاخر ومكيف بالكامل لراحة الضيوف."
      },
      {
        badge: "🏛️",
        titleEn: "HIGH CEILINGS",
        titleAr: "أسقف عالية وارتفاعات رحبة",
        descEn: "Spacious architectural ceiling heights providing expansive luxury ambiance.",
        descAr: "ارتفاعات أسقف مميزة ورحبة تمنح شعوراً بالاتساع والفخامة."
      },
      {
        badge: "🏢",
        titleEn: "MODERN FACADES",
        titleAr: "واجهات معمارية حديثة",
        descEn: "Contemporary architectural facades featuring large panoramic glass panels.",
        descAr: "واجهات معمارية عصرية وأنيقة بنوافذ بانورامية واسعة."
      },
      {
        badge: "⚡",
        titleEn: "INDEPENDENT METER",
        titleAr: "عدادات مستقلة",
        descEn: "Dedicated independent electricity meters and private water tank setups.",
        descAr: "عداد كهرباء مستقل وخزانات مياه خاصة تضمن الاستقلالية التامة."
      }
    ],
    
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3469.7672911229847!2d39.13904037527625!3d21.73250428009879!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjHCsDQzJzU3LjAiTiAzOcKwMDgnMjkuOCJF!5e1!3m2!1sen!2sin!4v1784190192112!5m2!1sen!2sin",
    landmarks: [
      { nameEn: "Obhur Waterfront & Creek", nameAr: "واجهة وشاطئ أبحر", distEn: "5 Mins", distAr: "٥ دقائق" },
      { nameEn: "King Abdulaziz International Airport", nameAr: "مطار الملك عبدالعزيز الدولي", distEn: "10 Mins", distAr: "١٠ دقائق" },
      { nameEn: "King Abdullah Sports City (Al Jawhara)", nameAr: "مدينة الملك عبدالله الرياضية (الجوهرة)", distEn: "8 Mins", distAr: "٨ دقائق" },
      { nameEn: "Jeddah Superdome", nameAr: "مجمع جدة سوبر دوم", distEn: "7 Mins", distAr: "٧ دقائق" }
    ],
    
    brochureUrl: "https://res.cloudinary.com/dmfv1fyhp/image/upload/v1784539737/lqsqwixbq83ecxzrpgw6.pdf",
    brochureSizeEn: "18.5 MB PDF",
    brochureSizeAr: "١٨.٥ ميجابايت PDF"
  },

  // ── 7. AL REHAB PROJECT ─────────────────────────────────────────────────
  {
    id: "rehab-project",
    nameEn: "Al Rehab Project",
    nameAr: "مشروع حي الرحاب",
    developerEn: "Rehab Developments",
    developerAr: "شركة الرحاب للتطوير العقاري",
    cityEn: "Riyadh",
    cityAr: "الرياض",
    districtEn: "Al Yasmin / Al Rehab",
    districtAr: "حي الياسمين / الرحاب",
    
    startingPriceEn: "from SAR 345K",
    startingPriceAr: "ابتداءً من ٣٤٥ ألف ر.س",
    priceRangeEn: "SAR 345K – 650K",
    priceRangeAr: "٣٤٥ ألف – ٦٥٠ ألف ر.س",
    
    sizeEn: "3 - 6 Bedroom Family Residences",
    sizeAr: "شقق سكنية عائلية ٣ - ٦ غرف",
    typeEn: "Modern Residential Complex",
    typeAr: "مجمع سكني عائلي راقٍ",
    statusEn: "Off-Plan",
    statusAr: "على المخطط",
    expectedDeliveryEn: "Q1 2027",
    expectedDeliveryAr: "الربع الأول ٢٠٢٧",
    unitsCountEn: "5 Custom Layouts",
    unitsCountAr: "٥ نماذج سكنية",
    floorsEn: "Prime Riyadh Neighborhood",
    floorsAr: "موقع مميز في الرياض",
    
    overviewEn: "Located in a prime residential hub in Riyadh, Al Rehab Project delivers contemporary living spaces designed for modern families. Featuring spacious 3 to 6-bedroom layouts, high-end finishing, smart home automation, dedicated private parking, and independent utility systems, this development blends privacy, functionality, and elevated urban convenience.",
    overviewAr: "يقع مشروع حي الرحاب في موقع استراتيجي مميز بمدينة الرياض، ليقدم نموذجاً راقياً للحياة السكنية العصرية المصممة لتناسب تطلعات العائلات. يضم المشروع شققاً فاخرة بتصاميم تتراوح بين ٣ و٦ غرف نوم، مع تشطيبات راقية وأنظمة سمارت هوم ودخول ذكي ومواقف خاصة وخزانات مستقلة لكل وحدة تضمن الخصوصية وراحة البال.",
    
    highlightsEn: [
      "Spacious 3 to 6 bedroom family residential layouts",
      "Smart home automation and keyless digital entry",
      "Dedicated private parking slot and private entrance",
      "Independent upper & lower water tanks for each apartment",
      "Split air conditioning provisions and premium electrical setups",
      "Community lounge, swimming pool, gym, and 24/7 CCTV security"
    ],
    highlightsAr: [
      "مساحات سكنية عائلية رحبة تتراوح بين ٣ و٦ غرف نوم",
      "أنظمة سمارت هوم وتحكم ودخول ذكي إلكتروني",
      "موقف سيارات خاص ومدخل مستقل لكل وحدة سكنية",
      "خزانات مياه مستقلة (علوية وسفلية) وعداد كهرباء خاص",
      "تجهيزات تكييف سبليت وتشطيبات كهربائية عالية الجودة",
      "صالة مجتمعية، مسبح، نادي رياضي، وكاميرات مراقبة ٢٤/٧"
    ],
    
    images: [
      {
        url: "https://res.cloudinary.com/dmfv1fyhp/image/upload/v1786510299/Rehab_1_npbgdk.png",
        captionEn: "Al Rehab Project Modern Residential Facade",
        captionAr: "الواجهة المعمارية الحديثة لمشروع حي الرحاب"
      },
      {
        url: "https://res.cloudinary.com/dmfv1fyhp/image/upload/v1786510302/rehab_2_w8itzb.png",
        captionEn: "Panoramic Sunset Rooftop Terrace & Outdoor Lounge",
        captionAr: "جلسات التراس والسطح البانورامية عند الغروب"
      },
      {
        url: "https://res.cloudinary.com/dmfv1fyhp/image/upload/v1786510296/Rehab_3_vlfcyz.png",
        captionEn: "Grand Drop-off Porte-Cochère & Hotel-Style Entrance",
        captionAr: "المدخل الرئيسي الفندقي الفاخر ومنطقة الاستقبال"
      }
    ],
    
    amenities: [
      {
        badge: "🏋️",
        titleEn: "GYM / FITNESS CENTER",
        titleAr: "نادي رياضي متكامل",
        descEn: "State-of-the-art health club and fitness gym equipped with modern machines.",
        descAr: "صالة لياقة بدنية مجهزة بأحدث المعدات والأجهزة الرياضية المتطورة."
      },
      {
        badge: "📹",
        titleEn: "CCTV SECURITY",
        titleAr: "كاميرات مراقبة أمنية",
        descEn: "High-definition CCTV coverage monitoring all building gates and common areas.",
        descAr: "شبكة كاميرات مراقبة رقمية عالية الدقة تغطي كافة المداخل والمرافق."
      },
      {
        badge: "🏊",
        titleEn: "SWIMMING POOL",
        titleAr: "مسبح متكامل",
        descEn: "Private community swimming pool designed for leisure and family relaxation.",
        descAr: "مسبح خاص مجهز بأعلى معايير النظافة والراحة لجميع أفراد الأسرة."
      },
      {
        badge: "🛋️",
        titleEn: "LOUNGE",
        titleAr: "صالة ضيافة واستراحة",
        descEn: "Elegantly furnished community lounge and hospitality reception space.",
        descAr: "صالة استراحة وضيافة فاخرة مخصصة لاستقبال الزوار والتجمعات."
      },
      {
        badge: "🕌",
        titleEn: "MOSQUE",
        titleAr: "مسجد ومصلى مجهز",
        descEn: "Dedicated peaceful on-site mosque and prayer area for community residents.",
        descAr: "مصلى مجهز وهادئ داخل المجمع لأداء الصلوات اليومية."
      },
      {
        badge: "🅿️",
        titleEn: "COVERED PARKING",
        titleAr: "مواقف سيارات مغطاة",
        descEn: "Dedicated secure private covered parking bays assigned to each apartment.",
        descAr: "مواقف سيارات خاصة ومظللة مخصصة لكل شقة سكنية."
      },
      {
        badge: "📺",
        titleEn: "TV ROOM",
        titleAr: "غرفة ترفيه وشاشات سينمائية",
        descEn: "Dedicated media entertainment and theater lounge for residents.",
        descAr: "غرفة سينمائية وترفيهية مجهزة بأحدث الشاشات وأنظمة الصوت."
      },
      {
        badge: "🛗",
        titleEn: "ELEVATOR",
        titleAr: "مصاعد أوتوماتيكية حديثة",
        descEn: "High-speed automated passenger elevators ensuring swift floor-to-floor access.",
        descAr: "مصاعد حديثة عالية السرعة وأوتوماتيكية بالكامل مع أعلى معايير الأمان."
      },
      {
        badge: "🎠",
        titleEn: "KIDS PLAY AREA",
        titleAr: "منطقة ألعاب أطفال آمنة",
        descEn: "Safe, cushioned outdoor & indoor play zone tailored for young children.",
        descAr: "منطقة ترفيهية آمنة ومجهزة بأحدث الألعاب المخصصة للأطفال."
      },
      {
        badge: "🛡️",
        titleEn: "24/7 SECURITY",
        titleAr: "حراسة وأمان 24/7",
        descEn: "Round-the-clock trained security personnel ensuring complete safety.",
        descAr: "طاقم حراسة وأمن متواجد على مدار الساعة لضمان الطمأنينة والأمان."
      },
      {
        badge: "🚗",
        titleEn: "DRIVER ROOM",
        titleAr: "غرف مخصصة للسائقين",
        descEn: "Dedicated private accommodation rooms for drivers on site.",
        descAr: "غرف خاصة ومجهزة مخصصة لسكن السائقين داخل المشروع."
      },
      {
        badge: "🍳",
        titleEn: "EQUIPPED KITCHEN",
        titleAr: "مطابخ مجهزة بالكامل",
        descEn: "Contemporary open and closed kitchen layouts with high-end prep utilities.",
        descAr: "مطابخ عصرية بتصاميم أنيقة وتجهيزات عالية الجودة."
      }
    ],
    
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3916.2084554552666!2d39.6983056!3d24.436027799999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjTCsDI2JzA5LjciTiAzOcKwNDEnNTMuOSJF!5e1!3m2!1sen!2sin!4v1779790259764!5m2!1sen!2sin",
    landmarks: [
      { nameEn: "King Salman Road Corridor", nameAr: "طريق الملك سلمان الرئيسي", distEn: "5 Mins", distAr: "٥ دقائق" },
      { nameEn: "King Fahd Road Highway", nameAr: "طريق الملك فهد السريع", distEn: "7 Mins", distAr: "٧ دقائق" },
      { nameEn: "King Khalid International Airport", nameAr: "مطار الملك خالد الدولي", distEn: "15 Mins", distAr: "١٥ دقيقة" },
      { nameEn: "Riyadh Front & Business Gate", nameAr: "واجهة الرياض وبوابة الأعمال", distEn: "12 Mins", distAr: "١٢ دقيقة" }
    ],
    
    brochureUrl: "https://res.cloudinary.com/dmfv1fyhp/image/upload/v1781176090/iw1p2dyb4yt0yvcdp5oq.pdf",
    brochureSizeEn: "11.6 MB PDF",
    brochureSizeAr: "١١.٦ ميجابايت PDF"
  },

  // ── 8. SAKAN VIEW ─────────────────────────────────────────────────────────
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

  // ── 9. SAKAN VIEW 2 ───────────────────────────────────────────────────────
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

  // ── 10. SAKAN VIEW 3 ──────────────────────────────────────────────────────
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
