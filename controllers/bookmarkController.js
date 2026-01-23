const router = require('express').Router();
const Bookmark = require("../models/Bookmark");
const { authMiddleware } = require('../utils/auth');

// Protect all routes
router.use(authMiddleware);

// POST /api/bookmarks
// Create a new bookmark
const createBookmark = async (req, res) => {
    console.log('REQ BODY:', req.body);
    console.log('REQ USER:', req.user);
    try {
      const { title, url } = req.body;
      if (!title || !url)
        return res.status(400).json({ message: 'Title and URL are required' });
  
      const newBookmark = await Bookmark.create({
        title,
        url,
        user: req.user._id,
      });
      res.status(201).json(newBookmark);
    } catch (err) {
    console.error('CREATE BOOKMARK ERROR:', err);
      console.error(err);
      res.status(400).json({ message: 'Failed to create bookmark', error: err });
    }
  };

module.exports = { createBookmark };