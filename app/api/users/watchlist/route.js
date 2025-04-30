import connect from '@/utils/db'
import { WatchList } from "@/models/User"
import { NextResponse } from 'next/server';





export async function POST(req) {
    await connect();   
    const body = await req.json()

    try {
        const newList= new WatchList();

        newList.set({...body});
        const list=await newList.save();
        return new NextResponse(JSON.stringify(list), { status: 200 });
      
    } catch (error) {
        return new NextResponse(JSON.stringify(error), { status: 500 });
    }
}