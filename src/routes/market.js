import express from 'express'; 
import tokenChecker from '../tokenChecker.js';
import handler from '../controllers/error.js';
import { getMarketPrices } from '../controllers/market.js';

const router = express.Router();

router.get("/", handler(getMarketPrices));

export default router;
