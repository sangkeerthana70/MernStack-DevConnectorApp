const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
    let errors = {};
    // if email and password  fields in form is empty set it to empty string
    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.status = !isEmpty(data.status) ? data.status : '';
    data.skills = !isEmpty(data.skills) ? data.skills : '';

    if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
        errors.handle = 'Handle needs to be between 2 and 40 characters';
    }

    if (Validator.isEmpty(data.handle)) {
        errors.handle = 'Profile handle is rquired';
    }

    if (Validator.isEmpty(data.status)) {
        errors.status = 'Status field is rquired';
    }

    if (Validator.isEmpty(data.skills)) {
        errors.skills = 'Skills field is rquired';
    }
    // If website is not empty then validate to see if it is a valid URL
    if(!isEmpty(data.website)) {
        if(!Validator.isURL(data.website)) {
            errors.website = 'Not a valid URL'
        }
    }
    // youtube
    if(!isEmpty(data.youtube)) {
        if(!Validator.isURL(data.youtube)) {
            errors.youtube = 'Not a valid URL'
        }
    }
    // twitter
    if(!isEmpty(data.twitter)) {
        if(!Validator.isURL(data.twitter)) {
            errors.twitter = 'Not a valid URL'
        }
    }

    // facebook
    if(!isEmpty(data.facebook)) {
        if(!Validator.isURL(data.facebook)) {
            errors.facebook = 'Not a valid URL'
        }
    }

    //linked in
    if(!isEmpty(data.linkedin)) {
        if(!Validator.isURL(data.linkedin)) {
            errors.linkedin = 'Not a valid URL'
        }
    }

    // Instagram

    if(!isEmpty(data.instagram)) {
        if(!Validator.isURL(data.instagram)) {
            errors.instagram = 'Not a valid URL'
        }
    }

    return {
        errors: errors,
        isValid: isEmpty(errors)//import isEmpty.js
    };
};