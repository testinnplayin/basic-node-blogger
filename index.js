'use strict';

const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');

const {BlogPosts} = require('./models');

const app = express();