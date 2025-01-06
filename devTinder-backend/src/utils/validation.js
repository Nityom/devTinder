
const validator = require('validator');
const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("First name and last name are required.");
    }
    if (!emailId || !validator.isEmail(emailId)) {
        throw new Error("Email is not valid.");
    }
    if (!password || !validator.isStrongPassword(password)) {
        throw new Error("Password is not strong enough. It must include at least 8 characters, with one uppercase, one lowercase, one number, and one symbol.");
    }
};

const validateEditProfileData = (req) => {
    const allowedEditFields = ["firstName", "lastName", "emailId", "skills","gender","age","photoUrl","about"];

const isEditAlllowed = Object.keys(req.body).every(field => allowedEditFields.includes(field));
return isEditAlllowed;


}

module.exports = {validateSignUpData,validateEditProfileData};
