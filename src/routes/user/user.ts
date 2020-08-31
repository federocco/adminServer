import * as express from 'express';
// import { Request, Response, NextFunction } from 'express';
import { loginUser } from '../../controller/user.controller';

const router = express.Router();

export type LoginPayload = {
  username: string;
  password: string;
  token?: string;
  timestamp?: number;
};

// export interface CustomRequestWithBody<T> extends Request {
//   body: T;
// }

// export function isUserLoginBody(body: LoginPayload): body is LoginPayload {
//   return (
//     typeof body.username !== 'undefined' && typeof body.password !== 'undefined'
//   );
// }

// export function bodyCheck<T>(isType: (body: T) => boolean) {
//   return function (
//     req: CustomRequestWithBody<T>,
//     _res: Response,
//     next: NextFunction,
//   ): void {
//     if (!req.body) {
//       const error = new Error('Missing body in request.');
//       next(error);
//     }
//     if (!isType(req.body)) {
//       const error = new Error('Body paramater is incorrect.');
//       next(error);
//     }
//     next();
//   };
// }

// router.get('/login', bodyCheck<LoginPayload>(isUserLoginBody), loginUser);
router.post('/login', loginUser);

export default router;
