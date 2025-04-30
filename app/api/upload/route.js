export const dynamic='force-dynamic'
import { NextResponse } from "next/server";
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
import connect from '@/utils/db'
import  File  from "@/models/File"

export async function POST(req) {
   const formData = await req.formData();

   const file = formData.get("file");
   if (!file) {
      return NextResponse.json({}, { status: 400 });
   }
   if (file.size<1) {
      return NextResponse.json({data:"please enter file"}, { status: 400 });
   }

   const date = new Date();
   const year = date.getFullYear();
   const fileArrayBuffer = await file.arrayBuffer();
   const fileName=Date.now()+file.name;
   const fileUrl=`/uploads/${year}`+"/"+fileName;

   const client = new S3Client({
      region: "default",
     endpoint: process.env.LIARA_ENDPOINT,
     credentials: {
        accessKeyId: process.env.LIARA_ACCESS_KEY,
        secretAccessKey: process.env.LIARA_SECRET_KEY
     },
  });
  
  const params = {
     Body:fileArrayBuffer,
     Bucket: process.env.LIARA_BUCKET_NAME,
     Key:fileUrl,
  };
  
  try {
    await client.send(new PutObjectCommand(params));
     const goalImageUrl = `${process.env.GOAL_HOST_URL}${fileUrl}`
     

  //Save to DB
  await connect(); 

  const body = {
     name: fileName,
     url:goalImageUrl,
  }

  const newFile = new File();
  newFile.set({ ...body });
  const myfile=await newFile.save();

    
    return NextResponse.json({data:goalImageUrl},{status:200});
   } catch (error) {
      console.log(error);
      return NextResponse.json({data:"خطا در فرآیند آپلود"},{status:500});
  }

   
}