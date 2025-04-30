import connect from '@/utils/db'
import {Seen} from "@/models/Media"
import { NextResponse } from 'next/server';

//get seen list
export async function GET(req, { params }) {
    await connect();  
    const id = params.id;    
    try {
        const seenList = await Seen.find({ user_id: id })

         return  NextResponse.json({data:seenList}, { status: 200 });   
      
    } catch (error) {
        return  NextResponse.json({data:'failed'}, { status: 500 });
    }
}






