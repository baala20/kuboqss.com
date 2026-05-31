export type ProductOffer = {
  id: string;
  label: string;
  quantity: number;
  priceLyd: number;
  compareAtPriceLyd?: number;
  badge: string;
};

export type Review = {
  name: string;
  city: string;
  text: string;
};

export type Faq = {
  question: string;
  answer: string;
};

export type Product = {
  id: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  category: string;
  headline: string;
  subheadline: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  badges: string[];
  benefits: string[];
  proofPoints: string[];
  qualityChecks: string[];
  ingredients: string[];
  usageSteps: string[];
  reviews: Review[];
  faqs: Faq[];
  offers: ProductOffer[];
  crossSellSlugs: string[];
};

const defaultOffers: ProductOffer[] = [
  { id: "one", label: "قطعة واحدة", quantity: 1, priceLyd: 79, compareAtPriceLyd: 99, badge: "للتجربة" },
  { id: "two", label: "قطعتان", quantity: 2, priceLyd: 129, compareAtPriceLyd: 198, badge: "الأكثر طلباً" },
  { id: "three", label: "ثلاث قطع", quantity: 3, priceLyd: 169, compareAtPriceLyd: 297, badge: "أفضل قيمة" },
];

const sharedFaqs: Faq[] = [
  { question: "هل الدفع عند الاستلام؟", answer: "نعم، الطلب في كوبوكس بنظام الدفع عند الاستلام فقط. لا تدفعي قبل وصول الطلب." },
  { question: "هل يتم تأكيد الطلب؟", answer: "نعم، فريق كوبوكس يتواصل معك لتأكيد الاسم والرقم وتفاصيل الشحن قبل إرسال الطلب." },
  { question: "هل النتائج مضمونة؟", answer: "نحن لا نبيع وعوداً مبالغاً فيها. النتائج تختلف حسب الشخص وطريقة الاستخدام، لذلك نوضح طريقة الاستعمال ونختار منتجات مناسبة للروتين." },
  { question: "هل المنتجات أصلية؟", answer: "كوبوكس يشتغل بنظام اختيار وفحص للموردين قبل عرض المنتج، ومع الوقت سيتم إضافة صور وتجارب عميلات حقيقية لكل منتج." },
];

