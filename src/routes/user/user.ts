import * as express from 'express';
import { loginUser } from '../../controller/user.controller';

const router = express.Router();

router.post('/login', loginUser);

export default router;
