import * as express from 'express';
import { createScaledImagePath } from './utils';
import routes from './routes'

const app: express.Application = express();
const port: number = 8000;

app.use(routes);
app.listen(port, async (): Promise<void> => {
  await createScaledImagePath();

  const url: string = `http://localhost:${port}`;
  console.log(`Server running on port ${port}.\n URL: ${url}`);
});

export default app;