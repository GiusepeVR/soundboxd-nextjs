class API {
  constructor() {
    this.baseUrl = 'http://localhost:3000';
  }

  async login(email, password) {
    const response = await fetch(`${this.baseUrl}/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  }
}

const api = new API();

export default api;
