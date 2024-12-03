import API from '../components/API';
import Toasted from 'toastedjs/dist/toasted.min.js';
import '../../node_modules/toastedjs/dist/toasted.min.css';

const formUsuario = document.getElementById('formUsuario');
const tablaUsuarios = document.getElementById('tablaUsuarios');
const title = document.querySelector('h2');
const btnCancelar = document.getElementById('btnCancelar');
const btnGuardar = document.querySelector('button[type="submit"]');

let usuarios = []; // Lista local de usuarios
let usuarioEditando = null; // Usuario actual en edición

const toast = new Toasted({
  position: 'top-center',
  duration: 2000,
  theme: 'alive',
  containerId: 'app',
});

/**
 * Carga los usuarios desde la API y los guarda en la lista local
 */
const cargarUsuarios = async () => {
  try {
    const response = await API.getUsuarios();
    usuarios = response.data;
    actualizarTabla();
  } catch (error) {
    console.error('Error al cargar usuarios:', error);
    toast.error('Error al cargar usuarios, intenta de nuevo más tarde');
  }
};

/**
 * Actualiza la tabla de usuarios con los datos locales
 */
const actualizarTabla = () => {
  tablaUsuarios.innerHTML = usuarios
    .map(
      (usuario) => `
      <tr data-id="${usuario._id}">
        <td>${usuario.nombreUsuario}</td>
        <td>${usuario.rol}</td>
        <td>${usuario.estado}</td>
        <td>
          <button class="btn-edit">Editar</button>
          <button class="btn-delete">Eliminar</button>
        </td>
      </tr>
    `
    )
    .join('');

  document.querySelectorAll('.btn-edit').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const id = e.target.closest('tr').dataset.id;
      editarUsuario(id);
    });
  });

  document.querySelectorAll('.btn-delete').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const id = e.target.closest('tr').dataset.id;
      eliminarUsuario(id);
    });
  });
};

// Crear o actualizar usuario
formUsuario.addEventListener('submit', async (e) => {
  e.preventDefault();

  const usuario = {
    nombreUsuario: formUsuario.nombreUsuario.value,
    contraseña: formUsuario.contraseña.value,
    rol: formUsuario.rol.value,
    estado: formUsuario.estado.value,
  };

  try {
    if (usuarioEditando) {
      if (usuario.contraseña === '') {
        delete usuario.contraseña;
      }
      await API.updateUsuario(usuarioEditando, usuario);
      toast.success('Usuario actualizado correctamente');
    } else {
      await API.createUsuario(usuario);
      toast.success('Usuario creado correctamente');
    }
    resetForm();
    await cargarUsuarios();
  } catch (error) {
    console.error('Error al guardar usuario:', error);
    toast.error('Error al guardar usuario, intenta de nuevo');
  }
});

/**
 * Elimina un usuario por su ID
 * @param {*} id ID del usuario a eliminar
 */
const eliminarUsuario = async (id) => {
  try {
    await API.deleteUsuario(id);
    await cargarUsuarios();
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    toast.error('Error al eliminar usuario, intenta de nuevo');
  }
};

/**
 * Carga los datos del usuario a editar en el formulario
 * @param {*} id ID del usuario a editar
 * @returns void
 */
const editarUsuario = (id) => {
  const usuario = usuarios.find((u) => u._id === id);
  if (!usuario) return;

  title.textContent = 'Editando usuario "' + usuario.nombreUsuario + '"';
  btnGuardar.textContent = 'Actualizar usuario';

  formUsuario.nombreUsuario.value = usuario.nombreUsuario;
  formUsuario.contraseña.value = '';
  formUsuario.rol.value = usuario.rol;
  formUsuario.estado.value = usuario.estado;
  usuarioEditando = id;
};

/**
 * Resetea el formulario y los datos de edición
 */
const resetForm = () => {
  title.textContent = 'Crear Usuario';
  btnGuardar.textContent = 'Guardar usuario';
  formUsuario.reset();
  usuarioEditando = null;
};

btnCancelar.addEventListener('click', () => {
  resetForm();
});

// Inicializar
cargarUsuarios();
