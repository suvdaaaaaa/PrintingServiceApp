import { getTemplateByIdModel } from "@/services/model/TemplateModel";
import { createMaterialModel  } from "@/services/model/MaterialModel";
import { NextResponse } from "next/server";


export async function GET(request, { params }) {
  const { id } = await params
  const uid = Number(id);

  const dt = await getTemplateByIdModel(uid);

  return NextResponse.json(dt);
}

export async function POST(request) {
  const body = await request.json();
  const {
    user_id,
    template_id,
    material_type,
    side,
    quantity,
    paper_type,
    description,
    file_name,
    file_url,
    total_price
  } = body

  if (!side || !quantity || !paper_type || !file_url || !file_name || !total_price) {
    return NextResponse.json({
      status: 400,
      message: "Захиалахад алдаа гарлаа",
      result: null,
    }, {
      status: 400
    });
  } else {
    const dt = await createMaterialModel(body);
    return NextResponse.json(dt, {
      status: dt.status
    });
  }
}