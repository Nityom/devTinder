
const express = require('express');
const requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth");

requestRouter.post("/sendConnectionRequest",userAuth,async(req,res)=>{
    const user = req.user;
      //send connection request
      console.log("connection request sent");
      res.send(user.firstName + " send the connection request");
    });

    module.exports = requestRouter;