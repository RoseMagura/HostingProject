import * as dotenv from 'dotenv';
import * as pg from 'pg';

const { Pool } = pg;

dotenv.config();

interface imageObject {
    id: number;
    title: string;
    url: string;
}

const connectionString = process.env.CONNECTION_STRING;
const testPool = new Pool({
  connectionString,
});

// test getting all
test('test getting images from database', async (done) => {
    testPool.connect((err, client, release) => {
        if (err) {
            return console.error('Error acquiring client', err.stack);
        }

        client.query('SELECT * FROM IMAGES', (err, response) => {
            release();
            if (err) {
                return console.error('Error executing query', err.stack);
            }
            expect(response.rows).toBeDefined();
            expect(response.rows.length).toBeGreaterThan(0);
            response.rows.forEach((element: imageObject) => {
                expect(element.id).toBeDefined();
                expect(typeof element.id).toBe('number');
                expect(element.title).toBeDefined();
                expect(typeof element.title).toBe('string');
                expect(element.url).toBeDefined();
                expect(typeof element.url).toBe('string');
            });
        });
    });
    done();
});

// test getting by id
test('test getting image by id from database', async (done) => {
    // get all images first
    testPool.connect(async (err, client, release) => {
        if (err) {
            return console.error('Error acquiring client', err.stack);
        }
        const all = await client.query('SELECT * FROM IMAGES;');
        /* then, pick the first one's id (instead of using hard coded
        number for id),
        so even if the ids change,
        the test will still pass */
        const id = all.rows[0].id;
        const response = await client.query(
            `SELECT * FROM IMAGES WHERE ID=${id};`
        );
        expect(response.rows).toBeDefined();
        expect(response.rows.length).toBeGreaterThan(0);
        response.rows.forEach((element: imageObject) => {
            expect(element.id).toBeDefined();
            expect(typeof element.id).toBe('number');
            expect(element.title).toBeDefined();
            expect(typeof element.title).toBe('string');
            expect(element.url).toBeDefined();
            expect(typeof element.url).toBe('string');
        });
        release();
        done();
    });
});

afterAll(() => {
    testPool.end();
});
