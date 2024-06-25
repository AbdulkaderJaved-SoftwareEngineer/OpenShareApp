require('dotenv').config();

const mongoose = require('mongoose');

//Database Connection M
function connectDB()
{
mongoose.connect(process.env.MONGO_CONNECTION_URL);
const connection = mongoose.connection;

try {
    connection.once('open',()=>{
        console.log("Database Connected Successfully....")
    })
} catch (error) {
    console.log(error)
}


}

module.exports = connectDB;
