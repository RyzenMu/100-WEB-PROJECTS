// creating jwt on the client webpage

function createJwt() {
const jwt = require('jsonwebtoken');

// Define the payload
const payload = {
    userId : 123,
    userName: 'john_doe',
    password: 'user@123',
}

// Define a secret key to sign the token (keep this safe)
const secretKey = 'earth';

// Define options (e.g., token expiration time)
const options = {
    expiresIn : '1h'
}

// create the JWT tocken
const token = jwt.sign(payload, secretKey, options);

console.log('JWT Token', token);

 return token;
}

module.exports = {createJwt};

