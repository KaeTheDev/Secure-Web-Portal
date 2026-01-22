const mongoose = require('mongoose');

const bookmarkSchema = new Schema(
    {
        user: { 
            type: Schema.Types.ObjectId, 
            ref: 'User',
            required: true, 
        },
    },
    { timestamps: true }
);