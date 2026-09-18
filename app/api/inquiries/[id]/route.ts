import { NextResponse } from "next/server";
import { read, write } from "../../../../lib/store";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const inquiries = read("inquiries");

    const exists = inquiries.some(
      (item: any) => String(item.id) === String(id)
    );

    if (!exists) {
      return NextResponse.json(
        { error: "Inquiry not found" },
        { status: 404 }
      );
    }

    const updatedInquiries = inquiries.filter(
      (item: any) => String(item.id) !== String(id)
    );

    write("inquiries", updatedInquiries);

    return NextResponse.json({
      ok: true,
      message: "Inquiry deleted successfully",
    });
  } catch (error) {
    console.error("DELETE INQUIRY ERROR:", error);

    return NextResponse.json(
      { error: "Failed to delete inquiry" },
      { status: 500 }
    );
  }
}