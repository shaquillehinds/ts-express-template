import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../src/app";
const server = app.listen(8080, () => console.log("Testing on PORT 8080"));
import User from "../src/models/user";
let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.connection.close();
  mongoServer.stop();
  server.close();
});

afterAll((done) => done());

describe("Test the users endpoints", () => {
  test("It should create a new user", async () => {
    const response = await request(app).post("/users").send({
      name: "John Doe",
      email: "john.doe1@example.com",
      password: "password123",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.user.name).toEqual("John Doe");
    expect(response.body.user.email).toEqual("john.doe1@example.com");
    expect(response.body).toHaveProperty("token");
  });

  test("It should login a user", async () => {
    const user = new User({
      name: "John Doe",
      email: "john.doe2@example.com",
      password: "password123",
    });
    await user.save();

    const response = await request(app)
      .post("/users/login")
      .send({ email: "john.doe2@example.com", password: "password123" });

    expect(response.statusCode).toBe(200);
    expect(response.body.user.name).toEqual("John Doe");
    expect(response.body.user.email).toEqual("john.doe2@example.com");
    expect(response.body).toHaveProperty("token");
  });

  test("It should update a user", async () => {
    const user = new User({
      name: "John Doe",
      email: "john.doe3@example.com",
      password: "password123",
    });
    await user.save();
    const token = await user.generateAuthToken();

    const response = await request(app)
      .put(`/users/${user._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Jane Doe" });

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toEqual("Jane Doe");
  });

  test("It should delete a user", async () => {
    const user = new User({
      name: "John Doe",
      email: "john.doe4@example.com",
      password: "password123",
    });
    await user.save();
    const token = await user.generateAuthToken();

    const response = await request(app)
      .delete(`/users/${user._id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(204);
  });
});
