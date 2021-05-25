import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response, RequestHandler } from 'express';

interface IRequest extends Request {
  userId?: string;
}

export const verifyToken = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers['x-access-token'] as string | undefined;

  if (!token)
    return res.status(403).send({
      auth: false,
      message: 'No token provided.'
    });
  jwt.verify(
    token,
    process.env.APP_SECRET as string,
    function (err: any, decoded: any) {
      if (err)
        return res.status(500).send({
          auth: false,
          message: 'Failed to authenticate token.'
        });

      // if everything good, save to request for use in other routes
      req.userId = decoded.id;
      next();
    }
  );
};
