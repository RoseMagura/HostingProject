import app from "./app";
import { createRelationships } from "./initDB";

const port = process.env.PORT || 3000;

app.listen(port, (): void => {
    createRelationships();
    console.log(`App listening at http://localhost:${port}`);
});

