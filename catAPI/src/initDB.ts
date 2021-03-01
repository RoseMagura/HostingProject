import * as pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: Number(process.env.PGPORT),
});

export const query = (statement: string): any => {
    try {
        const result = pool.query(statement);
        // pool.end();
        return result;
    } catch (error: unknown) {
        console.log(error);
    }
};

export const testQuery = (statement: string, user: string, host: string, database: string, password: string, port: number): any => {
    const testPool = new Pool({
        user,
        host,
        database,
        password,
        port,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
    });
    try {
        const result = testPool.query(statement);
        testPool.end();
        return result;
    } catch (error: unknown) {
        console.log(error);
    }
};

export const setUp = async(): Promise<void> => {
    const images = [
        ['Smoothie', 'https://www.usmagazine.com/wp-content/uploads/2018/06/Smoothie-the-Cat-Instagram-zoom.jpg?quality=86&strip=all'],
        ['Together', 'https://i.pinimg.com/originals/7d/b7/e7/7db7e7414842d89ca7741009b10cc376.jpg'],
        ['Close Up', 'https://welovecatsandkittens.com/wp-content/uploads/2017/09/smoothie.jpg'],
        ['Loaves', 'https://i.redd.it/z9hb84g2yxvz.jpg'],
        ['Bingus', 'https://pbs.twimg.com/media/EoXHx4cUwAAf8Wx.jpg']
    ];

    const currImages = await query('SELECT * FROM IMAGES');
    if(currImages.rowCount === 0) {
        console.log('Setting up DB');
        images.forEach(async(item) => {
            try {
                const res = await query(`INSERT INTO IMAGES (title, url) VALUES('${item[0]}', '${item[1]}');`);
                console.log(res);
            } catch (error) {
                console.error(error)   
            }
        });
    } else {
        console.log('DB already set up.');
    }
}