const express = require('express');
const router = express.Router();
const passport = require('../config/passport');
const { registerUser, loginUser } = require("../controllers/userController");
const { signToken } = require('../utils/auth');


// Local Auth
router.post("/register", registerUser);
router.post("/login", loginUser);

// GitHub OAuth
router.get('/github', passport.authenticate('github', { scope: ['user:email'] })
);

router.get(
    '/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    (req, res) => {
        // Successful login
        // Generate JWT for the user instead of a session
        const token = signToken(req.user);
        res.json({ token, user: req.user });
    }
);

module.exports = router;