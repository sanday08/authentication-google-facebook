const bodyParser = require('body-parser');
const morgan = require("morgan")
const express = require('express');
const dotenv= require('dotenv');
const cors = require('cors');
const connectDB=require('./config/db');
dotenv.config({path:"./config/config.env"});



const app = express();
//Connect  to Database
connectDB();
//use bodyParser
app.use(bodyParser.json());

//config for only development
if(process.env.NODE_ENV==="development"){
    app.use(cors({
        origin: process.env.CLIENT_URL
    }))
    app.use(morgan('dev'));
    //Morgan gives information about each request
    //Cors it's allow to deal with react for localhost at port 5000 without any problem
}

//Load all routes
const authRouter= require('./routes/auth.route');

//Use Routes

app.use("/api/",authRouter);


app.use((req, res, next) => {
    res.status(404).json({success: false,message:"Page Not Founded"});
})

const PORT=process.env.PORT;
app.listen(PORT,() => {
    console.log("Server started on port",process.env.PORT);
})