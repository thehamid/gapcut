import connect from '@/utils/db'
import { Episode } from "@/models/Media"
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
    await connect(); 
    
    const id=params.id
    const number=params.season_number


    try {
        const episodes = await Episode.find({media_id:id,season_number:number})
        return  NextResponse.json({data:episodes}, { status: 200 });
    
      
    } catch (error) {
       
        return  NextResponse.json({data:'failed'}, { status: 500 });
    }
}