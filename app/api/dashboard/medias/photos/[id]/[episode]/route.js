import connect from '@/utils/db'
import { Photo } from "@/models/Media"
import { NextRequest,NextResponse } from 'next/server';

export async function GET(req, { params }) {
    await connect(); 
    
    const id=params.id
    const episode=params.episode



    try {
        const photos = await Photo.find({media_id:id,episode_id:episode})
        return  NextResponse.json({data:photos}, { status: 200 });
    
      
    } catch (error) {
       
        return  NextResponse.json({data:'failed'}, { status: 500 });
    }
}
