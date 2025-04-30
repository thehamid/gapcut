import connect from '@/utils/db'
import { User } from "@/models/User"
import { NextRequest, NextResponse } from 'next/server';
import { QueryOptions } from 'mongoose';

export async function GET(req, { params }) {
    await connect();
    
    const id =params.id;
      
    try {
        const user = await User.findById(id);
        // return new NextResponse(JSON.stringify(user), { status: 200 });
         return  NextResponse.json({data:user}, { status: 200 });
    
      
    } catch (error) {
        // return new NextResponse(JSON.stringify(null), { status: 500 });
        return  NextResponse.json({data:'failed'}, { status: 500 });
    }
}



//update user data
export async function PUT(req, { params }) {
    await connect();
    const id = params.id;
    const updateOption = {
        new: true,
        upsert: true,
        rawResult: true,
    }; 
    
    const body = await req.json()

    try {
       
        const userUpdate = await User.findByIdAndUpdate(id,{$set:{...body}},updateOption)
        return new NextResponse(JSON.stringify(userUpdate), { status: 200 });
      
    } catch (error) {
        return new NextResponse(JSON.stringify(body), { status: 500 });
    }
}

//update user data
export async function POST(req, { params }) {
    await connect();
    const id = params.id;
     
    const body = await req.json()

    try {
        const user = await User.findById(id);

        user.set({ ...body });
        const userUpdate=await user.save();
        //const userUpdate = await User.findByIdAndUpdate(id,{$set:{...body}},updateOption)
        return new NextResponse(JSON.stringify(userUpdate), { status: 200 });
      
    } catch (error) {
        return new NextResponse(JSON.stringify(body), { status: 500 });
    }
}