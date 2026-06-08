const API_BASE = '/api';

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
  const user = getUser();
  if (!user?.id) {
    throw new Error('Silakan login terlebih dahulu untuk menulis ulasan.');
  }

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

export async function fetchUserProfile(userId) {
  const res = await fetch(`${API_BASE}/users/${userId}/profile`, {
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Gagal memuat profil');
  return data;
}

export async function deleteSpot(spotId) {
  const res = await fetch(`${API_BASE}/spots/${spotId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Gagal menghapus spot');
  return data;
}

export async function deleteReview(reviewId) {
  const res = await fetch(`${API_BASE}/reviews/${reviewId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Gagal menghapus ulasan');
  return data;
}

export async function updateReview(reviewId, reviewText) {
  const res = await fetch(`${API_BASE}/admin/reviews/${reviewId}`, {
    method: 'PUT',
    headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ reviewText })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Gagal menyensor ulasan');
  return data;
}

export async function updateSpot(id, formData) {
  const headers = getAuthHeaders();
  delete headers['Content-Type'];
  const res = await fetch(`${API_BASE}/spots/${id}/update`, {
    method: 'POST',
    headers,
    body: formData,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Gagal mengupdate spot');
  return data;
}

export async function deletePhoto(photoId) {
  const res = await fetch(`${API_BASE}/photos/${photoId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Gagal menghapus foto');
  return data;
}

export async function fetchAllUsers() {
  const res = await fetch(`${API_BASE}/admin/users`, {
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Gagal memuat pengguna');
  return data;
}

export async function fetchAdminStats() {
  const res = await fetch(`${API_BASE}/admin/stats`, {
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Gagal memuat statistik');
  return data;
}

export async function fetchAdminReviews() {
  const res = await fetch(`${API_BASE}/admin/reviews`, {
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Gagal memuat ulasan');
  return data;
}

export async function updateUserStatus(userId, status) {
  const res = await fetch(`${API_BASE}/admin/users/${userId}/status`, {
    method: 'PUT',
    headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Gagal mengubah status');
  return data;
}
