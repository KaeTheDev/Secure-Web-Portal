const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookmarkSchema = new Schema(
    {
        user: { 
            type: Schema.Types.ObjectId, 
            ref: 'User',
            required: true, 
        },
        title: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Bookmark', bookmarkSchema);