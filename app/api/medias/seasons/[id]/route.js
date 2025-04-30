import connect from '@/utils/db'
import { Season } from "@/models/Media"
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
    await connect(); 
    
    const id=params.id


    try {
        const seasons = await Season.find({media_id:id}).select({name:1,number:1})
        return  NextResponse.json({data:seasons}, { status: 200 });
    
      
    } catch (error) {
       
        return  NextResponse.json({data:'failed'}, { status: 500 });
    }
}