import * as pg from "pg";
import { expect, test, afterAll, jest } from "@jest/globals";

const { Pool } = pg;

require("dotenv").config();

interface imageObject {
  id: number;
  title: string;
  url: string;
}

const connectionString = String(process.env.TEST_DATABASE_URL);

const testPool = new Pool({ connectionString });

// test getting all
test("test getting images from database", async (done: any) => {
  try {
    testPool.connect((err, client, release) => {
      if (err) {
        console.error("Error acquiring client", err.stack);
        console.log(process.env.TEST_DATABASE_URL);
        // done.fail(`Error`);
        throw new Error("Error acquiring client");
      }

      client.query("SELECT * FROM images", (err, response) => {
        release();
        if (err) {
          return console.error("Error executing query", err.stack);
        }
        expect(response.rows).toBeDefined();
        expect(response.rows.length).toBeGreaterThan(0);
        response.rows.forEach((element: imageObject) => {
          expect(element.id).toBeDefined();
          expect(typeof element.id).toBe("number");
          expect(element.title).toBeDefined();
          expect(typeof element.title).toBe("string");
          expect(element.url).toBeDefined();
          expect(typeof element.url).toBe("string");
        });
      });
    });
    done();
  } catch (error: unknown) {
    console.error("error", error);
  }
});

// test getting by id
test("test getting image by id from database", async (done: any) => {
  // get all images first
  testPool.connect(async (err, client, release) => {
    if (err) {
      console.error("Error acquiring client", err.stack);
      return err;
    }
    const all = await client.query("SELECT * FROM images;");
    /* then, pick the first one's id (instead of using hard coded
        number for id),
        so even if the ids change,
        the test will still pass */
    const id = all.rows[0].id;
    const response = await client.query(`SELECT * FROM images WHERE ID=${id};`);
    expect(response.rows).toBeDefined();
    expect(response.rows.length).toBeGreaterThan(0);
    response.rows.forEach((element: imageObject) => {
      expect(element.id).toBeDefined();
      expect(typeof element.id).toBe("number");
      expect(element.title).toBeDefined();
      expect(typeof element.title).toBe("string");
      expect(element.url).toBeDefined();
      expect(typeof element.url).toBe("string");
    });
    release();
    done();
  });
});

afterAll(() => {
  testPool.end();
});
