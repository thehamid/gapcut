import connect from '@/utils/db'
import { Season } from "@/models/Media"
import { NextResponse } from 'next/server';



export async function POST(req) {


    await connect();   
    const body = await req.json()


    try {
        const newSeason= new Season();

        newSeason.set({ ...body });
        const season=await newSeason.save();
        return new NextResponse(JSON.stringify(season), { status: 200 });
      
    } catch (error) {
        return new NextResponse(JSON.stringify(error), { status: 500 });
    }
}