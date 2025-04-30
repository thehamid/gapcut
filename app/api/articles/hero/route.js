export const dynamic='force-dynamic'
import connect from '@/utils/db'
import { Article } from "@/models/Article"
import { NextRequest,NextResponse } from 'next/server';

export async function GET(req) {
    await connect();
          
    try {
        const heros = await Article.find().sort({_id:-1}).limit(5).lean()
        return new NextResponse(JSON.stringify(heros), { status: 200 });
      
    } catch (error) {
        return new NextResponse(JSON.stringify(null), { status: 500 });
    }
}