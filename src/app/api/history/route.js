import { getMaterialModel } from "@/services/model/MaterialModel";
import { NextResponse } from "next/server";

export async function GET() {
  const dt = await getMaterialModel();

  return NextResponse.json(dt);
}
