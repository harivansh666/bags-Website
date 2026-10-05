/**
 * Centralized HTTP Client Interface.
 * Big Tech Clean Architecture pattern for API communication.
 * To connect your real backend API, update BASE_URL or implement fetch/axios calls here.
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API Error: ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}
