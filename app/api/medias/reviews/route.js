import connect from '@/utils/db'
import { Media,Review } from "@/models/Media"
import { NextResponse } from 'next/server';


export async function POST(req) {
    await connect();   
    const body = await req.json()

    try {
        const newReview= new Review();

        newReview.set({...body});
        const review = await newReview.save();

        return new NextResponse(JSON.stringify(review), { status: 200 });
      
    } catch (error) {
        return new NextResponse(JSON.stringify(error), { status: 500 });
    }
}