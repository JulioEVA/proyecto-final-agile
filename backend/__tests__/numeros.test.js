const request = require("supertest");
const mongoose = require("mongoose");
const { app, server } = require("../app.test");
const numeroController = require("../controllers/numeroController");

jest.mock("../controllers/numeroController");

describe("Numero Routes", () => {
  afterAll(() => {
    mongoose.connection.close();
    server.close();
  });

  it("should create a new numero", async () => {
    numeroController.crearNumero.mockImplementation((req, res) =>
      res.status(201).send({ id: 1, numero: 123 })
    );

    const response = await request(app)
      .post("/api/numeros")
      .send({ numero: 123 });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ id: 1, numero: 123 });
  });

  it("should get numeros by sorteoId", async () => {
    numeroController.obtenerNumerosPorSorteo.mockImplementation((req, res) =>
      res.status(200).send([{ id: 1, numero: 123 }])
    );

    const response = await request(app).get("/api/numeros/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ id: 1, numero: 123 }]);
  });

  it("should update a numero by id", async () => {
    numeroController.actualizarNumero.mockImplementation((req, res) =>
      res.status(200).send({ id: 1, numero: 456 })
    );

    const response = await request(app)
      .put("/api/numeros/1")
      .send({ numero: 456 });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 1, numero: 456 });
  });

  it("should delete a numero by id", async () => {
    numeroController.eliminarNumero.mockImplementation((req, res) =>
      res.status(200).send({ message: "Número eliminado con éxito" })
    );

    const response = await request(app).delete("/api/numeros/1");

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Número eliminado con éxito");
  });
});
