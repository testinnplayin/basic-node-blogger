'use strict';

const express = require('express');

const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const BlogPosts = require('./models');
console.log(BlogPosts);
// console.log(BlogPosts.BlogPosts.temp);
//Some preloaded blog posts

BlogPosts.Posts.create('Node is fun', 'Seriously, it really is!', 'R Wood', 'Today');
BlogPosts.Posts.create('The sky is falling on our heads', 'And I have a menhir or two to sell.', 'Obelix', 'Gallo-Roman times');

//CRUD functions

router.get('/', (req, res) => {
	res.json(BlogPosts.Posts.get());
});

router.post('/', jsonParser, (req, res) => {
	const requiredFields = ['title', 'content', 'author'],
		lng = requiredFields.length;

	for (let i = 0; i < lng; i++) {
		const field = requiredFields[i];

		if (!(field in req.body)) {
			const msg = `Missing \'${field}\'. Please enter.`;
			console.error(msg);

			return res.status(400).send(msg);
		}
	}

	const blog = BlogPosts.Posts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate);
	res.status(200).json(blog);
});

module.exports = router;