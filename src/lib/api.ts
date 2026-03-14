// Warn in production if the API URL is not configured
if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_API_URL) {
  console.warn(
    '[api.ts] ⚠️ NEXT_PUBLIC_API_URL is not set! Falling back to http://localhost:8000. ' +
    'This WILL cause all API calls to fail in production. ' +
    'Set this variable in your Vercel/hosting dashboard and trigger a new build.'
  );
}

// Flag to prevent multiple concurrent refresh attempts
let isRefreshing = false;
// Queue for pending requests during refresh
let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

const onTokenRefreshed = (token: string) => {
  refreshSubscribers.map((cb) => cb(token));
  refreshSubscribers = [];
};

export const fetchApi = async (endpoint: string, options: RequestInit = {}, retryCount = 0): Promise<any> => {
  const getBaseUrl = () => {
    if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL;
    
    if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
      if (window.location.hostname.includes('forcegym.online')) {
        return 'https://api.forcegym.online';
      }
    }
    
    return "http://localhost:8000";
  };

  const baseUrl = getBaseUrl();
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

  // Only set header if token exists and is not an empty string
  if (token && token.trim() !== "" && token !== "undefined" && token !== "null") {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const config: RequestInit = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);

    // Try to parse JSON response
    let data;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    // Handle 401 Unauthorized (Token expired or invalid)
    if (response.status === 401 && retryCount < 1) {
      const refreshToken = localStorage.getItem("refresh_token");
      
      if (refreshToken && typeof window !== "undefined") {
        // If we are already refreshing, wait for it
        if (isRefreshing) {
          return new Promise((resolve) => {
            subscribeTokenRefresh((newToken) => {
              resolve(fetchApi(endpoint, options, retryCount + 1));
            });
          });
        }

        isRefreshing = true;

        try {
          const refreshRes = await fetch(`${baseUrl}/auth/token/refresh/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh: refreshToken }),
          });

          if (refreshRes.ok) {
            const refreshData = await refreshRes.json();
            const newAccessToken = refreshData.access;
            
            localStorage.setItem("access_token", newAccessToken);
            if (refreshData.refresh) {
              localStorage.setItem("refresh_token", refreshData.refresh);
            }

            isRefreshing = false;
            onTokenRefreshed(newAccessToken);
            
            // Retry the original request
            return fetchApi(endpoint, options, retryCount + 1);
          } else {
            // Refresh failed, logout
            isRefreshing = false;
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            if (typeof window !== "undefined") {
              window.dispatchEvent(new Event("auth-logout"));
              // Optional: window.location.href = "/auth/login";
            }
          }
        } catch (refreshErr) {
          isRefreshing = false;
          console.error("[api.ts] Failed to refresh token:", refreshErr);
        }
      }
    }

    if (!response.ok) {
      const error = {
        status: response.status,
        message: data?.detail || data?.message || (typeof data === 'string' ? data : "Error en la solicitud al servidor"),
        data: data,
        url: url
      };
      
      // Don't log 401 if we are going to retry or if it's already failed refresh
      if (response.status !== 401 || retryCount > 0) {
        console.error(`[api.ts] ${options.method || 'GET'} ${url} → ${response.status}`, error.message);
      }
      throw error;
    }

    return data;
  } catch (err: any) {
    if (err.status) throw err; // Re-throw our structured error
    
    // Handle network errors
    const networkError = {
      status: 0,
      message: "Error de red o conexión perdida",
      url: url
    };
    console.error(`[api.ts] Network error: ${url}`, err);
    throw networkError;
  }
};

