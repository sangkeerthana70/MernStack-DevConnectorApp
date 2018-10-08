const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
    let errors = {};
    // if email and password  fields in form is empty set it to empty string
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    // Check if valid email
    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    //Validate if email field is empty
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    //Check for empty password
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }
  
    return {
        errors: errors,
        isValid: isEmpty(errors)//import isEmpty.js
    };
};