import { createTemplateModel, updateTemplateModel } from "@/services/model/TemplateModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const dt = await createTemplateModel(body);

  if (!dt) {
    return NextResponse.json({
      data: dt,
      error: "Хадгалахад алдаа гарлаа",
      message: "error",
    });
  } else {
    return NextResponse.json({
      data: dt,
      message: "Амжилттай хадгаллаа",
    });
  }
}

export async function PUT(request) {
  const body = await request.json();
  const dt = await updateTemplateModel(body);

  if (!dt) {
    return NextResponse.json({
      data: dt,
      error: "Хадгалахад алдаа гарлаа",
      message: "error",
    });
  } else {
    return NextResponse.json({
      data: dt,
      message: "Амжилттай хадгаллаа",
    });
  }
}
