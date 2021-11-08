import users from './users.js';


const getUserByEmail = (app, email) => {
  const sEmail = email; //JSON.stringify(email);
  for (u of users.users) {
    const uEmail = u.email;
    if (uEmail === sEmail) {
      console.log("ENCONTRADO!");
      return u;
    }
  }
  console.log("not user found with email:", email);
};


const getUserByToken = (app, token) => {
  let count = 0;
  console.log(app.g.tokenList);
  for (t in app.g.tokenList) {
    count ++;
    console.log(t);
    console.log(" ");
    console.log("CREO QUE ES ESTO",app.g.tokenList[t]);
    if (app.g.tokenList[t].token === token) {
      console.log("GETUSERBYTOKEN:",app.g.tokenList[t].email);
      return app.g.tokenList[t];
    }
  }
  console.log("COUNT: ", count);
  return "NO SE PUDO ENCONTRAR";
}

export default {
  getUserByEmail,
  getUserByToken
}