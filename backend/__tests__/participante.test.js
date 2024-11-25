const request = require("supertest");
const mongoose = require("mongoose");
const { app, server } = require("../appTest");
const participanteController = require("../controllers/participanteController");

jest.mock("../controllers/participanteController");

describe("Participante Routes", () => {
  afterAll(() => {
    mongoose.connection.close();
    server.close();
  });

  it("should get all participantes", async () => {
    participanteController.obtenerParticipantes.mockImplementation((req, res) =>
      res.status(200).send([{ id: 1, name: "John Doe" }])
    );

    const response = await request(app).get("/api/participantes");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ id: 1, name: "John Doe" }]);
  });

  it("should get a participante by id", async () => {
    participanteController.obtenerParticipantePorId.mockImplementation(
      (req, res) => res.status(200).send({ id: 1, name: "John Doe" })
    );

    const response = await request(app).get("/api/participantes/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 1, name: "John Doe" });
  });

  it("should create a new participante", async () => {
    participanteController.crearParticipante.mockImplementation((req, res) =>
      res.status(201).send({ id: 2, name: "Jane Doe" })
    );

    const response = await request(app)
      .post("/api/participantes")
      .send({ name: "Jane Doe" });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ id: 2, name: "Jane Doe" });
  });

  it("should update a participante by id", async () => {
    participanteController.actualizarParticipante.mockImplementation(
      (req, res) => res.status(200).send({ id: 1, name: "John Smith" })
    );

    const response = await request(app)
      .put("/api/participantes/1")
      .send({ name: "John Smith" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 1, name: "John Smith" });
  });

  it("should delete a participante by id", async () => {
    participanteController.eliminarParticipante.mockImplementation((req, res) =>
      res.status(200).send({ message: "Participante deleted" })
    );

    const response = await request(app).delete("/api/participantes/1");

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Participante deleted");
  });
});
