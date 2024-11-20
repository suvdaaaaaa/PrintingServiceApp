import { NextRequest, NextResponse } from "next/server";
import { sign } from "jsonwebtoken";
import { loginUserModel } from "@/services/model/UserModel";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(req) {
    const body = await req.json();
    const { email, password } = body

    if (!email || !password) {
        return NextResponse.json({
            status: 400,
            message: "Нэвтрэхэд алдаа гарлаа",
            result: null,
        }, { status: 400 });
    } else {
        const dt = await loginUserModel(email, password);
        return NextResponse.json(dt, { status: dt.status });
    }

    // if (loginResult.status === 200 && loginResult.result) {
    //   const token = sign(
    //     {
    //       email: loginResult.result.email,
    //       password: loginResult.result.password,
    //     },
    //     JWT_SECRET,
    //     { expiresIn: '24h' }
    //   );

    // }
}
