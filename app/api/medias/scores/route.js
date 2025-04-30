import connect from '@/utils/db'
import { Media,Score } from "@/models/Media"
import { NextResponse } from 'next/server';


export async function POST(req) {
    await connect();   
    const body = await req.json()
    const updateOption = {
        new: true,
        upsert: true,
        rawResult: true,
    };

    try {
        const newScore= new Score();

        newScore.set({...body});
        const score = await newScore.save();
        
        const mediaUpdate = await Media.findByIdAndUpdate(body.media_id,{$push:{score:score._id}},updateOption)

        return new NextResponse(JSON.stringify(score,mediaUpdate), { status: 200 });
      
    } catch (error) {
        return new NextResponse(JSON.stringify(error), { status: 500 });
    }
}