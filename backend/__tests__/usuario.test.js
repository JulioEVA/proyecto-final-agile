const request = require("supertest");
const mongoose = require("mongoose");
const { app, server } = require("../app");
const usuarioDao = require("../daos/usuarioDAO");

jest.mock("../daos/usuarioDAO");

describe("Usuario Routes", () => {
  afterAll(() => {
    mongoose.connection.close();
    server.close();
  });

  describe("POST /api/usuarios", () => {
    it("should create un usuario y devolver un 201", async () => {
      const newUser = { nombreUsuario: "Juan", contraseña: "chicharrón" };
      usuarioDao.crearUsuario.mockResolvedValue(newUser);

      const response = await request(app).post("/api/usuarios").send(newUser);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(newUser);
    });

    it("should return un 400 si hay un error", async () => {
      usuarioDao.crearUsuario.mockRejectedValue(new Error("Error"));

      const response = await request(app)
        .post("/api/usuarios")
        .send({ nombre: "Juan", edad: 30 });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: "Error al crear el usuario",
        error: expect.any(Object),
      });
    });
  });

  describe("GET /api/usuarios", () => {
    it("should return todos los usuarios con un 200", async () => {
      const usuarios = [{ nombre: "Juan" }, { nombre: "Maria" }];
      usuarioDao.obtenerUsuarios.mockResolvedValue(usuarios);

      const response = await request(app).get("/api/usuarios");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(usuarios);
    });

    it("should return un 500 si hay un error", async () => {
      usuarioDao.obtenerUsuarios.mockRejectedValue(new Error("Error"));

      const response = await request(app).get("/api/usuarios");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        message: "Error al obtener los usuarios",
        error: expect.any(Object),
      });
    });
  });

  describe("GET /api/usuarios/:id", () => {
    it("should return un usuario por ID con un 200", async () => {
      const usuario = { id: "1", nombreUsuario: "Juan" };
      usuarioDao.obtenerUsuarioPorId.mockResolvedValue(usuario);

      const response = await request(app).get("/api/usuarios/1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(usuario);
    });

    it("should return un 404 si el usuario no se encuentra", async () => {
      usuarioDao.obtenerUsuarioPorId.mockResolvedValue(null);

      const response = await request(app).get("/api/usuarios/2");

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        message: "Usuario no encontrado",
      });
    });

    it("should return un 500 si hay un error", async () => {
      usuarioDao.obtenerUsuarioPorId.mockRejectedValue(new Error("Error"));

      const response = await request(app).get("/api/usuarios/1");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        message: "Error al obtener el usuario",
        error: expect.any(Object),
      });
    });
  });

  describe("PUT /api/usuarios/:id", () => {
    it("should return un usuario y devolver un 200", async () => {
      const usuarioActualizado = { id: "1", nombre: "Juan actualizado" };
      usuarioDao.actualizarUsuario.mockResolvedValue(usuarioActualizado);

      const response = await request(app)
        .put("/api/usuarios/1")
        .send({ nombre: "Juan actualizado" });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(usuarioActualizado);
    });

    it("should return un 404 si el usuario no se encuentra", async () => {
      usuarioDao.actualizarUsuario.mockResolvedValue(null);

      const response = await request(app)
        .put("/api/usuarios/2")
        .send({ nombre: "Juan" });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        message: "Usuario no encontrado",
      });
    });

    it("should return un 400 si hay un error", async () => {
      usuarioDao.actualizarUsuario.mockRejectedValue(new Error("Error"));

      const response = await request(app)
        .put("/api/usuarios/1")
        .send({ nombre: "Juan" });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: "Error al actualizar el usuario",
        error: expect.any(Object),
      });
    });
  });

  describe("DELETE /api/usuarios/:id", () => {
    it("should return un usuario y devolver un 200", async () => {
      usuarioDao.eliminarUsuario.mockResolvedValue(true);

      const response = await request(app).delete("/api/usuarios/1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: "Usuario eliminado con éxito",
      });
    });

    it("should return un 404 si el usuario no se encuentra", async () => {
      usuarioDao.eliminarUsuario.mockResolvedValue(null);

      const response = await request(app).delete("/api/usuarios/2");

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        message: "Usuario no encontrado",
      });
    });

    it("should return un 500 si hay un error", async () => {
      usuarioDao.eliminarUsuario.mockRejectedValue(new Error("Error"));

      const response = await request(app).delete("/api/usuarios/1");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        message: "Error al eliminar el usuario",
        error: expect.any(Object),
      });
    });
  });

  describe("GET /api/usuarios/nombre/:nombreUsuario", () => {
    it("should return un usuario por nombre con un 200", async () => {
      const usuario = { nombre: "Juan" };
      usuarioDao.obtenerUsuarioPorNombre.mockResolvedValue(usuario);

      const response = await request(app).get("/api/usuarios/nombre/Juan");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(usuario);
    });

    it("should return un 404 si el usuario no se encuentra", async () => {
      usuarioDao.obtenerUsuarioPorNombre.mockResolvedValue(null);

      const response = await request(app).get("/api/usuarios/nombre/Maria");

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        message: "Usuario no encontrado",
      });
    });

    it("should return un 500 si hay un error", async () => {
      usuarioDao.obtenerUsuarioPorNombre.mockRejectedValue(new Error("Error"));

      const response = await request(app).get("/api/usuarios/Juan");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        message: "Error al obtener el usuario",
        error: expect.any(Object),
      });
    });
  });
});
