import { getTemplatesModel } from "@/services/model/TemplateModel";
import { NextResponse } from "next/server";

export async function GET() {
  const dt = await getTemplatesModel();

  return NextResponse.json(dt);
}
