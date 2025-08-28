import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { code, code_verifier, redirect_uri } = await request.json();

    if (!code || !code_verifier) {
      return NextResponse.json(
        { error: 'Authorization code and code verifier are required' },
        { status: 400 }
      );
    }

    const clientId = 'ec1ead665ba54a1c819788728c479239';

    if (!clientId) {
      return NextResponse.json(
        { error: 'Spotify client ID not configured' },
        { status: 500 }
      );
    }

    const tokenResponse = await fetch(
      'https://accounts.spotify.com/api/token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri: 'https://www.soundboxd.online/auth/callback',
          client_id: clientId,
          code_verifier: code_verifier,
        }),
      }
    );

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      console.error('Spotify token exchange failed:', errorData);
      return NextResponse.json(
        { error: 'Failed to exchange authorization code' },
        { status: 400 }
      );
    }

    const tokenData = await tokenResponse.json();

    const profileResponse = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    if (!profileResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch user profile' },
        { status: 400 }
      );
    }

    const profileData = await profileResponse.json();

    return NextResponse.json({
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token,
      expires_in: tokenData.expires_in,
      user: {
        id: profileData.id,
        display_name: profileData.display_name,
        email: profileData.email,
        images: profileData.images,
        country: profileData.country,
        product: profileData.product,
      },
    });
  } catch (error) {
    console.error('Spotify callback error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
