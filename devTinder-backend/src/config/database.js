
const mongoose = require('mongoose');

const connectDB = async() =>{
    await mongoose.connect(
        "mongodb+srv://nityomtikherr:ecKn4GBY8Nb9apjV@namastenode.iy50g.mongodb.net/"
    );
};

module.exports = connectDB;