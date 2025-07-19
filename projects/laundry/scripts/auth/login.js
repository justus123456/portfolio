// scripts/auth/login.js
document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const form = document.getElementById('login-form');
  const errorMessage = document.getElementById('error-message');
  const passwordInput = document.getElementById('password');
  const showBtn = document.getElementById('show');

  // Security Constants (For demonstration only - not production-safe)
  const ADMIN_CREDENTIALS = Object.freeze({
      username: 'admin',
      password: 'pa' // Never store passwords in client-side code in production
  });

  // Session Configuration
  const SESSION_CONFIG = {
      expiration: 3600000, // 1 hour in milliseconds
      storageKey: 'laundryAdminSession'
  };

  // Password Visibility Toggle
  const togglePasswordVisibility = () => {
      showBtn.classList.toggle('fa-eye');
      showBtn.classList.toggle('fa-eye-slash');
      passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
  };

  // Error Handling
  const showError = (message, duration = 3000) => {
      errorMessage.textContent = message;
      errorMessage.style.display = 'block';
      setTimeout(() => {
          errorMessage.style.display = 'none';
      }, duration);
  };

  // Session Management
  const createSession = () => {
      const sessionData = {
          loggedIn: true,
          expires: Date.now() + SESSION_CONFIG.expiration
      };
      localStorage.setItem(SESSION_CONFIG.storageKey, JSON.stringify(sessionData));
  };

  // Form Validation
  const validateCredentials = (username, password) => {
      const cleanUsername = username.trim();
      const cleanPassword = password.trim();
      return cleanUsername === ADMIN_CREDENTIALS.username && 
             cleanPassword === ADMIN_CREDENTIALS.password;
  };

  // Event Listeners
  showBtn.addEventListener('click', togglePasswordVisibility);

  form.addEventListener('submit', (e) => {
      e.preventDefault();

      const username = document.getElementById('username').value;
      const password = passwordInput.value;

      if (validateCredentials(username, password)) {
          createSession();
          window.location.href = '../views/admin/dashboard.html';
      } else {
          showError('Invalid credentials. Please try again.');
          passwordInput.value = ''; // Clear password field
          passwordInput.focus();
      }
  });

  // Input Field Validation
  document.getElementById('username').addEventListener('input', () => {
      errorMessage.style.display = 'none';
  });

  passwordInput.addEventListener('input', () => {
      errorMessage.style.display = 'none';
  });
});

// Add this to admin.js for session validation
const validateSession = () => {
  const sessionData = JSON.parse(localStorage.getItem('laundryAdminSession'));
  
  if (!sessionData || Date.now() > sessionData.expires) {
      localStorage.removeItem('laundryAdminSession');
      window.location.href = '../views/login.html';
      return false;
  }
  
  return true;
};