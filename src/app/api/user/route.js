import { getUsersModel } from "@/services/model/UserModel";
import { NextResponse } from "next/server";

export async function GET() {
  const dt = await getUsersModel();

  return NextResponse.json(dt);
}
