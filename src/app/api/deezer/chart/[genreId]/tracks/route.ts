import { NextResponse } from 'next/server';

export async function GET(req: Request, context: unknown) {
  try {
    const { params } =
      (context as { params?: Promise<{ genreId?: string | string[] }> }) ?? {};
    const resolvedParams = await params;
    const genreId = Array.isArray(resolvedParams?.genreId)
      ? resolvedParams?.genreId?.[0]
      : resolvedParams?.genreId;

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
      const errorText = await response.text();
      console.error(
        'Deezer API error for genre',
        genreId,
        ':',
        response.status,
        errorText
      );
      throw new Error(`Deezer API responded with status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Deezer API: Received data for genre', genreId, ':', {
      hasData: !!data?.data,
      dataLength: data?.data?.length || 0,
      firstTrack: data?.data?.[0]
        ? {
            id: data.data[0].id,
            title: data.data[0].title,
            hasArtist: !!data.data[0].artist,
            hasAlbum: !!data.data[0].album,
          }
        : null,
    });

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
