//custom  Empty function that checks for undefined, null, empty object or empty string values. 
//this is created as the validator checks for only an empty string

// function isEmpty(value) {
//     return(
//         value === undefined ||
//         value === null ||
//         //if value is an empty object
//         (typeof value === 'object' && Object.keys(value).length === 0) ||
//         (typeof value === 'string' && value.trim().length === 0)//length of value after trim is zero
//     );
// }

//refactor above code to format in an arrow function
const isEmpty = (value) =>   
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0);//length of value after trim is zero

module.exports = isEmpty;