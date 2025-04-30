import connect from '@/utils/db'
import {User} from "@/models/User"
import { NextResponse } from 'next/server';


export async function GET(req, { params }) {
    await connect();  
    const id = params.id;    
    try {
        const followingList = await User.find({user_id:id}).select({following:1})
         return  NextResponse.json({data:followingList}, { status: 200 });   
      
    } catch (error) {
        return  NextResponse.json({data:'failed'}, { status: 500 });
    }
}



//add track
export async function PUT(req, { params }) {
    try {
        // Ensure database connection
        await connect();

        // Validate params.id
        const id = params.id;
        if (!id) {
            return new NextResponse(JSON.stringify({ error: 'User  ID is required' }), { status: 400 });
        }

        // Parse request body
        const body = await req.json();
        if (!body?.username) {
            return new NextResponse(JSON.stringify({ error: 'User Name is required' }), { status: 400 });
        }

        // Fetch the user
        const user = await User.findById(id);
        if (!user) {
            return new NextResponse(JSON.stringify({ error: 'User  not found' }), { status: 404 });
        }

        const getUser = await User.findOne({ username: body.username });
        if (!getUser) {
            return new NextResponse(JSON.stringify({ error: 'User  not found' }), { status: 404 });
        }

        // Define update options
        const updateOption = {
            new: true,
            upsert: true,
            rawResult: true,
        };

         // Update tracking array
         const newfollowing = [...user.following, getUser._id];

        // Update the user document
        const updatedUserFollower  = await User.findByIdAndUpdate(
            id,
            { $set: { following: newfollowing } },
            updateOption
        );


         // Update tracking array
         const newfollower = [...getUser.followers, user._id];
        // Update the user document
        const updatedUserFollwing  = await User.findByIdAndUpdate(
            getUser._id,
            { $set: { followers: newfollower } },
            updateOption
        );

        // Return the updated user
        return new NextResponse(JSON.stringify(updatedUserFollower,updatedUserFollwing ), { status: 200 });
    } catch (error) {
        console.error('Error updating user:', error);
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}


export async function DELETE(req, { params }) {
    try {
        // Ensure database connection
        await connect();

        // Validate params.id
        const id = params.id;
        if (!id) {
            return new NextResponse(JSON.stringify({ error: 'User  ID is required' }), { status: 400 });
        }

        // Parse request body
        const body = await req.json();
        if (!body?.username) {
            return new NextResponse(JSON.stringify({ error: 'User  Name is required' }), { status: 400 });
        }

        // Fetch the user
        const user = await User.findById(id);
        if (!user) {
            return new NextResponse(JSON.stringify({ error: 'User  not found' }), { status: 404 });
        }

        const getUser = await User.findOne({ username: body.username });
        if (!getUser) {
            return new NextResponse(JSON.stringify({ error: 'User  not found' }), { status: 404 });
        }

        // Check if user is following the target user
        if (!user.following.includes(getUser ._id)) {
            return new NextResponse(JSON.stringify({ error: 'User  is not following the target user' }), { status: 400 });
        }


        // Update the user document
        const updatedUserFollower = await User.findByIdAndUpdate(
            id,
            { $pull: { following:  getUser._id } },
            { new: true}
        );

       

        // Update the user document
        const updatedUserFollowing = await User.findByIdAndUpdate(
            getUser._id,
            { $pull: { followers: user._id } },
            { new: true }
        );


        // Return the updated user
        return new NextResponse(JSON.stringify(updatedUserFollower,updatedUserFollowing), { status: 200 });
    } catch (error) {
        console.error('Error deleting user:', error);
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}

