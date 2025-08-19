import { NextResponse } from 'next/server';

export async function GET(req: Request, context: unknown) {
  try {
    const { params } =
      (context as { params?: { genreId?: string | string[] } }) ?? {};
    const genreId = Array.isArray(params?.genreId)
      ? params?.genreId?.[0]
      : params?.genreId;

    if (!genreId) {
      return NextResponse.json(
        { error: 'Genre ID is required' },
        { status: 400 }
      );
    }

    const { searchParams } = new URL(req.url);
    const limit = searchParams.get('limit') || '10';

    const response = await fetch(
      `https://api.deezer.com/chart/${genreId}/tracks?limit=${limit}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Soundboxd/1.0',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Deezer API responded with status: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    console.error('Deezer genre tracks API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tracks by genre from Deezer' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
