const express = require('express');
const router = express.Router();
const { createBookmark } = require("../controllers/bookmarkController");
const { authMiddleware } = require('../utils/auth');

router.post("/", authMiddleware, createBookmark);


module.exports = router;