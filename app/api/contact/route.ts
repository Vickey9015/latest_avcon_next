import { NextRequest, NextResponse } from "next/server";
import { createContactSubmission } from "@/lib/contact-submissions";
import { sendContactFormEmail } from "@/lib/mail";

export const dynamic = "force-dynamic";

function readText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = readText(body.name);
    const email = readText(body.email);
    const phone = readText(body.phone);
    const service = readText(body.service);
    const message = readText(body.message);
    const company = readText(body.company);
    const country = readText(body.country);
    const machinery = readText(body.machinery);
    const expectedDelivery = readText(body.expectedDelivery ?? body.expected_delivery);
    const additionalMessage = readText(body.additionalMessage);
    const source = readText(body.source) || "contact";

    if (source === "equipment-spares") {
      if (!name || !email || !phone || !country || !machinery) {
        return NextResponse.json(
          { error: "Please fill all required fields." },
          { status: 400 },
        );
      }
    } else if (!name || !email || !phone || !service || !message) {
      return NextResponse.json(
        { error: "Please fill all required fields." },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    await createContactSubmission({
      name,
      email,
      phone,
      service: service || "Industrial Equipment & Spare Parts",
      message: additionalMessage || message || machinery,
      company: company || null,
      country: country || null,
      machinery: machinery || null,
      expected_delivery: expectedDelivery || null,
      source,
    });

    try {
      await sendContactFormEmail({
        name,
        email,
        phone,
        service: service || "Industrial Equipment & Spare Parts",
        message: additionalMessage || message || machinery,
        company: company || null,
        country: country || null,
        machinery: machinery || null,
        expectedDelivery: expectedDelivery || null,
        additionalMessage: additionalMessage || null,
        source,
      });
    } catch (mailError) {
      console.error("Contact form email error:", mailError);
    }

    return NextResponse.json({
      success: true,
      message: "Your enquiry has been submitted successfully.",
    });
  } catch (error) {
    console.error("Contact submission error:", error);
    return NextResponse.json(
      { error: "Unable to submit your enquiry right now." },
      { status: 500 },
    );
  }
}
