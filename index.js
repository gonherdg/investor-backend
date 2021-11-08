import express from 'express'
import bodyParser from 'body-parser'
const router = express.Router()
const app = express()
import cors from 'cors'
import helmet from 'helmet'
import authRoutes from './src/routes/auth.js';
import connectDB from './src/config/db.js';
import config from './src/config.js';
import tokenChecker from './src/tokenChecker.js';
import mongoose from 'mongoose';
import User from './src/models/user.js';

connectDB();

// mongoose test:
const res = await User.findOne();
console.log(res);


app.locals = {};
app.locals.tokenList = {};

app.use(helmet());
app.disable('x-powered-by');
app.use(cors());

router.get('/', (req, res) => {
    console.log("GET /");
    res.send('Ok');
})


// No token-required routes:
app.use(bodyParser.json())
app.use("/api/auth", authRoutes);
app.use("/api", router);

// All queries below this tokenChecker will be secured by token
router.use(tokenChecker);

app.listen(config.port || process.env.port || 3000); 

console.log("server listening on localhost:", (config.port || process.env.port || 3000));

