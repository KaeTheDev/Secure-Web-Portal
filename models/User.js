const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

// Destructure Schema from mongoose
const { Schema } = mongoose;

const userSchema = new Schema({

    password: {
        type: String,
        minLength: 8,
        select: false, // don't return password by default
    },

    githubId: {
        type: String,
        unique: true,
        sparse: true // allows multiple users with null githubid
    },
    email: {
        type: String,
        required: function() {
            // Required if there is no githubId
            return !this.githubId;
        },
        unique: true,
        match: [/.+@.+\..+/, "Must match an email address!"],
    },
    
});

// Validate auth method
userSchema.pre("validate", function() {
    if(!this.password && !this.githubId) {
        return next(
            new Error("User must have either a password or a GitHub ID")
        );
    }
});

// Hash password if it exists
userSchema.pre("save", async function(){
    if(!this.password || !this.isModified("password")) return;
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
  });

  module.exports = mongoose.model("User", userSchema);