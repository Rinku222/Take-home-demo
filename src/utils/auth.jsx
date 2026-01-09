import { showError, showSuccess } from "./toast";

export const getToken = () => {
  const token = localStorage.getItem('authToken');
  if (!token) return null;

  try {
    // JWT format: header.payload.signature
    const payloadBase64 = token.split('.')[1];
    if (!payloadBase64) throw new Error('Invalid token');

    // Base64URL → Base64
    const base64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(atob(base64));

    // exp is in seconds → convert Date.now() to seconds
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      localStorage.removeItem('authToken');
      return null;
    }

    return payload;
  } catch (err) {
    console.error('Invalid token', err);
    localStorage.removeItem('authToken');
    return null;
  }
};

export const logout = () => {
  try {
    localStorage.removeItem('authToken');
    showSuccess('Logged out successfully');
  } catch {
    showError('Something went wrong');
  }
};
