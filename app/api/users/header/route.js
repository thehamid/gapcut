import connect from '@/utils/db'
import  { User }  from "@/models/User"
import { NextResponse } from 'next/server';

export async function GET(req) {
    await connect();
    const mail = req.headers.get('email')


    try {
        //find user
        const user = await User.findOne({ email: mail }).select({
            name: 1,
            username: 1,
            avatar: 1,
            roles: 1,
        })
       
        return NextResponse.json({data:user}, { status: 200 });
    
      
    } catch (error) {
       
        return  NextResponse.json({data:'failed'}, { status: 500 });
    }
}