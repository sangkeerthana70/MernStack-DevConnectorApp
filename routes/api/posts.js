const express = require('express');
const router = express.Router();

// @route      GET api/posts/test
// @desc       Tests post route
// @access     Public
router.get('/test', (req, res) => res.json({msg: "Posts route works"}));

//export router for server.js to pick it up
module.exports = router;

