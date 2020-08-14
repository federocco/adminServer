import * as crypto from 'crypto';
import { Request, Response } from 'express';

import { User } from '../database/models/user.model';
import { generateAccessToken } from '../middleware/accessToken/accessToken';

export const loginUser = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const pass = crypto
      .createHash('md5')
      .update(req.body.password)
      .digest('hex');

    const users = await User.findAll({
      where: {
        nome: req.body.username,
        pass,
      },
    });

    if (!users || users.length > 1 || users.length === 0) {
      res.status(400).json({ result: null, error: 'User not found' });
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
      idazien: user.idazien,
      type: user.type_user,
    });

    res.status(200).json({ result: token, error: null });
  } catch (e) {
    res.status(500).send({ errorMessage: e.message, errors: e.errors });
  }
};
