import { createMaterialModel } from "@/services/model/MaterialModel";
import { NextResponse } from "next/server";

export async function POST(request) {
    const body = await request.json();
    const {side, quantity, paper_type, description, file_url, total_price} = body

    if (!side || !quantity || !paper_type || !file_url || !total_price) {
        return NextResponse.json({
        status: 400,
        message: "Захиалахад алдаа гарлаа",
        result: null,
        }, { status: 400 });
    } else {
        const dt = await createMaterialModel(body);
        return NextResponse.json(dt, { status: dt.status });
    }
}
