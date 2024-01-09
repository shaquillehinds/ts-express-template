import request from "supertest";
import { version } from "../../session";
import { Express } from "express";
import { TestSessionObj, originalValues } from "../../session";

const userEndpointsTestCases = (app: Express, session: TestSessionObj) =>
  describe("Test /user endpoints", () => {
    test("[POST:/user] should create a new user", createNewUser(app, session));
    test("[POST:/user/login] should login a user", loginUser(app, session));
    test("[PUT:/user] should update a user", updateUser(app, session));
    test("[GET:/user] should get a user", getUser(app, session));
    test("[DELETE:/user] should delete a user", deleteUser(app, session));
  });

const createNewUser = (app: Express, session: TestSessionObj) => async () => {
  const { body, statusCode } = await request(app)
    .post("/user")
    .set("version", version)
    .send({
      firstName: originalValues.firstName,
      lastName: originalValues.lastName,
      email: originalValues.email,
      password: originalValues.password,
    });

  const { body: body2 } = await request(app)
    .post("/user")
    .set("version", version)
    .send({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe2@example.com",
      password: "password123",
    });
  session.user = { ...body.user, token: body.token };
  session.user2 = { ...body2.user, token: body2.token };

  expect(statusCode).toBe(201);
  expect(session.user?.firstName).toEqual("John");
  expect(session.user?.lastName).toEqual("Doe");
  expect(session.user?.email).toEqual("john.doe@example.com");
  expect(body).toHaveProperty("token");
};

const loginUser = (app: Express, session: TestSessionObj) => async () => {
  const response = await request(app)
    .post("/user/login")
    .set("version", version)
    .send({ email: session.user?.email, password: "password123" });

  expect(response.statusCode).toBe(200);
  expect(response.body.user.email).toEqual(session.user?.email);
  expect(response.body).toHaveProperty("token");
};

const updateUser = (app: Express, session: TestSessionObj) => async () => {
  const response = await request(app)
    .put(`/user`)
    .set("version", version)
    .set("Authorization", `Bearer ${session.user?.token}`)
    .send({
      firstName: "Jane",
    });
  expect(response.statusCode).toBe(200);
  expect(response.body.firstName).toEqual("Jane");
};

const getUser = (app: Express, session: TestSessionObj) => async () => {
  const { body, status } = await request(app)
    .get(`/user`)
    .set("version", version)
    .set("Authorization", `Bearer ${session.user?.token}`)
    .send();
  expect(status).toBe(200);
  expect(body.firstName).toEqual("Jane");
};

const deleteUser = (app: Express, session: TestSessionObj) => async () => {
  const response = await request(app)
    .delete(`/user`)
    .set("version", version)
    .set("Authorization", `Bearer ${session.user2?.token}`);
  expect(response.statusCode).toBe(200);
};

export default userEndpointsTestCases;
