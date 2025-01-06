
const express = require('express');
const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');
const userRouter = express.Router();
const USER_SAVE_DATA =  "firstName lastName gender photoUrl about skills"; 

// get all pending connection request for all the loggedin users
userRouter.get("/user/requests/received",userAuth,async (req,res)=>{
    try{
  const loggedInuser = req.user;

  const connectionRequests = await ConnectionRequest.find({
    toUserId: loggedInuser._id,
    status: "interested",
   
  }).populate("fromUserId",USER_SAVE_DATA);


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

userRouter.get("/user/connections",userAuth,async (req,res)=>{
    try{
        const loggedInuser = req.user;
        const connectionRequests = await ConnectionRequest.find({
            $or: [
                {fromUserId: loggedInuser._id, status: "accepted"},
                {toUserId: loggedInuser._id, status: "accepted"},
            ],
        })
        .populate("fromUserId",USER_SAVE_DATA)
        .populate("toUserId",USER_SAVE_DATA);

        const data = connectionRequests.map((row) =>{
            if(row.fromUserId._id.toString() === loggedInuser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
        });

        res.json({
            message: "data fetched successfully",
            data,
        })

    }
    catch(err){
        return res.status(400).json({
            error: "Failed to get connections",
            details: err.message,
        });
    }
});




module.exports = userRouter;