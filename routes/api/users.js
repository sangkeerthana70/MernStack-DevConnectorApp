const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');

// Bring in user model
const User = require('../../models/User')

// @route      GET api/users/test
// @desc       Tests users route
// @access     Public
router.get('/test', (req, res) => res.json({msg: "Users route works"}));

// @route      GET api/users/register
// @desc       Register user
// @access     Public
router.post('/register', (req, res) => {
    //check if user already exists my matching user email with email in DB
    User.findOne({ email: req.body.email})
        .then(user => {
            if(user) {
                return res.status(400).json({email: 'Email already exists'});
            } else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200', //Size of avatar
                    r: 'pg', // Rating
                    d: 'mm' //Default
                });

                const newUser = new User({//else add new user to the User model in DB
                    name: req.body.name,
                    email: req.body.email,
                    avatar: avatar,
                    password: req.body.password
                })
            }
        })
});

//export router for server.js to pick it up
module.exports = router;

