const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

interface FetchOptions {
  method: "GET" | "POST" | "PUT" | "DELETE";
  headers?: HeadersInit;
  body?: any;
}

async function fetchClient<T>(
  endpoint: string,
  options: FetchOptions
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;

  const config: RequestInit = {
    method: options.method,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Error ${response.status}: ${
          errorData.message || "Something went wrong"
        }`
      );
    }

    return (await response.json()) as T;
  } catch (error: any) {
    console.error("Fetch error:", error.message);
    throw error;
  }
}
const get = <T>(endpoint: string) =>
  fetchClient<T>(endpoint, { method: "GET" });

const post = <T>(endpoint: string, body: any) =>
  fetchClient<T>(endpoint, { method: "POST", body });

const put = <T>(endpoint: string, body: any) =>
  fetchClient<T>(endpoint, { method: "PUT", body });

const del = <T>(endpoint: string) =>
  fetchClient<T>(endpoint, { method: "DELETE" });

export default { get, post, put, delete: del };
