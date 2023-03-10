import {
  auth0Middleware,
  auth0GenerateSecret,
} from './../middleware/auth0Middleware';
import { CommonRoutesConfig } from './common.routes.config';
import express from 'express';
import UserContollerAPI from '../controller/user.contoller';
import multer from 'multer';


export class ApiRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'ApiRoutes');
  }

  configureRoutes() {
    this.app
      .route(`/api`)
      .get((req: express.Request, res: express.Response) => {
        res.status(200).send({ message: 'Hello World!' });
      });
    this.app
      .route(`/api/ping`)
      .get((req: express.Request, res: express.Response) => {
        res.status(200).send({ message: 'pong' });
      });
    this.app
      .route(`/api/version`)
      .get((req: express.Request, res: express.Response) => {
        res.status(200).send({ version: '1.0.0' });
      });
    this.app
      .route(`/api/login`)
      .post(multer().none(), (req: express.Request, res: express.Response) => {
        const request = JSON.parse(JSON.stringify(req.body));
        new UserContollerAPI()
          .getUserByUsername(request.username)
          .then((user) => {
            if (user.length === 0) {
              res.status(401).send({ message: 'Unauthorized' });
            } else {
              if (user[0].password === request.password) {
                res.status(200).send({
                  message: 'Authorized',
                  token: auth0GenerateSecret('1h'),
                });
              } else {
                res.status(401).send({ message: 'Unauthorized' });
              }
            }
          });
      });
    this.app
      .route('/api/users')
      .get(auth0Middleware, (req: express.Request, res: express.Response) => {
        new UserContollerAPI().getUsers().then((users: object) => {
          res.status(200).send({ users: users });
        });
      });

    this.app
      .route('/api/user/:id')
      .get(auth0Middleware, (req: express.Request, res: express.Response) => {
        new UserContollerAPI()
          .getUserById(Number(req.params.id))
          .then((user: object) => {
            res.status(200).send({ user: user });
          });
      });

    return this.app;
  }
}
