import { NextResponse } from "next/server";
import { getExploreData } from "@/sanity/lib/explore";

export async function GET() {
  const data = await getExploreData();
  return NextResponse.json(data);
}
