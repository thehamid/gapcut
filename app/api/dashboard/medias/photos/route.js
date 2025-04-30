import connect from '@/utils/db'
import { Photo } from "@/models/Media"
import { NextResponse } from 'next/server';


export async function POST(req) {


    await connect();   
    const body = await req.json()
    console.log('api:',body)

    try {
        const newPhoto= new Photo();

        newPhoto.set({ ...body });
        const photo=await newPhoto.save();
        return new NextResponse(JSON.stringify(photo), { status: 200 });
      
    } catch (error) {
        return new NextResponse(JSON.stringify(error), { status: 500 });
    }
}