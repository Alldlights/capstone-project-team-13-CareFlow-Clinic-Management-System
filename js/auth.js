const API_BASE = 'https://careflow-api-5.onrender.com/careflow';

function setMessage(container, text, type = 'error') {
  if (!container) return;
  container.textContent = text;
  container.style.color = type === 'error' ? '#ef4444' : '#0f766e';
}

function saveAuthState(token, user) {
  localStorage.setItem('careflow_token', token);
  localStorage.setItem('careflow_user', JSON.stringify(user));
}

function getAuthState() {
  const token = localStorage.getItem('careflow_token');
  const user = localStorage.getItem('careflow_user');
  return {
    token,
    user: user ? JSON.parse(user) : null,
  };
}

function clearAuthState() {
  localStorage.removeItem('careflow_token');
  localStorage.removeItem('careflow_user');
}

function redirectToDashboard(user) {
  if (!user || !user.role) return;

  const role = user.role.toLowerCase();
  switch (role) {
    case 'admin':
      window.location.href = '../dashboards/admin-dashboard.html';
      break;
    case 'doctor':
      window.location.href = '../dashboards/doctors-dashboard.html';
      break;
    case 'receptionist':
      window.location.href = '../dashboards/receptionist-dashboard.html';
      break;
    case 'cashier':
      window.location.href = '../dashboards/cashier-dashboard.html';
      break;
    default:
      window.location.href = '../dashboards/admin-dashboard.html';
      break;
  }
}

function handleLoginRedirect(user) {
  if (!user || !user.role) return;

  const role = user.role.toLowerCase();
  if (role === 'doctor' || role === 'receptionist') {
    window.location.href = 'change-password.html';
    return;
  }

  redirectToDashboard(user);
}

async function loginUser(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const message = document.querySelector('.form-message');
  const email = form.email.value.trim();
  const password = form.password.value.trim();

  if (!email || !password) {
    setMessage(message, 'Please enter both email and password.', 'error');
    return;
  }

  setMessage(message, 'Signing in...', 'success');

  try {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage = errorData?.message || 'Login failed. Check your credentials.';
      setMessage(message, errorMessage, 'error');
      return;
    }

    const data = await response.json();
    const { token, user } = data;
    if (!token || !user) {
      setMessage(message, 'Unexpected response from server.', 'error');
      return;
    }

    saveAuthState(token, user);
    handleLoginRedirect(user);
  } catch (err) {
    setMessage(message, 'Unable to reach server. Please try again.', 'error');
    console.error(err);
  }
}

async function changePassword(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const message = document.querySelector('.form-message');
  const currentPassword = form.current.value.trim();
  const newPassword = form.new.value.trim();
  const confirmPassword = form.confirm.value.trim();

  if (!currentPassword || !newPassword || !confirmPassword) {
    setMessage(message, 'Fill in all password fields.', 'error');
    return;
  }

  if (newPassword !== confirmPassword) {
    setMessage(message, "New passwords don't match.", 'error');
    return;
  }

  const { token, user } = getAuthState();
  if (!token || !user) {
    setMessage(message, 'Authentication missing. Please login again.', 'error');
    setTimeout(() => { window.location.href = 'login.html'; }, 1200);
    return;
  }

  setMessage(message, 'Updating password...', 'success');

  try {
    const response = await fetch(`${API_BASE}/staff/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ password: newPassword }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage = errorData?.message || 'Unable to update password.';
      setMessage(message, errorMessage, 'error');
      return;
    }

    setMessage(message, 'Password changed successfully!', 'success');
    setTimeout(() => redirectToDashboard(user), 1200);
  } catch (err) {
    setMessage(message, 'Unable to update password. Please try again.', 'error');
    console.error(err);
  }
}

function initAuth() {
  const loginForm = document.querySelector('.login-form');
  const changeForm = document.querySelector('.login-form');

  if (loginForm && window.location.pathname.endsWith('login.html')) {
    loginForm.addEventListener('submit', loginUser);
  }

  if (changeForm && window.location.pathname.endsWith('change-password.html')) {
    changeForm.addEventListener('submit', changePassword);
  }
}

document.addEventListener('DOMContentLoaded', initAuth);
