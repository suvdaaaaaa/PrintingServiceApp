import { updateUserModel } from "@/services/model/UserModel";
import { NextResponse } from "next/server";

export async function PUT(request) {
    const body = await request.json();
    const { fname, email, phone ,lname, address } = body;

  if (!fname || !email || !phone ) {
      return NextResponse.json({
          status: 400,
          message: "Хадгалахад алдаа гарлаа",
          result: null,
      }, {
          status: 400
      });
  } else {
      const dt = await updateUserModel(body);
      return NextResponse.json(dt, {
          status: dt.status
      });
  }
}
