// scripts/auth/admin-auth.js
const ADMIN_CREDENTIALS = {
    username: 'admin',
    passwordHash: 'hashed_password_here' // Use bcrypt in production
};

export async function validateCredentials(username, password) {
    // In production: Compare with bcrypt.hash(password, salt)
    return username === ADMIN_CREDENTIALS.username && 
           password === 'temp_password'; // Replace with actual validation
}

export function checkAdminSession() {
    return localStorage.getItem('adminSession') === 'active';
}

export function clearAdminSession() {
    localStorage.removeItem('adminSession');
    window.location.href = '../../views/login.html';
}