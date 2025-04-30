import connect from '@/utils/db'
import { Cast } from "@/models/Media"
import { NextResponse } from 'next/server';


export async function GET(req, { params }) {
    await connect(); 
 
    try {
        const casts = await Cast.find().lean()
        return  NextResponse.json({data:casts}, { status: 200 });
    
    } catch (error) {
       
        return  NextResponse.json({data:'failed'}, { status: 500 });
    }
}


export async function POST(req) {

    await connect();   
    const body = await req.json()

    try {
        const newCast= new Cast();

        newCast.set({ ...body });
        const cast=await newCast.save();
        return new NextResponse(JSON.stringify(cast), { status: 200 });
      
    } catch (error) {
        return new NextResponse(JSON.stringify(error), { status: 500 });
    }
}