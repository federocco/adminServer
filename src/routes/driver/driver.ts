import * as express from 'express';

import { getAll } from '../../controller/driver.controller';
import { authenticateToken } from '../../middleware/accessToken/accessToken';

const router = express.Router();

router.get('/all', authenticateToken, getAll);

export default router;
