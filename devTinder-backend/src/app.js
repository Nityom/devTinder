const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const  validateSignUpData  = require("../utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require("./middlewares/auth");

// Middleware
app.use(express.json());
app.use(cookieParser());


// Signup route
app.post("/signup", async (req, res) => {
    try {
      // Validation of data
      validateSignUpData(req);
  
      // Destructure required fields from req.body
      const { firstName, lastName, emailId, password } = req.body;
  
      // Encrypt the password
      const passwordHash = await bcrypt.hash(password, 10);
      console.log(passwordHash);
  
      // Create a new instance of the User model
      const user = new User({
        firstName,
        lastName,
        emailId,
        password: passwordHash,
      });
  
      await user.save();
      res.status(201).send("User added successfully");
    } catch (err) {
      res.status(400).json({ message: "Error in adding user", error: err.message });
    }
  });
  
  app.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        if (!emailId || !password) {
            return res.status(400).send("Please provide email and password");
        }

        const user = await User.findOne({ emailId });
        if (!user) {
            return res.status(404).send("User not found");
        }

        const isPasswordValid = await user.validatePassword(password);
        if (isPasswordValid) {
            const token = await user.getJWT();
            res.cookie("token", token,{
              expires: new Date(Date.now() + 8 * 3600000), // cookie will be removed after 8 hours
            });
            return res.status(200).send("Login success");
        }

        res.status(400).send("Invalid password");
    } catch (err) {
        res.status(400).json({ message: "Error in login", error: err.message });
    }
});

app.get("/profile",userAuth,async(req,res)=>{
 try{
 const user = req.user;
res.send(user);
 }
 catch(err){
      res.status(400).send("Invalid token" + err.message);
  }
});

app.post("/sendConnectionRequest",userAuth,async(req,res)=>{
  const user = req.user;
    //send connection request
    console.log("connection request sent");
    res.send(user.firstName + " send the connection request");
  });


// Connect to database and start the server
connectDB().then(() => {
        console.log("Database connected");
        app.listen(3000, () => {
            console.log("Server is successfully listening on port 3000...");
        });
    })
    .catch((err) => {
        console.error("Error in connecting to database", err);
    });
