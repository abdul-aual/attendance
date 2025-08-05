const handleLogin = async (even) => {
    even.preventDefault();
    const userIdInput = document.getElementById('user-id');
    const passwordInput = document.getElementById('password');
    const inputId = userIdInput.value;
    const inputPassword = passwordInput.value;

    const user = {
        inputId: inputId,
        inputPassword: inputPassword
    };

    const userInfo = await fetchUserInfo(user);
    const errorElement = document.getElementById('user-login-error');
    if (userInfo.length === 0) {
        errorElement.classList.remove('hidden');
    } else {
        errorElement.classList.add('hidden');
        console.log('user', userInfo);
        localStorage.setItem('LoggedInUser', JSON.stringify(userInfo));
        window.location.href='/frontend/Teacher/teacherPanel.html';
    }
};

const fetchUserInfo = async (user) => {
    let data = [];
    try {
        const res = await fetch('http://localhost:5000/getUserInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (!res.ok) {
            throw new Error(`Server error: ${res.status}`);
        }

        data = await res.json();
    } catch (err) {
        console.log('Error connecting to the server:', err);
    } finally {
        return data;
    }
};

    const passwordInput = document.getElementById('password');
    const toggleBtn = document.getElementById('togglePassword');
    const eyeIcon = document.getElementById('eyeIcon');

    toggleBtn.addEventListener('click', () => {
      const isHidden = passwordInput.type === 'password';
      passwordInput.type = isHidden ? 'text' : 'password';
      eyeIcon.classList.toggle('fa-eye');
      eyeIcon.classList.toggle('fa-eye-slash');
    });

    passwordInput.addEventListener('input', ()=>{
        if (passwordInput.value.length>0 ){
            toggleBtn.style.display='block';
        }else{
            toggleBtn.style.display = 'none';
            passwordInput.type = 'password';
            eyeIcon.classList.add('fa-eye');
            eyeIcon.classList.remove('fa-eye-slash');
        }
    });

document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.getElementById('error-close-btn');
    const errorElement = document.getElementById('user-login-error');

    if (closeBtn && errorElement) {
        closeBtn.addEventListener('click', () => {
            errorElement.classList.add('hidden');
        });
    }

    
});
