class DeezerAPI {
  constructor() {
    this.baseUrl = '/api/deezer'; // Use our proxy API route
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

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

  // Add more methods as needed
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
}

const deezer = new DeezerAPI();

export default deezer;
