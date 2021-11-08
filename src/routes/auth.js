import express from 'express'; 
import tokenChecker from '../tokenChecker.js';
import handler from '../controllers/error.js';
import { alltokens, login, token, secure, userData, logout, signup } from '../controllers/auth.js';
//import { login, signup, verify, refresh, logout, regenerate } from "src/controllers/auth";
//import { authAccessToken, authRefreshToken } from "src/config/passport";

const router = express.Router();

console.log(alltokens);
router.get("/alltokens", handler(alltokens));
router.post("/login", handler(login));
router.post("/token", handler(token));
router.get("/secure", tokenChecker, handler(secure));
router.get("/userdata", tokenChecker, handler(userData));
router.get("/logout", tokenChecker, handler(logout));
router.post("/signup", handler(signup));

/*
router.post("/signup", handler(signup));
router.put("/logout", authAccessToken, handler(logout));
router.get("/verify", authAccessToken, handler(verify));
router.get("/refresh", authRefreshToken, handler(refresh));
router.get("/regenerate", authRefreshToken, handler(regenerate));
*/
export default router;

