
 const adminAuth = (req,res,next)=>{
    console.log("addmin auth is getting checked");
    
    const token = "abc";
    const isAdminAuthorized = token ==='abc';

    if(!isAdminAuthorized){
        res.status(401).send("Unauthorized");
    } else{
        next();
    }
};


const userAuth = (req,res,next)=>{
    console.log("addmin auth is getting checked");
    
    const token = "abc";
    const isAdminAuthorized = token ==='abc';

    if(!isAdminAuthorized){
        res.status(401).send("Unauthorized");
    } else{
        next();
    }
};



module.exports = {adminAuth,userAuth};


