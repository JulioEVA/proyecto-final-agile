const usuarioController = require("../controllers/usuarioController");
const usuarioDao = require("../daos/usuarioDAO");

jest.mock("../daos/usuarioDAO");

describe("usuarioController", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe("crearUsuario", () => {
    it("debería crear un usuario y devolver un 201", async () => {
      req.body = { nombre: "Juan", edad: 30 };
      usuarioDao.crearUsuario.mockResolvedValue(req.body);

      await usuarioController.crearUsuario(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(req.body);
    });

    it("debería devolver un 400 si hay un error", async () => {
      usuarioDao.crearUsuario.mockRejectedValue(new Error("Error"));

      await usuarioController.crearUsuario(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error al crear el usuario",
        error: expect.any(Error),
      });
    });
  });

  describe("obtenerUsuarios", () => {
    it("debería devolver todos los usuarios con un 200", async () => {
      const usuarios = [{ nombre: "Juan" }, { nombre: "Maria" }];
      usuarioDao.obtenerUsuarios.mockResolvedValue(usuarios);

      await usuarioController.obtenerUsuarios(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(usuarios);
    });

    it("debería devolver un 500 si hay un error", async () => {
      usuarioDao.obtenerUsuarios.mockRejectedValue(new Error("Error"));

      await usuarioController.obtenerUsuarios(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error al obtener los usuarios",
        error: expect.any(Error),
      });
    });
  });

  describe("obtenerUsuarioPorId", () => {
    it("debería devolver un usuario por ID con un 200", async () => {
      req.params.id = "1";
      const usuario = { id: "1", nombre: "Juan" };
      usuarioDao.obtenerUsuarioPorId.mockResolvedValue(usuario);

      await usuarioController.obtenerUsuarioPorId(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(usuario);
    });

    it("debería devolver un 404 si el usuario no se encuentra", async () => {
      req.params.id = "2";
      usuarioDao.obtenerUsuarioPorId.mockResolvedValue(null);

      await usuarioController.obtenerUsuarioPorId(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Usuario no encontrado",
      });
    });

    it("debería devolver un 500 si hay un error", async () => {
      req.params.id = "1";
      usuarioDao.obtenerUsuarioPorId.mockRejectedValue(new Error("Error"));

      await usuarioController.obtenerUsuarioPorId(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error al obtener el usuario",
        error: expect.any(Error),
      });
    });
  });

  describe("actualizarUsuario", () => {
    it("debería actualizar un usuario y devolver un 200", async () => {
      req.params.id = "1";
      req.body = { nombre: "Juan actualizado" };
      const usuarioActualizado = { id: "1", nombre: "Juan actualizado" };
      usuarioDao.actualizarUsuario.mockResolvedValue(usuarioActualizado);

      await usuarioController.actualizarUsuario(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(usuarioActualizado);
    });

    it("debería devolver un 404 si el usuario no se encuentra", async () => {
      req.params.id = "2";
      req.body = { nombre: "Juan" };
      usuarioDao.actualizarUsuario.mockResolvedValue(null);

      await usuarioController.actualizarUsuario(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Usuario no encontrado",
      });
    });

    it("debería devolver un 400 si hay un error", async () => {
      req.params.id = "1";
      req.body = { nombre: "Juan" };
      usuarioDao.actualizarUsuario.mockRejectedValue(new Error("Error"));

      await usuarioController.actualizarUsuario(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error al actualizar el usuario",
        error: expect.any(Error),
      });
    });
  });

  describe("eliminarUsuario", () => {
    it("debería eliminar un usuario y devolver un 200", async () => {
      req.params.id = "1";
      usuarioDao.eliminarUsuario.mockResolvedValue(true);

      await usuarioController.eliminarUsuario(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Usuario eliminado con éxito",
      });
    });

    it("debería devolver un 404 si el usuario no se encuentra", async () => {
      req.params.id = "2";
      usuarioDao.eliminarUsuario.mockResolvedValue(null);

      await usuarioController.eliminarUsuario(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Usuario no encontrado",
      });
    });

    it("debería devolver un 500 si hay un error", async () => {
      req.params.id = "1";
      usuarioDao.eliminarUsuario.mockRejectedValue(new Error("Error"));

      await usuarioController.eliminarUsuario(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error al eliminar el usuario",
        error: expect.any(Error),
      });
    });
  });

  describe("obtenerUsuarioPorNombre", () => {
    it("debería devolver un usuario por nombre con un 200", async () => {
      req.params.nombreUsuario = "Juan";
      const usuario = { nombre: "Juan" };
      usuarioDao.obtenerUsuarioPorNombre.mockResolvedValue(usuario);

      await usuarioController.obtenerUsuarioPorNombre(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(usuario);
    });

    it("debería devolver un 404 si el usuario no se encuentra", async () => {
      req.params.nombreUsuario = "Maria";
      usuarioDao.obtenerUsuarioPorNombre.mockResolvedValue(null);

      await usuarioController.obtenerUsuarioPorNombre(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Usuario no encontrado",
      });
    });

    it("debería devolver un 500 si hay un error", async () => {
      req.params.nombreUsuario = "Juan";
      usuarioDao.obtenerUsuarioPorNombre.mockRejectedValue(new Error("Error"));

      await usuarioController.obtenerUsuarioPorNombre(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error al obtener el usuario",
        error: expect.any(Error),
      });
    });
  });
});
