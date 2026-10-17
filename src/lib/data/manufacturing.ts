import { ManufacturingStep } from "@/types";

export const MANUFACTURING_STEPS: ManufacturingStep[] = [
  {
    step: 1,
    titleAr: "اختيار ومعالجة الأخشاب الفاخرة",
    titleEn: "Premium Timber Sourcing & Kiln Seasoning",
    descriptionAr:
      "نستورد أجود أنواع الأخشاب الصلبة الطبيعية (الجوز الأمريكي، البلوط، السنديان، والماهوجني) ونخضعها لغرف التجفيف الحراري (Kiln Drying) لضبط الرطوبة بين 8% و 10% بما يناسب مناخ المملكة العربية السعودية الحار والجاف.",
    descriptionEn:
      "We source certified Grade-A natural hardwoods (American Walnut, European Oak, Mahogany) and stabilize moisture content to 8-10% inside computer-controlled kiln-drying chambers suited for Saudi Arabia's arid climate.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
    machineryAr: "أفران تجفيف إيطالية مبرمجة ومقاييس رطوبة رقمية دقيقة",
    machineryEn: "Automated Italian kiln chambers & precision digital hygrometers",
  },
  {
    step: 2,
    titleAr: "الهندسة الرقمية والنمذجة ثلاثية الأبعاد (CAD / CAM)",
    titleEn: "Digital CAD/CAM Parametric Engineering",
    descriptionAr:
      "يقوم مهندسونا المعماريون بتحويل المخططات والرسومات التنفيذية إلى نماذج ثلاثية الأبعاد تفصيلية ومحاكاة ميكانيكية لجميع مفاصل التجميع وتوزيع الأحمال قبل بدء أي عملية قطع.",
    descriptionEn:
      "Our technical architects convert architectural shop drawings into 3D parametric CAD models and simulate stress loads and mechanical joinery tolerances before cutting.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    machineryAr: "محطات عمل هندسية ببرمجيات SolidWorks و Alphacam المتطورة",
    machineryEn: "SolidWorks & Alphacam advanced parametric engineering suites",
  },
  {
    step: 3,
    titleAr: "القص والتشكيل بماكينات CNC الألمانية خماسية المحاور",
    titleEn: "5-Axis CNC Precision Cutting & Milling",
    descriptionAr:
      "تتم عمليات القص، الحفر، التشكيل المجسم، وتفريغ الوصلات بدقة ميكرونية تصل إلى 0.1 مم باستخدام ماكينات Homag و Biesse المتطورة، مما يضمن تطابقاً مثالياً للأجزاء.",
    descriptionEn:
      "Ultra-high precision profiling, boring, and carving executed by 5-axis Homag and Biesse CNC centers with tolerances under 0.1mm, ensuring seamless assembly fit.",
    image: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80",
    machineryAr: "ماكينات CNC Homag ألمانية وماكينات Biesse Rover خماسية المحاور",
    machineryEn: "German Homag Centateq & Italian Biesse 5-Axis Rover CNC Centers",
  },
  {
    step: 4,
    titleAr: "التجميع الحرفي والتعشيق التقليدي",
    titleEn: "Master Joinery & Hand-Crafted Assembly",
    descriptionAr:
      "يجمع الحرفيون المتمرسون الأجزاء باستخدام تقنيات التعشيق الخشبي المتينة (Mortise & Tenon, Dovetail) والغراء الصناعي عالي القوة المقاوم للحرارة والرطوبة.",
    descriptionEn:
      "Master woodcrafters hand-fit joints using time-tested mortise & tenon and dovetail joinery alongside thermosetting structural adhesives resistant to extreme climates.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
    machineryAr: "مكابس هيدروليكية رأسية وأفقية لضبط زوايا التجميع بدقة مطلقة",
    machineryEn: "Hydraulic squaring presses & high-clamping structural rigs",
  },
  {
    step: 5,
    titleAr: "غرف الدهان الآلي والتشطيب بالبولي يوريثان",
    titleEn: "Pressurized Spray Booths & Multi-Layer Finishing",
    descriptionAr:
      "تتم عمليات الدهان والتلميع داخل غرف معزولة خالية من الغبار (Dust-free positive pressure booths) عبر 6 طبقات من البولي يوريثان المقاوم للخدش والأشعة فوق البنفسجية UV.",
    descriptionEn:
      "Surfaces receive up to 6 stages of primer, stain, and polyurethane clear coats inside dust-free positive-pressure booths, guaranteeing mirror-like durability and UV resistance.",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    machineryAr: "غرف دهان إيطالية بضغط إيجابي ومسدسات رش هيدروستاتيكية ذكية",
    machineryEn: "Italian pressurized spray booths with electrostatic air-assist guns",
  },
  {
    step: 6,
    titleAr: "التنجيد اليدوي والجلود الطبيعية الإيطالية",
    titleEn: "Bespoke Upholstery & Fine Leather Tailoring",
    descriptionAr:
      "يقوم خياطو المصنع بقص وتطريز أفخم الجلود الطبيعية والأقمشة الأوروبية المعالجة بمقاومة الحرائق والبقع، مع استخدام إسفنج عالي الكثافة HR لراحة تدوم لعقود.",
    descriptionEn:
      "Artisan upholsterers hand-stitch full-grain Italian leathers and fire-rated contract textiles over multi-density HR foam cores for timeless ergonomic comfort.",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
    machineryAr: "ماكينات خياطة صناعية Dürkopp Adler ألمانية لدرزات الجلود الثقيلة",
    machineryEn: "German Dürkopp Adler heavy-duty industrial leather sewing stations",
  },
  {
    step: 7,
    titleAr: "الفحص الشامل للجودة والمطابقة (SASO & ISO)",
    titleEn: "Strict SASO & ISO Quality Control Inspection",
    descriptionAr:
      "تخضع كل قطعة مفحوصة لأكثر من 28 نقطة تفتيش تشمل متانة المفاصل، دقة الأبعاد، تجانس اللون، وسلاسة تشغيل الأنظمة الكهربائية والميكانيكية المدمجة.",
    descriptionEn:
      "Every piece undergoes a 28-point inspection checking structural deflection, dimensional tolerances, finish gloss levels, and integrated electrical automation.",
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80",
    machineryAr: "أجهزة فحص اللمعان، أجهزة اختبار تحمل الضغط، وموازين ليزرية",
    machineryEn: "Digital gloss meters, load stress test rigs & laser aligners",
  },
  {
    step: 8,
    titleAr: "التغليف الوقائي والتركيب الموقعي الفاخر",
    titleEn: "Protective Crating & White-Glove Site Installation",
    descriptionAr:
      "تغلف المنتجات في صناديق خشبية مبطنة بالفوم الممتص للصدمات، وتنقل بأسطول شاحنات مجهز إلى موقع العميل حيث يتولى فريق مهندسي المصنع التركيب الاحترافي التام.",
    descriptionEn:
      "Custom timber-crated and shock-absorbed shipping, transported by our factory fleet and installed seamlessly on-site by certified factory installation engineers.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    machineryAr: "أسطول شاحنات مجهزة هيدروليكياً وأطقم أدوات تركيب دقيقة Hilti & Festool",
    machineryEn: "Climate-conditioned transport fleet & Festool precision installation rigs",
  },
];

export const FACTORY_STATS = {
  establishedYear: 1998,
  facilityAreaM2: 12500,
  monthlyCapacityWorkstations: 1800,
  completedProjectsCount: 450,
  activeEngineersCraftsmen: 120,
  warrantyYears: 10,
  sasoCertified: true,
  isoCertified: "ISO 9001:2015",
  location: {
    cityAr: "الرياض",
    cityEn: "Riyadh",
    districtAr: "المدينة الصناعية الثانية",
    districtEn: "2nd Industrial City",
    countryAr: "المملكة العربية السعودية",
    countryEn: "Kingdom of Saudi Arabia",
    coordinates: {
      lat: 24.5826,
      lng: 46.8521,
    },
    googleMapsUrl: "https://maps.google.com/?q=24.5826,46.8521",
  },
  contact: {
    phone: "+966 11 498 7000",
    whatsapp: "+966 50 123 4567",
    email: "info@almuqrinfurniturefactory.com",
    salesEmail: "rfq@almuqrinfurniturefactory.com",
    workingHoursAr: "السبت - الخميس: 8:00 صباحاً - 6:00 مساءً",
    workingHoursEn: "Saturday - Thursday: 8:00 AM - 6:00 PM",
  },
};
