import connect from '@/utils/db'
import { User } from "@/models/User"
import { NextResponse } from 'next/server';


export async function GET(req, { params }) {
    await connect();  
    const id = params.id;   
   
    try {
        const user = await User.findById(id).select({
            name: 1, username: 1, roles: 1, active: 1, avatar: 1, bio: 1, mobile: 1, reviews: 1, favs: 1, watch_list: 1,
            createdAt:1,lastLoginAt:1})
         return  NextResponse.json({data:user}, { status: 200 });
    
      
    } catch (error) {
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

//unknown
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