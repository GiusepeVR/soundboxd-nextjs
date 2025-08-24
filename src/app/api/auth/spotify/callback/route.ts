import { NextRequest, NextResponse } from 'next/server';

const clientId = 'ec1ead665ba54a1c819788728c479239';
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = 'https://www.soundboxd.online/auth/callback';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    // Get the stored state from cookies
    const storedState = request.cookies.get('spotify_state')?.value;

    if (error) {
      return NextResponse.redirect(
        new URL('/login?error=access_denied', request.url)
      );
    }

    if (!code || !state) {
      return NextResponse.redirect(
        new URL('/login?error=missing_params', request.url)
      );
    }

    // Verify state parameter to prevent CSRF attacks
    if (state !== storedState) {
      return NextResponse.redirect(
        new URL('/login?error=invalid_state', request.url)
      );
    }

    // Exchange authorization code for access token
    const tokenResponse = await fetch(
      'https://accounts.spotify.com/api/token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${Buffer.from(
            `${clientId}:${clientSecret}`
          ).toString('base64')}`,
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri: redirectUri,
        }),
      }
    );

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      console.error('Token exchange failed:', errorData);
      return NextResponse.redirect(
        new URL('/login?error=token_exchange_failed', request.url)
      );
    }

    const tokenData = await tokenResponse.json();

    // Redirect to dashboard with success
    const response = NextResponse.redirect(new URL('/dashboard', request.url));

    // Clear the state cookie
    response.cookies.delete('spotify_state');

    // Store tokens in secure cookies (you might want to store these in a database instead)
    response.cookies.set('spotify_access_token', tokenData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: tokenData.expires_in,
    });

    if (tokenData.refresh_token) {
      response.cookies.set('spotify_refresh_token', tokenData.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    }

    return response;
  } catch (error) {
    console.error('Spotify callback error:', error);
    return NextResponse.redirect(
      new URL('/login?error=server_error', request.url)
    );
  }
}
