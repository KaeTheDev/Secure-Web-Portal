const router = require("express").Router();
const Bookmark = require("../models/Bookmark");
const { authMiddleware } = require("../utils/auth");

// Protect all routes
router.use(authMiddleware);

// POST /api/bookmarks
// Create a new bookmark
const createBookmark = async (req, res) => {
  console.log("REQ BODY:", req.body);
  console.log("REQ USER:", req.user);
  try {
    const { title, url } = req.body;
    if (!title || !url)
      return res.status(400).json({ message: "Title and URL are required" });

    const newBookmark = await Bookmark.create({
      title,
      url,
      user: req.user._id,
    });
    res.status(201).json(newBookmark);
  } catch (err) {
    console.error("CREATE BOOKMARK ERROR:", err);
    console.error(err);
    res.status(400).json({ message: "Failed to create bookmark", error: err });
  }
};

// GET /api/bookmarks
// Get all bookmarks for the logged-in user
const getBookmarks = async (req, res) => {
  console.log("REQ USER:", req.user);
  try {
    const bookmarks = await Bookmark.find({ user: req.user._id });
    res.json(bookmarks);
  } catch (err) {
    console.error("GET BOOKMARKS ERROR:", err);
    console.error(err);
    res.status(500).json({ message: "Server error", error: err });
  }
};

// Get a single bookmark by ID
const getBookmarkById = async (req, res) => {
  try {
    const bookmark = await Bookmark.findById(req.params.id);
    if (!bookmark) return res.status(404).json({ message: 'No bookmark found' });
    if (bookmark.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });
    res.json(bookmark);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err });
  }
};

// PUT /api/bookmarks
// Update a single bookmark

const updateBookmarks = async (req, res) => {
  try {
    const bookmark = await Bookmark.findOneAndUpdate({_id: req.params.id, // bookmark ID from URL
    user: req.user._id, // logged-in user from JWT
}, req.body,{ new: true }
    );

    if (!bookmark) {
      return res.status(404).json({ message: "Bookmark not found or not authorized" });
    }

    res.json(bookmark);
  } catch (err) {
    console.error("UPDATE BOOKMARK ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/bookmarks
// Delete a single bookmark
const deleteBookmarks = async(req, res) => {
  try {
    const bookmark = await Bookmark.findById({ _id: req.params.id, user: req.user._id});
    if(!bookmark) return res.status(404).json({ message: 'No bookmark found' });
    if(bookmark.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });

    await bookmark.deleteOne();
    res.json({ message: 'Bookmark deleted' });
  } catch(err){
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err });
  }
};

module.exports = { createBookmark, getBookmarks, updateBookmarks, deleteBookmarks, getBookmarkById };
