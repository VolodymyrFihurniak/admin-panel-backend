import express, { Express } from 'express';
import { CommonRoutesConfig } from './routes/common.routes.config';
import dotenv from 'dotenv';
import { ApiRoutes } from './routes/api.routes.config';
import bodyParser from 'body-parser';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const routes: CommonRoutesConfig[] = [];

app.use(express.json());
app.use(express.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));
routes.push(new ApiRoutes(app));

app.listen(port, () => {
  routes.forEach((route: CommonRoutesConfig) => {
    console.log(`⚡️[server]: Routes configured for ${route.getName()}`);
  });
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  console.log(`⚡️[server]: Press CTRL-C to stop`);
});
