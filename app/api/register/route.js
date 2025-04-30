import {User} from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { name,email,username, password } = await request.json();

  await connect();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return new NextResponse("Email is already in use", { status: 400 });
  }

  const existingUserName = await User.findOne({ username });
  if (existingUserName) {
    return new NextResponse("UserName is already in use", { status: 402 });
  }

  const newUserName = username.replace(/\s+/g, '-').toLowerCase();
  const newPassword = password.replace(/\s+/g, '').toLowerCase();

  const hashedPassword = await bcrypt.hash(newPassword, 5);
  
  const date=new Date()


  const newUser = new User({
    name,
    email,
    username:newUserName,
    password: hashedPassword,
    avatar:'/images/avatar-holder.jpg',
  });

  try {
    await newUser.save();
    return new NextResponse("user is registered", { status: 200 });
  } catch (err) {
    return new NextResponse(err, {
      status: 500,
    });
  }
};
