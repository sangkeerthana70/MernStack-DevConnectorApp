const express = require('express');
const mongoose = require('mongoose');
//mongoose.Promise = Promise;

const app = express();

//DB config
const db = require('./config/keys').mongoURI;
console.log(db);
//Connect to MongoDB through mongoose
// mongoose.connect(db)
//     .then(() => {
//         mongoose.connection.on('error', err => {
//             console.log('mongoose connection error: '+err);
//         });

//         console.log('connected - attempting reconnect');
//         return mongoose.connect(url);
//     })
//     .catch(err => {
//         console.log('rejected promise: '+err);
//         mongoose.disconnect();
//     });




  mongoose
    .connect(db, { useNewUrlParser: true })
    .then( () => console.log('MongoDB Connected'))
    .catch(err => console.log(err)); 
 
app.get("/", (req, res) => res.send("Hello World!"));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
