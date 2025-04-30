import connect from '@/utils/db'
import { Episode } from "@/models/Media"
import { NextResponse } from 'next/server';

export async function POST(req) {


    await connect();   
    const body = await req.json()


    try {
        const newEpisode= new Episode();

        newEpisode.set({ ...body });
        const episode=await newEpisode.save();
        return new NextResponse(JSON.stringify(episode), { status: 200 });
      
    } catch (error) {
        return new NextResponse(JSON.stringify(error), { status: 500 });
    }
}