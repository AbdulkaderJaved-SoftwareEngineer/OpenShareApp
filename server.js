const express= require('express');
const connectDB = require('./config/db');
const app = express();
const path = require('path')
const cors = require('cors')
const PORT = process.env.PORT || 3000; // PORT is the main  port where the server is going to run

connectDB();


app.use(express.static('public'))

//Template Engine
app.set('views',path.join(__dirname,'/views'));
app.set('view engine','ejs')

//Routes

app.use('/api/files',require('./routes/files'))
app.use('/files',require('./routes/show'));
app.use('/files/download',require('./routes/download'))

app.get('/',(req,res)=>{
    return res.json({message:"Hello"})
})

app.listen(4000,()=>{
    console.log(`Server Up and running ...`);
});
