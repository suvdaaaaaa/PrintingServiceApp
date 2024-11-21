import { getTemplateByIdModel } from "@/services/model/TemplateModel";
import { NextResponse } from "next/server";


export async function GET(request, { params }) {
  const { id } = await params
  const uid = Number(id);

  const dt = await getTemplateByIdModel(uid);

  return NextResponse.json(dt);
}
