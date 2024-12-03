import API from '../components/API';
import Auth from '../components/Auth/Auth';

const formLogin = document.getElementById('formLogin');

formLogin.addEventListener('submit', async (event) => {
  event.preventDefault();

  const nombreUsuario = document.getElementById('nombreUsuario').value;
  const contraseña = document.getElementById('contraseña').value;

  try {
    const response = await API.login({ nombreUsuario, contraseña });
    const { token } = response.data;

    Auth.setToken(token);

    window.location.href = '/';
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    alert('Usuario o contraseña incorrectos.');
  }
});
