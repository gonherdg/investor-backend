const express = require('express');
const helpers = require('../helpers');
const jwt = require('jsonwebtoken')
const config = require('../config')

const alltokens = async (req, res) => {
    console.log("GET /alltokens");
    res.send(req.app.g.tokenList);
};


const login = async (req, res) => {
  console.log("POST /login");

  if (req.body == undefined) {
    res.status(403).json({"error": "Not login info provided"});
    return;
  };

  const postData = req.body[0];
  const user = {
      "email": postData.email,
      "password": postData.password,
      "name": postData.name
  }
  //console.log("postData.email:",postData.email);

  // do the database authentication here, with user name and password combination.
  const dbUser = helpers.getUserByEmail(req.app, postData.email);
  //console.log(dbUser);

  if (dbUser){
    if (user.email === dbUser.email && user.password === dbUser.password){
      // I should record user login in database here
    } else {
      res.status(403).json({"error": "The loggin information is not correct."});
      console.log("The loggin information is not correct.");
      return;
    }
  } else {
    res.status(403).json({"error": "NOOOOOOO"});
    console.log("NOOOOOOOO");
    return;
  }

    // Clean password so it doesn't get saved into the token that goes over internet:
  const tokenUser = { "email": user.email };

  const token = jwt.sign(tokenUser, config.secret, { expiresIn: config.tokenLife})
  const refreshToken = jwt.sign(tokenUser, config.refreshTokenSecret, { expiresIn: config.refreshTokenLife})
  const response = {
      "email": user.email,
      "status": "Logged in",
      "token": token,
      "refreshToken": refreshToken,
  }
  req.app.g.tokenList[refreshToken] = response
  console.log("TOKEN LIST:",req.app.g.tokenList);
  res.status(200).json(response);
};


const token = async (req, res) => {
  console.log("POST /token");
  // refresh the damn token
  const postData = req.body

  //console.log("token req.body:",req.body);

  // if refresh token exists
  if((postData.refreshToken) && (postData.refreshToken in req.app.g.tokenList)) {
    const user = {
        "email": postData.email,
        "name": postData.name
    }
    const token = jwt.sign(user, config.secret, { expiresIn: config.tokenLife})
    const response = {
        "token": token,
    }
    // update the token in the list
    const oldToken = token;
    //console.log(req.app.g.tokenList[postData.refreshToken]);
    req.app.g.tokenList[postData.refreshToken].token = token
    res.status(200).json(response);        
  } else {
    console.log('Invalid request');
    res.status(404).send('Invalid request')
  }
}

const secure = async (req, res) => {
  console.log("GET /secure");
  res.send('I am secured...')
};

const userData = async (req, res) => {
  console.log("GET /userdata");
  const user = helpers.getUserByToken(req.app, req.headers['x-access-token']);
  //console.log("REQ HEADERS X-ACCESS-TOKEN", req.headers['x-access-token']);
  //console.log("USER:",user);
  let result = { ...helpers.getUserByEmail(req.app, user.email) };
  // Borro el password para no enviarlo por internet.
  result.password = '';
  res.json(result);
};

const logout = async (req, res) => {
  console.log("GET /logout");
  res.send("Logged out!");
};


module.exports = { 
  alltokens,
  login,
  token,
  secure,
  userData,
  logout,
};
