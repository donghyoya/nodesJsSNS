const express = require('express');
const { afterBulkCreate } = require('../models/user');
const router = express.Router();
const fs = require('fs');

try {
    fs.readFileSync('uploads');
} catch (error) {
    fs.mkdirSync('uploads');
}

const { isLoggedIn, isNotLoggedIn } = require('../middlewares')

router.post("img", isLoggedIn, afterUploadImage);
router.post('/', isLoggedIn, uploadPost);

module.exports = router;