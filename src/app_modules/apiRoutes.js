const API_URL = 'https://srv594954.hstgr.cloud'; //https://srv594954.hstgr.cloud

export const API_ROUTES = {
  baseURL: `${API_URL}`,
  login: `${API_URL}/login`,
  signup: `${API_URL}/signup`,
  displayImg: `${API_URL}`,
  userSessionAut: `${API_URL}/api/validate-token-session`,
  sessionCheck: `${API_URL}/api/session-check`,
  forgotPassword: `${API_URL}/api/auth/forgot-password`,
  resetPassword: `${API_URL}/api/auth/reset-password`,
}
