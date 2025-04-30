import connect from '@/utils/db'
import { Media,Seen } from "@/models/Media"
import { NextResponse } from 'next/server';


export async function POST(req) {
    await connect();   
    const body = await req.json()

    try {
        const newSeen= new Seen();
        newSeen.set({...body});
        const seen = await newSeen.save();
        return new NextResponse(JSON.stringify(seen), { status: 200 });
      
    } catch (error) {
        return new NextResponse(JSON.stringify(error), { status: 500 });
    }
}