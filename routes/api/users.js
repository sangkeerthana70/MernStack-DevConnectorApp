const express = require('express');
const router = express.Router();

// @route      GET api/users/test
// @desc       Tests users route
// @access     Public
router.get('/test', (req, res) => res.json({msg: "Users route works"}));

//export router for server.js to pick it up
module.exports = router;

