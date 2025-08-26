class SpotifyAuth {
  constructor() {
    this.clientId = 'ec1ead665ba54a1c819788728c479239';
    this.redirectUri =
      process.env.NODE_ENV === 'development'
        ? process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI_DEV ||
          'http://127.0.0.1:3000/auth/callback'
        : process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI_PROD ||
          'https://www.soundboxd.online/auth/callback';
    this.scope = [
      'user-read-private',
      'user-read-recently-played',
      'user-read-email',
      'user-read-playback-state',
      'user-modify-playback-state',
      'user-read-currently-playing',
      'playlist-read-private',
      'playlist-read-collaborative',
      'playlist-modify-public',
      'playlist-modify-private',
      'user-library-read',
      'user-library-modify',
    ].join(' ');
  }

  // Generate PKCE code verifier and challenge
  async generatePKCE() {
    const generateRandomString = (length) => {
      const possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
      let text = '';
      for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    };

    const codeVerifier = generateRandomString(64);
    const codeChallenge = this.base64URLEncode(await this.sha256(codeVerifier));

    return { codeVerifier, codeChallenge };
  }

  // Base64URL encoding for PKCE
  base64URLEncode(str) {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(str)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }

  // Simple SHA-256 implementation for PKCE
  async sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    return hashBuffer;
  }

  // Get authorization URL with PKCE
  async getAuthUrl() {
    const { codeVerifier, codeChallenge } = await this.generatePKCE();
    localStorage.setItem('code_verifier', codeVerifier);

    const params = new URLSearchParams({
      client_id: this.clientId,
      response_type: 'code',
      redirect_uri: this.redirectUri,
      scope: this.scope,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      redirect_uri: this.redirectUri,
    });

    return `https://accounts.spotify.com/authorize?${params.toString()}`;
  }

  generateRandomString(length) {
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let text = '';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  // Exchange authorization code for tokens using PKCE
  async exchangeCodeForToken(code) {
    const codeVerifier = localStorage.getItem('code_verifier');

    if (!codeVerifier) {
      throw new Error('No code verifier found');
    }

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: this.clientId,
        grant_type: 'authorization_code',
        code,
        code_verifier: codeVerifier,
        redirect_uri: this.redirectUri,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to exchange code for token');
    }

    const data = await response.json();
    return data;
  }

  // Get user profile
  async getUserProfile(accessToken) {
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }

    return await response.json();
  }

  // Get user playlists
  async getUserPlaylists(accessToken) {
    const response = await fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user playlists');
    }

    return await response.json();
  }

  // Get recently played tracks
  async getRecentlyPlayed(accessToken) {
    const response = await fetch(
      'https://api.spotify.com/v1/me/player/recently-played',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch recently played');
    }

    return await response.json();
  }
}

const spotifyAuth = new SpotifyAuth();

export default spotifyAuth;
