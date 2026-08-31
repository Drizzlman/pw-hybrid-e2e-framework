import type { APIRequestContext, APIResponse } from '@playwright/test';
import type { TestUser } from '../data';
import type { ApiResponse } from './types';

const API_PATHS = {
  createAccount: '/api/createAccount',
  deleteAccount: '/api/deleteAccount',
} as const;

export class ApiClient {
  constructor(
    private readonly request: APIRequestContext,
    private readonly baseUrl: string
  ) {}

  async createAccount(user: TestUser): Promise<ApiResponse> {
    const response = await this.request.post(this.url(API_PATHS.createAccount), {
      form: this.accountFields(user),
    });
    return this.parseJson<ApiResponse>(response);
  }

  async deleteAccount(email: string, password: string): Promise<ApiResponse> {
    const response = await this.request.delete(this.url(API_PATHS.deleteAccount), {
      form: { email, password },
    });
    return this.parseJson<ApiResponse>(response);
  }

  private url(path: string): string {
    return `${this.baseUrl}${path}`;
  }

  private accountFields(user: TestUser): Record<string, string> {
    return {
      name: user.name,
      email: user.email,
      password: user.password,
      title: user.title,
      birth_date: user.birthDate,
      birth_month: user.birthMonth,
      birth_year: user.birthYear,
      firstname: user.firstName,
      lastname: user.lastName,
      company: user.company,
      address1: user.address1,
      address2: user.address2,
      country: user.country,
      zipcode: user.zipcode,
      state: user.state,
      city: user.city,
      mobile_number: user.mobileNumber,
    };
  }

  private async parseJson<T>(response: APIResponse): Promise<T> {
    const text = await response.text();
    if (!text) {
      throw new Error(`Empty response body (HTTP ${response.status()}) from ${response.url()}`);
    }
    const withoutBom = text.replace(/^\uFEFF/, '');
    try {
      return JSON.parse(withoutBom) as T;
    } catch {
      throw new Error(
        `Invalid JSON from ${response.url()} (HTTP ${response.status()}): ${withoutBom.slice(0, 200)}`
      );
    }
  }
}
