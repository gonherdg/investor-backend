import express from 'express';
import helpers from '../helpers.js';
import jwt from 'jsonwebtoken';
import config from '../config.js';
import User from '../models/user.js';

const getMyCryptos = async (req, res) => {
  const user = req.user;
  if (!user) {
    res.json({"state":"Error, user doesn't exist."});
    return;
  }
  const dbUser = await User.findOne({ _id: user._id }).exec();
  const wallet = dbUser.wallet;
  res.json(wallet);
};

const setMyCryptos = async (req, res) => {
  console.log("PUT /");
  const user = req.user;
  if (!user) {
    res.json({"state":"Error, user doesn't exist."});
    return;
  }
  const wallet = req.body.wallet;
  await User.updateOne({ _id: user._id }, { wallet: {...user.wallet, ...wallet} }, { upsert: true }).exec();
  res.json({"state":"Successfully updated wallet", wallet});
};

const exchange = async (req, res) => {
  console.log("POST /exchange");
  res.send("Not implemented");
};

export { 
  getMyCryptos,
  setMyCryptos,
  exchange,
};

