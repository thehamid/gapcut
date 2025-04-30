export const dynamic='force-dynamic'
import connect from '@/utils/db'
import File from "@/models/File"
import { NextResponse } from 'next/server';

export async function GET(req) {

    await connect();  
    try {
        const files = await File.find().lean().sort({_id:-1})
        return new NextResponse(JSON.stringify(files), { status: 200 });
      
    } catch (error) {
        return new NextResponse(JSON.stringify(null), { status: 500 });
    }
}