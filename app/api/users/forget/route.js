import connect from '@/utils/db'
import { User } from "@/models/User"
import { NextResponse } from "next/server"
import sendEmail from "@/utils/sendEmail";


//update user data
export async function POST(req) {
    await connect();
    const body = await req.json();
    const { email } = body;
    

    try {
       
        // Validation
        if (!email) {
            return NextResponse.json({ error: "Something is missing" }, { status: 500 });
        }

        // check if the user is existing
        const isUserExist = await User.findOne({ email })
        // Validation
        if (!isUserExist) {
            console.log("User is not available");
            return NextResponse.json({ error: "User Not Found" }, { status: 500 });
        }

        // SEND EMAIL TO USER
        sendEmail({ emailAddress: email, emailType: "forgotPassword", userId: isUserExist?._id })

        return NextResponse.json({ success: true, message: "Validation email send Successfully" });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}