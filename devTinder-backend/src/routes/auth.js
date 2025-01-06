const express = require('express');
const authRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const validateSignUpData = require("../utils/validation");

// Signup route
authRouter.post("/signup", async (req, res) => {
    try {
        validateSignUpData(req);
        const { firstName, lastName, emailId, password } = req.body;

        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({ firstName, lastName, emailId, password: passwordHash });
        await user.save();

        res.status(201).send("User added successfully");
    } catch (err) {
        res.status(400).json({ message: "Error in adding user", error: err.message });
    }
});


// Login route
 authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
       
        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error("Invalid credentials");
        }

        const isPasswordValid = await user.validatePassword(password);
        if (isPasswordValid) {
            const token = await user.getJWT();
            res.cookie("token", token,{
              expires: new Date(Date.now() + 8 * 3600000), 
            });
            return res.send("Login success");
        }
        else{
           res.status(400).send("Invalid credentials");  
        }
       
    } catch (err) {
        res.status(400).json({ message: "Error in login", error: err.message });
    }
});

// Logout route
authRouter.post("/logout", async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
    });
   res.send("Logged out successfully");
});



module.exports = authRouter;
