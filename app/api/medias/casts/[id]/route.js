import connect from '@/utils/db'
import { Cast } from "@/models/Media"
import { PersonCats } from "@/models/Person"
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
    await connect(); 
    
    const id=params.id

    try {
        const casts = await Cast.find({ media_id: id }).populate("person_id")
             
        return  NextResponse.json({data:casts}, { status: 200 });
    
      
    } catch (error) {
       
        return  NextResponse.json({data:'failed'}, { status: 500 });
    }
}