// Warn in production if the API URL is not configured
if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_API_URL) {
  console.warn(
    '[api.ts] ⚠️ NEXT_PUBLIC_API_URL is not set! Falling back to http://localhost:8000. ' +
    'This WILL cause all API calls to fail in production. ' +
    'Set this variable in your Vercel/hosting dashboard and trigger a new build.'
  );
}

export const fetchApi = async (endpoint: string, options: RequestInit = {}) => {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  const url = `${baseUrl}${endpoint}`;

  // Check if we have an access token in localStorage
  let token = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("access_token");
  }

  // Set up default headers
  const headers = new Headers(options.headers || {});
  if (!(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const config: RequestInit = {
    ...options,
    headers,
  };

  const response = await fetch(url, config);

  // Try to parse JSON response
  let data;
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    const error = {
      status: response.status,
      message: data?.detail || data?.message || (typeof data === 'string' ? data : "Error en la solicitud al servidor"),
      data: data,
      url: url
    };
    console.error(`[api.ts] ${options.method || 'GET'} ${url} → ${response.status}`, error.message);
    throw error;
  }

  return data;
};
