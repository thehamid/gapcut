import connect from "@/utils/db";
import { Media } from "@/models/Media";
import {  NextResponse } from "next/server";

export async function GET(req) {
  await connect();

  try {
    const { searchParams } = req.nextUrl;
    const paginate =10
    const pageNumber =
      searchParams.get("page") == undefined
        ? 1
        : searchParams.get("page") < 1
        ? 1
        : searchParams.get("page");

    const allmedia = await Media.find({})
      .sort({ _id: -1 })
      .populate("genre")
      .skip((pageNumber - 1) * paginate)
      .limit(paginate)
      .select({ title: 1, poster: 1, genre: 1, published: 1,slug:1 });

    const allMediaNumber = (await Media.find().lean()).length;

    return new NextResponse(
      JSON.stringify({
        all_media: allmedia,
        all_media_Number: allMediaNumber,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(JSON.stringify(null), { status: 500 });
  }
}

export async function POST(req) {
  await connect();
  const body = await req.json();

  if (!/^[\w\d\s-]+$/.test(body.slug)) {
    return NextResponse.json(
      { data: "خطا در انتخاب نامک مطلب وجود دارد" },
      { status: 402 }
    );
  }

  const checkSlug = await Media.findOne({ slug: body.slug });
  if (checkSlug) {
    return NextResponse.json(
      { data: "این نامک وجود دارد، نامک دیگری انتخاب کنید." },
      { status: 402 }
    );
  }


  try {
    const newMedia = new Media();

    newMedia.set({ ...body });
    const media = await newMedia.save();
    return new NextResponse(JSON.stringify(media), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
}
