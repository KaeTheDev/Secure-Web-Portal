const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register User
const registerUser = async(req, res) => {
    try {
        const { username, email, password } = req.body;

        // Explicitly require password for local registration
        if(!username || !email || !password){
            return res.status(400).json({ message: "Please provide all fields" });
        }

        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create local-auth user
        const newUser = await User.create({
            username,
            email,
            password
        });

        // Sign Token
        const token = signToken(newUser);

        // Remove password from response
        const { password: _, ...userWithoutPassword } = newUser.toObject();

        return res.status(201).json({ token, user: userWithoutPassword });
    } catch(error){
        console.error("Error registering user:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

const loginUser = async(req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({ message: "Incorrect email or password" });
        }

        // Explicitly include password
        const user = await User.findOne({ email }).select("+password");
        if(!user || !user.password){
            return res.status(400).json({ message: "incorrect email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ message: "Incorrect email or password" });
        }

        const token = signToken(user);

        const { password: _, ...userWithoutPassword} = user.toObject();

        res.status(200).json({ token, user: userWithoutPassword });
      } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
      }
};