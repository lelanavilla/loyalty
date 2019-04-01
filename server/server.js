const express = require ("express");
require("dotenv").config();
const morgan= require("morgan");
const mongoose = require ("mongoose");
const bodyParser = require("body-parser");
const expressJwt = require("express-jwt");
const PORT = process.env.PORT || 8000;
const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use("/api", expressJwt({secret: process.env.SECRET}));
app.use("/api/users", require('./routes/usersRoute'));
app.use('/api/transactions', require('./routes/transactionsRoute'));
// app.use('/api/points', require('./routes/pointsRouter'));
app.use("/auth", require("./routes/authRoutes"));

const database = process.env.MONGODB_URI || "mongodb://localhost/transactions";

mongoose.Promise = global.Promise;
mongoose.connect( database, 
    (err) =>{
        if(err) throw err;
        console.log("Connected to DB");

    }
);

app.listen(PORT, () => console.log("Server is good to go on PORT:" + PORT));