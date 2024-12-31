const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const  validateSignUpData  = require("../utils/validation");
const bcrypt = require("bcrypt");

// Middleware
app.use(express.json());

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
  
    const user = await User .findOne({ emailId:emailId });
    if (!user) {
        return res.status(404).send("User not found");
      }
      const isPasswordValid= await bcrypt.compare(password,user.password);
      if(isPasswordValid){
          return res.status(200).send("Login success");
      }
        res.status(400).send("Invalid password");

    } catch (err) {
      res.status(400).json({ message: "Error in login", error: err.message });
    }
  });
// Get user by email
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;
    try {
        const user = await User.findOne({ emailId: userEmail });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ message: "Error in finding user", error: err.message });
    }
});

//Feed API - GET /feed- get all the users from the database

app.get("/feed",async(req,res)=>{

    try{
        const users = await User.find({});
        res.send(users);
    } catch(err){
        res.status(400).send("something went wrong");
    }
});

app.delete("/user",async(req,res)=>{
    const userId = req.body.userId;
    try{
      const user = await User.findByIdAndDelete(userId);
      res.send("user deleted successfully");
    }
    catch(err){
        res.status(400).send("something went wrong");
    }
});

//update data of the user
app.patch("/user/:userId",async(req,res)=>{
    const userId = req.params?.userId;
    const data = req.body;

   try{
    const ALLOWED_UPDATES=[
        "photoUrl","about","skills","gender","age"
      ]
      const isUpdateAllowed = Object.keys(data).every((k)=>ALLOWED_UPDATES.includes(k));
      if(!isUpdateAllowed){
          return res.status(400).send("Invalid update");
      }


      if(data?.skills.length>10){
            return res.status(400).send("skills cannot be more than 10");
      }
         const user = await User.findByIdAndUpdate({_id : userId},data,{
            returnDocument:"after",
            runValidators:true,
         });
         console.log(user);
         
            res.send("user updated successfully");
   }
   catch(err){
    res.status(400).send("update failed: "+ err.message);
}
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
