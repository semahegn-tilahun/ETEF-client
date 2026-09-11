const API_BASE = (
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1"
).replace(/\/$/, "");
export const API_ORIGIN = new URL(API_BASE).origin;

let csrfToken = sessionStorage.getItem("etef_csrf") || "";

export function setCsrfToken(token: string) {
  csrfToken = token || "";
  if (csrfToken) sessionStorage.setItem("etef_csrf", csrfToken);
  else sessionStorage.removeItem("etef_csrf");
}
export function getCsrfToken() {
  return csrfToken;
}

export async function api<T = any>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const headers = new Headers(options.headers);
  const isFormData =
    typeof FormData !== "undefined" && options.body instanceof FormData;
  if (options.body && !isFormData && !headers.has("Content-Type"))
    headers.set("Content-Type", "application/json");
  if (csrfToken) headers.set("X-CSRF-Token", csrfToken);
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
    credentials: "include",
  });
  const text = await response.text();
  let data: any = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { message: text };
  }
  if (!response.ok) {
    const error = new Error(
      data.message || `Request failed (${response.status})`,
    );
    (error as any).status = response.status;
    throw error;
  }
  return data as T;
}
