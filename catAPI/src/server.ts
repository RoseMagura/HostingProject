import app from "./app";
import { createRelationships } from "./initDB";

const port = process.env.PORT || 3000;
const host = '0.0.0.0';

app.listen(Number(port), host, (): void => {
  console.log(`App listening at http://${host}:${port}`);
  createRelationships();
});
