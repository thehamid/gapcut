import connect from "@/utils/db";
import { State } from "@/models/Media";
import { NextRequest, NextResponse } from "next/server";

//update State
export async function PUT(req, { params }) {
  try {
    // Ensure database connection
    await connect();

    // Define update options
    const updateOption = {
      new: true,
      upsert: true,
      rawResult: true,
    };

    const id = params.id;
    // Fetch the watchlist
    const statelist = await State.findById(id);
    if (!statelist) {
      return new NextResponse(
        JSON.stringify({ error: "Watchlist not found" }),
        { status: 404 }
      );
    }

    // Parse request body
    const body = await req.json();
    if (!body?.media_id) {
      const catUpdate = await State.findByIdAndUpdate(
        id,
        { $set: { ...body } },
        updateOption
      );
      return new NextResponse(JSON.stringify(catUpdate), { status: 200 });
    }

    // Add or remove media_id from the media_id array
    const mediaIndex = statelist.media_id.indexOf(body.media_id);
    if (mediaIndex === -1) {
      // Add media_id if it doesn't exist
      statelist.media_id.push(body.media_id);
    } else {
      // Remove media_id if it exists
      statelist.media_id.splice(mediaIndex, 1);
    }

    // Update the watchlist document
    const updatedStateList = await State.findByIdAndUpdate(
      id,
      { $set: { media_id: statelist.media_id } },
      updateOption
    );

    return new NextResponse(JSON.stringify(updatedStateList), { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}

//Delete cat
export async function DELETE(req, { params }) {
  await connect();
  const id = params.id;

  try {
    const category = await State.findByIdAndDelete(id);
    return new NextResponse(JSON.stringify(category), { status: 200 });
  } catch (error) {
    return new NextResponse({ status: 500 });
  }
}
