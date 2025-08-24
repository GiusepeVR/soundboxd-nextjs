class SimpleSpotifyAuth {
  constructor() {
    this.clientId = 'ec1ead665ba54a1c819788728c479239';
    this.redirectUri = 'https://www.soundboxd.online/auth/callback';
  }

  // GET Code from endpoint
  async getCode() {
    const response = await fetch('https://accounts.spotify.com/authorize', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: 'authorization_code',
        code,
        code_verifier: codeVerifier,
        redirect_uri: this.redirectUri,
      }),
    });
  }
}

const simpleSpotifyAuth = new SimpleSpotifyAuth();

export default simpleSpotifyAuth;
