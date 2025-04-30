import connect from '@/utils/db'
import { User} from "@/models/User"
import { NextResponse } from 'next/server';
import bcrypt from "bcryptjs";


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

    const userExist = await User.findOne({ _id: id });
    const isValidPassword = await bcrypt.compare(body.currentpassword,userExist?.password)
    if (!isValidPassword) {
        return new NextResponse("current password not true", { status: 402 });
    }
 
    const newPassword = body.newpassword.replace(/\s+/g, '').toLowerCase();
    const hashednewPassword = await bcrypt.hash(newPassword, 5);

    try {
       
        const userUpdate = await User.findByIdAndUpdate(id,{$set:{password:hashednewPassword}},updateOption)
        return new NextResponse(JSON.stringify(userUpdate), { status: 200 });
      
    } catch (error) {
        return new NextResponse(JSON.stringify(body), { status: 500 });
    }
}