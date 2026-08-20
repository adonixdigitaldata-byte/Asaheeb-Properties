import { NextResponse } from "next/server";
import { submitWebsiteLead } from "@/lib/api";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      phone,
      email,
      city,
      property_id,
      interest,
      budget,
      source = "PROPERTY_INQUIRY",
      notes,
    } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: "Name and phone are required" },
        { status: 400 }
      );
    }

    const result = await submitWebsiteLead({
      name,
      phone,
      email,
      city,
      property_id,
      interest: interest || (property_id ? `Project: ${property_id}` : "General Property Inquiry"),
      budget,
      source: source || "PROPERTY_INQUIRY",
      form_type: "Brochure Download / Lead Capture",
      notes,
      skipEmail: true,
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error("Error creating lead in /api/leads/create:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to create lead" },
      { status: 500 }
    );
  }
}
