import { Knex } from 'knex';
import UserDao from './UserDao';
import jsonWebToken from 'jsonwebtoken';
import knex from '../../base/database/knex';
import { StatusCode } from '../../shared/enums/Enum';
import Utilities from '../../base/utilities/Utilities';
import AppConfigs from '../../base/configs/AppConfigs';
import { MiddlewareType } from '../../shared/types/type';
import { Request, Response, NextFunction } from 'express';

const { SUCCESS, BAD_REQUEST } = StatusCode;
const { generateHash, Message, compareHash } = Utilities;

class UserController {
  static registerUser: MiddlewareType = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;
    try {
      await knex.transaction(async (trx: Knex.Transaction) => {
        const user = await new UserDao().getUserByEmail(trx, email);
        if(user) {
          res.status(BAD_REQUEST).json(Message("User with this email already exists"));
          return;
        }
        await new UserDao().addUser(trx, {
          email: email,
          password: await generateHash(password),
        });
        const userByEmail = await new UserDao().getUserByEmail(trx, email);
        res.status(SUCCESS).json({
          user: userByEmail,
        });
        return;
      });
    } catch(e) {
      next(e);
    }
  }

  static login: MiddlewareType = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;
    try {
      await knex.transaction(async (trx: Knex.Transaction) => {
        const user = await new UserDao().getUserByEmail(trx, email);
        if(user && (await compareHash(password, user.password))) {
          const token = jsonWebToken.sign({
            id: user.id,
            email: user.email,
          }, AppConfigs.jsonWebToken.secret(), { expiresIn: "1h" });
          await new UserDao().updateUserById(trx, {
            jwt: token,
          }, user.id);
          res.status(SUCCESS).json({
            jwt: token,
          });
          return;
        } else {
          res.status(BAD_REQUEST).json(Message("Incorrect Email or Password"));
          return;
        }
      });
    } catch(e) {
      next(e);
    }
  }

  static getUser: MiddlewareType = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.status(SUCCESS).json({
        user: {
          id: req.body.user.id,
          email: req.body.user.email,
        },
      });
      return;
    } catch(e) {
      next(e);
    }
  }
}

export default UserController;
