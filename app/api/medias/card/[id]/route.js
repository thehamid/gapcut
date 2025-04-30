export const dynamic='force-dynamic'
import connect from '@/utils/db'
import { Media } from "@/models/Media"
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
    await connect();
    const id = params.id;
      
    try {
        //find media
        const media = await Media.findById(id).select({slug:1,title:1,poster:1});
        return new NextResponse( JSON.stringify(media),{ status: 200 });
    } catch (error) {
        return new NextResponse(JSON.stringify(null), { status: 500 });
    }
}