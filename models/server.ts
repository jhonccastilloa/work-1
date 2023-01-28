import express, { Application } from 'express';
import cors from 'cors';
import db from '../database/db';
import userRouter from '../routes/users.routes';

class Server {
  private app: Application;
  private PORT = process.env.PORT || '4003';
  private path = {
    users: '/api/v1/users',
    repairs: '/api/v1/repairs',
  };
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes()
    this.database();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }
  routes() {
    this.app.use(this.path.users, userRouter);
  }
  database() {
    db.authenticate()
      .then(() => console.log('Database authenticate'))
      .catch(err => console.log(err));
    db.sync()
      .then(() => console.log('Database sincronizate'))
      .catch(err => console.log(err));
  }
  listen() {
    this.app.listen(this.PORT, () => {
      console.log('server is running on port', this.PORT);
    });
  }
}

export default Server;
