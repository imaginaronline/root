import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

class proxyApi {
  private axiosInstance = axios.create();
  private accessToken: string | null;
  constructor(accessToken: string | null = null) {
    this.accessToken = accessToken;
    this.axiosInstance.interceptors.request.use((config) => {
      if (this.accessToken) {
        // console.log(this.accessToken);
        config.headers['Authorization'] = `Bearer ${this.accessToken}`;
      }
      return config;
    });
  }

  async request<T>(method: string, url: string, data?: any): Promise<AxiosResponse<T>> {
    const config: AxiosRequestConfig = {
      method,
      url,
      data
    };

    try {
      const response = await this.axiosInstance(config);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async get<T>(url: string): Promise<AxiosResponse<T>> {
    return this.request<T>('get', url);
  }

  async post<T>(url: string, data: any): Promise<AxiosResponse<T>> {
    return this.request<T>('post', url, data);
  }

  async put<T>(url: string, data: any): Promise<AxiosResponse<T>> {
    return this.request<T>('put', url, data);
  }

  async del<T>(url: string): Promise<AxiosResponse<T>> {
    return this.request<T>('delete', url);
  }
}

export default proxyApi; 