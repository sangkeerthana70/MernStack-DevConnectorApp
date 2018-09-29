const express = require('express');
const mongoose = require('mongoose');
//mongoose.Promise = Promise;

const app = express();

//DB config
const db = require('./config/keys').mongoURI;
console.log(db);

//connect to mongoDB
  mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err)); 
 
app.get('/', (req, res) => res.send('Hello World!'));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
