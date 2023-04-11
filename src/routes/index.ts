import * as express from 'express';
import imagesRoutes from './images';

const routes: express.Router = express.Router();

routes.use('/api/images', imagesRoutes);

routes.get(
  '/',
  (response: express.Response): void => {
    response.send(
      'Hello World'
    );
  }
);

export default routes;