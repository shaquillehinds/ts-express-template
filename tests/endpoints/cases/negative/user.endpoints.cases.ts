import request from "supertest";
import { version } from "../../session";
import { Express } from "express";
import { TestSessionObj, originalValues } from "../../session";

const userEndpointsTestCases = (app: Express, session: TestSessionObj) =>
  describe("Failure test /user endpoints", () => {
    test(
      "[POST:/user] should FAIL to create a new user",
      createNewUser(app, session)
    );
    test(
      "[POST:/user/login] should FAIL to login a user",
      loginUser(app, session)
    );
    test("[PUT:/user] should FAIL to update a user", updateUser(app, session));
    test("[GET:/user] should FAIL to get a user", getUser(app, session));
    test(
      "[DELETE:/user] should FAIL to delete a user",
      deleteUser(app, session)
    );
  });

const createNewUser = (app: Express, session: TestSessionObj) => async () => {
  const failedReq = await request(app)
    .post("/user")
    .set("version", version)
    .send({
      firstName: originalValues.firstName,
      lastName: originalValues.lastName,
      // email: originalValues.email,
      password: originalValues.password,
    });

  const failedReq2 = await request(app)
    .post("/user")
    .set("version", version)
    .field({
      firstName: originalValues.firstName,
      lastName: originalValues.lastName,
      email: originalValues.email,
      password: originalValues.password,
    })
    .attach("image", "./public/images/profile_pic.jpeg");

  const { body } = await request(app)
    .post("/user")
    .set("version", version)
    .field({
      firstName: originalValues.firstName,
      lastName: originalValues.lastName,
      email: originalValues.email,
      password: originalValues.password,
    })
    .attach("image", "./public/images/profile_pic.jpeg");

  session.user = { ...body.user, token: body.token };

  expect(failedReq.statusCode).toBe(400);
  expect(failedReq.body.field).toBe("email");
  expect(failedReq.clientError).toBeTruthy();
};

const loginUser = (app: Express, session: TestSessionObj) => async () => {
  const response = await request(app)
    .post("/user/login")
    .set("version", version)
    .send({ email: session.user?.email, password: "password" });
  expect(response.statusCode).toBe(400);
  expect(response.clientError).toBeTruthy();
};

const updateUser = (app: Express, session: TestSessionObj) => async () => {
  const response = await request(app)
    .put(`/user`)
    .set("version", version)
    .set("Authorization", `Bearer ${session.user?.token}`)
    .field({
      firstName: "Jane",
    });
  expect(response.statusCode).toBe(400);
  expect(response.clientError).toBeTruthy();
};

const getUser = (app: Express, session: TestSessionObj) => async () => {
  const res = await request(app).get(`/user`).set("version", version).send();
  expect(res.status).toBe(401);
  expect(res.clientError).toBeTruthy();
};

const deleteUser = (app: Express, session: TestSessionObj) => async () => {
  const res = await request(app).delete(`/user`).set("version", version);
  expect(res.status).toBe(401);
  expect(res.clientError).toBeTruthy();
};

export default userEndpointsTestCases;
