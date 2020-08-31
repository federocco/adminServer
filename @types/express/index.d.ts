// https://stackoverflow.com/questions/57132428/augmentations-for-the-global-scope-can-only-be-directly-nested-in-external-modul
export {};

// eslint-disable-next-line
import { AccessToken } from '../../src/middleware/accessToken/typings';

declare global {
  namespace Express {
    interface Request {
      userToken: AccessToken;
    }
  }
}
