import express from 'express'; 
import tokenChecker from '../tokenChecker.js';
import handler from '../controllers/error.js';
import { getMyCryptos, setMyCryptos, exchange } from '../controllers/wallet.js';

const router = express.Router();

router.get("/", tokenChecker, handler(getMyCryptos));
router.put("/", tokenChecker, handler(setMyCryptos));
router.post("/exchange", tokenChecker, handler(exchange));

export default router;

