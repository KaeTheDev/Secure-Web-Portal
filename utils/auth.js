const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const expiration = '2h';

module.exports = {
    authMiddleware: function(req, res, next) {
        let token = req.body?.token || req.query?.token || req.headers?.authorization;

        if(!token) {
            return res.status(401).json({ message: 'You must be logged in to do that.' });
        }

        // If the token comes in the header, remove the "Bearer " prefix
        if(token.startsWith('Bearer ')) {
            token = token.slice(7).trim();
        }

        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch {
            console.log('Invalid token');
            return res.status(401).json({ message: 'Invalid token.' });
        }
        next();
    },
    signToken: function({ username, email, _id }) {
        const payload = { username, email, _id };
        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },
};