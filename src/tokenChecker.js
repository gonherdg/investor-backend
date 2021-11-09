// import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import config from './config.js';
import helpers from './helpers.js';
import User from './models/user.js';

const blackList = ['eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzM3OTU5NjYsImV4cCI6MTYzMzc5Njg2Nn0.hpb6r9kxwBTy2xs-UXXx_Ow7rvvC67sc8eg_kuO2LEA'];

const isInBlackList = ((token) => {
  return (blackList.includes(token))
});

export default async (req, res, next) => {
  if (req.body == undefined) {
    res.status(403).send({
      "error": true,
      "message": 'No token provided!!'
    });
  }

  const token = req.body.token || req.query.token || req.headers['x-access-token']

  if (!token) 
    return res.status(403).send({"error": true, "message": 'No token provided.'});

  jwt.verify(token, config.secret, function(err, decoded) {
    const tokenExpiredError = 'TokenExpiredError: jwt expired';

    if(isInBlackList(token)){
      console.log('TOKEN IN BLACK LIST!');
      return res.status(401).json({"error": true, "message": "Token is in blacklist." });
    }

    if (err){
      if (err.toString().startsWith(tokenExpiredError))
        err = tokenExpiredError;
      console.error(err);
      return res.status(401).json({"error": true, "message": 'Unauthorized access.' });
    }
    req.decoded = decoded;
  });

  const user = helpers.getUserByToken(req.app, req.headers['x-access-token']);
  if (user) {
    const dbUser = await User.findOne({"email": user.email});
    console.log("tokenChecker:USER and dbUSER:", user, dbUser);
    if (dbUser){
      dbUser.password = '';
      req.user = dbUser;
    } else {
      req.user = undefined;
    }
  } else {
    req.user = undefined;
  }
  next();
}
