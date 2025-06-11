// apiService.js - Frontend API Service

const BASE_URL = 'http://localhost:5500';

// Register User
async function registerUser(username, email, password) {
  try {
    const response = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });
    const data = await response.json();
    console.log('Register Response:', data);
    return data;
  } catch (error) {
    console.error('Register Error:', error);
  }
}

// Login User
async function loginUser(email, password) {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    console.log('Login Response:', data);
    return data;
  } catch (error) {
    console.error('Login Error:', error);
  }
}

// Get All Users
async function getAllUsers() {
  try {
    const response = await fetch(`${BASE_URL}/users`);
    const data = await response.json();
    console.log('All Users:', data);
    return data;
  } catch (error) {
    console.error('Get Users Error:', error);
  }
}

// Delete User by ID
async function deleteUser(userId) {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    console.log('Delete Response:', data);
    return data;
  } catch (error) {
    console.error('Delete Error:', error);
  }
}

// Export functions for frontend use
export { registerUser, loginUser, getAllUsers, deleteUser };
