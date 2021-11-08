// import { NextFunction, Request, Response } from "express";

const handler = (callback) => {
  return async (req, res, next) => {
    try {
      await callback(req, res, next);
    } catch (e) {
      console.log(e);
      res.status(500).json({
        error: "Server error"
      });
    }
  };
};

export default handler;
