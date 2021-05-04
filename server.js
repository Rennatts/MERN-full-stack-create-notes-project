const express = require('express');
const mongoose = require('mongoose');
const cors =  require('cors');
require('dotenv').config();

//set up express
const app = express();


//allows us to use body json thing to create posts
app.use(express.json());

//we prevent from cors policy warnings
app.use(cors());

//specify in which port our app will run
const PORT = process.env.PORT || 5000


app.listen(PORT, ()=> console.log(`server has started at port ${PORT}`));

//set up mongoose
mongoose.connect(process.env.MONGODB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,},
    (err) => {
        if (err) throw err;
        console.log("MongoDB connected");
    }); 


//set routes
const post = require('./routes/post');


app.use('/api/posts', post);
