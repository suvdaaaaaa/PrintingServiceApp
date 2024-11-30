import { NextResponse } from "next/server";
import { getMaterialModel, updateMaterialModel } from "../../../services/model/MaterialModel";

export async function GET() {
  const dt = await getMaterialModel();

  return NextResponse.json(dt);
}

export async function PUT(request) {
    const body = await request.json();
    const {material_id, status} = body;

    
  if (!status ) {
      return NextResponse.json({
          status: 400,
          message: "Алдаа гарлаа",
          result: null,
      }, {
          status: 400
      });
  } else {
      const dt = await updateMaterialModel(material_id, status);
      return NextResponse.json(dt, {
        status: dt.status
      });
  }
}

