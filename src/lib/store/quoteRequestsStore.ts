import { QuoteRequest } from "@/types";

export const INITIAL_QUOTE_REQUESTS: QuoteRequest[] = [
  {
    id: "rfq-101",
    referenceNo: "AMQ-RFQ-2026-8941",
    customerName: "م. تركي الشمري",
    companyName: "شركة الرمز للاستثمار العقاري",
    phone: "0504432190",
    email: "t.shammari@alramz.sa",
    city: "الرياض",
    serviceType: "المكاتب التنفيذية وطاولات الاجتماعات",
    projectDescription:
      "تجهيز 6 مكاتب تنفيذية رئاسية مع طاولة اجتماعات لـ 16 شخصاً في المقر الجديد على طريق الملك فهد مع تكسيات خشبية جدارية.",
    quantity: 6,
    preferredDate: "2026-12-01",
    status: "new",
    createdAt: "2026-10-16T14:30:00Z",
    attachments: ["executive_floor_layout.dwg", "specs_boq.pdf"],
  },
  {
    id: "rfq-102",
    referenceNo: "AMQ-RFQ-2026-8938",
    customerName: "سعد بن إبراهيم الحمود",
    companyName: "فيلا خاصة - الدرعية",
    phone: "0559812345",
    email: "saad.alhamoud@gmail.com",
    city: "الرياض",
    serviceType: "الكنب والمجالس الفاخرة والتنجيد",
    projectDescription:
      "تصنيع مجلس رجال ملكي على الطراز السلماني بطول 14 متراً مع طاولات خدمة رخامية وباب مدخل رئيسي محوري.",
    quantity: 1,
    preferredDate: "2026-11-15",
    status: "in_review",
    createdAt: "2026-10-15T09:15:00Z",
    attachments: ["majlis_interior_concept.pdf"],
  },
  {
    id: "rfq-103",
    referenceNo: "AMQ-RFQ-2026-8924",
    customerName: "د. هتون القحطاني",
    companyName: "مجمع عيادات استشارية",
    phone: "0533120987",
    email: "dr.hatoun@clinics.med.sa",
    city: "الخبر",
    serviceType: "أثاث المكاتب ومحطات العمل",
    projectDescription:
      "توريد 45 محطة عمل مكتبية مخصصة ومكاتب استقبال رخامية مع كراسي طبية مريحة.",
    quantity: 45,
    preferredDate: "2026-11-30",
    status: "quoted",
    createdAt: "2026-10-12T11:45:00Z",
    attachments: ["boq_clinic_expansion.xlsx"],
  },
];

// In-memory runtime persistence for serverless runtime
let globalQuotes: QuoteRequest[] = [...INITIAL_QUOTE_REQUESTS];

export function getQuoteRequests(): QuoteRequest[] {
  return globalQuotes;
}

export function addQuoteRequest(quote: Omit<QuoteRequest, "id" | "referenceNo" | "status" | "createdAt">): QuoteRequest {
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const newQuote: QuoteRequest = {
    ...quote,
    id: `rfq-${Date.now()}`,
    referenceNo: `AMQ-RFQ-2026-${randomSuffix}`,
    status: "new",
    createdAt: new Date().toISOString(),
  };
  globalQuotes.unshift(newQuote);
  return newQuote;
}

export function updateQuoteStatus(id: string, status: QuoteRequest["status"]): boolean {
  const target = globalQuotes.find((q) => q.id === id);
  if (target && status) {
    target.status = status;
    return true;
  }
  return false;
}
