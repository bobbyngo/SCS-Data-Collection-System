const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.secret');

module.exports = function verifyAuthToken(req, res, next) {
    // const authToken = req.session.token;
    // console.log(authToken);
    const authToken = req.headers.authorization.split(' ')[1];
    console.log('Received token:', authToken);
    // verify the token
    jwt.verify(authToken, authConfig.secret_key, function (err, decoded) {
        if (err) {
            return res.status(401).send({
                message: 'Please signed in',
            });
        }
        req.userId = decoded.id;
        next();
    });
};
