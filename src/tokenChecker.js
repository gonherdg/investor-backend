const jwt = require('jsonwebtoken')
const config = require('./config')

const blackList = ['eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzM3OTU5NjYsImV4cCI6MTYzMzc5Njg2Nn0.hpb6r9kxwBTy2xs-UXXx_Ow7rvvC67sc8eg_kuO2LEA'];

const isInBlackList = ((token) => {
  return (blackList.includes(token))
});

module.exports = (req,res,next) => {
  //console.log("req:",req.body);
  //console.log("req.query:",req.query);
  //console.log("res:",res);
  
  if (req.body == undefined) {
    res.status(403).send({
      "error": true,
      "message": 'No token provided!!'
    });
  }

  const token = req.body.token || req.query.token || req.headers['x-access-token']

  //console.log("TOKEN:", token);
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {
      const tokenExpiredError = 'TokenExpiredError: jwt expired';
      
      /*if(isInBlackList(token)){
        console.log('TOKEN IN BLACK LIST!');
        return res.status(401).json({"error": true, "message": "Token is in blacklist." });
      }
      */
      if (err) {
        if (err.toString().startsWith(tokenExpiredError)){
          console.log(tokenExpiredError);
        } else {
          console.log(err);
        }
        return res.status(401).json({"error": true, "message": 'Unauthorized access.' });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
        "error": true,
        "message": 'No token provided.'
    });
  }
}
