export const dynamic='force-dynamic'
import connect from '@/utils/db'
import { State } from "@/models/Media"
import { NextResponse } from 'next/server';



export async function GET(req) {

    await connect();  
    try {
        const categories = await State.find()
  .populate({
    path: "media_id",
    select: "title poster slug network schedule",
    populate: {
      path: "network",
      select: "title", // یا هر فیلدی که از network می‌خوای
    },
  })
  .select({ title: 1, poster: 1, slug: 1 });



        return new NextResponse(JSON.stringify(categories[0]), { status: 200 });
      
    } catch (error) {
        return new NextResponse(JSON.stringify(null), { status: 500 });
    }
}