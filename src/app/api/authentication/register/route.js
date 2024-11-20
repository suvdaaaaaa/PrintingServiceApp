import { createUserModel } from "@/services/model/UserModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const { fname, email, phone, password } = body

  if (!fname || !email || !phone || !password) {
    return NextResponse.json({
      status: 400,
      message: "Бүртгэхад алдаа гарлаа",
      result: null,
    }, { status: 400 });
  } else {
    const dt = await createUserModel(body);
    return NextResponse.json(dt, { status: dt.status });
  }
}
