const express = require('express');
const router = express.Router();
const { createBookmark, getBookmarks } = require("../controllers/bookmarkController");
const { authMiddleware } = require('../utils/auth');

router.post("/", authMiddleware, createBookmark);
router.get("/", authMiddleware, getBookmarks);


module.exports = router;