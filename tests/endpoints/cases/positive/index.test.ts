import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import session from "../../session";
import app from "../../../../src/app";
const server = app.listen(8080, () => console.log("Testing on PORT 8080"));
import userEndpointsTestCases from "./user.endpoints.cases";

let mongoServer: MongoMemoryServer;

jest.setTimeout(20000);

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.connection.close();
  mongoServer.stop();
  server.close();
});

describe(`
-------------------
Positive test cases
-------------------
`, () => {
  userEndpointsTestCases(app, session);
});
