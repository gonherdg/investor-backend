const express = require('express'); 
const tokenChecker = require('../tokenChecker');
const handler = require('../controllers/error');
const { alltokens, login, token, secure, userData, logout } = require('../controllers/auth');
//import { login, signup, verify, refresh, logout, regenerate } from "src/controllers/auth";
//import { authAccessToken, authRefreshToken } from "src/config/passport";

const router = express.Router();

console.log(alltokens);
router.get("/alltokens", handler(alltokens));
router.post("/login", handler(login));
router.post("/token", handler(token));
router.use(tokenChecker);
router.get("/secure", handler(secure));
router.get("/userdata", handler(userData));
router.get("/logout", handler(logout));


/*
router.post("/signup", handler(signup));
router.put("/logout", authAccessToken, handler(logout));
router.get("/verify", authAccessToken, handler(verify));
router.get("/refresh", authRefreshToken, handler(refresh));
router.get("/regenerate", authRefreshToken, handler(regenerate));
*/
module.exports = router;

