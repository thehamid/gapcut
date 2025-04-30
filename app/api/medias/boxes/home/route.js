export const dynamic='force-dynamic'
import connect from '@/utils/db'
import { State,Media } from "@/models/Media"
import { NextResponse } from 'next/server';



export async function GET(req) {

    await connect();  
    try {
        const categories = await State.find().populate("media_id", "title poster slug").select({title:1,poster:1,slug:1})

        const sortedCategories = categories.map((category) => {
            const sortedMedia = category.media_id.sort((a, b) => {
              return  b._id.toString().localeCompare(a._id.toString());
            });
            return {
              ...category.toObject(),
              media_id: sortedMedia,
            };
          });





        return new NextResponse(JSON.stringify(sortedCategories), { status: 200 });
      
    } catch (error) {
        return new NextResponse(JSON.stringify(null), { status: 500 });
    }
}