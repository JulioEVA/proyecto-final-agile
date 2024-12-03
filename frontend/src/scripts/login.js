import Toasted from 'toastedjs/dist/toasted.min.js';
import '../../node_modules/toastedjs/dist/toasted.min.css';
import API from '../components/API';
import Auth from '../components/Auth/Auth';

const formLogin = document.getElementById('formLogin');

const toast = new Toasted({
  position: 'top-center',
  duration: 3500,
  theme: 'alive',
  containerId: 'app',
});

formLogin.addEventListener('submit', async (event) => {
  event.preventDefault();

  const nombreUsuario = document.getElementById('nombreUsuario').value;
  const contraseña = document.getElementById('contraseña').value;

  try {
    const response = await API.login({ nombreUsuario, contraseña });
    const { token } = response.data;

    Auth.setToken(token);
    toast.success('Inicio de sesión exitoso. Redirigiendo...');
    setTimeout(() => {
      window.location.href = '/';
    }, 1500);
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    toast.error('Usuario o contraseña incorrectos.');
  }
});
