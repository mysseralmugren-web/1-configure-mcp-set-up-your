import { z } from "zod";

export const quoteRequestSchema = z.object({
  customerName: z
    .string()
    .min(3, { message: "الاسم يجب ألا يقل عن 3 أحرف / Name must be at least 3 characters" })
    .max(100),
  companyName: z.string().max(120).optional(),
  phone: z
    .string()
    .min(9, { message: "رقم الجوال غير صحيح / Invalid phone number" })
    .regex(/^(05|\+9665|9665)[0-9]{8}$|^[0-9+\s-]{9,20}$/, {
      message: "يرجى إدخال رقم جوال سعودي صالح / Please enter a valid Saudi phone number",
    }),
  email: z.string().email({ message: "بريد إلكتروني غير صالح / Invalid email address" }).optional().or(z.literal("")),
  city: z.string().min(2, { message: "يرجى تحديد المدينة / Please select city" }),
  serviceType: z.string().min(2, { message: "يرجى تحديد نوع الخدمة / Please select service type" }),
  projectDescription: z
    .string()
    .min(10, { message: "يرجى كتابة تفاصيل لا تقل عن 10 أحرف / Please provide at least 10 characters description" })
    .max(3000),
  quantity: z.coerce.number().min(1).optional(),
  preferredDate: z.string().optional(),
  // Honeypot field for bot/spam prevention
  websiteUrlHoneypot: z.string().max(0, { message: "Spam detected" }).optional(),
});

export type QuoteRequestInput = z.infer<typeof quoteRequestSchema>;
