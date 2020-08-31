import * as crypto from 'crypto';
import { Response, Request } from 'express';
import * as jwt from 'jsonwebtoken';

import { User } from '../database/models/user.model';
import { generateAccessToken } from '../middleware/accessToken/accessToken';
import { LoginPayload } from '../routes/user/user';

export const loginUser = async (
  req: Request<Record<string, string>, unknown, LoginPayload>,
  res: Response,
): Promise<Response> => {
  try {
    const { username, password, token: sourceToken } = req.body;

    if (sourceToken && sourceToken.length > 0) {
      jwt.verify(
        sourceToken,
        process.env.JWT_TOKEN_SECRET as string,
        (err): Response => {
          if (err) {
            console.log('JWT Token is invalid or expired');
            return res.sendStatus(403); // if the token is expired or it is not valid
          }
          const decodedToken = jwt.decode(sourceToken);
          console.log(decodedToken);

          const updatedToken = generateAccessToken({
            id: decodedToken.id,
            username: decodedToken.username,
            email: decodedToken.email,
            companyId: decodedToken.companyId,
            type: decodedToken.type,
          });

          res.status(200).json({ result: updatedToken, error: null });
        },
      );
    } else {
      const users = await User.findAll({
        where: {
          nome: username,
          pass: crypto.createHash('md5').update(password).digest('hex'),
        },
      });

      if (!users || users.length > 1 || users.length === 0) {
        res.status(200).json({ result: null, error: 'User not found' });
        return;
      }

      const user = users[0];

      await User.update(
        { lastNormalLogin: new Date() },
        { where: { idutente: user.idutente } },
      );

      const token = generateAccessToken({
        id: user.idutente,
        username: user.nome,
        email: user.email_user,
        companyId: user.idazien,
        type: user.type_user,
      });

      res.status(200).json({ result: token, error: null });
    }
  } catch (e) {
    res.status(500).send({ errorMessage: e.message, errors: e.errors });
  }
};
