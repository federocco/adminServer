// eslint-disable-next-line
import { IUser } from '../../src/database/models/user.model';

declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}
