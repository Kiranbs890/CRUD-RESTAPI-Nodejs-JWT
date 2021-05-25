import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import UserModel from '../models/users';

interface IRequest extends Request {
  body: {
    password: string;
    username: string;
  };
}

export default class User {
  userM = UserModel;

  constructor() {
    this.userM = UserModel;
  }

  async register(req: IRequest, res: Response) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      let data = await UserModel.create({
        username: req.body.username,
        password: hashedPassword
      });
      const token = jwt.sign(
        {
          id: data.id
        },
        process.env.APP_SECRET as string,
        {
          expiresIn: 86400 // expires in 24 hours
        }
      );
      return res.json({
        status: 'ok',
        data: {
          auth: true,
          token: token
        }
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        data: error
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      let data = await UserModel.findOne({
        where: {
          username: req.body.username
        }
      });
      if (!data) return res.status(404).send('No user found.');
      const passwordIsValid = await bcrypt.compare(
        req.body?.password,
        data.password
      );
      if (!passwordIsValid)
        return res.status(401).send({
          auth: false,
          token: null
        });

      var token = jwt.sign(
        {
          id: data.id
        },
        process.env.APP_SECRET as string,
        {
          expiresIn: 8640 // expires in 24 hours
        }
      );
      return res.json({
        status: 'ok',
        data: {
          auth: true,
          token: token
        }
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        data: error
      });
    }
  }
}
