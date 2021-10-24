const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const config = require('./src/config')
const app = express()
const cors = require('cors');
const helmet = require('helmet');
const authRoutes = require('./src/routes/auth.js');

app.g = {};
app.g.tokenList = {};

app.use(helmet());
app.disable('x-powered-by');
app.use(cors());

router.get('/', (req,res) => {
    console.log("GET /");
    res.send('Ok');
})


// No token-required routes:
app.use(bodyParser.json())
app.use("/api/auth", authRoutes);
app.use("/api", router);

// All queries below this tokenChecker will be secured by token
router.use(require('./src/tokenChecker'))

app.listen(config.port || process.env.port || 3000); 

console.log("server listening on localhost:", (config.port || process.env.port || 3000));

