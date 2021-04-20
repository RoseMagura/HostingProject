import app from "../app";
import * as supertest from "supertest";
import { expect, it } from "@jest/globals";

const request = supertest(app);

it("Gets the base endpoint", async (done: any) => {
  const res = await request.get("/");
  expect(res.status).toEqual(200);
  // JSON.stringify adds extra quotations
  expect(res.text).toEqual('"Send a request to the backend"');
  done();
});

// TODO: Test login

// TODO: Test 404 for random endpoint
