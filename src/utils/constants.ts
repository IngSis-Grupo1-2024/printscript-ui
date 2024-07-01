export const FRONTEND_URL = import.meta.env?.VITE_FRONTEND_URL ?? "http://localhost:5173"
export const BACKEND_URL = import.meta.env?.VITE_BACKEND_URL ?? "http://localhost:8080/api"

export const AUTH0_USERNAME = import.meta.env?.VITE_AUTH0_USERNAME ?? ""
export const AUTH0_PASSWORD = import.meta.env?.VITE_AUTH0_PASSWORD ?? ""
export const AUTH0_DOMAIN = import.meta.env?.VITE_AUTH0_DOMAIN ?? ""
export const AUTH0_CLIENT_ID = import.meta.env?.VITE_AUTH0_CLIENT_ID ?? ""
export const AUTH0_AUDIENCE = import.meta.env?.VITE_AUTH0_AUDIENCE ?? ""
export const AUTH0_SCOPE = import.meta.env?.VITE_AUTH0_SCOPE ?? "openid profile email write:snippet read:snippet"

export const MANAGER_URL = import.meta.env?.VITE_MANAGER_URL ?? "http://localhost:8081"
export const CONFIGURATION_URL = import.meta.env?.VITE_CONFIGURATION_URL ?? "http://localhost:8082"

