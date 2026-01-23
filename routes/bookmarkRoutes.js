const express = require('express');
const router = express.Router();
const { createBookmark, getBookmarks, updateBookmarks } = require("../controllers/bookmarkController");
const { authMiddleware } = require('../utils/auth');

router.post("/", authMiddleware, createBookmark);
router.get("/", authMiddleware, getBookmarks);
router.put("/:id", authMiddleware, updateBookmarks);

module.exports = router;