export interface FaqItem {
  id: number;
  sectionCode: string;
  sectionNameEn: string;
  sectionNameAr: string;
  category: "basics" | "locations" | "rules" | "companies" | "residency" | "pricing" | "taxes" | "finance" | "offplan" | "legal" | "process" | "ownership" | "rental" | "investment" | "management";
  questionEn: string;
  questionAr: string;
  answerEn: string;
  answerAr: string;
  sourceUrl?: string;
  sourceLabel?: string;
}

export const FAQ_CATEGORIES = [
  { key: "all", labelEn: "All Topics (157)", labelAr: "جميع الموضوعات (157)" },
  { key: "basics", labelEn: "Basic Eligibility", labelAr: "الأهلية الأساسية" },
  { key: "locations", labelEn: "Where to Buy (Jeddah, Riyadh, Holy Cities)", labelAr: "نطاقات الشراء (جدة، الرياض، مكة، المدينة)" },
  { key: "rules", labelEn: "One-Property & Quota Rules", labelAr: "قاعدة العقار الواحد والحصص" },
  { key: "companies", labelEn: "Buying Through a Company", labelAr: "التملك عبر الشركات والكيانات" },
  { key: "residency", labelEn: "Premium Residency (SAR 4M)", labelAr: "الإقامة المميزة (عقار 4 ملايين)" },
  { key: "pricing", labelEn: "Prices & Budgeting", labelAr: "الأسعار والميزانيات" },
  { key: "taxes", labelEn: "Taxes & Govt Fees (RETT 5% & Fee 2%)", labelAr: "الضرائب والرسوم (التصرفات 5% والرسم 2%)" },
  { key: "finance", labelEn: "Mortgages & Financing", labelAr: "التمويل العقاري والبنوك" },
  { key: "offplan", labelEn: "Off-Plan & Wafi Projects", labelAr: "البيع على الخارطة ومشاريع وافي" },
  { key: "legal", labelEn: "Due Diligence, Title Deeds & Laws", labelAr: "الفحص القانوني والصكوك والأنظمة" },
  { key: "process", labelEn: "Saudi Properties Portal & Process", labelAr: "إجراءات منصة العقارات السعودية" },
  { key: "ownership", labelEn: "Ownership Rights (Freehold / Usufruct)", labelAr: "حقوق الملكية (التامة والانتفاع)" },
  { key: "rental", labelEn: "Renting, Leasing & Ejar", labelAr: "التأجير ومنصة إيجار" },
  { key: "investment", labelEn: "Yields, ROI & City Strategy", labelAr: "العوائد والاستثمار العقاري" },
  { key: "management", labelEn: "HOA, Selling & Expat Journey", labelAr: "رسوم الخدمات، إعادة البيع ودليل المشتري" }
];

