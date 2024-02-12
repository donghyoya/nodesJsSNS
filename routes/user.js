const express = require('express');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');


router.post('/:id/follow', isLoggedIn, follow);