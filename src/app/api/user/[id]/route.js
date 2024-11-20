import { getUserByIdModel } from "@/services/model/UserModel";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
  const uid = Number(id);

  const dt = await getUserByIdModel(uid);

  return NextResponse.json(dt);
}
