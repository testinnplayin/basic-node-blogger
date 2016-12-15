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

router.delete('/:id', (req, res) => {
	BlogPosts.Posts.delete(req.params.id);
	console.log(`Deleted blog post post \'${req.params.id}\'.`);
	res.status(204).end();
});

router.put('/:id', jsonParser, (req, res) => {
	const requiredFields = ['title', 'content', 'author'],
		lng = requiredFields.length;

	for(let i = 0; i < lng; i++) {
		const field = requiredFields[i];

		if (!(field in req.body)) {
			const msg = `Missing \'${field}\'. Please enter before proceeding.`;
			console.error(msg);
			return res.status(400).send(msg);
		}
	}

	if (req.params.id !== req.body.id) {
		const msg = (
			`Please enter a valid id because id entered (${req.params.id}) does not match any blog post id.`);
		console.error(msg);
		return res.status(400).send(msg);
	}
	console.log(`Updating blog post post \'${req.params.id}\'.`);
	const updatedPost = BlogPosts.Posts.update({
		id: req.params.id,
		title: req.body.title,
		content: req.body.content,
		author: req.body.author,
		publishDate: req.body.publishDate
	});
	res.status(204).json(updatedPost);
});

module.exports = router;