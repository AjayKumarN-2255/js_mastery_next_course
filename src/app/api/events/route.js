import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Event from "@/database/event.model";
import { v2 as cloudinary } from "cloudinary";

export async function POST(req) {
    try {
        await connectDB();
        const formData = await req.formData();
        let event;
        try {
            event = Object.fromEntries(formData.entries());
        } catch (error) {
            return NextResponse.json({
                message: 'invalid json format',
                error: error instanceof Error ? error.message : 'Unknown error happened'
            }, { status: 400 })
        }

        const file = formData.get('image');
        if (!file) {
            return NextResponse.json({
                message: 'image file is required',
            }, { status: 400 })
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadedRes = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ resource_type: 'image', folder: 'Dev_events' }, (error, res) => {
                if (error) {
                    return reject(error);
                }
                resolve(res)
            }).end(buffer)
        })

        event.image = uploadedRes.secure_url;


        const createdEvent = await Event.create(event);
        return NextResponse.json({
            message: 'Event created successfully',
            event: createdEvent
        }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: 'event creation failed',
            error: error instanceof Error ? error.message : 'Unknown error happened'
        }, { status: 500 })
    }
}

export async function GET() {
    try {
        await connectDB();

        const events = await Event.find().sort({ createdAt: -1 });

        return NextResponse.json({ message: 'Events fetched successfully', events }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ message: 'Event fetching failed', error: e }, { status: 500 });
    }
}