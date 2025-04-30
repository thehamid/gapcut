export const dynamic='force-dynamic'
import connect from "@/utils/db";
import { Person } from "@/models/Person";
import { NextRequest, NextResponse } from "next/server";

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

    const allpersons = await Person.find({})
      .sort({ _id: -1 })
      .populate("cats")
      .skip((pageNumber - 1) * paginate)
      .limit(paginate)
      .select({ name: 1, imgPerson: 1, cats: 1, published: 1,slug:1 });

    const allPersonNumber = (await Person.find().lean()).length;

    return new NextResponse(
      JSON.stringify({
        all_persons: allpersons,
        all_person_Number: allPersonNumber,
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

  const checkSlug = await Person.findOne({ slug: body.slug });
  if (checkSlug) {
    return NextResponse.json(
      { data: "این نامک وجود دارد، نامک دیگری انتخاب کنید." },
      { status: 402 }
    );
  }

  try {
    const newPerson = new Person();

    newPerson.set({ ...body });
    const person = await newPerson.save();
    return new NextResponse(JSON.stringify(person), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
}
