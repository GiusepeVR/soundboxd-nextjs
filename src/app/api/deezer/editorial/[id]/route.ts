import { NextResponse } from 'next/server';

export async function GET(req: Request, context: unknown) {
  try {
    const { params } =
      (context as { params?: { id?: string | string[] } }) ?? {};
    const editorialId = Array.isArray(params?.id)
      ? params?.id?.[0]
      : params?.id;

    if (!editorialId) {
      return NextResponse.json(
        { error: 'Editorial ID is required' },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://api.deezer.com/editorial/${editorialId}`,
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
    console.error('Deezer editorial API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch editorial from Deezer' },
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
