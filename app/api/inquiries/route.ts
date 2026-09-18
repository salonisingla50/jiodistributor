import { NextResponse } from 'next/server';
import { read, write } from '../../../lib/store';

export async function GET() {
  try {
    const inquiries = read('inquiries');

    return NextResponse.json(inquiries);
  } catch (error) {
    console.error('GET INQUIRIES ERROR:', error);

    return NextResponse.json(
      { error: 'Failed to load inquiries' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const inquiries = read('inquiries');

    const newInquiry = {
      id: Date.now().toString(),
      name: body.name?.trim() || '',
      email: body.email?.trim() || '',
      phone: body.phone?.trim() || '',
      message: body.message?.trim() || '',
      status: 'NEW',
      createdAt: new Date().toISOString(),
    };

    inquiries.unshift(newInquiry);

    write('inquiries', inquiries);

    return NextResponse.json(
      newInquiry,
      { status: 201 }
    );
  } catch (error) {
    console.error('POST INQUIRY ERROR:', error);

    return NextResponse.json(
      { error: 'Failed to save inquiry' },
      { status: 500 }
    );
  }
}