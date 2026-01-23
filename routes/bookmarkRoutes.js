const express = require('express');
const router = express.Router();
const { createBookmark, getBookmarks, updateBookmarks, deleteBookmarks } = require("../controllers/bookmarkController");
const { authMiddleware } = require('../utils/auth');

router.post("/", authMiddleware, createBookmark);
router.get("/", authMiddleware, getBookmarks);
router.put("/:id", authMiddleware, updateBookmarks);
router.delete("/:id", authMiddleware, deleteBookmarks);

module.exports = router;