export const products: Product[] = [
  {
    id: "hair-ritual",
    slug: "hair-confidence-ritual",
    nameAr: "روتين العناية بالشعر",
    nameEn: "Hair Confidence Ritual",
    category: "العناية بالشعر",
    headline: "روتين عناية للشعر يمنحك إحساساً أوضح بالثقة كل يوم",
    subheadline: "اختيار كوبوكس للمرأة الليبية التي تريد عناية بسيطة، شرح واضح، وطلب آمن بالدفع عند الاستلام.",
    description: "إذا كان شعرك يحتاج عناية أكثر وملمسه لم يعد كما تحبين، فالاختيار الصحيح لا يبدأ بكثرة المنتجات، بل بمنتج واضح الاستعمال يدخل بسهولة في روتينك.",
    image: "/placeholders/product-hair.svg",
    rating: 4.8,
    reviewCount: 126,
    badges: ["اختيار كوبوكس", "دفع عند الاستلام", "روتين يومي", "تأكيد قبل الشحن"],
    benefits: ["إحساس أفضل بالترتيب والثقة", "طريقة استعمال بسيطة", "مناسب للباندلات ورفع القيمة", "لغة فوائد واضحة بدون مبالغة"],
    proofPoints: ["يصلح لفيديوهات UGC قبل/بعد الروتين", "مناسب لحملات سناب وتيك توك", "قابل للبيع كروتين قطعتين أو ثلاث"],
    qualityChecks: ["فحص وضوح طريقة الاستعمال", "مراجعة المورد والتغليف", "تجربة العرض مع الدفع عند الاستلام", "متابعة أسباب الإلغاء بعد الاتصال"],
    ingredients: ["مكونات عناية داعمة للشعر حسب المنتج النهائي", "تعليمات استخدام واضحة", "تحذيرات استعمال بدون وعود طبية"],
    usageSteps: ["اختاري العرض المناسب لك", "استخدمي المنتج حسب التعليمات على العبوة", "استمري على الروتين وتابعي التغيير مع الوقت"],
    reviews: [
      { name: "م.س", city: "طرابلس", text: "أكثر شيء عجبني أن الطلب واضح والدفع عند الاستلام. التغليف كان مرتب وحسيت أن المتجر جدي." },
      { name: "ر.ع", city: "بنغازي", text: "كنت نبي منتج سهل ندخله في الروتين، وطريقة الشرح في الصفحة خلتني نفهم قبل ما نطلب." },
      { name: "ن.م", city: "مصراتة", text: "التواصل لتأكيد الطلب عطاني ثقة، ما حسيتش أني نطلب من صفحة عشوائية." },
    ],
    faqs: sharedFaqs,
    offers: defaultOffers,
    crossSellSlugs: ["skin-glow-care", "under-eye-care"],
  },
  {
    id: "skin-glow",
    slug: "skin-glow-care",
    nameAr: "روتين نضارة البشرة",
    nameEn: "Skin Glow Care",
    category: "العناية بالبشرة",
    headline: "عناية يومية لبشرة يبان عليها الاهتمام والنضارة",
    subheadline: "اختيار كوبوكس لمن تريد روتين جمال سهل، أنيق، ومناسب للطلب داخل ليبيا.",
    description: "البشرة لا تحتاج دائماً روتيناً معقداً. أحياناً تحتاجين اختياراً واحداً واضحاً، سهل الاستعمال، ويشعرك أن العناية بنفسك أصبحت أبسط.",
    image: "/placeholders/product-skin.svg",
    rating: 4.7,
    reviewCount: 98,
    badges: ["نضارة", "منتج مختار", "عرض محدود", "COD"],
    benefits: ["مناسب لزاوية الثقة والجمال", "سهل التصوير والشرح", "يقوي إحساس premium brand", "يدعم الكروس سيل مع تحت العين"],
    proofPoints: ["يمكن دعمه بتجارب عميلات حقيقية", "صفحة هبوط عاطفية قوية", "يدخل بسهولة في routine bundle"],
    qualityChecks: ["توضيح نوع الاستخدام", "لغة claims آمنة", "مراجعة صور المنتج قبل الإطلاق", "اختبار سعر 1/2/3 قطع"],
    ingredients: ["مكونات عناية بالبشرة حسب المنتج النهائي", "شرح آلية الاستعمال", "ملاحظات للبشرة الحساسة عند الحاجة"],
    usageSteps: ["ابدئي بكمية مناسبة حسب التعليمات", "استخدميه ضمن روتينك اليومي", "لا تخلطي منتجات كثيرة بدون حاجة"],
    reviews: [
      { name: "س.ف", city: "طرابلس", text: "الصفحة كانت واضحة ومافيهاش مبالغة، هذا أكثر شيء خلاني نطلب." },
      { name: "ه.م", city: "الزاوية", text: "حبيت فكرة الدفع عند الاستلام وأنهم يتصلوا قبل الشحن." },
      { name: "ع.ك", city: "بنغازي", text: "البراند شكله مرتب ومش صفحة تبيع أي حاجة وخلاص." },
    ],
    faqs: sharedFaqs,
    offers: defaultOffers,
    crossSellSlugs: ["hair-confidence-ritual", "under-eye-care"],
  },
  {
    id: "under-eye",
    slug: "under-eye-care",
    nameAr: "عناية منطقة تحت العين",
    nameEn: "Under Eye Care",
    category: "العناية بالوجه",
    headline: "لمظهر وجه أهدأ وأكثر انتعاشاً في روتينك اليومي",
    subheadline: "منتج عناية مختار بعناية لمنطقة تحت العين، مع تجربة طلب قصيرة وواضحة.",
    description: "منطقة تحت العين من أول التفاصيل التي تلاحظينها في المرآة. لذلك تحتاج عناية هادئة، واضحة، وسهلة الاستعمال بدون وعود غير واقعية.",
    image: "/placeholders/product-eye.svg",
    rating: 4.6,
    reviewCount: 84,
    badges: ["مناسب للروتين", "كروس سيل قوي", "دفع عند الاستلام", "تأكيد الطلب"],
    benefits: ["مشكلة مرئية وسهلة الفهم", "CTA مباشر", "مناسب لفيديوهات استعمال", "يكمل منتجات البشرة"],
    proofPoints: ["FAQ لتخفيف الاعتراضات", "محتوى UGC سهل", "رسالة premium بدون claims طبية"],
    qualityChecks: ["مراجعة طريقة الاستخدام", "تأكيد التحذيرات", "توضيح أن النتائج تختلف", "تصوير استعمال واضح"],
    ingredients: ["مكونات ترطيب وعناية حسب المنتج النهائي", "طريقة استعمال دقيقة", "توجيهات للبشرة الحساسة"],
    usageSteps: ["نظفي منطقة تحت العين", "استعملي المنتج حسب التعليمات", "اجعليه جزءاً من روتينك الهادئ"],
    reviews: [
      { name: "ل.ع", city: "مصراتة", text: "أعجبني أن الكلام واقعي وما قالوش نتيجة مضمونة 100%." },
      { name: "ف.س", city: "طرابلس", text: "طلبت لأن الصفحة شرحت طريقة الاستخدام وشروط الدفع بشكل واضح." },
      { name: "د.ن", city: "بنغازي", text: "شكل المتجر يعطي ثقة، خصوصاً مع التقييمات وسياسة التأكيد." },
    ],
    faqs: sharedFaqs,
    offers: defaultOffers,
    crossSellSlugs: ["skin-glow-care", "hair-confidence-ritual"],
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getCrossSells(slugs: string[]) {
  return products.filter((product) => slugs.includes(product.slug));
}
