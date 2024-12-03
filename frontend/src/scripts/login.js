import API from '../components/API';
const formLogin = document.getElementById('formLogin');

/**
 * Event listener para el formulario de inicio de sesión.
 */
formLogin.addEventListener('submit', async (event) => {
  event.preventDefault();

  const nombreUsuario = document.getElementById('nombreUsuario').value;
  const contraseña = document.getElementById('contraseña').value;

  const credentials = { nombreUsuario, contraseña };

  try {
    const response = await API.login(credentials);

    const { token } = response.data;
    localStorage.setItem('token', token);

    window.location.href = '/';
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    alert('Error: Usuario o contraseña incorrectos.');
  }
});
