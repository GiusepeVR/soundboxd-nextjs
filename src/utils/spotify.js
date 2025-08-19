class SpotifyAuth {
  constructor() {
    this.clientId = 'ec1ead665ba54a1c819788728c479239';
    this.redirectUri = 'https://www.soundboxd.online/auth/callback';
    this.scope = [
      'user-read-private',
      'user-library-read',
      'user-library-modify',
    ].join(' ');
  }

  // Generate PKCE code verifier and challenge
  generatePKCE() {
    const generateRandomString = (length) => {
      const possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
      let text = '';
      for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    };

    const codeVerifier = generateRandomString(128);
    const codeChallenge = this.base64URLEncode(sha256(codeVerifier));

    return { codeVerifier, codeChallenge };
  }

  // Base64URL encoding for PKCE
  base64URLEncode(str) {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(str)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
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

    // Store code verifier for later use
    sessionStorage.setItem('spotify_code_verifier', codeVerifier);

    const params = new URLSearchParams({
      client_id: this.clientId,
      response_type: 'code',
      redirect_uri: this.redirectUri,
      scope: this.scope,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      state: this.generateRandomString(16),
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
    const codeVerifier = sessionStorage.getItem('spotify_code_verifier');

    if (!codeVerifier) {
      throw new Error('No code verifier found');
    }

    const response = await fetch('/api/auth/spotify/callback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code,
        code_verifier: codeVerifier,
        redirect_uri: this.redirectUri,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to exchange code for token');
    }

    // Clear the code verifier after successful exchange
    sessionStorage.removeItem('spotify_code_verifier');

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
