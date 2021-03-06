const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load Input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
// Bring in user model
const User = require('../../models/User');

// @route      GET api/users/test
// @desc       Tests users route
// @access     Public
router.get('/test', (req, res) => res.json({msg: "Users route works"}));

// @route      GET api/users/register
// @desc       Register user
// @access     Public
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    //Check Validation
    if(!isValid) {
        return res.status(400).json(errors);
    }
    //check if user already exists my matching user email with email in DB
    User.findOne({ email: req.body.email})
        .then(user => {
            if(user) {
                errors.email = 'Email already exists';
                return res.status(400).json(errors);
            } else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200', //Size of avatar
                    r: 'pg', // Rating
                    d: 'mm' //Default
                });
                //else add new user to the User model in DB 
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password
                });
                //generate salt and hash plain password to a bcrypt and then save the user in DB
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                      if (err) throw err;
                      newUser.password = hash;
                      newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                    });
                });
            }
        });
});

// @route      GET api/users/login
// @desc       Login user and return JWT Token on validation
// @access     Public
router.post('/login', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    //Check Validation
    if(!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    //Find user by email
    User.findOne({email: email})
        .then(user => {
            //Check for user
            if(!user) {
                errors.email = 'User not found'
                return res.status(404).json(errors);                
            }
            
            // Check Password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch) {
                        //res.json({msg: 'Success'});
                        //if validation of password is successful
                        
                        //User Matched
                        const payload = { id: user.id, name: user.name, avatar: user.avatar }// Create JWT PayLoad

                        // Sign Token
                        jwt.sign(
                            payload, 
                            keys.secretOrKey,
                            { expiresIn: 3600 },
                            (err, token) => {
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            });//send the token generated as a response
                            });
                    } else {
                        errors.password = 'Password incorrect';
                        return res.status(400).json(errors);
                    }
                })
        }); 
});

// @route      GET api/users/current
// @desc       Return current user 
// @access     Private
router.get(
    '/current', 
    passport.authenticate('jwt', { session: false}), 
    (req, res) => {
        //res.json({ msg: 'Success' });
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email
        });
    }
);

//export router for server.js to pick it up
module.exports = router;

