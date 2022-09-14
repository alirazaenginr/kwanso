import jsonWebToken from 'jsonwebtoken';
import { MiddlewareType  } from "../types/type";
import { StatusCode } from '../../shared/enums/Enum';
import Utilities from "../../base/utilities/Utilities";
import AppConfigs from "../../base/configs/AppConfigs";
import { Request, Response, NextFunction } from "express";

const { SUCCESS, BAD_REQUEST, FORBIDDEN, UNAUTHORIZED, NOT_FOUND } = StatusCode;
const { 
  Message, 
  ErrorMessage,
  isValidEmail, 
  isObjectEmpty, 
  isDevelopment,
  checkObjectKeys, 
} = Utilities;

class Middleware {
  static isAuth: MiddlewareType = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tokenHeader = req.header("Authorization");
      const token = tokenHeader && tokenHeader.split(' ')[1];
      if(token == null) {
        res.status(UNAUTHORIZED).json(Message("Invalid Token"));
        return;
      }
      jsonWebToken.verify(token, AppConfigs.jsonWebToken.secret(), (err, user) => {
        if(err) res.status(UNAUTHORIZED).json(Message("Invalid Token"));
        req.body.user = user;
        next();
      });
      return;
    } catch (e) {
      res.status(BAD_REQUEST).json(Message("Invalid Token"));
      return;
    }
  }

  static errorHandler = async (error: Error, req: Request, res: Response, next: NextFunction): Promise<void> => {
    if(error) {
      res.status(BAD_REQUEST).json(ErrorMessage(error.message));
      return;
    } 
    next();
  } 

  static NotFound: MiddlewareType = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.status(NOT_FOUND).send(`Not Found`);
    return;
  };

  static checkRequestBodyKeys = (arr: string[]): MiddlewareType => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      if(await checkObjectKeys(req.body, arr)) {
        next();
      } else {
        res.status(BAD_REQUEST).json(Message(
          isDevelopment() 
          ? `Please Provide all these (${arr.toString()}) Parameters` 
          : `Invalid Body Parameters`
        ));
        return;
      } 
    }
  }

  static validateBody: MiddlewareType = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (isObjectEmpty(req.body)) {
      res.status(BAD_REQUEST).json(Message("Body Should Not Be Empty"));
      return;
    } else {
      next();
    }
  }

  static isValidEmail: MiddlewareType = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (req.body.email && isValidEmail(req.body.email)) {
      req.body.email = req.body.email.toLowerCase().trim();
      next();
    } else {
      res.status(BAD_REQUEST).json(Message("Invalid Email"));
      return;
    }
  }
}

export default Middleware;
