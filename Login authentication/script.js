document.addEventListener('DOMContentLoaded', () => {
    const authContainer = document.getElementById('auth-container');
    const dashboard = document.getElementById('dashboard');
    const authForm = document.getElementById('auth-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const toggleLink = document.getElementById('toggle-link');
    const formTitle = document.getElementById('form-title');
    const submitBtn = document.getElementById('submit-btn');
    const feedbackMessage = document.getElementById('feedback-message');
    const userNameDisplay = document.getElementById('user-name-display');
    const logoutBtn = document.getElementById('logout-btn');
    const passwordToggleIcon = document.getElementById('password-toggle-icon');

    let isLoginMode = true;

    const checkSession = () => {
        const loggedInUser = sessionStorage.getItem('loggedInUser');
        if (loggedInUser) {
            authContainer.style.display = 'none';
            dashboard.style.display = 'block';
            userNameDisplay.textContent = loggedInUser;
        }
    };

    const toggleAuthMode = () => {
        isLoginMode = !isLoginMode;
        formTitle.textContent = isLoginMode ? 'Login' : 'Register';
        submitBtn.textContent = isLoginMode ? 'Login' : 'Register';
        document.getElementById('toggle-text').innerHTML = isLoginMode 
            ? 'Don\'t have an account? <span id="toggle-link">Register</span>'
            : 'Already have an account? <span id="toggle-link">Login</span>';
        
        document.getElementById('toggle-link').addEventListener('click', toggleAuthMode);
        feedbackMessage.textContent = '';
        authForm.reset();
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (!username || !password) return;

        if (isLoginMode) loginUser(username, password);
        else registerUser(username, password);
    };

    const registerUser = (username, password) => {
        if (localStorage.getItem(username)) {
            feedbackMessage.textContent = 'Username already exists!';
            feedbackMessage.style.color = '#f39c12';
            return;
        }
        localStorage.setItem(username, password);
        feedbackMessage.textContent = 'Registration successful! Logging in...';
        feedbackMessage.style.color = '#2ecc71';
        setTimeout(toggleAuthMode, 1200);
    };

    const loginUser = (username, password) => {
        const storedPassword = localStorage.getItem(username);
        if (!storedPassword) {
            feedbackMessage.textContent = 'User not found!';
            feedbackMessage.style.color = '#e74c3c';
            return;
        }
        if (storedPassword !== password) {
            feedbackMessage.textContent = 'Incorrect password!';
            feedbackMessage.style.color = '#e74c3c';
            return;
        }
        sessionStorage.setItem('loggedInUser', username);
        showDashboard(username);
    };

    const showDashboard = (username) => {
        authContainer.style.display = 'none';
        dashboard.style.display = 'block';
        userNameDisplay.textContent = username;
    };

    const logoutUser = () => {
        sessionStorage.removeItem('loggedInUser');
        dashboard.style.display = 'none';
        authContainer.style.display = 'block';
        authForm.reset();
        feedbackMessage.textContent = '';
    };

    const togglePasswordVisibility = () => {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        passwordToggleIcon.classList.toggle('fa-eye');
        passwordToggleIcon.classList.toggle('fa-eye-slash');
    };

    toggleLink.addEventListener('click', toggleAuthMode);
    authForm.addEventListener('submit', handleFormSubmit);
    logoutBtn.addEventListener('click', logoutUser);
    passwordToggleIcon.addEventListener('click', togglePasswordVisibility);

    checkSession();
});
