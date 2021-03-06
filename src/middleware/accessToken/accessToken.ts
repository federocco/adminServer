import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

import { AccessTokenRequest, AccessToken } from './typings';

const expiresIn = '10m';

export const generateAccessToken = (payload: AccessTokenRequest): string => {
  return jwt.sign(
    {
      ...payload,
      apiEndpoint: `${process.env.HTTP_HOST}:${process.env.HTTP_PORT}`,
    },
    process.env.JWT_TOKEN_SECRET,
    {
      expiresIn,
    },
  );
};

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
): Response => {
  // Gather the jwt access token from the request header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    console.log('JWT Token is null');
    return res.sendStatus(401); // if there isn't any token
  }

  jwt.verify(
    token,
    process.env.JWT_TOKEN_SECRET as string,
    // (err, payload): Response => {
    (err, decoded: AccessToken): Response => {
      if (err) {
        console.log('JWT Token is invalid or expired');
        return res.status(401).send({ error: 'pippo' }); // 401 Unauthorized: if the token is expired or it is not valid
      }

      // req.user = payload;
      req.userToken = decoded;

      next();
    },
  );
};
