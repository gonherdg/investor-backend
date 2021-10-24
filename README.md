# Simple login system

#### Start server
Run npm start to start de server.

**GET /**
> => Returns 'OK' if the server is running correctly

**GET /alltokens**
> => Returns all the saved tokens on memory of the current server.

**POST /login**
BODY: 
{
	"email": "example@test.com",
	"name": "example"
}
> => Returns a token to be used on subsequent api calls and also a refresh token to be used to generate a new token when needed.

**GET /secure**
HEADERS:
x-access-token: (the given token)
> => Returns a simple text "I am secured..." showing that token was correctly verified and we have a secure connection.

**POST /token**
BODY:
{
	"email": "example@test.com",
	"name": "example",
	"refreshToken": "(the given refresh token)"
}
> => Returns a new generate token for this user.d
