import { testQuery } from '../catAPI/src/initDB';
import * as dotenv from 'dotenv';

dotenv.config();

interface imageObject {
    id: number;
    title: string;
    url: string;
}

// test getting all
test('test getting images from database', async (done) => {
    const response = await testQuery(
        'SELECT * FROM IMAGES;',
        process.env.PGUSER,
        process.env.PGHOST,
        process.env.PGDATABASE,
        process.env.PGPASSWORD,
        Number(process.env.PGPORT)
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
    done();
});

// test getting by id
test('test getting image by id from database', async (done) => {
    // get all images first
    const all = await testQuery(
        'SELECT * FROM IMAGES;',
        process.env.PGUSER,
        process.env.PGHOST,
        process.env.PGDATABASE,
        process.env.PGPASSWORD,
        Number(process.env.PGPORT)
    );
    // then, pick the first one's id (instead of using hard coded
    // number for id)
    // so even if the ids change,
    // the test will still pass
    const id = all.rows[0].id;
    const response = await testQuery(
        `SELECT * FROM IMAGES WHERE ID=${id};`,
        process.env.PGUSER,
        process.env.PGHOST,
        process.env.PGDATABASE,
        process.env.PGPASSWORD,
        Number(process.env.PGPORT)
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
    done();
});
