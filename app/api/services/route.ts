import { NextResponse } from "next/server";
import { read, write } from "../../../lib/store";

export async function GET() {
  try {
    const services = read("services");

    return NextResponse.json(services);
  } catch (error) {
    console.error("GET SERVICES ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to load services",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !body.description) {
      return NextResponse.json(
        {
          error: "Name and description are required",
        },
        {
          status: 400,
        }
      );
    }

    const services = read("services");

    const newService = {
      id: Date.now().toString(),
      name: body.name,
      description: body.description,
      category: body.category || "General",
      icon: body.icon || "S",
      tag: body.tag || "NEW",
    };

    services.push(newService);

    write("services", services);

    return NextResponse.json(newService, {
      status: 201,
    });
  } catch (error) {
    console.error("POST SERVICES ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to add service",
      },
      {
        status: 500,
      }
    );
  }
}