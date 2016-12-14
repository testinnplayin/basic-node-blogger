'use strict';

const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const morgan = require('morgan');

const {BlogPosts} = require('./models');

const app = express();

app.use(morgan('common'));

app.listen(process.env.PORT || 8080, () => {
	console.log(`Your app is running on port ${process.env.PORT || 8080}`);
});