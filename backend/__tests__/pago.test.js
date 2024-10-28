const request = require("supertest");
const mongoose = require("mongoose");
const { app, server } = require("../app");
const pagoController = require("../controllers/pagoController");

jest.mock("../controllers/pagoController");

describe("Pago Routes", () => {
  afterAll(() => {
    mongoose.connection.close();
    server.close();
  });

  it("should get all pagos", async () => {
    pagoController.obtenerPagos.mockImplementation((req, res) =>
      res.status(200).send([{ id: 1, montoTotal: 100 }])
    );

    const response = await request(app).get("/api/pagos");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ id: 1, montoTotal: 100 }]);
  });

  it("should get a pago by id", async () => {
    pagoController.obtenerPagoPorId.mockImplementation((req, res) =>
      res.status(200).send({ id: 1, montoTotal: 100 })
    );

    const response = await request(app).get("/api/pagos/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 1, montoTotal: 100 });
  });

  it("should create a new pago", async () => {
    pagoController.crearPago.mockImplementation((req, res) =>
      res.status(201).send({ id: 2, montoTotal: 200 })
    );

    const response = await request(app)
      .post("/api/pagos")
      .send({ montoTotal: 200, metodoPago: "tarjeta" });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ id: 2, montoTotal: 200 });
  });

  it("should update a pago by id", async () => {
    pagoController.actualizarPago.mockImplementation((req, res) =>
      res.status(200).send({ id: 1, montoTotal: 150 })
    );

    const response = await request(app)
      .put("/api/pagos/1")
      .send({ montoTotal: 150 });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 1, montoTotal: 150 });
  });

  it("should delete a pago by id", async () => {
    pagoController.eliminarPago.mockImplementation((req, res) =>
      res.status(200).send({ message: "Pago eliminado con éxito" })
    );

    const response = await request(app).delete("/api/pagos/1");

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Pago eliminado con éxito");
  });
});
