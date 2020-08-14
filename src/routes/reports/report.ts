import * as express from 'express';
import { Request, Response } from 'express';

import { authenticateToken } from '../../middleware/accessToken/accessToken';

const router = express.Router();

router.get('/all', authenticateToken, (req: Request, res: Response) => {
  res.status(200).send('ok!');
});

export default router;