export const FAQ_DATA: FaqItem[] = [
  // A. Basic Questions (1-8)
  {
    id: 1,
    sectionCode: "A",
    sectionNameEn: "Basic Questions",
    sectionNameAr: "أسئلة أساسية حول التملك",
    category: "basics",
    questionEn: "Can foreigners buy property in Saudi Arabia?",
    questionAr: "هل يحق للأجانب شراء وتملك العقارات في السعودية؟",
    answerEn: "Yes. Under the current non-Saudi real-estate ownership framework, non-Saudi individuals and certain non-Saudi entities can own real estate or acquire other real rights, subject to applicable geographical zones, property types, ownership limits, and REGA regulations.",
    answerAr: "نعم. بموجب النظام المحدث لتملك غير السعوديين للعقار، يحق للأفراد غير السعوديين والكيانات الأجنبية تملك العقارات أو اكتساب الحقوق العينية العقارية وفق النطاقات الجغرافية والضوابط المحددة من الهيئة العامة للعقار.",
    sourceUrl: "https://rega.gov.sa/en/regulations-and-by-laws/rules/law-of-real-estate-ownership-and-investment-by-non-saudis/",
    sourceLabel: "REGA Law of Non-Saudi Ownership"
  },
  {
    id: 2,
    sectionCode: "A",
    sectionNameEn: "Basic Questions",
    sectionNameAr: "أسئلة أساسية حول التملك",
    category: "basics",
    questionEn: "Can an expat with an Iqama buy property?",
    questionAr: "هل يستطيع المقيم الحامل للإقامة النظامية شراء عقار؟",
    answerEn: "Yes, a legally resident non-Saudi can apply through the official Saudi Properties system using their residency ID (Iqama), subject to eligibility, property type, and approved location restrictions.",
    answerAr: "نعم، يحق للمقيم النظامي التقديم عبر منصة العقارات السعودية الرسمية باستخدام رقم الإقامة، مع مراعاة الضوابط المعتمدة ونوع العقار والنطاق الجغرافي.",
    sourceUrl: "https://rega.gov.sa/en/media-center/news-announcements/rega-non-saudi-property-ownership-system-enters-into-force-as-of-today/",
    sourceLabel: "REGA Platform Announcement"
  },
  {
    id: 3,
    sectionCode: "A",
    sectionNameEn: "Basic Questions",
    sectionNameAr: "أسئلة أساسية حول التملك",
    category: "basics",
    questionEn: "Can a foreigner living outside Saudi Arabia buy property?",
    questionAr: "هل يحق للأجنبي غير المقيم خارج السعودية شراء عقار؟",
    answerEn: "Yes, the framework covers non-residents. Non-residents begin the process by obtaining a digital identity through Saudi representations/embassies abroad before completing their transaction via the portal.",
    answerAr: "نعم، يشمل النظام غير المقيمين. تبدأ إجراءات غير المقيم بالحصول على هوية رقمية موثقة عبر سفارات وممثليات المملكة بالخارج قبل إتمام الطلب عبر البوابة.",
    sourceUrl: "https://rega.gov.sa/en/media-center/news-announcements/rega-non-saudi-property-ownership-system-enters-into-force-as-of-today/",
    sourceLabel: "REGA Portal"
  },
  {
    id: 4,
    sectionCode: "A",
    sectionNameEn: "Basic Questions",
    sectionNameAr: "أسئلة أساسية حول التملك",
    category: "basics",
    questionEn: "Do I need an Iqama to buy property?",
    questionAr: "هل أحتاج بالضرورة إلى إقامة لشراء عقار؟",
    answerEn: "Not necessarily. Residents and non-residents have different application processes under the regulations.",
    answerAr: "ليس بالضرورة. المقيمون يستخدمون الإقامة، بينما غير المقيمين لديهم مسار مخصص يعتمد على التوثيق الرقمي عبر الممثليات السعودية."
  },
  {
    id: 5,
    sectionCode: "A",
    sectionNameEn: "Basic Questions",
    sectionNameAr: "أسئلة أساسية حول التملك",
    category: "basics",
    questionEn: "Can I buy property without living in Saudi Arabia?",
    questionAr: "هل يمكنني شراء عقار دون العيش في السعودية؟",
    answerEn: "Potentially, yes, provided the property is eligible for non-Saudi ownership and you satisfy the applicable onboarding requirements.",
    answerAr: "نعم، بشرط أن يكون العقار ضمن النطاقات الجغرافية المعتمدة لتملك غير السعوديين واستيفاء متطلبات تسجيل غير المقيمين."
  },
  {
    id: 6,
    sectionCode: "A",
    sectionNameEn: "Basic Questions",
    sectionNameAr: "أسئلة أساسية حول التملك",
    category: "basics",
    questionEn: "Does my nationality matter?",
    questionAr: "هل تؤثر جنسيتي في أحقية شراء العقار؟",
    answerEn: "It can, particularly for properties in Makkah and Madinah, where the law restricts individual non-Saudi ownership exclusively to Muslim natural persons.",
    answerAr: "بشكل عام يطبق النظام على مختلف الجنسيات، مع وجود اشتراط ديني خاص في مكة المكرمة والمدينة المنورة يقتصر التملك الفردي فيهما على الأشخاص الطبيعيين المسلمين.",
    sourceUrl: "https://rega.gov.sa/en/regulations-and-by-laws/rules/law-of-real-estate-ownership-and-investment-by-non-saudis/",
    sourceLabel: "REGA Regulations"
  },
  {
    id: 7,
    sectionCode: "A",
    sectionNameEn: "Basic Questions",
    sectionNameAr: "أسئلة أساسية حول التملك",
    category: "basics",
    questionEn: "Do I have to be Muslim to buy property in Saudi Arabia?",
    questionAr: "هل يشترط أن أكون مسلماً لشراء عقار في السعودية؟",
    answerEn: "For non-Saudi individuals seeking ownership in Makkah and Madinah, the law limits the right to Muslim natural persons. Other areas (Jeddah, Riyadh, Dammam, etc.) are governed by general geographical-zone rules.",
    answerAr: "في مدن مثل جدة والرياض والدمام، يحق لغير المسلمين تملك العقارات المؤهلة. بينما يقتصر التملك في مكة المكرمة والمدينة المنورة على المسلمين حصراً.",
    sourceUrl: "https://rega.gov.sa/en/regulations-and-by-laws/rules/law-of-real-estate-ownership-and-investment-by-non-saudis/",
    sourceLabel: "REGA Regulations"
  },
  {
    id: 8,
    sectionCode: "A",
    sectionNameEn: "Basic Questions",
    sectionNameAr: "أسئلة أساسية حول التملك",
    category: "basics",
    questionEn: "Can my wife and children own property?",
    questionAr: "هل يحق للزوجة والأبناء تملك عقارات؟",
    answerEn: "The rules can differ depending on whether they are acquiring property independently or as dependents. The implementing regulations treat a non-Saudi resident's spouse and non-Saudi children as dependents for the single residential property entitlement outside designated zones.",
    answerAr: "تخضع التابعية لضوابط المسكن العائلي الواحد خارج النطاقات الحرة، بينما يحق للشخص البالغ ذو الصفة المستقلة والإقامة النظامية التقديم بصورة منفردة."
  },

  // B. Where Can Foreigners Buy? (9-21)
  {
    id: 9,
    sectionCode: "B",
    sectionNameEn: "Where Can Foreigners Buy?",
    sectionNameAr: "أين يمكن للأجانب التملك في السعودية؟",
    category: "locations",
    questionEn: "Can foreigners buy property anywhere in Saudi Arabia?",
    questionAr: "هل يحق للأجنبي شراء عقار في أي مكان في المملكة؟",
    answerEn: "No. Non-Saudi ownership is subject to designated geographical areas and other controls. The Saudi Properties portal provides applicable geographical zones, permitted ownership percentages, and rights.",
    answerAr: "لا، التملك محدد بنطاقات جغرافية معتمدة من الهيئة العامة للعقار توضح النسب المسموحة ونوع الحق العيني (ملكية تامة أو حق انتفاع).",
    sourceUrl: "https://saudiproperties.rega.gov.sa/",
    sourceLabel: "Saudi Properties Portal"
  },
  {
    id: 10,
    sectionCode: "B",
    sectionNameEn: "Where Can Foreigners Buy?",
    sectionNameAr: "أين يمكن للأجانب التملك في السعودية؟",
    category: "locations",
    questionEn: "Can foreigners buy property in Jeddah?",
    questionAr: "هل يحق للأجانب شراء وتملك عقارات في جدة؟",
    answerEn: "Yes, subject to the applicable geographical-zone rules, masterplan quotas, and property requirements.",
    answerAr: "نعم، تتوفر مناطق سكنية واستثمارية مميزة في جدة (مثل الشاطئ، أبحر، الحمراء، والكورنيش) مؤهلة للتملك وفق النسب المعتمدة."
  },
  {
    id: 11,
    sectionCode: "B",
    sectionNameEn: "Where Can Foreigners Buy?",
    sectionNameAr: "أين يمكن للأجانب التملك في السعودية؟",
    category: "locations",
    questionEn: "Can foreigners buy property in Riyadh?",
    questionAr: "هل يحق للأجانب شراء عقارات في الرياض؟",
    answerEn: "Yes, subject to the applicable geographical-zone rules and master development criteria.",
    answerAr: "نعم، تشمل النطاقات المعتمدة أحياء ومخططات رئيسية في شمال وشرق الرياض للملكية التامة والاستثمار."
  },
  {
    id: 12,
    sectionCode: "B",
    sectionNameEn: "Where Can Foreigners Buy?",
    sectionNameAr: "أين يمكن للأجانب التملك في السعودية؟",
    category: "locations",
    questionEn: "Can foreigners buy property in Makkah?",
    questionAr: "هل يستطيع غير السعوديين التملك في مكة المكرمة؟",
    answerEn: "Ownership by non-Saudi individuals in Makkah is restricted to Muslim natural persons and is subject to designated geographical zones and other controls.",
    answerAr: "يقتصر تملك الأفراد غير السعوديين في مكة المكرمة على المسلمين، ويخضع للنطاقات المحددة وضوابط حقوق الانتفاع والملكية.",
    sourceUrl: "https://rega.gov.sa/en/regulations-and-by-laws/rules/law-of-real-estate-ownership-and-investment-by-non-saudis/",
    sourceLabel: "REGA Regulations"
  },
  {
    id: 13,
    sectionCode: "B",
    sectionNameEn: "Where Can Foreigners Buy?",
    sectionNameAr: "أين يمكن للأجانب التملك في السعودية؟",
    category: "locations",
    questionEn: "Can foreigners buy property in Madinah?",
    questionAr: "هل يستطيع غير السعوديين التملك في المدينة المنورة؟",
    answerEn: "The same special religious restriction applies: non-Saudi individual ownership in Madinah is limited to Muslim natural persons, subject to applicable zones and regulations.",
    answerAr: "ينطبق نفس الشرط الديني، حيث يقتصر تملك الأفراد في المدينة المنورة على المسلمين ضمن النطاقات المعتمدة (مثل مجمع سهيل والمناطق المركزية).",
    sourceUrl: "https://rega.gov.sa/en/regulations-and-by-laws/rules/law-of-real-estate-ownership-and-investment-by-non-saudis/",
    sourceLabel: "REGA Regulations"
  },
  {
    id: 14,
    sectionCode: "B",
    sectionNameEn: "Where Can Foreigners Buy?",
    sectionNameAr: "أين يمكن للأجانب التملك في السعودية؟",
    category: "locations",
    questionEn: "Can a non-Muslim expat buy in Jeddah?",
    questionAr: "هل يستطيع المقيم غير المسلم الشراء في جدة؟",
    answerEn: "Potentially, yes, subject to the property's approved zone and all applicable requirements.",
    answerAr: "نعم، يحق لغير المسلمين تملك العقارات المؤهلة في مدينة جدة ضمن النطاقات الجغرافية المعتمدة."
  },
  {
    id: 15,
    sectionCode: "B",
    sectionNameEn: "Where Can Foreigners Buy?",
    sectionNameAr: "أين يمكن للأجانب التملك في السعودية؟",
    category: "locations",
    questionEn: "Can a non-Muslim expat buy in Riyadh?",
    questionAr: "هل يستطيع المقيم غير المسلم الشراء في الرياض؟",
    answerEn: "Potentially, yes, subject to the applicable zone and ownership requirements.",
    answerAr: "نعم، يحق للمستثمرين والمقيمين غير المسلمين تملك العقارات السكنية والتجارية في نطاقات الرياض المعتمدة."
  },
  {
    id: 16,
    sectionCode: "B",
    sectionNameEn: "Where Can Foreigners Buy?",
    sectionNameAr: "أين يمكن للأجانب التملك في السعودية؟",
    category: "locations",
    questionEn: "Can a non-Muslim buy in Makkah?",
    questionAr: "هل يحق لغير المسلم الشراء في مكة المكرمة؟",
    answerEn: "A non-Saudi individual cannot rely on the general ownership provision for Makkah; the law restricts individual non-Saudi ownership there to Muslims.",
    answerAr: "لا، يحظر النظام تملك الأفراد غير المسلمين للعقارات أو الحقوق العينية في مكة المكرمة.",
    sourceUrl: "https://rega.gov.sa/en/regulations-and-by-laws/rules/law-of-real-estate-ownership-and-investment-by-non-saudis/",
    sourceLabel: "REGA Regulations"
  },
  {
    id: 17,
    sectionCode: "B",
    sectionNameEn: "Where Can Foreigners Buy?",
    sectionNameAr: "أين يمكن للأجانب التملك في السعودية؟",
    category: "locations",
    questionEn: "Can a foreigner buy land?",
    questionAr: "هل يحق للأجنبي شراء أراضٍ فضاء؟",
    answerEn: "Potentially, depending on the applicable geographical zone, permitted rights, and intended use. The buyer should verify the specific property through the official portal rather than assuming every plot is eligible.",
    answerAr: "نعم في بعض النطاقات المعتمدة ووفق اشتراطات التطوير المحددة، مع وجوب التحقق من قطعة الأرض عبر المنصة الرسمية."
  },
  {
    id: 18,
    sectionCode: "B",
    sectionNameEn: "Where Can Foreigners Buy?",
    sectionNameAr: "أين يمكن للأجانب التملك في السعودية؟",
    category: "locations",
    questionEn: "Can foreigners buy commercial property?",
    questionAr: "هل يحق للأجانب شراء العقارات التجارية؟",
    answerEn: "Potentially, depending on the applicable zone, ownership category, and permitted commercial use.",
    answerAr: "نعم، يحق للأفراد والشركات تملك العقارات التجارية (مكاتب، معارض، مستودعات، أراضٍ تجارية) في المناطق المخصصة."
  },
  {
    id: 19,
    sectionCode: "B",
    sectionNameEn: "Where Can Foreigners Buy?",
    sectionNameAr: "أين يمكن للأجانب التملك في السعودية؟",
    category: "locations",
    questionEn: "Can foreigners buy an office?",
    questionAr: "هل يمكن للأجنبي شراء مكتب إداري؟",
    answerEn: "Potentially, subject to the property's eligibility and applicable commercial ownership rules.",
    answerAr: "نعم، المكاتب الإدارية في الأبراج التجارية ومجمعات الأعمال المعتمدة متاحة للتملك."
  },
  {
    id: 20,
    sectionCode: "B",
    sectionNameEn: "Where Can Foreigners Buy?",
    sectionNameAr: "أين يمكن للأجانب التملك في السعودية؟",
    category: "locations",
    questionEn: "Can foreigners buy a warehouse?",
    questionAr: "هل يمكن تملك مستودعات؟",
    answerEn: "Potentially, subject to the relevant industrial/logistics zone and permitted use.",
    answerAr: "نعم، وفق تراخيص وزارة الاستثمار والضوابط المعتمدة للمناطق اللوجستية والصناعية."
  },
  {
    id: 21,
    sectionCode: "B",
    sectionNameEn: "Where Can Foreigners Buy?",
    sectionNameAr: "أين يمكن للأجانب التملك في السعودية؟",
    category: "locations",
    questionEn: "Can foreigners buy a building?",
    questionAr: "هل يحق للأجنبي شراء عمارة كاملة؟",
    answerEn: "Potentially, subject to geographical and property-specific quota requirements.",
    answerAr: "نعم، يمكن شراء المباني الكاملة والمجمعات، وغالباً ما يتم ذلك عبر مسارات الاستثمار المؤسسي أو الشركات."
  },

  // C. The "One Property" Question (22-26)
  {
    id: 22,
    sectionCode: "C",
    sectionNameEn: "The One-Property Rule",
    sectionNameAr: "قاعدة العقار الواحد وتملك المحافظ",
    category: "rules",
    questionEn: "Can an expat buy multiple properties?",
    questionAr: "هل يستطيع المقيم شراء أكثر من عقار واحد؟",
    answerEn: "This depends on the ownership category and applicable geographical-zone rules. The general law provides a separate entitlement for a legally resident non-Saudi individual to own one residential property outside designated geographical scope, except in Makkah and Madinah.",
    answerAr: "خارج النطاقات الحرة، يتاح للمقيم تملك مسكن واحد. أما داخل النطاقات الاستثمارية المعتمدة، فيمكن تملك عدة عقارات وفق نسب وسعة النطاق.",
    sourceUrl: "https://rega.gov.sa/en/regulations-and-by-laws/rules/law-of-real-estate-ownership-and-investment-by-non-saudis/",
    sourceLabel: "REGA Regulations"
  },
  {
    id: 23,
    sectionCode: "C",
    sectionNameEn: "The One-Property Rule",
    sectionNameAr: "قاعدة العقار الواحد وتملك المحافظ",
    category: "rules",
    questionEn: "Can I buy one apartment for myself and another as an investment?",
    questionAr: "هل يمكنني شراء شقة للسكن وأخرى للاستثمار؟",
    answerEn: "Do not assume this is automatically permitted everywhere. It is authorized within designated open investment zones that permit multi-unit ownership.",
    answerAr: "نعم، عند اختيار عقارات تقع في النطاقات الاستثمارية المفتوحة المعتمدة لتعدد الملكيات."
  },
  {
    id: 24,
    sectionCode: "C",
    sectionNameEn: "The One-Property Rule",
    sectionNameAr: "قاعدة العقار الواحد وتملك المحافظ",
    category: "rules",
    questionEn: "Can I own multiple apartments in Jeddah?",
    questionAr: "هل أستطيع تملك عدة شقق في مدينة جدة؟",
    answerEn: "Potentially, where the applicable zone and ownership quota rules allow it.",
    answerAr: "نعم، يمكن تملك وحدات متعددة ضمن المشاريع والمخططات المعتمدة في جدة."
  },
  {
    id: 25,
    sectionCode: "C",
    sectionNameEn: "The One-Property Rule",
    sectionNameAr: "قاعدة العقار الواحد وتملك المحافظ",
    category: "rules",
    questionEn: "Can I buy multiple properties as an investment?",
    questionAr: "هل يمكن شراء عدة عقارات كاستثمار؟",
    answerEn: "Potentially, subject to the applicable ownership limits and geographical rules.",
    answerAr: "نعم، يقوم المستثمرون ببناء محافظ استثمارية مدرة للعوائد في المواقع الاستراتيجية بتوجيه استشاري من شركة صهيب العقارية."
  },
  {
    id: 26,
    sectionCode: "C",
    sectionNameEn: "The One-Property Rule",
    sectionNameAr: "قاعدة العقار الواحد وتملك المحافظ",
    category: "rules",
    questionEn: "Can I buy property through my company?",
    questionAr: "هل أستطيع الشراء عبر شركة مسجلة؟",
    answerEn: "Yes, potentially. The rules for Saudi companies with non-Saudi shareholders and non-Saudi companies differ from individual ownership.",
    answerAr: "نعم، يحق للشركات السعودية ذات الشركاء الأجانب والشركات الأجنبية المرخصة التملك وفق مسار المنشآت.",
    sourceUrl: "https://rega.gov.sa/en/regulations-and-by-laws/rules/law-of-real-estate-ownership-and-investment-by-non-saudis/",
    sourceLabel: "REGA Regulations"
  },

  // D. Buying Through a Company (27-30)
  {
    id: 27,
    sectionCode: "D",
    sectionNameEn: "Buying Through a Company",
    sectionNameAr: "التملك عبر الشركات والكيانات",
    category: "companies",
    questionEn: "Can a foreign-owned Saudi company buy property?",
    questionAr: "هل تستطيع الشركة السعودية المملوكة لأجانب شراء عقار؟",
    answerEn: "Yes, subject to applicable rules. A Saudi company that has non-Saudi shareholders can own property within the relevant geographical scope, including Makkah and Madinah, under conditions established by law and regulations.",
    answerAr: "نعم، يحق للشركة السعودية ذات الشركاء الأجانب تملك العقارات ضمن النطاقات المعتمدة (بما فيها مكة والمدينة لأغراض مقرات وأنشطة الشركة).",
    sourceUrl: "https://rega.gov.sa/en/regulations-and-by-laws/rules/law-of-real-estate-ownership-and-investment-by-non-saudis/",
    sourceLabel: "REGA Regulations"
  },
  {
    id: 28,
    sectionCode: "D",
    sectionNameEn: "Buying Through a Company",
    sectionNameAr: "التملك عبر الشركات والكيانات",
    category: "companies",
    questionEn: "Can my foreign company buy property directly?",
    questionAr: "هل يحق لشركة أجنبية التملك المباشر؟",
    answerEn: "Potentially. A non-Saudi company must complete registration requirements with the Ministry of Investment (MISA), disclose relevant ownership, have an identified legal representative, and maintain a Saudi bank account.",
    answerAr: "يتطلب ذلك التسجيل لدى وزارة الاستثمار والإفصاح عن الملاك المستفيدين وتعيين ممثل نظامي وفتح حساب بنكي سعودي."
  },
  {
    id: 29,
    sectionCode: "D",
    sectionNameEn: "Buying Through a Company",
    sectionNameAr: "التملك عبر الشركات والكيانات",
    category: "companies",
    questionEn: "Do I need a Saudi company to buy a property?",
    questionAr: "هل يلزمني تأسيس شركة لشراء عقار؟",
    answerEn: "Not necessarily. Individuals have their own direct personal ownership route.",
    answerAr: "لا، يمكن للأفراد التملك مباشرة بأسمائهم الشخصية دون الحاجة لتأسيس كيان تجاري."
  },
  {
    id: 30,
    sectionCode: "D",
    sectionNameEn: "Buying Through a Company",
    sectionNameAr: "التملك عبر الشركات والكيانات",
    category: "companies",
    questionEn: "Can I buy property under my business instead of my personal name?",
    questionAr: "هل يمكن الشراء باسم المنشأة التجارية بدلاً من الاسم الشخصي؟",
    answerEn: "Potentially, depending on company structure, MISA license, and the intended business purpose of the property.",
    answerAr: "نعم، بحسب الهيكل القانوني للشركة وتراخيص الاستثمار والغرض الاستثماري للعقار."
  },

  // E. Premium Residency (31-36)
  {
    id: 31,
    sectionCode: "E",
    sectionNameEn: "Premium Residency",
    sectionNameAr: "الإقامة المميزة (مسار ملاك العقار)",
    category: "residency",
    questionEn: "Does Premium Residency allow property ownership?",
    questionAr: "هل تمنح الإقامة المميزة حق تملك العقار؟",
    answerEn: "Premium Residency provides extensive property ownership/use rights subject to applicable laws and regulations across Saudi Arabia.",
    answerAr: "نعم، يتمتع حامل الإقامة المميزة بمزايا واسعة في تملك العقارات والأنشطة التجارية في مختلف مناطق المملكة.",
    sourceUrl: "https://pr.gov.sa/faq",
    sourceLabel: "Premium Residency Center FAQ"
  },
  {
    id: 32,
    sectionCode: "E",
    sectionNameEn: "Premium Residency",
    sectionNameAr: "الإقامة المميزة (مسار ملاك العقار)",
    category: "residency",
    questionEn: "Do I need Premium Residency to buy property?",
    questionAr: "هل أحتاج إلى إقامة مميزة لشراء عقار؟",
    answerEn: "No. Ordinary legally resident non-Saudis (Iqama holders) and non-resident foreign investors have ownership routes under the non-Saudi ownership law.",
    answerAr: "لا، يحق للمقيمين العاديين ولغير المقيمين الشراء عبر النظام العام لتملك غير السعوديين."
  },
  {
    id: 33,
    sectionCode: "E",
    sectionNameEn: "Premium Residency",
    sectionNameAr: "الإقامة المميزة (مسار ملاك العقار)",
    category: "residency",
    questionEn: "Can buying property give me Premium Residency?",
    questionAr: "هل شراء عقار يمنحني الإقامة المميزة السعودية؟",
    answerEn: "There is a specific Real Estate Owner Residency product, but simply buying any arbitrary property does not automatically grant it unless it meets all qualifying criteria.",
    answerAr: "نعم، عبر مسار 'إقامة مالك عقار'، يمنح تملك عقار مؤهل الإقامة المميزة لمالكه وأسرته وفق الشروط المعتمدة."
  },
  {
    id: 34,
    sectionCode: "E",
    sectionNameEn: "Premium Residency",
    sectionNameAr: "الإقامة المميزة (مسار ملاك العقار)",
    category: "residency",
    questionEn: "How much property is required for Real Estate Owner Residency?",
    questionAr: "ما هو الحد الأدنى لقيمة العقار للحصول على إقامة مالك عقار؟",
    answerEn: "The current Real Estate Owner Residency criteria include ownership or usufruct of qualifying residential real estate worth at least SAR 4,000,000, unencumbered by mortgages.",
    answerAr: "يجب ألا تقل القيمة الإجمالية للعقار السكني المؤهل عن 4,000,000 ريال سعودي، وأن يكون العقار غير مرهون.",
    sourceUrl: "https://pr.gov.sa/faq",
    sourceLabel: "Premium Residency Center"
  },
  {
    id: 35,
    sectionCode: "E",
    sectionNameEn: "Premium Residency",
    sectionNameAr: "الإقامة المميزة (مسار ملاك العقار)",
    category: "residency",
    questionEn: "Can vacant land qualify for Real Estate Owner Residency?",
    questionAr: "هل الأراضي الفضاء مؤهلة لمسار إقامة مالك عقار؟",
    answerEn: "The current criteria specify qualifying existing developed residential property, not simply undeveloped vacant land.",
    answerAr: "تشترط اللائحة الحالية عقارات سكنية قائمة ومكتملة، ولا تنطبق على الأراضي الفضاء غير المطورة."
  },
  {
    id: 36,
    sectionCode: "E",
    sectionNameEn: "Premium Residency",
    sectionNameAr: "الإقامة المميزة (مسار ملاك العقار)",
    category: "residency",
    questionEn: "Can an off-plan apartment qualify for Real Estate Owner Residency?",
    questionAr: "هل الشقق المباعة على الخارطة مؤهلة لمسار الإقامة المميزة؟",
    answerEn: "Yes, potentially, under the Real Estate Owner Residency's specific off-plan criteria from licensed master developers.",
    answerAr: "نعم، للمشاريع السكنية المرخصة على الخارطة من مطورين معتمدين والمستوفية لاشتراطات مركز الإقامة المميزة."
  },

  // F. Property Prices (37-41)
  {
    id: 37,
    sectionCode: "F",
    sectionNameEn: "Property Prices",
    sectionNameAr: "أسعار العقارات والميزانيات",
    category: "pricing",
    questionEn: "What is the minimum property price for a foreigner?",
    questionAr: "ما هو الحد الأدنى لسعر العقار الذي يمكن للأجنبي شراؤه؟",
    answerEn: "There is not one universal minimum purchase price applicable to every foreign buyer. Eligibility depends on the ownership framework and property zone.",
    answerAr: "لا يوجد حد أدنى إلزامي لسعر العقار في النظام العام للتملك؛ وتبدأ الشقق المؤهلة من حوالي 300,000 ريال بحسب المدينة والمشروع."
  },
  {
    id: 38,
    sectionCode: "F",
    sectionNameEn: "Property Prices",
    sectionNameAr: "أسعار العقارات والميزانيات",
    category: "pricing",
    questionEn: "Can I buy a property for SAR 200,000?",
    questionAr: "هل يمكن شراء عقار بمبلغ 200 ألف ريال؟",
    answerEn: "Potentially, if the specific property is legally available in an approved zone and meets applicable zoning requirements.",
    answerAr: "نعم، إذا كان العقار المحدد مؤهلاً نظامياً في النطاق المعتمد ويستوفي الشروط."
  },
  {
    id: 39,
    sectionCode: "F",
    sectionNameEn: "Property Prices",
    sectionNameAr: "أسعار العقارات والميزانيات",
    category: "pricing",
    questionEn: "Can I buy an apartment for SAR 300,000?",
    questionAr: "هل أستطيع شراء شقة بمبلغ 300 ألف ريال؟",
    answerEn: "Potentially, yes, across multiple emerging residential developments in Jeddah and Riyadh.",
    answerAr: "نعم، تتوفر شقق سكنية ضمن هذه الفئة السعرية في عدة مخططات صاعدة."
  },
  {
    id: 40,
    sectionCode: "F",
    sectionNameEn: "Property Prices",
    sectionNameAr: "أسعار العقارات والميزانيات",
    category: "pricing",
    questionEn: "Can I buy an apartment for SAR 1 million?",
    questionAr: "هل يمكن شراء شقة بمبلغ مليون ريال؟",
    answerEn: "Potentially, subject to property eligibility and zone guidelines.",
    answerAr: "نعم، يوفر هذا النطاق السعري خيارات واسعة من الشقق الفاخرة والمجمعات السكنية المتكاملة."
  },
  {
    id: 41,
    sectionCode: "F",
    sectionNameEn: "Property Prices",
    sectionNameAr: "أسعار العقارات والميزانيات",
    category: "pricing",
    questionEn: "Are foreigners charged higher property prices?",
    questionAr: "هل تفرض أسعار أعلى على الأجانب؟",
    answerEn: "There is no general rule that a foreigner must pay a higher purchase price simply because they are foreign. However, specific non-Saudi ownership fees apply upon conveyance.",
    answerAr: "لا، سعر العقار واحد للجميع في السوق. الفارق الوحيد هو رسم تملك غير السعوديين النظامي البالغ 2% عند الإفراغ."
  },

  // G. Government Fees & Taxes (42-48)
  {
    id: 42,
    sectionCode: "G",
    sectionNameEn: "Government Fees & Taxes",
    sectionNameAr: "الضرائب والرسوم الحكومية (التصرفات ورسم 2%)",
    category: "taxes",
    questionEn: "Is there a property transfer tax in Saudi Arabia?",
    questionAr: "هل توجد ضريبة على الصفقات العقارية في السعودية؟",
    answerEn: "Yes. Saudi Arabia's Real Estate Transaction Tax (RETT / ضريبة التصرفات العقارية) is generally 5% of the taxable real-estate transaction value, subject to statutory exemptions.",
    answerAr: "نعم، تطبق المملكة ضريبة التصرفات العقارية بنسبة 5% على إجمالي قيمة الصفقة العقارية.",
    sourceUrl: "https://www.zatca.gov.sa/en/RulesRegulations/Taxes/Pages/RETTRegulation.aspx",
    sourceLabel: "ZATCA RETT Regulation"
  },
  {
    id: 43,
    sectionCode: "G",
    sectionNameEn: "Government Fees & Taxes",
    sectionNameAr: "الضرائب والرسوم الحكومية (التصرفات ورسم 2%)",
    category: "taxes",
    questionEn: "Who pays the 5% RETT?",
    questionAr: "من يتحمل سداد ضريبة التصرفات العقارية 5%؟",
    answerEn: "Transaction documentation and rules determine responsibility. Legally the seller is registered with ZATCA as responsible for payment, but parties can contractually agree on settlement terms.",
    answerAr: "نظامياً يسجل البائع كمسؤول عن السداد لدى هيئة الزكاة، وغالباً ما ينص عقد المبايعة على آلية تحمله أو تقاسمه بالاتفاق."
  },
  {
    id: 44,
    sectionCode: "G",
    sectionNameEn: "Government Fees & Taxes",
    sectionNameAr: "الضرائب والرسوم الحكومية (التصرفات ورسم 2%)",
    category: "taxes",
    questionEn: "Is VAT charged when buying a property?",
    questionAr: "هل تفرض ضريبة القيمة المضافة (VAT) عند شراء عقار؟",
    answerEn: "The treatment depends on the transaction. RETT and VAT are separate; real-estate transactions subject to 5% RETT are generally exempt from 15% VAT.",
    answerAr: "التصرفات العقارية الخاضعة لضريبة التصرفات 5% معفاة من ضريبة القيمة المضافة 15%، كما أن الإيجار السكني معفى من القيمة المضافة.",
    sourceUrl: "https://zatca.gov.sa/en/HelpCenter/FAQs/Pages/FAQArchiveEservices.aspx?page=FAQ_010",
    sourceLabel: "ZATCA VAT FAQs"
  },
  {
    id: 45,
    sectionCode: "G",
    sectionNameEn: "Government Fees & Taxes",
    sectionNameAr: "الضرائب والرسوم الحكومية (التصرفات ورسم 2%)",
    category: "taxes",
    questionEn: "Are residential rents subject to VAT?",
    questionAr: "هل يخضع الإيجار السكني لضريبة القيمة المضافة؟",
    answerEn: "Residential property leasing is generally exempt from VAT, while commercial and certain other property leases can be subject to VAT.",
    answerAr: "الإيجار السكني معفى نظاماً من ضريبة القيمة المضافة، بينما تخضع عقود الإيجار التجاري لضريبة القيمة المضافة.",
    sourceUrl: "https://zatca.gov.sa/ar/HelpCenter/FAQs/Pages/FAQArchiveEservices.aspx?page=FAQ_031",
    sourceLabel: "ZATCA Leasing Rules"
  },
  {
    id: 46,
    sectionCode: "G",
    sectionNameEn: "Government Fees & Taxes",
    sectionNameAr: "الضرائب والرسوم الحكومية (التصرفات ورسم 2%)",
    category: "taxes",
    questionEn: "Is there an additional fee for non-Saudi ownership?",
    questionAr: "هل يوجد رسم خاص على تملك غير السعوديين للعقار؟",
    answerEn: "Yes. The non-Saudi ownership law allows a specific fee of up to 5% of the value of the real right, with the actual amount determined by implementing regulations according to location, right, and use.",
    answerAr: "نعم، حدد النظام رسماً يصل إلى 5%، وتحدد اللائحة التنفيذية النسبة المطبقة بحسب النطاق الجغرافي ونوع الحق والاستخدام.",
    sourceUrl: "https://rega.gov.sa/en/regulations-and-by-laws/rules/law-of-real-estate-ownership-and-investment-by-non-saudis/",
    sourceLabel: "REGA Regulations"
  },
  {
    id: 47,
    sectionCode: "G",
    sectionNameEn: "Government Fees & Taxes",
    sectionNameAr: "الضرائب والرسوم الحكومية (التصرفات ورسم 2%)",
    category: "taxes",
    questionEn: "What is the non-Saudi ownership fee in Jeddah?",
    questionAr: "كم يبلغ رسم تملك غير السعوديين في جدة؟",
    answerEn: "The current implementing regulations set a 2% fee for specified geographical areas, rights, and uses listed in the regulation, including Jeddah.",
    answerAr: "حددت اللائحة التنفيذية رسماً بنسبة 2% من قيمة الحق العيني عند تملك غير السعوديين في النطاقات المعتمدة بمدينة جدة.",
    sourceUrl: "https://rega.gov.sa/",
    sourceLabel: "REGA Implementing Regulations"
  },
  {
    id: 48,
    sectionCode: "G",
    sectionNameEn: "Government Fees & Taxes",
    sectionNameAr: "الضرائب والرسوم الحكومية (التصرفات ورسم 2%)",
    category: "taxes",
    questionEn: "Is the 2% fee the same as the 5% RETT?",
    questionAr: "هل رسم 2% هو نفسه ضريبة التصرفات 5%؟",
    answerEn: "No. These are separate charges: RETT is generally 5% (ZATCA), while the non-Saudi ownership fee is 2% (REGA). They should not be combined as one tax.",
    answerAr: "لا، هما رسومان منفصلان: 5% ضريبة تصرفات عقارية لهيئة الزكاة + 2% رسم تملك غير السعوديين لهيئة العقار."
  },

  // H. Financing & Mortgages (49-56)
  {
    id: 49,
    sectionCode: "H",
    sectionNameEn: "Financing & Mortgages",
    sectionNameAr: "التمويل العقاري والبنوك",
    category: "finance",
    questionEn: "Can an expat get a mortgage in Saudi Arabia?",
    questionAr: "هل يستطيع المقيم الحصول على تمويل عقاري بنكي في السعودية؟",
    answerEn: "Potentially, yes, subject to the lending bank's eligibility criteria, employer category, and salary transfer requirements.",
    answerAr: "نعم، تقدم البنوك السعودية برامج تمويل عقاري للمقيمين وفق شروط الراتب وجهة العمل والسجل الائتماني."
  },
  {
    id: 50,
    sectionCode: "H",
    sectionNameEn: "Financing & Mortgages",
    sectionNameAr: "التمويل العقاري والبنوك",
    category: "finance",
    questionEn: "Can an Iqama holder get home financing?",
    questionAr: "هل يحصل حامل الإقامة على تمويل شراء مسكن؟",
    answerEn: "Potentially, depending on the bank/finance company, salary level, credit score (SIMAH), residency validity, and property type.",
    answerAr: "نعم، بحسب جهة التمويل والراتب وتقرير سمة الائتماني وسريان الإقامة ومطابقة العقار للشروط."
  },
  {
    id: 51,
    sectionCode: "H",
    sectionNameEn: "Financing & Mortgages",
    sectionNameAr: "التمويل العقاري والبنوك",
    category: "finance",
    questionEn: "Can a non-resident get Saudi property financing?",
    questionAr: "هل يحصل غير المقيم على تمويل عقاري في السعودية؟",
    answerEn: "This is more restrictive and lender-specific. Do not assume bank financing is available simply because ownership is permitted; developer payment plans are more common.",
    answerAr: "تمويل غير المقيمين محدود ويتم غالباً عبر الخدمات المصرفية الخاصة أو خطط السداد المباشرة مع المطورين."
  },
  {
    id: 52,
    sectionCode: "H",
    sectionNameEn: "Financing & Mortgages",
    sectionNameAr: "التمويل العقاري والبنوك",
    category: "finance",
    questionEn: "Can I use a Saudi bank to finance my purchase?",
    questionAr: "هل يمكنني استخدام بنك سعودي لتمويل الشراء؟",
    answerEn: "Potentially, subject to the specific bank's retail finance products and non-Saudi underwriting criteria.",
    answerAr: "نعم، إذا كانت برامج البنك التمويلية تتيح ذلك وتنطبق عليك شروط المنح."
  },
  {
    id: 53,
    sectionCode: "H",
    sectionNameEn: "Financing & Mortgages",
    sectionNameAr: "التمويل العقاري والبنوك",
    category: "finance",
    questionEn: "Can I pay cash?",
    questionAr: "هل يمكن الشراء نقداً (كاش)؟",
    answerEn: "Yes, provided the transaction complies with financial regulations. Non-Saudi financial transactions related to property acquisition must be conducted through regulated electronic payment methods.",
    answerAr: "نعم، شريطة سداد المبالغ عبر القنوات الإلكترونية المصرفية المعتمدة (سداد / شيك مصرفي مصدق / حساب ضمان) وفقاً لتعليمات البنك المركزي.",
    sourceUrl: "https://rega.gov.sa/",
    sourceLabel: "REGA Regulations"
  },
  {
    id: 54,
    sectionCode: "H",
    sectionNameEn: "Financing & Mortgages",
    sectionNameAr: "التمويل العقاري والبنوك",
    category: "finance",
    questionEn: "Can I transfer money from overseas?",
    questionAr: "هل يمكن تحويل أموال الشراء من خارج المملكة؟",
    answerEn: "Potentially, subject to Saudi banking regulations, KYC verification, and international payment compliance.",
    answerAr: "نعم، بتحويل المبالغ إلى حسابك البنكي داخل المملكة أو إلى حساب الضمان المعتمد للتسوية بالريال السعودي."
  },
  {
    id: 55,
    sectionCode: "H",
    sectionNameEn: "Financing & Mortgages",
    sectionNameAr: "التمويل العقاري والبنوك",
    category: "finance",
    questionEn: "Can I pay in USD?",
    questionAr: "هل يمكن دفع قيمة العقار بالدولار الأمريكي؟",
    answerEn: "The purchase contract will generally be denominated and settled in Saudi Riyals (SAR) under Saudi banking regulations. Conversion is handled at the fixed peg (1 USD = 3.75 SAR).",
    answerAr: "تسجل العقود وتتم التسويات بالريال السعودي، ويتم التحويل من الدولار بسعر الصرف الرسمي الثابت (1 دولار = 3.75 ريال)."
  },
  {
    id: 56,
    sectionCode: "H",
    sectionNameEn: "Financing & Mortgages",
    sectionNameAr: "التمويل العقاري والبنوك",
    category: "finance",
    questionEn: "Can cryptocurrency be used to buy property?",
    questionAr: "هل تقبل العملات الرقمية (الكريبتو) لشراء العقار؟",
    answerEn: "No. Regulated electronic banking channels (SAR denominated) are mandatory for property conveyancing under Saudi law.",
    answerAr: "لا، تشترط الأنظمة السعودية قنوات الدفع الإلكتروني المصرفية الرسمية المعتمدة فقط."
  },

  // I. Off-Plan Property (57-62)
  {
    id: 57,
    sectionCode: "I",
    sectionNameEn: "Off-Plan Property",
    sectionNameAr: "البيع على الخارطة وبرنامج وافي",
    category: "offplan",
    questionEn: "Can foreigners buy off-plan property?",
    questionAr: "هل يحق للأجانب شراء عقارات على الخارطة؟",
    answerEn: "Potentially, subject to applicable non-Saudi ownership rules and the specific project's Wafi regulatory approvals.",
    answerAr: "نعم، الشراء على الخارطة متاح للأجانب في المشاريع المرخصة نظامياً عبر برنامج وافي."
  },
  {
    id: 58,
    sectionCode: "I",
    sectionNameEn: "Off-Plan Property",
    sectionNameAr: "البيع على الخارطة وبرنامج وافي",
    category: "offplan",
    questionEn: "Is buying off-plan safe?",
    questionAr: "هل شراء عقار على الخارطة آمن في السعودية؟",
    answerEn: "Yes, when purchasing through government-licensed Wafi projects where developer licensing, escrow accounts, and stage-by-stage construction audits are strictly enforced.",
    answerAr: "نعم، عند الشراء من مشاريع مرخصة من برنامج 'وافي' الحكومي الذي يلزم بحسابات ضمان بنكية ومتابعة هندسية دقيقة."
  },
  {
    id: 59,
    sectionCode: "I",
    sectionNameEn: "Off-Plan Property",
    sectionNameAr: "البيع على الخارطة وبرنامج وافي",
    category: "offplan",
    questionEn: "How do I verify an off-plan project?",
    questionAr: "كيف أتحقق من ترخيص مشروع البيع على الخارطة؟",
    answerEn: "Check the project's regulatory license status, developer credentials, and escrow account through official REGA and Wafi channels.",
    answerAr: "من خلال التحقق من رقم ترخيص وافي وسجل المطور العقاري ورقم حساب الضمان البنكي عبر منصة وافي / هيئة العقار."
  },
  {
    id: 60,
    sectionCode: "I",
    sectionNameEn: "Off-Plan Property",
    sectionNameAr: "البيع على الخارطة وبرنامج وافي",
    category: "offplan",
    questionEn: "What happens if the developer delays the project?",
    questionAr: "ماذا يحدث في حال تأخر المطور عن موعد التسليم؟",
    answerEn: "The buyer's contractual rights, delay penalties, and completion milestones are governed by the approved Wafi standard contract and escrow provisions.",
    answerAr: "تنظم عقود وافي الموحدة غرامات التأخير وحقوق المشترين وآليات التعويض وتدخل الجهات المنظمة لضمان استكمال المشروع."
  },
  {
    id: 61,
    sectionCode: "I",
    sectionNameEn: "Off-Plan Property",
    sectionNameAr: "البيع على الخارطة وبرنامج وافي",
    category: "offplan",
    questionEn: "Can I resell an off-plan property before completion?",
    questionAr: "هل يمكن إعادة بيع العقد على الخارطة قبل انتهاء البناء؟",
    answerEn: "This depends on the developer's assignment policy, contract terms, and applicable REGA conveyance regulations.",
    answerAr: "نعم، وفق اشتراطات التنازل لدى المطور العقاري والضوابط المنظمة من الهيئة."
  },
  {
    id: 62,
    sectionCode: "I",
    sectionNameEn: "Off-Plan Property",
    sectionNameAr: "البيع على الخارطة وبرنامج وافي",
    category: "offplan",
    questionEn: "Can foreigners buy apartments from developers directly?",
    questionAr: "هل يحق للأجنبي الشراء المباشر من المطور العقاري؟",
    answerEn: "Yes, where the project is approved for non-Saudi buyers and the developer holds an active REGA FAL license.",
    answerAr: "نعم، عندما يكون المشروع مرخصاً ومؤهلاً لتملك غير السعوديين ويحمل المطور التراخيص النظامية."
  },

  // J. Due Diligence (63-70)
  {
    id: 63,
    sectionCode: "J",
    sectionNameEn: "Due Diligence",
    sectionNameAr: "الفحص النافي للجهالة والتحقق",
    category: "legal",
    questionEn: "How do I know the seller actually owns the property?",
    questionAr: "كيف أتأكد من ملكية البائع الفعلية للعقار؟",
    answerEn: "Verify ownership documentation and electronic title deed status through official Saudi platforms (Real Estate Registry / Najiz).",
    answerAr: "يتم التحقق الفوري عبر منصة البورصة العقارية / ناجز أو السجل العقاري للتأكد من سريان الصك وعدم وجود رهون أو قيود."
  },
  {
    id: 64,
    sectionCode: "J",
    sectionNameEn: "Due Diligence",
    sectionNameAr: "الفحص النافي للجهالة والتحقق",
    category: "legal",
    questionEn: "How do I verify the title deed?",
    questionAr: "كيف أتحقق من صحة الصك العقاري؟",
    answerEn: "Use the official Ministry of Justice / Real Estate Registry portal (Najiz / البورصة العقارية) by entering the title deed number and seller identity.",
    answerAr: "عبر الاستعلام الإلكتروني برقم الصك وهوية المالك في منصة ناجز أو السجل العقاري."
  },
  {
    id: 65,
    sectionCode: "J",
    sectionNameEn: "Due Diligence",
    sectionNameAr: "الفحص النافي للجهالة والتحقق",
    category: "legal",
    questionEn: "Can I buy a property with a mortgage on it?",
    questionAr: "هل يمكن شراء عقار مرهون لبنك؟",
    answerEn: "Potentially, but the existing bank encumbrance must be officially released or settled through mortgage clearance before or during electronic conveyance.",
    answerAr: "نعم، بشرط فك الرهن أو سداده عبر آليات نقل المديونية والإفراغ المعتمدة لدى وزارة العدل والبنوك."
  },
  {
    id: 66,
    sectionCode: "J",
    sectionNameEn: "Due Diligence",
    sectionNameAr: "الفحص النافي للجهالة والتحقق",
    category: "legal",
    questionEn: "How do I know whether there is a lien on the property?",
    questionAr: "كيف أعرف إن كان هناك حجز أو نزاع قضائي على العقار؟",
    answerEn: "Official Real Estate Registry deeds explicitly indicate any active liens, mortgages, or regulatory caveats.",
    answerAr: "توضح الصكوك الإلكترونية في السجل العقاري أي قيود أو رهون أو حجوزات مسجلة على العقار بصورة شفافة."
  },
  {
    id: 67,
    sectionCode: "J",
    sectionNameEn: "Due Diligence",
    sectionNameAr: "الفحص النافي للجهالة والتحقق",
    category: "legal",
    questionEn: "What documents should I ask the seller for?",
    questionAr: "ما هي المستندات التي يجب طلبها من البائع؟",
    answerEn: "1. Electronic Title Deed. 2. Building Completion Certificate. 3. REGA FAL Advertising License. 4. Service charge clearance statement. 5. Approved floor plan.",
    answerAr: "1. الصك الإلكتروني المحدث. 2. شهادة إتمام البناء. 3. ترخيص فال العقاري للإعلان. 4. براءة ذمة من جمعية الملاك / الخدمات. 5. المخطط الهندسي المعتمد."
  },
  {
    id: 68,
    sectionCode: "J",
    sectionNameEn: "Due Diligence",
    sectionNameAr: "الفحص النافي للجهالة والتحقق",
    category: "legal",
    questionEn: "Should I hire a lawyer?",
    questionAr: "هل ينصح بالاستعانة بمستشار قانوني؟",
    answerEn: "For substantial investments, independent legal review is strongly recommended to review contract stipulations and due diligence reports.",
    answerAr: "في الاستثمارات الكبرى، توفر صهيب العقارية مراجعة قانونية وتقارير معتمدة لضمان سلامة كافة بنود الصفقة."
  },
  {
    id: 69,
    sectionCode: "J",
    sectionNameEn: "Due Diligence",
    sectionNameAr: "الفحص النافي للجهالة والتحقق",
    category: "legal",
    questionEn: "Should I hire a property inspector?",
    questionAr: "هل أحتاج إلى فحص هندسي للعقار؟",
    answerEn: "For completed properties, an independent building inspection (فحص مباني معتمد) ensures structural and MEP integrity.",
    answerAr: "نعم، ينصح بالفحص الفني المعتمد للمباني الجاهزة للتأكد من جودة الأعمال الإنشائية والكهربائية والسباكة."
  },
  {
    id: 70,
    sectionCode: "J",
    sectionNameEn: "Due Diligence",
    sectionNameAr: "الفحص النافي للجهالة والتحقق",
    category: "legal",
    questionEn: "Should I verify the developer?",
    questionAr: "هل يجب التحقق من سمعة وسجل المطور العقاري؟",
    answerEn: "Absolutely—inspect previous completed developments, delivery track record, and official REGA developer ratings.",
    answerAr: "بالتأكيد، من خلال مراجعة المشاريع السابقة المسلمة، الالتزام بمواعيد التسليم، وتصنيف المطور لدى هيئة العقار."
  },

  // K. Buying Process (71-76)
  {
    id: 71,
    sectionCode: "K",
    sectionNameEn: "Buying Process",
    sectionNameAr: "إجراءات الشراء الرسمية",
    category: "process",
    questionEn: "What is the normal property-buying process?",
    questionAr: "ما هو التسلسل النظامي لعملية شراء العقار؟",
    answerEn: "1. Determine eligibility → 2. Find eligible property → 3. Verify seller/developer → 4. Conduct due diligence → 5. Agree on terms → 6. Register transaction/RETT → 7. Complete electronic payment → 8. Complete conveyance → 9. Receive registered title deed.",
    answerAr: "1. فحص الأهلية ← 2. اختيار العقار المؤهل ← 3. فحص البائع والمشروع ← 4. التحقق من الصك ← 5. توقيع عقد الوساطة ← 6. تسجيل الصفقة وسداد الضرائب ← 7. الدفع الإلكتروني ← 8. الإفراغ الإلكتروني ← 9. إصدار الصك."
  },
  {
    id: 72,
    sectionCode: "K",
    sectionNameEn: "Buying Process",
    sectionNameAr: "إجراءات الشراء الرسمية",
    category: "process",
    questionEn: "Where does a foreigner apply?",
    questionAr: "أين يقدم المشتري الأجنبي طلبه؟",
    answerEn: "Through the official Saudi Properties platform operated under REGA.",
    answerAr: "من خلال منصة العقارات السعودية الرسمية التابعة للهيئة العامة للعقار.",
    sourceUrl: "https://saudiproperties.rega.gov.sa/",
    sourceLabel: "Saudi Properties Portal"
  },
  {
    id: 73,
    sectionCode: "K",
    sectionNameEn: "Buying Process",
    sectionNameAr: "إجراءات الشراء الرسمية",
    category: "process",
    questionEn: "Can an expat apply using their Iqama?",
    questionAr: "هل يستطيع المقيم التقديم باستخدام الإقامة؟",
    answerEn: "Yes, resident expats complete their application seamlessly via the digital journey using their valid Iqama.",
    answerAr: "نعم، عبر الدخول برقم الإقامة الموثق عبر النفاذ الوطني / المنصة العقارية."
  },
  {
    id: 74,
    sectionCode: "K",
    sectionNameEn: "Buying Process",
    sectionNameAr: "إجراءات الشراء الرسمية",
    category: "process",
    questionEn: "What if I am outside Saudi Arabia?",
    questionAr: "ما هي الإجراءات لمن هو خارج المملكة؟",
    answerEn: "The non-resident journey begins by obtaining verified digital identity credentials through Saudi representations/embassies abroad before logging into the portal.",
    answerAr: "تبدأ الإجراءات بالحصول على توثيق الهوية الرقمية عبر سفارة أو ممثلية المملكة بالخارج قبل استكمال الطلب إلكترونياً."
  },
  {
    id: 75,
    sectionCode: "K",
    sectionNameEn: "Buying Process",
    sectionNameAr: "إجراءات الشراء الرسمية",
    category: "process",
    questionEn: "Can someone else buy property on my behalf?",
    questionAr: "هل يمكن لشخص آخر الشراء نيابة عني؟",
    answerEn: "A properly authorized legal representative can act on your behalf using a valid electronic Power of Attorney (وكالة شرعية).",
    answerAr: "نعم، بموجب وكالة شرعية إلكترونية معتمدة تخول الوكيل بإتمام إجراءات الشراء والإفراغ."
  },
  {
    id: 76,
    sectionCode: "K",
    sectionNameEn: "Buying Process",
    sectionNameAr: "إجراءات الشراء الرسمية",
    category: "process",
    questionEn: "Can I give power of attorney to a real estate broker?",
    questionAr: "هل يمكن توكيل وسيط عقاري؟",
    answerEn: "Potentially, using an authorized legal Power of Attorney with clearly defined scope and limits.",
    answerAr: "نعم، عبر وكالة محددة الصلاحيات والشروط لدى كاتب العدل أو السفارة."
  },

  // L. Ownership & Title (77-81)
  {
    id: 77,
    sectionCode: "L",
    sectionNameEn: "Ownership & Title",
    sectionNameAr: "الملكية والصكوك العقارية",
    category: "ownership",
    questionEn: "Will the property be registered in my name?",
    questionAr: "هل يسجل العقار باسمي رسمياً؟",
    answerEn: "Yes. Once conveyance is executed, non-Saudi ownership is legally valid and officially registered in your name in the Real Estate Registry.",
    answerAr: "نعم، فور إتمام الإفراغ يصدر صك الملكية الإلكتروني مسجلاً باسمك رسمياً في السجل العقاري.",
    sourceUrl: "https://rega.gov.sa/en/regulations-and-by-laws/rules/law-of-real-estate-ownership-and-investment-by-non-saudis/",
    sourceLabel: "REGA Regulations"
  },
  {
    id: 78,
    sectionCode: "L",
    sectionNameEn: "Ownership & Title",
    sectionNameAr: "الملكية والصكوك العقارية",
    category: "ownership",
    questionEn: "Do foreigners get full ownership?",
    questionAr: "هل يحصل الأجنبي على ملكية كاملة؟",
    answerEn: "The nature of the right depends on what is designated for the specific property and zone (freehold ownership vs usufruct rights).",
    answerAr: "نعم في النطاقات المعتمدة للملكية التامة (Freehold)، أو حق انتفاع طويل الأجل وفق تصنيف المنطقة."
  },
  {
    id: 79,
    sectionCode: "L",
    sectionNameEn: "Ownership & Title",
    sectionNameAr: "الملكية والصكوك العقارية",
    category: "ownership",
    questionEn: "What is freehold ownership?",
    questionAr: "ما هو مفهوم الملكية التامة (Freehold)؟",
    answerEn: "Freehold means absolute ownership of the property and title without an expiration date, subject to Saudi law.",
    answerAr: "الملكية التامة تعني تملك العقار وحقوقه بصورة دائمة وغير مقيدة بمدة زمنية وفق الأنظمة السعودية."
  },
  {
    id: 80,
    sectionCode: "L",
    sectionNameEn: "Ownership & Title",
    sectionNameAr: "الملكية والصكوك العقارية",
    category: "ownership",
    questionEn: "What is usufruct?",
    questionAr: "ما هو حق الانتفاع؟",
    answerEn: "Usufruct is a real right granting the holder the authority to use, enjoy, and commercially benefit from real estate owned by another party for a defined long-term period.",
    answerAr: "حق الانتفاع هو حق عيني مسجل يمنح المستفيد استغلال العقار وتأجيره والانتفاع به لمدد محددة تصل إلى 99 عاماً."
  },
  {
    id: 81,
    sectionCode: "L",
    sectionNameEn: "Ownership & Title",
    sectionNameAr: "الملكية والصكوك العقارية",
    category: "ownership",
    questionEn: "Can foreigners obtain usufruct rights?",
    questionAr: "هل يحق للأجانب الحصول على حقوق انتفاع؟",
    answerEn: "Yes, the non-Saudi ownership law expressly regulates acquisition of usufruct and other real rights in designated zones.",
    answerAr: "نعم، ينظم النظام صراحة اكتساب حقوق الانتفاع والحقوق العينية الأخرى للأجانب.",
    sourceUrl: "https://rega.gov.sa/en/regulations-and-by-laws/rules/law-of-real-estate-ownership-and-investment-by-non-saudis/",
    sourceLabel: "REGA Regulations"
  },

  // M. Leaving Saudi Arabia (82-86)
  {
    id: 82,
    sectionCode: "M",
    sectionNameEn: "Leaving Saudi Arabia",
    sectionNameAr: "مغادرة المملكة وانتهاء الإقامة",
    category: "basics",
    questionEn: "What happens to my property if I leave Saudi Arabia?",
    questionAr: "ماذا يحدث لعقاري إذا غادرت السعودية نهائياً؟",
    answerEn: "Leaving Saudi Arabia does not automatically revoke a lawfully registered property deed. Your ownership remains valid under applicable rules.",
    answerAr: "تحتفظ بملكيتك التامة والنظامية للصك العقاري؛ فالخروج النهائي لا يسقط الملكية ولا يؤثر في حقك في تأجيره أو الاحتفاظ به أو بيعه."
  },
  {
    id: 83,
    sectionCode: "M",
    sectionNameEn: "Leaving Saudi Arabia",
    sectionNameAr: "مغادرة المملكة وانتهاء الإقامة",
    category: "basics",
    questionEn: "Can I keep my property after my Iqama expires?",
    questionAr: "هل أحتفظ بالعقار بعد انتهاء الإقامة؟",
    answerEn: "Yes, the ownership basis under which you acquired the property continues to protect your registered title.",
    answerAr: "نعم، تظل الملكية مسجلة باسمك في السجل العقاري."
  },
  {
    id: 84,
    sectionCode: "M",
    sectionNameEn: "Leaving Saudi Arabia",
    sectionNameAr: "مغادرة المملكة وانتهاء الإقامة",
    category: "basics",
    questionEn: "Can I sell my property after leaving Saudi Arabia?",
    questionAr: "هل يمكنني بيع عقاري بعد مغادرة المملكة؟",
    answerEn: "Yes, potentially, subject to standard electronic conveyance and registry requirements.",
    answerAr: "نعم، عبر البورصة العقارية أو تفويض وكيل شرعي أو وسيط مرخص."
  },
  {
    id: 85,
    sectionCode: "M",
    sectionNameEn: "Leaving Saudi Arabia",
    sectionNameAr: "مغادرة المملكة وانتهاء الإقامة",
    category: "basics",
    questionEn: "Can I rent it out after leaving?",
    questionAr: "هل أستطيع تأجير العقار وأنا خارج المملكة؟",
    answerEn: "Yes, through standard Ejar tenancy contracts registered online or via a licensed property manager.",
    answerAr: "نعم، بتوثيق عقود الإيجار عبر منصة إيجار الإلكترونية أو توكيل شركة إدارة أملاك."
  },
  {
    id: 86,
    sectionCode: "M",
    sectionNameEn: "Leaving Saudi Arabia",
    sectionNameAr: "مغادرة المملكة وانتهاء الإقامة",
    category: "basics",
    questionEn: "Can I appoint someone to manage it?",
    questionAr: "هل يمكن تعيين شركة لإدارة العقار؟",
    answerEn: "Yes, you can appoint REGA-licensed property managers like Asaheeb Real Estate to manage leasing, maintenance, and rent collection.",
    answerAr: "نعم، عبر توكيل شركة إدارة أملاك مرخصة مثل صهيب العقارية لإبرام عقود منصة إيجار وتحصيل الإيرادات والصيانة."
  },

  // N. Renting Out the Property (87-92)
  {
    id: 87,
    sectionCode: "N",
    sectionNameEn: "Renting Out Property",
    sectionNameAr: "التأجير والاستثمار ومنصة إيجار",
    category: "rental",
    questionEn: "Can an expat rent out their property?",
    questionAr: "هل يحق للمالك الأجنبي تأجير عقاره؟",
    answerEn: "Potentially, yes, if the ownership/use rights and property regulations permit residential leasing.",
    answerAr: "نعم، يحق للمالك تأجير عقاره بعقود سنوية أو ربع سنوية أو شهرية نظامية."
  },
  {
    id: 88,
    sectionCode: "N",
    sectionNameEn: "Renting Out Property",
    sectionNameAr: "التأجير والاستثمار ومنصة إيجار",
    category: "rental",
    questionEn: "Can I rent it on a yearly contract?",
    questionAr: "هل يمكن التأجير بعقد سنوي؟",
    answerEn: "Yes, standard yearly residential leases are registered digitally on Ejar.",
    answerAr: "نعم، بعقود موحدة تسجل على شبكة إيجار وتجدد تلقائياً أو سنوياً."
  },
  {
    id: 89,
    sectionCode: "N",
    sectionNameEn: "Renting Out Property",
    sectionNameAr: "التأجير والاستثمار ومنصة إيجار",
    category: "rental",
    questionEn: "Can I rent it monthly?",
    questionAr: "هل يمكن التأجير الشهري؟",
    answerEn: "Depends on property zoning, building bylaws, and applicable rental regulations.",
    answerAr: "نعم، تتيح منصة إيجار دورات سداد شهرية وربع سنوية ونصف سنوية وسنوية."
  },
  {
    id: 90,
    sectionCode: "N",
    sectionNameEn: "Renting Out Property",
    sectionNameAr: "التأجير والاستثمار ومنصة إيجار",
    category: "rental",
    questionEn: "Can I use Airbnb / short-term rentals?",
    questionAr: "هل يمكن تشغيل الشقة عبر Airbnb أو التأجير القصير؟",
    answerEn: "Short-term holiday leasing requires a Ministry of Tourism tourist accommodation license and compliance with building HOA bylaws.",
    answerAr: "يتطلب التأجير السياحي القصير ترخيصاً من وزارة السياحة وموافقة لوائح جمعية الملاك في المبنى."
  },
  {
    id: 91,
    sectionCode: "N",
    sectionNameEn: "Renting Out Property",
    sectionNameAr: "التأجير والاستثمار ومنصة إيجار",
    category: "rental",
    questionEn: "Can I rent my apartment to another expat?",
    questionAr: "هل يمكن تأجير الشقة لمقيم آخر؟",
    answerEn: "Generally, yes, subject to standard Ejar tenancy verification and valid identity documents.",
    answerAr: "نعم، عبر عقد إيجار موثق بهوية المستأجر السارية."
  },
  {
    id: 92,
    sectionCode: "N",
    sectionNameEn: "Renting Out Property",
    sectionNameAr: "التأجير والاستثمار ومنصة إيجار",
    category: "rental",
    questionEn: "How do I register the rental contract?",
    questionAr: "كيف يتم توثيق عقد الإيجار؟",
    answerEn: "Through Saudi Arabia's mandatory unified Ejar system via a licensed real estate broker.",
    answerAr: "عبر شبكة إيجار الموحدة التابعة لوزارة الإسكان من خلال وسيط عقاري مرخص."
  },

  // O. Investment Questions (93-98)
  {
    id: 93,
    sectionCode: "O",
    sectionNameEn: "Investment Questions",
    sectionNameAr: "عوائد الاستثمار واستراتيجيات السوق",
    category: "investment",
    questionEn: "Is Saudi real estate a good investment?",
    questionAr: "هل الاستثمار العقاري مجدٍ في السعودية؟",
    answerEn: "It can be highly rewarding, driven by Vision 2030 economic growth, population influx in Riyadh and Jeddah, infrastructure mega-projects, and strong rental demand.",
    answerAr: "نعم، تشهد السوق السعودية نمواً قوياً مدعوماً برؤية 2030 وتوسع المقرات العالمية والطلب السكني والسياحي المتزايد."
  },
  {
    id: 94,
    sectionCode: "O",
    sectionNameEn: "Investment Questions",
    sectionNameAr: "عوائد الاستثمار واستراتيجيات السوق",
    category: "investment",
    questionEn: "What rental yield can I expect?",
    questionAr: "ما هو العائد الإيجاري المتوقع؟",
    answerEn: "Prime residential apartments in Jeddah and Riyadh generally yield 6.5% to 9.0% gross, while prime commercial assets yield 7.5% to 10.5%.",
    answerAr: "تحقق الشقق السكنية المميزة في جدة والرياض عوائد إجمالية تتراوح بين 6.5% إلى 9.0%، بينما تحقق الأصول التجارية ما بين 7.5% إلى 10.5%."
  },
  {
    id: 95,
    sectionCode: "O",
    sectionNameEn: "Investment Questions",
    sectionNameAr: "عوائد الاستثمار واستراتيجيات السوق",
    category: "investment",
    questionEn: "How do I calculate rental yield?",
    questionAr: "كيف أحسب العائد الإيجاري بدقة؟",
    answerEn: "Gross Yield (%) = (Annual Rent ÷ Total Acquisition Cost) × 100. Net Yield factors in service charges, maintenance, and vacancy.",
    answerAr: "العائد الصافي (%) = [(الإيراد الإيجاري السنوي − المصاريف والرسوم والصيانة) ÷ إجمالي تكلفة الشراء] × 100."
  },
  {
    id: 96,
    sectionCode: "O",
    sectionNameEn: "Investment Questions",
    sectionNameAr: "عوائد الاستثمار واستراتيجيات السوق",
    category: "investment",
    questionEn: "What expenses reduce rental returns?",
    questionAr: "ما هي المصاريف التي تؤثر على صافي العائد؟",
    answerEn: "Property management fees, annual building service charges, maintenance, vacancy periods, and insurance.",
    answerAr: "رسوم إدارة الأملاك، رسوم الخدمات والصيانة لجمعية الملاك، وفترات الشغور والتأمين."
  },
  {
    id: 97,
    sectionCode: "O",
    sectionNameEn: "Investment Questions",
    sectionNameAr: "عوائد الاستثمار واستراتيجيات السوق",
    category: "investment",
    questionEn: "Should I buy for rental income or capital appreciation?",
    questionAr: "هل أركز على الدخل الإيجاري أم نمو رأس المال؟",
    answerEn: "It depends on strategy: central business districts (Riyadh North) offer high capital appreciation, while coastal & hospitality corridors (Jeddah Obhur) deliver high cash-flow rental yields.",
    answerAr: "بحسب استراتيجيتك: مناطق الأعمال والمقرات (شمال الرياض) تقدم نمواً رأسمالياً أعلى، بينما المناطق الساحلية والسياحية (جدة) تقدم تدفقاً نقدياً إيجارياً مرتفعاً."
  },
  {
    id: 98,
    sectionCode: "O",
    sectionNameEn: "Investment Questions",
    sectionNameAr: "عوائد الاستثمار واستراتيجيات السوق",
    category: "investment",
    questionEn: "Which Saudi city is best for investment?",
    questionAr: "أي المدن السعودية أفضل للاستثمار؟",
    answerEn: "Compare Riyadh (business hub, corporate influx), Jeddah (tourism, coastal lifestyle), and Madinah (year-round religious hospitality) based on your target asset class.",
    answerAr: "تتصدر الرياض في التوسع التجاري والمقرات، وتتميز جدة بالعقارات الساحلية الفاخرة والعائد السياحي، والمدينة بالطلب الفندقي المستمر."
  },

  // P. Selling the Property (99-105)
  {
    id: 99,
    sectionCode: "P",
    sectionNameEn: "Selling Property",
    sectionNameAr: "إعادة البيع والتخارج من الاستثمار",
    category: "management",
    questionEn: "Can foreigners sell property in Saudi Arabia?",
    questionAr: "هل يحق للأجنبي بيع عقاره في أي وقت؟",
    answerEn: "Yes, subject to standard ownership and electronic conveyance rules.",
    answerAr: "نعم، يحق للمالك بيع عقاره والتصرف فيه عبر البورصة العقارية والسجل العقاري."
  },
  {
    id: 100,
    sectionCode: "P",
    sectionNameEn: "Selling Property",
    sectionNameAr: "إعادة البيع والتخارج من الاستثمار",
    category: "management",
    questionEn: "Can I sell to a Saudi citizen?",
    questionAr: "هل يمكنني البيع لمواطن سعودي؟",
    answerEn: "Yes, sales to Saudi nationals, GCC citizens, or eligible foreign buyers follow normal electronic conveyance.",
    answerAr: "نعم، يحق البيع للمواطنين والخليجيين ولغير السعوديين المؤهلين."
  },
  {
    id: 101,
    sectionCode: "P",
    sectionNameEn: "Selling Property",
    sectionNameAr: "إعادة البيع والتخارج من الاستثمار",
    category: "management",
    questionEn: "Can I sell to another foreigner?",
    questionAr: "هل يمكنني البيع لمقيم أو أجنبي آخر؟",
    answerEn: "Yes, provided the foreign buyer is eligible to acquire property in the specific geographical zone.",
    answerAr: "نعم، بشرط مطابقة المشتري الأجنبي لشروط وأهلية التملك في ذلك النطاق."
  },
  {
    id: 102,
    sectionCode: "P",
    sectionNameEn: "Selling Property",
    sectionNameAr: "إعادة البيع والتخارج من الاستثمار",
    category: "management",
    questionEn: "Are there taxes when I sell?",
    questionAr: "هل تفرض ضرائب عند البيع؟",
    answerEn: "Real Estate Transaction Tax (5% RETT) applies to the transaction upon conveyance.",
    answerAr: "تطبق ضريبة التصرفات العقارية 5% على الصفقة عند الإفراغ."
  },
  {
    id: 103,
    sectionCode: "P",
    sectionNameEn: "Selling Property",
    sectionNameAr: "إعادة البيع والتخارج من الاستثمار",
    category: "management",
    questionEn: "Can I transfer my property to my spouse?",
    questionAr: "هل يمكن نقل ملكية العقار للزوج أو الزوجة؟",
    answerEn: "Potentially, subject to transaction type, marriage verification, and RETT statutory exemption rules for first-degree relatives.",
    answerAr: "نعم، وتقدم هيئة الزكاة إعفاءات لضريبة التصرفات في حالات الهبة بين الأقارب من الدرجة الأولى وفق الضوابط."
  },
  {
    id: 104,
    sectionCode: "P",
    sectionNameEn: "Selling Property",
    sectionNameAr: "إعادة البيع والتخارج من الاستثمار",
    category: "management",
    questionEn: "Can I gift my property?",
    questionAr: "هل يمكن هبة العقار؟",
    answerEn: "Potentially, gifting is subject to specific legal deed recording and RETT family exemption protocols.",
    answerAr: "نعم، عبر توثيق عقد الهبة لدى كاتب العدل مع استيفاء شروط الإعفاء الضريبي."
  },
  {
    id: 105,
    sectionCode: "P",
    sectionNameEn: "Selling Property",
    sectionNameAr: "إعادة البيع والتخارج من الاستثمار",
    category: "management",
    questionEn: "Can I transfer property to my children?",
    questionAr: "هل يمكن نقل ملكية العقار للأبناء؟",
    answerEn: "Potentially, subject to applicable inheritance, gifting, and adult ownership rules.",
    answerAr: "نعم، وفق ضوابط الهبة للأقارب من الدرجة الأولى والتسجيل في السجل العقاري."
  },

  // Q. Inheritance (106-110)
  {
    id: 106,
    sectionCode: "Q",
    sectionNameEn: "Inheritance",
    sectionNameAr: "الميراث ونقل التركات",
    category: "legal",
    questionEn: "What happens to my property if I pass away?",
    questionAr: "ماذا يحدث للعقار في حال وفاة المالك الأجنبي؟",
    answerEn: "The property forms part of the lawful estate, and inheritance conveyance procedures are administered through Saudi probate courts (Najiz).",
    answerAr: "يعد العقار جزءاً من التركة، ويتقدم الورثة الشرعيون بطلب حصر الإرث لدى المحاكم السعودية لتوثيق وتعديل ملكية الصك أو تسييله."
  },
  {
    id: 107,
    sectionCode: "Q",
    sectionNameEn: "Inheritance",
    sectionNameAr: "الميراث ونقل التركات",
    category: "legal",
    questionEn: "Can my foreign children inherit my Saudi property?",
    questionAr: "هل يرث الأبناء الأجانب العقار في السعودية؟",
    answerEn: "Potentially, yes; inheritance rights and ownership eligibility are recognized and formalized in accordance with court orders.",
    answerAr: "نعم، تنتقل الملكية للورثة الشرعيين وفق صك حصر الورثة المعتمد وقرارات المحكمة المختصة."
  },
  {
    id: 108,
    sectionCode: "Q",
    sectionNameEn: "Inheritance",
    sectionNameAr: "الميراث ونقل التركات",
    category: "legal",
    questionEn: "Does nationality affect inheritance?",
    questionAr: "هل تؤثر الجنسية في نقل الميراث؟",
    answerEn: "It can, particularly for holy city properties requiring Muslim status, or where foreign probate documents require diplomatic legalization.",
    answerAr: "تراعى الضوابط النظامية والدينية (في مكة والمدينة) وتصديق الوثائق والوكالات الصادرة من الخارج."
  },
  {
    id: 109,
    sectionCode: "Q",
    sectionNameEn: "Inheritance",
    sectionNameAr: "الميراث ونقل التركات",
    category: "legal",
    questionEn: "Should I have a will / estate plan?",
    questionAr: "هل ينصح بإعداد وصية أو تخطيط للتركة؟",
    answerEn: "For expats with substantial Saudi assets, obtaining specialized legal advice on estate planning and wills is highly advisable.",
    answerAr: "نعم، ينصح بتوثيق الوصايا والتخطيط للتركة مع مستشار قانوني لضمان سلاسة انتقال الأصول للورثة."
  },
  {
    id: 110,
    sectionCode: "Q",
    sectionNameEn: "Inheritance",
    sectionNameAr: "الميراث ونقل التركات",
    category: "legal",
    questionEn: "What happens if my heirs cannot legally hold the property?",
    questionAr: "ماذا لو تعذر على الورثة الاحتفاظ بالعقار نظامياً؟",
    answerEn: "The court or estate executor arranges an orderly sale of the property through the electronic Real Estate Registry and distributes liquidation proceeds to the heirs.",
    answerAr: "يتم تسييل وبيع العقار عبر المزاد أو البيع المباشر المعتمد وتوزيع المبالغ النقدية على الورثة بحسب حصصهم."
  },

  // R. Service Charges (111-114)
  {
    id: 111,
    sectionCode: "R",
    sectionNameEn: "Service Charges & Maintenance",
    sectionNameAr: "رسوم الخدمات وجمعيات الملاك (مُلاّك)",
    category: "management",
    questionEn: "What are service charges in Saudi buildings?",
    questionAr: "ما هي رسوم الخدمات والصيانة المشتركة؟",
    answerEn: "Service charges cover common electricity, security, elevator maintenance, pools, gyms, cleaning, and facilities management under REGA's Mullak program.",
    answerAr: "تغطي الرسوم صيانة المصاعد، النظافة، الأمن، المسابح والنوادي، وتنظم رسمياً عبر برنامج 'مُلاّك' التابع للهيئة العامة للعقار."
  },
  {
    id: 112,
    sectionCode: "R",
    sectionNameEn: "Service Charges & Maintenance",
    sectionNameAr: "رسوم الخدمات وجمعيات الملاك (مُلاّك)",
    category: "management",
    questionEn: "Who pays building service charges?",
    questionAr: "من يدفع رسوم الصيانة؟",
    answerEn: "Usually the property owner, although tenancy contracts may specify terms for operating utility costs.",
    answerAr: "يتحملها المالك عادة، ما لم ينص عقد الإيجار على خلاف ذلك للمصاريف التشغيلية."
  },
  {
    id: 113,
    sectionCode: "R",
    sectionNameEn: "Service Charges & Maintenance",
    sectionNameAr: "رسوم الخدمات وجمعيات الملاك (مُلاّك)",
    category: "management",
    questionEn: "How much are service charges typically?",
    questionAr: "كم تبلغ رسوم الخدمات سنوياً؟",
    answerEn: "Typically SAR 30 to SAR 80 per square meter annually, depending on amenities and luxury service tiers.",
    answerAr: "تتراوح عادة بين 30 إلى 80 ريال للمتر المربع سنوياً بحسب مستوى الخدمات والمسابح والنوادي والحراسة."
  },
  {
    id: 114,
    sectionCode: "R",
    sectionNameEn: "Service Charges & Maintenance",
    sectionNameAr: "رسوم الخدمات وجمعيات الملاك (مُلاّك)",
    category: "management",
    questionEn: "Should I request a service-charge clearance history before buying?",
    questionAr: "هل يجب طلب براءة ذمة من رسوم الصيانة قبل الشراء؟",
    answerEn: "Yes. Always obtain an official Mullak clearance certificate ensuring the seller has zero outstanding HOA dues.",
    answerAr: "نعم، تأكد من الحصول على شهادة براءة ذمة وسداد كامل مستحقات جمعية الملاك السابقة."
  },

  // S. Hidden Costs & Total Acquisition (Integrated into 115)
  // T. Real Estate Agent Questions (115-119)
  {
    id: 115,
    sectionCode: "T",
    sectionNameEn: "Real Estate Brokerage & FAL Licensing",
    sectionNameAr: "تراخيص الوساطة العقارية (رخصة فال)",
    category: "legal",
    questionEn: "Does the real estate broker need a license in Saudi Arabia?",
    questionAr: "هل يلزم الوسيط العقاري ترخيص رسمي؟",
    answerEn: "Yes. Real-estate brokerage and advertising are strictly regulated under REGA's mandatory FAL (فال) licensing framework.",
    answerAr: "نعم، الوساطة والتسويق العقاري أنشطة منظمة يلزمها رخصة فال الرسمية الصادرة من الهيئة العامة للعقار.",
    sourceUrl: "https://rega.gov.sa/en/contact-us/frequently-asked-questions/",
    sourceLabel: "REGA FAL FAQ"
  },
  {
    id: 116,
    sectionCode: "T",
    sectionNameEn: "Real Estate Brokerage & FAL Licensing",
    sectionNameAr: "تراخيص الوساطة العقارية (رخصة فال)",
    category: "legal",
    questionEn: "How do I verify a broker or agency?",
    questionAr: "كيف أتحقق من ترخيص الوسيط أو الشركة؟",
    answerEn: "Ask for their REGA Corporate FAL License number and verify it instantly on REGA's portal. Asaheeb Real Estate is fully licensed.",
    answerAr: "تأكد من حمل المنشأة لرخصة فال للوساطة والتسويق العقاري من الهيئة العامة للعقار. وتعمل صهيب العقارية وفق أعلى معايير الترخيص والامتثال."
  },
  {
    id: 117,
    sectionCode: "T",
    sectionNameEn: "Real Estate Brokerage & FAL Licensing",
    sectionNameAr: "تراخيص الوساطة العقارية (رخصة فال)",
    category: "legal",
    questionEn: "Does the agent charge a brokerage commission?",
    questionAr: "هل يتقاضى الوسيط عمولة سعي؟",
    answerEn: "Yes, standard brokerage commission is up to 2.5% of the transaction value under REGA regulations unless agreed otherwise.",
    answerAr: "تحدد اللائحة عمولة الوساطة العقارية بنسبة 2.5% من قيمة الصفقة كحد أقصى ما لم يتم الاتفاق على غير ذلك في عقد الوساطة."
  },
  {
    id: 118,
    sectionCode: "T",
    sectionNameEn: "Real Estate Brokerage & FAL Licensing",
    sectionNameAr: "تراخيص الوساطة العقارية (رخصة فال)",
    category: "legal",
    questionEn: "Who pays the broker commission?",
    questionAr: "من يدفع عمولة الوساطة؟",
    answerEn: "This must be clearly established in the signed electronic FAL brokerage contract prior to transaction execution.",
    answerAr: "يوضح ذلك بدقة في عقد الوساطة الإلكتروني المبرم بين الأطراف وفق الضوابط."
  },
  {
    id: 119,
    sectionCode: "T",
    sectionNameEn: "Real Estate Brokerage & FAL Licensing",
    sectionNameAr: "تراخيص الوساطة العقارية (رخصة فال)",
    category: "legal",
    questionEn: "Should I sign an exclusive brokerage agreement?",
    questionAr: "هل أوقع عقد وساطة حصري؟",
    answerEn: "Only when you understand the duration, marketing commitments, and fee terms established under standard REGA contracts.",
    answerAr: "عند وضوح التزامات التسويق ومدة العقد ونسبة العمولة في العقد المعتمد."
  },

  // U. Developer Questions (120-125)
  {
    id: 120,
    sectionCode: "U",
    sectionNameEn: "Developer Verification",
    sectionNameAr: "التحقق من المطور العقاري",
    category: "offplan",
    questionEn: "Who is the developer?",
    questionAr: "من هو المطور العقاري؟",
    answerEn: "Always research developer credentials, capital backing, and portfolio track record before committing funds.",
    answerAr: "تحقق دائماً من السجل التجاري للمطور وملاءته المالية ومحفظة أعماله."
  },
  {
    id: 121,
    sectionCode: "U",
    sectionNameEn: "Developer Verification",
    sectionNameAr: "التحقق من المطور العقاري",
    category: "offplan",
    questionEn: "Has the developer completed previous projects?",
    questionAr: "هل قام المطور بتسليم مشاريع سابقة؟",
    answerEn: "Inspect physically completed projects and tenant reviews rather than relying purely on marketing 3D renderings.",
    answerAr: "اطلع على المشاريع المنفذة على أرض الواقع وجودة التشطيبات ورضا الملاك السابقين."
  },
  {
    id: 122,
    sectionCode: "U",
    sectionNameEn: "Developer Verification",
    sectionNameAr: "التحقق من المطور العقاري",
    category: "offplan",
    questionEn: "Has the developer delivered projects on time?",
    questionAr: "هل يسلم المطور في المواعيد المحددة؟",
    answerEn: "Verify their on-time delivery track record through past handover certificates and Wafi completion milestones.",
    answerAr: "اطلب سجل الالتزام بمواعيد التسليم وتقارير نسب الإنجاز المعتمدة."
  },
  {
    id: 123,
    sectionCode: "U",
    sectionNameEn: "Developer Verification",
    sectionNameAr: "التحقق من المطور العقاري",
    category: "offplan",
    questionEn: "Is the developer licensed by REGA / Wafi?",
    questionAr: "هل المطور معتمد من وافي والهيئة؟",
    answerEn: "Verify developer licensing on the official Wafi registry before signing off-plan agreements.",
    answerAr: "تحقق من رخصة المطور وسريانها في منصة وافي الرسمية."
  },
  {
    id: 124,
    sectionCode: "U",
    sectionNameEn: "Developer Verification",
    sectionNameAr: "التحقق من المطور العقاري",
    category: "offplan",
    questionEn: "Is the project approved for off-plan sales?",
    questionAr: "هل المشروع حاصل على ترخيص البيع على الخارطة؟",
    answerEn: "Ensure the project displays an official Wafi Off-Plan Sales License number on all advertising and sales materials.",
    answerAr: "تأكد من وجود رقم ترخيص البيع على الخارطة الصادر من وافي في الإعلانات والعقود."
  },
  {
    id: 125,
    sectionCode: "U",
    sectionNameEn: "Developer Verification",
    sectionNameAr: "التحقق من المطور العقاري",
    category: "offplan",
    questionEn: "Is there a dedicated bank escrow account for the project?",
    questionAr: "هل يوجد حساب ضمان بنكي للمشروع؟",
    answerEn: "Yes, Wafi requires a dedicated bank escrow account where buyer funds are safeguarded and released only as construction progresses.",
    answerAr: "نعم، يلزم وافي المطور بفتح حساب ضمان بنكي معتمد تشرف عليه جهة هندسية ومحاسبية مستقلة."
  },

  // V. Questions Before Signing (126-132)
  {
    id: 126,
    sectionCode: "V",
    sectionNameEn: "Questions Before Signing",
    sectionNameAr: "أسئلة حاسمة قبل توقيع العقد",
    category: "legal",
    questionEn: "Can I negotiate the property price?",
    questionAr: "هل يمكن التفاوض على سعر العقار؟",
    answerEn: "Often yes, depending on whether it is a private resale seller or developer volume campaign.",
    answerAr: "نعم في كثير من الأحيان، بحسب رغبة البائع أو العروض الترويجية لدى المطور."
  },
  {
    id: 127,
    sectionCode: "V",
    sectionNameEn: "Questions Before Signing",
    sectionNameAr: "أسئلة حاسمة قبل توقيع العقد",
    category: "legal",
    questionEn: "Can I negotiate the payment plan?",
    questionAr: "هل يمكن التفاوض على جدول الدفعات؟",
    answerEn: "Off-plan developers frequently offer flexible milestone-linked payment schedules.",
    answerAr: "يقدم المطورون عادة جداول سداد مرنة مرتبطة بمراحل الإنجاز الإنشائي."
  },
  {
    id: 128,
    sectionCode: "V",
    sectionNameEn: "Questions Before Signing",
    sectionNameAr: "أسئلة حاسمة قبل توقيع العقد",
    category: "legal",
    questionEn: "Can I reserve a property before full payment?",
    questionAr: "هل يمكن حجز العقار بعربون مبدئي؟",
    answerEn: "Yes, subject to a formal reservation agreement specifying refundable/non-refundable terms.",
    answerAr: "نعم، بموجب اتفاقية حجز رسمية تحدد مهلة الإفراغ وشروط العربون."
  },
  {
    id: 129,
    sectionCode: "V",
    sectionNameEn: "Questions Before Signing",
    sectionNameAr: "أسئلة حاسمة قبل توقيع العقد",
    category: "legal",
    questionEn: "Is the reservation deposit refundable?",
    questionAr: "هل مبلغ العربون مسترد؟",
    answerEn: "Always verify cancellation and refund terms in writing before paying any reservation deposit.",
    answerAr: "تأكد من شروط استرداد العربون المكتوبة في عقد الحجز قبل السداد."
  },
  {
    id: 130,
    sectionCode: "V",
    sectionNameEn: "Questions Before Signing",
    sectionNameAr: "أسئلة حاسمة قبل توقيع العقد",
    category: "legal",
    questionEn: "What happens if my bank financing is rejected?",
    questionAr: "ماذا يحدث إذا رُفض التمويل البنكي؟",
    answerEn: "Include a financing contingency clause in your preliminary agreement protecting your deposit.",
    answerAr: "يجب تضمين شرط التمويل في الاتفاقية المبدئية لاسترداد العربون في حال عدم الموافقة البنكية."
  },
  {
    id: 131,
    sectionCode: "V",
    sectionNameEn: "Questions Before Signing",
    sectionNameAr: "أسئلة حاسمة قبل توقيع العقد",
    category: "legal",
    questionEn: "What happens if the seller changes their mind?",
    questionAr: "ماذا يحدث إذا تراجع البائع عن البيع؟",
    answerEn: "The standardized FAL brokerage contract specifies legal consequences and deposit return mechanisms.",
    answerAr: "تنظم عقود الوساطة الموحدة الشروط الجزائية وإعادة المبالغ للمشتري في حال نكول البائع."
  },
  {
    id: 132,
    sectionCode: "V",
    sectionNameEn: "Questions Before Signing",
    sectionNameAr: "أسئلة حاسمة قبل توقيع العقد",
    category: "legal",
    questionEn: "What happens if I change my mind after reservation?",
    questionAr: "ماذا يحدث إذا غيرت رأيي بعد دفع العربون؟",
    answerEn: "Understand cancellation and forfeiture rules before placing funds into escrow.",
    answerAr: "اطلع على شروط إلغاء الحجز وما يترتب عليها من استقطاعات قبل سداد أي مبلغ."
  },

  // W. Questions Expats Often Forget (133-148)
  {
    id: 133,
    sectionCode: "W",
    sectionNameEn: "Questions Expats Often Forget",
    sectionNameAr: "أسئلة يغفل عنها المشترون غالباً",
    category: "legal",
    questionEn: "Is the property actually eligible for foreign ownership?",
    questionAr: "هل العقار مؤهل فعلياً لتملك غير السعوديين؟",
    answerEn: "Always verify the property ID on the Saudi Properties portal before signing or paying.",
    answerAr: "تحقق من الرقم المرجعي للعقار على منصة العقارات السعودية قبل دفع أي مبالغ."
  },
  {
    id: 134,
    sectionCode: "W",
    sectionNameEn: "Questions Expats Often Forget",
    sectionNameAr: "أسئلة يغفل عنها المشترون غالباً",
    category: "legal",
    questionEn: "Is the exact building inside an approved geographical zone?",
    questionAr: "هل المبنى بالتحديد يقع داخل النطاق المعتمد؟",
    answerEn: "Do not rely on the city name alone; verify the cadastral district and parcel approval.",
    answerAr: "لا تعتمد على اسم المدينة فقط، بل تحقق من الحي والمخطط الدقيق المعتمد."
  },
  {
    id: 135,
    sectionCode: "W",
    sectionNameEn: "Questions Expats Often Forget",
    sectionNameAr: "أسئلة يغفل عنها المشترون غالباً",
    category: "pricing",
    questionEn: "Is the advertised price the final total price?",
    questionAr: "هل السعر المعلن هو السعر الإجمالي النهائي؟",
    answerEn: "Always request the full acquisition cost breakdown: Price + 5% RETT + 2% Non-Saudi Fee + Brokerage + Registration.",
    answerAr: "اطلب دائماً احتساب التكلفة الإجمالية: السعر + ضريبة 5% + رسم 2% + السعي + رسوم التوثيق."
  },
  {
    id: 136,
    sectionCode: "W",
    sectionNameEn: "Questions Expats Often Forget",
    sectionNameAr: "أسئلة يغفل عنها المشترون غالباً",
    category: "management",
    questionEn: "Are there unpaid service charges from the previous owner?",
    questionAr: "هل توجد فواتير صيانة متأخرة على المالك السابق؟",
    answerEn: "Request an official Mullak clearance statement prior to final deed transfer.",
    answerAr: "اطلب شهادة براءة ذمة مالية من جمعية الملاك قبل الإفراغ النهائي."
  },
  {
    id: 137,
    sectionCode: "W",
    sectionNameEn: "Questions Expats Often Forget",
    sectionNameAr: "أسئلة يغفل عنها المشترون غالباً",
    category: "management",
    questionEn: "Are there outstanding utility bills (electricity/water)?",
    questionAr: "هل توجد مستحقات فواتير كهرباء أو مياه متأخرة؟",
    answerEn: "Verify utility meter account numbers with SEC and NWC for zero balance before closing.",
    answerAr: "تأكد من تصفية حسابات عداد الكهرباء وشركة المياه الوطنية ونقل الحساب باسمك."
  },
  {
    id: 138,
    sectionCode: "W",
    sectionNameEn: "Questions Expats Often Forget",
    sectionNameAr: "أسئلة يغفل عنها المشترون غالباً",
    category: "legal",
    questionEn: "Is the property currently mortgaged to a bank?",
    questionAr: "هل العقار مرهون حالياً؟",
    answerEn: "Check electronic title deed status on Najiz to ensure no active mortgage caveats exist.",
    answerAr: "تحقق من خلو الصك من أي رهن أو حجز عبر منصة ناجز / البورصة العقارية."
  },
  {
    id: 139,
    sectionCode: "W",
    sectionNameEn: "Questions Expats Often Forget",
    sectionNameAr: "أسئلة يغفل عنها المشترون غالباً",
    category: "legal",
    questionEn: "Are there active legal disputes or court caveats?",
    questionAr: "هل توجد نزاعات قضائية على العقار؟",
    answerEn: "Electronic title deed validation directly reveals active judicial restrictions.",
    answerAr: "الاستعلام الإلكتروني عن الصك يظهر أي قيود أو أوامر قضائية مسجلة."
  },
  {
    id: 140,
    sectionCode: "W",
    sectionNameEn: "Questions Expats Often Forget",
    sectionNameAr: "أسئلة يغفل عنها المشترون غالباً",
    category: "ownership",
    questionEn: "Are there contractual restrictions on resale?",
    questionAr: "هل توجد قيود على إعادة البيع مستقبلاً؟",
    answerEn: "Review master community covenants and developer bylaws for minimum holding period terms.",
    answerAr: "راجع لوائح المجمع العقاري وشروط المطور لأي مدد احتفاظ مشروطة."
  },
  {
    id: 141,
    sectionCode: "W",
    sectionNameEn: "Questions Expats Often Forget",
    sectionNameAr: "أسئلة يغفل عنها المشترون غالباً",
    category: "management",
    questionEn: "Can I modify or renovate the apartment interior?",
    questionAr: "هل يحق لي إجراء تعديلات داخلية أو ترميم؟",
    answerEn: "Interior alterations require HOA (Mullak) permission and Balady municipal permits for structural work.",
    answerAr: "التعديلات الداخلية تتطلب موافقة جمعية الملاك ورخصة ترميم من منصة بلدي للأعمال الإنشائية."
  },
  {
    id: 142,
    sectionCode: "W",
    sectionNameEn: "Questions Expats Often Forget",
    sectionNameAr: "أسئلة يغفل عنها المشترون غالباً",
    category: "management",
    questionEn: "Can I convert a residential apartment into a commercial office?",
    questionAr: "هل يمكن تحويل الشقة السكنية إلى مكتب تجاري؟",
    answerEn: "Not automatically; property use is strictly governed by municipal zoning and building title classification.",
    answerAr: "لا، الاستخدام مقيد بنوع الصك والمخطط التنظيمي للبلدية ولا يحول إلا بموافقات رسمية."
  },
  {
    id: 143,
    sectionCode: "W",
    sectionNameEn: "Questions Expats Often Forget",
    sectionNameAr: "أسئلة يغفل عنها المشترون غالباً",
    category: "management",
    questionEn: "Can I register a commercial business license from my apartment?",
    questionAr: "هل يمكن استخراج سجل تجاري على عنوان الشقة؟",
    answerEn: "Only for permitted home-based professional activities complying with Ministry of Commerce rules.",
    answerAr: "للأنشطة المهنية والعمل الحر المسموح بها نظاماً وفق اشتراطات وزارة التجارة."
  },
  {
    id: 144,
    sectionCode: "W",
    sectionNameEn: "Questions Expats Often Forget",
    sectionNameAr: "أسئلة يغفل عنها المشترون غالباً",
    category: "ownership",
    questionEn: "Can I subdivide the property / split title deeds?",
    questionAr: "هل يمكن فرز وتقسيم العقار؟",
    answerEn: "Only where legally and technically permitted under municipal subdivision bylaws and REGA guidelines.",
    answerAr: "نعم، إذا كان العقار يستوفي اشتراطات الفرز الهندسي والبلدي الصادرة من منصة بلدي."
  },
  {
    id: 145,
    sectionCode: "W",
    sectionNameEn: "Questions Expats Often Forget",
    sectionNameAr: "أسئلة يغفل عنها المشترون غالباً",
    category: "ownership",
    questionEn: "Can I add another floor or rooftop extension?",
    questionAr: "هل يمكن إضافة دور ملحق أو بناء إضافي؟",
    answerEn: "Rooftop expansions require structural engineering certification and Balady municipal building permits.",
    answerAr: "يلزم ترخيص بناء رسمي من البلدية ومخططات هندسية معتمدة تراعي كود البناء السعودي."
  },
  {
    id: 146,
    sectionCode: "W",
    sectionNameEn: "Questions Expats Often Forget",
    sectionNameAr: "أسئلة يغفل عنها المشترون غالباً",
    category: "management",
    questionEn: "Can I install rooftop solar panels?",
    questionAr: "هل يمكن تركيب ألواح طاقة شمسية؟",
    answerEn: "Yes, subject to building HOA agreement, electrical grid interconnection approval from SEC, and municipal safety standards.",
    answerAr: "نعم، بموافقة جمعية الملاك واعتماد شركة الكهرباء واشتراطات السلامة."
  },
  {
    id: 147,
    sectionCode: "W",
    sectionNameEn: "Questions Expats Often Forget",
    sectionNameAr: "أسئلة يغفل عنها المشترون غالباً",
    category: "management",
    questionEn: "Can I install an Electric Vehicle (EV) charger at my parking spot?",
    questionAr: "هل يمكن تركيب شاحن سيارة كهربائية في الموقف المخصص؟",
    answerEn: "Subject to building management electrical capacity approval and Saudi building code standards.",
    answerAr: "نعم، بالتنسيق مع إدارة المبنى والتأكد من الطاقة الكهربائية والالتزام بالمواصفات القياسية."
  },
  {
    id: 148,
    sectionCode: "W",
    sectionNameEn: "Questions Expats Often Forget",
    sectionNameAr: "أسئلة يغفل عنها المشترون غالباً",
    category: "ownership",
    questionEn: "Can I keep the apartment vacant as a vacation home?",
    questionAr: "هل يمكن ترك الشقة شاغرة كمنزل عطلات؟",
    answerEn: "Yes. Lawful ownership does not mandate continuous occupancy, provided service charges are paid.",
    answerAr: "نعم، الملكية تامة ولا تلزم بالسكن الدائم شريطة الالتزام بسداد رسوم الخدمات والصيانة."
  },

  // X. Digital Buying (149-152)
  {
    id: 149,
    sectionCode: "X",
    sectionNameEn: "Digital Buying Journey",
    sectionNameAr: "الشراء الرقمي والمنصات الحكومية",
    category: "process",
    questionEn: "Can I buy property completely online in Saudi Arabia?",
    questionAr: "هل يمكن إتمام شراء العقار إلكترونياً بالكامل؟",
    answerEn: "Yes. The non-Saudi ownership journey, tax clearance, payment, and conveyance are fully digitized through Saudi Properties and the Real Estate Registry.",
    answerAr: "نعم، أصبحت إجراءات التحقق وسداد الضرائب والإفراغ العقاري رقمية بالكامل عبر المنصات الرسمية.",
    sourceUrl: "https://saudiproperties.rega.gov.sa/",
    sourceLabel: "Saudi Properties Portal"
  },
  {
    id: 150,
    sectionCode: "X",
    sectionNameEn: "Digital Buying Journey",
    sectionNameAr: "الشراء الرقمي والمنصات الحكومية",
    category: "process",
    questionEn: "Can I verify my eligibility online?",
    questionAr: "هل يمكنني فحص أهليتي عبر الإنترنت؟",
    answerEn: "Yes, the Saudi Properties platform provides instant digital eligibility assessment.",
    answerAr: "نعم، تتيح منصة العقارات السعودية فحص الأهلية الفوري برقم الهوية أو الإقامة."
  },
  {
    id: 151,
    sectionCode: "X",
    sectionNameEn: "Digital Buying Journey",
    sectionNameAr: "الشراء الرقمي والمنصات الحكومية",
    category: "process",
    questionEn: "Can I track my ownership application status online?",
    questionAr: "هل يمكنني تتبع حالة طلب التملك إلكترونياً؟",
    answerEn: "Yes, real-time application tracking is provided on the official portal dashboard.",
    answerAr: "نعم، عبر لوحة التحكم الخاصة بالمستفيد على منصة العقارات."
  },
  {
    id: 152,
    sectionCode: "X",
    sectionNameEn: "Digital Buying Journey",
    sectionNameAr: "الشراء الرقمي والمنصات الحكومية",
    category: "process",
    questionEn: "Where can I view approved geographical maps and zones?",
    questionAr: "أين أجد الخرائط والنطاقات الجغرافية المعتمدة؟",
    answerEn: "Interactive approved zoning maps are published directly on the REGA Saudi Properties portal.",
    answerAr: "من خلال الخرائط التفاعلية المنشورة في بوابة منصة العقارات السعودية التابعة للهيئة.",
    sourceUrl: "https://saudiproperties.rega.gov.sa/",
    sourceLabel: "Saudi Properties Portal Maps"
  },

  // Y. Safety & Scam Questions (153-157)
  {
    id: 153,
    sectionCode: "Y",
    sectionNameEn: "Safety & Scam Prevention",
    sectionNameAr: "الأمان العقاري والوقاية من الاحتيال",
    category: "legal",
    questionEn: "How do I know a property listing is genuine?",
    questionAr: "كيف أتأكد من مصداقية الإعلان العقاري؟",
    answerEn: "Verify the agent's FAL license, seller identity, title deed number, building certificate, and REGA advertising license code.",
    answerAr: "تأكد من وجود رقم ترخيص فال الإعلاني، ومطابقة الصك الإلكتروني وبيانات البائع في المنصات الحكومية."
  },
  {
    id: 154,
    sectionCode: "Y",
    sectionNameEn: "Safety & Scam Prevention",
    sectionNameAr: "الأمان العقاري والوقاية من الاحتيال",
    category: "legal",
    questionEn: "Should I transfer funds to an agent's personal account?",
    questionAr: "هل يجوز تحويل أموال لحساب شخصي للوسيط؟",
    answerEn: "Never. Always use regulated official electronic channels (SADAD, certified cashier cheques, or official project escrow accounts).",
    answerAr: "احذر تماماً؛ تسدد المبالغ حصراً عبر القنوات الحكومية أو الشيكات المصرفية المصدقة أو حسابات الضمان البنكية."
  },
  {
    id: 155,
    sectionCode: "Y",
    sectionNameEn: "Safety & Scam Prevention",
    sectionNameAr: "الأمان العقاري والوقاية من الاحتيال",
    category: "legal",
    questionEn: "Should I pay a reservation deposit before verifying title deed status?",
    questionAr: "هل أدفع عربوناً قبل التحقق من الصك؟",
    answerEn: "No. Always verify title deed validity, zoning clearance, and seller authorization before transferring any reservation deposit.",
    answerAr: "لا، تحقق دائماً من الصك الإلكتروني وترخيص العقار قبل سداد أي مبلغ."
  },
  {
    id: 156,
    sectionCode: "Y",
    sectionNameEn: "Safety & Scam Prevention",
    sectionNameAr: "الأمان العقاري والوقاية من الاحتيال",
    category: "legal",
    questionEn: "Can I trust an unverified WhatsApp listing?",
    questionAr: "هل أثق بعروض عقارية غير موثقة على واتساب؟",
    answerEn: "No listing should be trusted without an official REGA FAL advertising license number.",
    answerAr: "لا تعتمد أي عرض عقاري دون ترخيص إعلاني معتمد من الهيئة العامة للعقار."
  },
  {
    id: 157,
    sectionCode: "Y",
    sectionNameEn: "Safety & Scam Prevention",
    sectionNameAr: "الأمان العقاري والوقاية من الاحتيال",
    category: "legal",
    questionEn: "What if a property price looks too good to be true?",
    questionAr: "ماذا لو كان السعر المعروض منخفضاً بشكل غير منطقي؟",
    answerEn: "Investigate immediately: verify title encumbrances, construction permits, building condition, outstanding HOA liabilities, and legal authorizations through certified advisors like Asaheeb Real Estate.",
    answerAr: "تحقق فوراً من سلامة الصك، التراخيص الإنشائية، أي التزامات مالية أو عيوب فنية، واستشر خبراء صهيب العقارية المعتمدين."
  }
];

