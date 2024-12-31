const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

// Middleware
app.use(express.json());

// Signup route
app.post("/signup", async (req, res) => {
    const user = new User(req.body); // Creating a new instance of the User model

    try {
        await user.save();
        res.status(201).send("User added successfully");
    } catch (err) {
        res.status(400).json({ message: "Error in adding user", error: err.message });
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
