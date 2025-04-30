export const dynamic='force-dynamic'
import connect from '@/utils/db'
import { Media } from "@/models/Media"
import { NextResponse } from 'next/server';

export async function GET(req) {
    await connect();
          
    try {
        const allMedia = await Media.find().sort({_id:-1}).select({title:1,poster:1,slug:1,yearProduct:1})
        return  NextResponse.json({data:allMedia}, { status: 200 });
      
    } catch (error) {
        return  NextResponse.json({data:'failed'}, { status: 500 });
    }
}