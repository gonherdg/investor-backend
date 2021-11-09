import express from 'express'; 
import tokenChecker from '../tokenChecker.js';
import handler from '../controllers/error.js';
import { getMyCryptos, setMyCryptos, exchange, deposit, withdraw } from '../controllers/wallet.js';

const router = express.Router();

router.get("/", tokenChecker, handler(getMyCryptos));
router.put("/", tokenChecker, handler(setMyCryptos));
router.post("/exchange", tokenChecker, handler(exchange));
router.post("/deposit", tokenChecker, handler(deposit));
router.post("/withdraw", tokenChecker, handler(withdraw));

export default router;

