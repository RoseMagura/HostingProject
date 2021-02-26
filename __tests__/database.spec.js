const database = require('../catAPI/dist/initDB');

test('test getting images from database', async (done) => {
    const response = await database.testQuery(
        'SELECT * FROM IMAGES;',
        'postgres',
        'localhost',
        'cattest',
        'superuser',
        5432
    );
    expect(response.rows).toBeDefined();
    expect(response.rows.length).toBeGreaterThan(0);
    response.rows.forEach((element) => {
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
