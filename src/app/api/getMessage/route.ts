import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const dummyResponse = {
      sender: { name: "Server", color: "text-blue" },
      message: `Echo: ${body.message}`,
      time: new Date().toLocaleTimeString(),
    };

    return NextResponse.json(dummyResponse, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
