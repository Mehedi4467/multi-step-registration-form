import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Parse the input from the request body
    const body = await req.json();

    // Check if the insertion was successful
    if (body) {
      return NextResponse.json({
        status: true,
        message: "Form inserted successfully",
      });
    } else {
      return NextResponse.json({
        status: false,
        message: "Failed to insert Form",
      });
    }
  } catch (error) {
    // Handle unexpected errors
    console.error("Error handling POST request:", error);
    return NextResponse.json({
      status: false,
      message: "Internal Server Error",
    });
  }
}
