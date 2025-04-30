export const dynamic='force-dynamic'
import connect from '@/utils/db'
import { Media,Season } from "@/models/Media"
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
    await connect();
    const slug = params.slug;
      
    try {
        //find media
        const media = await Media.findOne({ slug: slug }).populate("score").populate("genre").populate("network");
        
        const seasons_count = (await Season.find({media_id: media.media_id}).lean()).length;
        
        return new NextResponse(
            JSON.stringify({
                media: media,
                seasons: seasons_count,
            }),
            { status: 200 }
        );
    } catch (error) {
        return new NextResponse(JSON.stringify(null), { status: 500 });
    }
}