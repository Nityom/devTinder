
const express = require('express');
const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');
const userRouter = express.Router();

// get all pending connection request for all the loggedin users
userRouter.get("/user/requests/received",userAuth,async (req,res)=>{
    try{
  const loggedInuser = req.user;

  const connectionRequests = await ConnectionRequest.find({
    toUserId: loggedInuser._id,
    status: "interested",
   
  }).populate("fromUserId", ["firstName","lastName","gender","photoUrl","about"]);


res.json({
    message: "data fetched successfully",
    data: connectionRequests,
})
    }
    catch(err){
        return res.status(400).json({
            error: "Failed to get connection requests",
            details: err.message,
        });
    }
});




module.exports = userRouter;