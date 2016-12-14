'use strict';

const express = require('express');

const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const BlogPosts = require('./models');

//Some preloaded blog posts

BlogPosts.create('Node is fun', 'Seriously, it really is!', 'R Wood', 'Today');
BlogPosts.create('The sky is falling on our heads', 'And I have a menhir or two to sell.', 'Obelix', 'Gallo-Roman times');

module.exports = router;