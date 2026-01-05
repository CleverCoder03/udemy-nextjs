import dbConnect from "@/lib/db";
import Note from "@/models/Note";
import { NextResponse } from "next/server";

export async function DELETE(request, {params}){
    try {
        await dbConnect()
        const {id} = await params

        const note = await Note.findByIdAndDelete(id)

        if(!note) {
            return NextResponse.json({success: false, message: "No notes found"}, {status: 404})
        }

        return NextResponse.json({success: true, message: "Notes deleted successfully"}, {status: 200})
    } catch (error) {
         return NextResponse.json({success: false, message: error.message}, {status: 500})
    }
}