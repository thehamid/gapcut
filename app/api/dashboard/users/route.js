export const dynamic='force-dynamic'
import connect from '@/utils/db'
import { User } from "@/models/User"
import { NextRequest,NextResponse } from 'next/server';

export async function GET(req) {
    await connect();
          
    try {
        const users = await User.find().lean()
        return new NextResponse(JSON.stringify(users), { status: 200 });
      
    } catch (error) {
        return new NextResponse(JSON.stringify(null), { status: 500 });
    }
}