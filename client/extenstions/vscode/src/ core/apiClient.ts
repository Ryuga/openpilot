const axios = require("axios");

export class ApiClient {
  apiClient: any;
  constructor(
    baseUrl: string,
    responseType: string = "json",
    headers: Object = { "Content-Type": "application/json" },
  ) {
    this.apiClient = axios.create({
      baseUrl: baseUrl,
      headers: headers,
      timeout: 10000,
      responseType: responseType
    });
  }

  async get(endpoint: string) {
    try {
      return await this.apiClient.get(endpoint);
    } catch (error) {
      this.handleError(error);
    }
  }

  async post(endpoint: string, data: any, params = {}) {
    try {
      return await this.apiClient.post(endpoint, data, { params });
    } catch (error) {
      this.handleError(error);
    }
  }
  async put(endpoint: string, data: JSON) {
    try {
      return await this.apiClient.put(endpoint, data);
    } catch (error) {
      this.handleError(error);
    }
  }

  async delete(endpoint: string) {
    try {
      return await this.apiClient.delete(endpoint);
    } catch (error) {
      this.handleError(error);
    }
  }

  async handleError(error: any) {
    if (error.response) {
      console.error(`Error:: "Status: ${error.response.status}:: Resp: ${error.response.data}`);
    } else if (error.request) {
      console.error("Error request:", error.request);
    } else {
      console.error("Error message:", error.message);
    }
    console.error("Error config:", error.config);
  }
}
