const axios = require("axios");

export class ApiClient {
  apiClient: any;
  constructor(
    baseUrl: string,
    headers = { "Content-Type": "application/json" },
    timeout = 10000
  ) {
    this.apiClient = axios.create({
      baseUrl,
      timeout,
      headers,
    });
  }

  async get(endpoint: string) {
    try {
      const response = await this.apiClient.get(endpoint);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async post(endpoint: string, data: JSON) {
    try {
      const response = await this.apiClient.post(endpoint, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }
  async put(endpoint: string, data: JSON) {
    try {
      const response = await this.apiClient.put(endpoint, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async delete(endpoint: string) {
    try {
      const response = await this.apiClient.delete(endpoint);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async handleError(error: any) {
    if (error.response) {
      console.error(`Error:: ", Status: ${error.response.status}:: Resp: ${error.response.data}`);
    } else if (error.request) {
      console.error("Error request:", error.request);
    } else {
      console.error("Error message:", error.message);
    }
    console.error("Error config:", error.config);
  }
}
