import { NextRequest, NextResponse } from "next/server";
import { quoteRequestSchema } from "@/lib/validation/quote";
import { addQuoteRequest, getQuoteRequests } from "@/lib/store/quoteRequestsStore";

// In-memory rate limiting map: IP -> timestamp[]
const rateLimitMap = new Map<string, number[]>();

export async function POST(req: NextRequest) {
  try {
    const clientIp = req.headers.get("x-forwarded-for") || "local";
    const now = Date.now();

    // Rate Limiting: Max 5 quote submissions per 10 minutes per IP
    const windowMs = 10 * 60 * 1000;
    const timestamps = (rateLimitMap.get(clientIp) || []).filter((t) => now - t < windowMs);
    if (timestamps.length >= 8) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a few minutes before submitting again." },
        { status: 429 }
      );
    }
    timestamps.push(now);
    rateLimitMap.set(clientIp, timestamps);

    const body = await req.json();

    // Honeypot spam check
    if (body.websiteUrlHoneypot && body.websiteUrlHoneypot.trim().length > 0) {
      // Silently reject spam bots with a mock success
      return NextResponse.json({
        success: true,
        referenceNo: "AMQ-RFQ-2026-9999",
      });
    }

    // Zod validation
    const validationResult = quoteRequestSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const validData = validationResult.data;

    // Create persistent quote entry
    const saved = addQuoteRequest({
      customerName: validData.customerName,
      companyName: validData.companyName,
      phone: validData.phone,
      email: validData.email,
      city: validData.city,
      serviceType: validData.serviceType,
      projectDescription: validData.projectDescription,
      quantity: validData.quantity,
      preferredDate: validData.preferredDate,
      attachments: body.attachments || [],
    });

    return NextResponse.json({
      success: true,
      referenceNo: saved.referenceNo,
      quoteId: saved.id,
      message: "Quotation request successfully received.",
    });
  } catch (error: any) {
    console.error("Quote submission error:", error);
    return NextResponse.json(
      { error: "Internal server error processing quotation request." },
      { status: 500 }
    );
  }
}

export async function GET() {
  const quotes = getQuoteRequests();
  return NextResponse.json({ quotes });
}
