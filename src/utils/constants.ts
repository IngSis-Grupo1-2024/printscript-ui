export const FRONTEND_URL = process?.env?.FRONTEND_URL ?? "http://localhost:5173"
export const BACKEND_URL = process?.env?.BACKEND_URL ?? "http://localhost:8080/api"

export const AUTH0_USERNAME = process?.env?.AUTH0_USERNAME ?? ""
export const AUTH0_PASSWORD = process?.env?.AUTH0_PASSWORD ?? ""
export const AUTH0_DOMAIN = process?.env?.AUTH0_DOMAIN ?? ""
export const AUTH0_CLIENT_ID = process?.env?.AUTH0_CLIENT_ID ?? ""
export const AUTH0_AUDIENCE = process?.env?.AUTH0_AUDIENCE ?? ""
export const AUTH0_SCOPE = process?.env?.AUTH0_SCOPE ?? "openid profile email write:snippet read:snippet"

export const MANAGER_URL = process?.env?.MANAGER_URL ?? "http://localhost:8081"
export const CONFIGURATION_URL = process?.env?.CONFIGURATION_URL ?? "http://localhost:8082"

