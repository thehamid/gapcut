import connect from '@/utils/db'
import { Track } from "@/models/User"
import { NextResponse } from 'next/server';





export async function POST(req) {
    await connect();   
    const body = await req.json()

    try {
        const newTrack= new Track();

        newTrack.set({...body});
        const track=await newTrack.save();
        return new NextResponse(JSON.stringify(track), { status: 200 });
      
    } catch (error) {
        return new NextResponse(JSON.stringify(error), { status: 500 });
    }
}