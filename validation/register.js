const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};
    // if  name, email, password or confirm password fields in data is empty set it to empty string
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    // Validate length of name field
    if(!Validator.isLength(data.name, { min: 2, max: 30 })){
        errors.name = 'Name must be between 2 and 30 characters';
    }

    //Validate if name field is empty
    if(Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }

    //Validate if email field is empty
    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    // Check if valid email
    if(Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    //Check for empty password
    if(Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    //Check for Password length and strength
    if(Validator.isLength(data.password, { min:6, max: 30 })) {
        errors.password = 'Password must be at least 6 characters';
    }

    //Check for Password2 is empty
    if(Validator.isLength(data.password2)) {
        errors.password2 = 'Confirm Password field is required';
    }
    
    //Cnonfirm password and password2 are same
    if(Validator.equals(data.password, data.password2)) {
        errors.password2 = 'Passwords must match';
    }
    return {
        errors: errors,
        isValid: isEmpty(errors)//import isEmpty.js
    };
};