export const BUYER_JOURNEY_STEPS = [
  {
    step: 1,
    titleEn: "Check Eligibility",
    titleAr: "فحص الأهلية",
    descEn: "Confirm nationality, residency status (Iqama/Non-resident), religion (for Makkah/Madinah), and intended city.",
    descAr: "التحقق من الجنسية، صفة الإقامة، والاشتراطات الدينية الخاصة بمكة والمدينة والنطاق المعتمد."
  },
  {
    step: 2,
    titleEn: "Define Strategy & Objective",
    titleAr: "تحديد الهدف الاستثماري",
    descEn: "Choose between primary residence, holiday home, high-yield rental, or capital appreciation.",
    descAr: "تحديد الغرض: سكن خاص، دار عطلات، محفظة إيجارية عالية العائد، أو نمو رأسمالي."
  },
  {
    step: 3,
    titleEn: "Total Acquisition Budgeting",
    titleAr: "احتساب الميزانية الإجمالية",
    descEn: "Calculate Property Price + 5% RETT + 2% Non-Saudi Fee + 2.5% Brokerage + Admin fees using our calculator.",
    descAr: "حساب السعر + ضريبة التصرفات 5% + رسم التملك 2% + عمولة الوساطة 2.5% لتحديد التكلفة الفعلية."
  },
  {
    step: 4,
    titleEn: "Curated Property Selection",
    titleAr: "ترشيح العقارات المؤهلة",
    descEn: "Select from Asaheeb's pre-vetted residential, villa, and off-plan portfolio with verified REGA clearance.",
    descAr: "اختيار العقارات من محفظة صهيب المفحوصة والمطابقة للنطاقات المعتمدة والتراخيص الإعلانية."
  },
  {
    step: 5,
    titleEn: "Title & Due Diligence Audit",
    titleAr: "الفحص القانوني والصك",
    descEn: "Inspect electronic title deeds, building completion certificates, and developer escrow licenses.",
    descAr: "مطابقة الصك الإلكتروني المحدث، شهادات إتمام البناء، وتراخيص البيع على الخارطة وحسابات الضمان."
  },
  {
    step: 6,
    titleEn: "Payment & Escrow Setup",
    titleAr: "تجهيز الدفع وحساب الضمان",
    descEn: "Prepare regulated electronic payment channels, certified drafts, or approved escrow arrangements.",
    descAr: "اعتماد وسيلة الدفع الإلكترونية النظامية (سداد / شيك مصرفي مصدق / حساب الضمان البنكي)."
  },
  {
    step: 7,
    titleEn: "Sign REGA FAL Agreement",
    titleAr: "توقيع عقد الوساطة المعتمد",
    descEn: "Execute standardized electronic brokerage agreements safeguarding all parties under Saudi law.",
    descAr: "إبرام عقد الوساطة الإلكتروني الموحد لحماية حقوق الطرفين وفق ضوابط هيئة العقار."
  },
  {
    step: 8,
    titleEn: "Settle 5% RETT & 2% Fee",
    titleAr: "سداد الضرائب والرسوم",
    descEn: "Generate SADAD invoices on ZATCA & Saudi Properties portals for instant tax clearance.",
    descAr: "إصدار وتصديق فواتير سداد لضريبة التصرفات 5% ورسم تملك غير السعوديين 2%."
  },
  {
    step: 9,
    titleEn: "Electronic Conveyance",
    titleAr: "الإفراغ العقاري الإلكتروني",
    descEn: "Execute instantaneous conveyance through the Real Estate Registry / Najiz platform.",
    descAr: "إتمام نقل الملكية الفوري عبر السجل العقاري / البورصة العقارية وإصدار الصك باسم المشتري."
  },
  {
    step: 10,
    titleEn: "Ownership & Asset Management",
    titleAr: "استلام الصك وإدارة العقار",
    descEn: "Receive keys and official deed; onboard Asaheeb property management for turnkey leasing & yield collection.",
    descAr: "استلام المفاتيح والصك وتفعيل خدمات صهيب لإدارة الأملاك والتأجير وتحصيل العوائد."
  }
];
