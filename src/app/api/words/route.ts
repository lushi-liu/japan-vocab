import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

export async function POST(req: Request) {
  try {
    const { english, japanese } = await req.json();

    if (!english || !japanese) {
      return NextResponse.json({ error: 'Missing words' }, { status: 400 });
    }

    const newWord = await prisma.word.create({
      data: {
        english,
        japanese,
      },
    });

    return NextResponse.json(newWord);
  } catch (error: any) {
    console.error('DATABASE ERROR:', error); // This shows in your terminal/console

    // Check for Prisma unique constraint error
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'This word is already in your collection!' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: 'Database failed',
        details: error.message, // Sending details back to frontend for debugging
      },
      { status: 500 }
    );
  }
}
