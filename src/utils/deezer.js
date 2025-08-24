class DeezerAPI {
  constructor() {
    this.baseUrl = '/api/deezer'; // Use our proxy API route
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  GENRE_IDS = {
    pop: 132,
    rock: 152,
    rap: 116,
    electronic: 106,
    alternative: 85,
  };

  getTopFive = async () => {
    try {
      const response = await fetch(`${this.baseUrl}/chart?limit=5`, {
        headers: this.headers,
      });

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching top 5 from Deezer:', error);
      throw error;
    }
  };

  getTopTracksByGenre = async (genreId, limit = 10) => {
    try {
      const response = await fetch(
        `${this.baseUrl}/chart/${genreId}/tracks?limit=${limit}`,
        {
          headers: this.headers,
        }
      );

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching tracks by genre:', error);
      throw error;
    }
  };

  getTopTracksByGenreName = async (genreName, limit = 10) => {
    const genreKey = genreName.toLowerCase();
    const genreId = this.GENRE_IDS[genreKey];

    if (!genreId) {
      throw new Error(`Genre ${genreName} not found`);
    }

    return this.getTopTracksByGenre(genreId, limit);
  };

  searchTracks = async (query, limit = 10) => {
    try {
      const response = await fetch(
        `${this.baseUrl}/search?q=${encodeURIComponent(query)}&limit=${limit}`,
        {
          headers: this.headers,
        }
      );

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error searching tracks:', error);
      throw error;
    }
  };

  getTrack = async (trackId) => {
    try {
      const response = await fetch(`${this.baseUrl}/track/${trackId}`, {
        headers: this.headers,
      });

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching track:', error);
      throw error;
    }
  };

  getEditorial = async (editorialId) => {
    try {
      const response = await fetch(`${this.baseUrl}/editorial/${editorialId}`, {
        headers: this.headers,
      });

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching editorial:', error);
      throw error;
    }
  };
}

const deezer = new DeezerAPI();

export default deezer;
