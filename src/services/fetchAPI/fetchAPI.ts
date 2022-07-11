import { FetchAPIHeader, FetchReturns } from "../../types/fetch";

export default class FetchAPI<T> {
  private readonly apiURL: string;

  private headers: FetchAPIHeader;

  constructor(apiURL: string) {
    this.apiURL = apiURL;

    this.headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
  }

  async get(complementUrl: string): Promise<FetchReturns<T>> {
    const result = await fetch(`${this.apiURL}${complementUrl}`, {
      method: 'GET',
      headers: { ...this.headers },
    });

    const data = await result.json() as T;

    return {
      statusCode: result.status,
      data,
    };
  }

  async getWithBody(complementUrl: string, info: unknown): Promise<FetchReturns<T>> {
    const result = await fetch(`${this.apiURL}${complementUrl}`, {
      method: 'POST',
      headers: { ...this.headers },
      body: JSON.stringify(info),
    });

    const data = await result.json() as T;

    return {
      statusCode: result.status,
      data,
    };
  }

  async post(complementUrl: string, info: any): Promise<FetchReturns<T>> {
    const result = await fetch(`${this.apiURL}${complementUrl}`, {
      method: 'POST',
      headers: { ...this.headers },
      body: JSON.stringify(info),
    });

    const data = await result.json() as T;

    return {
      statusCode: result.status,
      data,
    };
  }

  async delete(complementUrl: string): Promise<FetchReturns<T>> {
    const result = await fetch(`${this.apiURL}${complementUrl}`, {
      method: 'DELETE',
      headers: { ...this.headers },
    });

    const data = await result.json() as T;

    return {
      statusCode: result.status,
      data,
    };
  }

  async put(complementUrl: string, info: any): Promise<FetchReturns<T>> {
    const result = await fetch(`${this.apiURL}${complementUrl}`, {
      method: 'PUT',
      headers: { ...this.headers },
      body: JSON.stringify(info),
    });

    const data = await result.json() as T;

    return {
      statusCode: result.status,
      data,
    };
  }

  getHeader(): FetchAPIHeader {
    return this.headers;
  }
}