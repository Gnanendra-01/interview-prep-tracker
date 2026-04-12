export function saveToken(token) {
  localStorage.setItem('prepTrackerToken', token);
}

export function getToken() {
  return localStorage.getItem('prepTrackerToken');
}

export function clearToken() {
  localStorage.removeItem('prepTrackerToken');
}

export function isAuthenticated() {
  return Boolean(getToken());
}
