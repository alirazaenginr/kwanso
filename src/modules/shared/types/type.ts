import { Request, Response, NextFunction } from 'express';

//Middleware Type
export type MiddlewareType = (req: Request, res: Response, next: NextFunction) => void;

//Response Message
export type MessageType = { 
  message: string,
  [k: string]: string | number | undefined,
};

//Response Error
export type ErrorType = { 
  error: string, 
};