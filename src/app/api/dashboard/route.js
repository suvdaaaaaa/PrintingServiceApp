import { NextResponse } from "next/server";
import { getMaterialModel } from "../../../services/model/MaterialModel";

export async function GET() {
  const dt = await getMaterialModel();

  return NextResponse.json(dt);
}
