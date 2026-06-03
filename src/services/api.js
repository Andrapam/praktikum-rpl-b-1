const API_BASE = 'http://localhost:8000/api';

// Helper to get auth headers
function getAuthHeaders() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('fishpoint_token') : null;
  const headers = { 'Accept': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

export async function apiLogin(username, password) {
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Login gagal');
  return data;
}

export async function apiRegister(username, password) {
  const res = await fetch(`${API_BASE}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({ username, password, password_confirmation: password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Registrasi gagal');
  return data;
}

export async function fetchSpots() {
  const res = await fetch(`${API_BASE}/spots`, {
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Gagal memuat spot');
  return data;
}

export async function fetchSpotById(id) {
  const res = await fetch(`${API_BASE}/spots/${id}`, {
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Gagal memuat detail spot');
  return data;
}

export async function createSpot(formData) {
  const headers = getAuthHeaders();
  // Don't set Content-Type for FormData, let browser set it with boundary
  delete headers['Content-Type'];
  const res = await fetch(`${API_BASE}/spots`, {
    method: 'POST',
    headers,
    body: formData,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Gagal menyimpan spot');
  return data;
}

export async function createReview(spotId, rating, reviewText) {
  const res = await fetch(`${API_BASE}/reviews`, {
    method: 'POST',
    headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ spotId, rating, reviewText }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Gagal menyimpan review');
  return data;
}

export function saveAuth(user, token) {
  localStorage.setItem('fishpoint_token', token);
  localStorage.setItem('fishpoint_user', JSON.stringify(user));
}

export function getUser() {
  try {
    return JSON.parse(localStorage.getItem('fishpoint_user'));
  } catch {
    return null;
  }
}

export function logout() {
  localStorage.removeItem('fishpoint_token');
  localStorage.removeItem('fishpoint_user');
}

export function isLoggedIn() {
  return !!getUser();
}
