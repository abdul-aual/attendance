document.addEventListener('DOMContentLoaded', () => {
  const toggleLink = document.getElementById('create-account-toggle');
  const loginBox = document.getElementById('login-box');
  const createBox = document.getElementById('create-box');
  const createForm = document.getElementById('createForm');

  toggleLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginBox.classList.toggle('hidden');
    createBox.classList.toggle('hidden');
  });

  createForm.addEventListener('submit', handleCreate);
});

async function handleCreate(event) {
  event.preventDefault();

  const userName = document.getElementById('user-name').value.trim();
  const secretKey = document.getElementById('secret-key').value.trim();
  const password = document.getElementById('create-password').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  const imageUrl = document.getElementById('image-url').value.trim();

  if (secretKey !== 'secretadmin') {
    alert('Invalid secret key!');
    return;
  }

  if (password !== confirmPassword) {
    alert('Passwords do not match.');
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/create-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName,
        userPassword: password,
        userImage: imageUrl || null
      })
    });

    const result = await response.json();

    if (response.ok) {
      alert(`Account created successfully!\nYour User ID is: ${result.userId}\nPlease log in now.`);
      window.location.href = 'index.html';
    } else {
      alert(result.error || 'Error creating account.');
    }
  } catch (error) {
    console.error(error);
    alert('Something went wrong. Please try again.');
  }
}
