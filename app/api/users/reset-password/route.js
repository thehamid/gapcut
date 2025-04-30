import connect from '@/utils/db'
import { User } from "@/models/User";
import { NextResponse} from "next/server"
import bcryptjs from "bcryptjs";

export async function POST(req) {

    try {
        await connect();

        const reqBody = await req.json();
        const { token, password } = reqBody
        // Validation
        if (!token || !password) {
            return NextResponse.json({ error: "Something is missing" }, { status: 500 });
        }

        // check if the user is existing
        const isUserExist = await User.findOne({
            forgotPasswordToken: token,
            forgotPasswordTokenExpiry: { $gt: Date.now() },
        })

        console.log("isUserExist", isUserExist);
        // Validation
        if (!isUserExist) {
            return NextResponse.json({ error: "Bad Request" }, { status: 500 });
        }

        // generate salt
        const salt = await bcryptjs.genSalt(10)
        // convert password to hashed password
        const hashedPassword = await bcryptjs.hash(password, salt)
        // store to the database

        isUserExist.password = hashedPassword;
        isUserExist.forgotPasswordToken = undefined;
        isUserExist.forgotPasswordTokenExpiry = undefined;
        await isUserExist.save();



        return NextResponse.json({ success: true, message: "User Password Reset Successfully" });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}
