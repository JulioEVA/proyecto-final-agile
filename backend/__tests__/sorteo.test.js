const request = require("supertest");
const mongoose = require("mongoose");
const { app, server } = require("../app");
const sorteoController = require("../controllers/sorteoController");

jest.mock("../controllers/sorteoController");

describe("Sorteo Routes", () => {
  afterAll(() => {
    mongoose.connection.close();
    server.close();
  });

  it("should create a new sorteo", async () => {
    sorteoController.crearSorteo.mockImplementation((req, res) =>
      res.status(201).send({ message: "Sorteo created" })
    );

    const response = await request(app)
      .post("/api/sorteos")
      .send({ name: "Test Sorteo" });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Sorteo created");
  });

  it("should get all sorteos", async () => {
    sorteoController.obtenerSorteos.mockImplementation((req, res) =>
      res.status(200).send([{ id: 1, name: "Test Sorteo" }])
    );

    const response = await request(app).get("/api/sorteos");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ id: 1, name: "Test Sorteo" }]);
  });

  it("should get a sorteo by id", async () => {
    sorteoController.obtenerSorteoPorId.mockImplementation((req, res) =>
      res.status(200).send({ id: 1, name: "Test Sorteo" })
    );

    const response = await request(app).get("/api/sorteos/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 1, name: "Test Sorteo" });
  });

  it("should update a sorteo by id", async () => {
    sorteoController.actualizarSorteo.mockImplementation((req, res) =>
      res.status(200).send({ message: "Sorteo updated" })
    );

    const response = await request(app)
      .put("/api/sorteos/1")
      .send({ name: "Updated Sorteo" });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Sorteo updated");
  });

  it("should delete a sorteo by id", async () => {
    sorteoController.eliminarSorteo.mockImplementation((req, res) =>
      res.status(200).send({ message: "Sorteo deleted" })
    );

    const response = await request(app).delete("/api/sorteos/1");

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Sorteo deleted");
  });
});
