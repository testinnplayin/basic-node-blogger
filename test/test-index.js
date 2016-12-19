const chai = require('chai');
const chaiHTTP = require('chai-http');

const {app, runServer, closeServer} = require('../index');

const should = chai.should();

chai.use(chaiHTTP);

describe('BlogPosts', function() {
	before(function() {
		return runServer();
	});

	after(function() {
		return closeServer();
	});

	it('should list blog posts on GET', function() {
		return chai.request(app)
			.get('/blog-posts')
			.then(function(res) {
				res.should.be.json;
				res.body.should.be.a('array');
				res.body.length.should.be.at.least(1);

				const expectedKeys = ['id', 'title', 'content', 'author'];
				res.body.forEach(function(item) {
					item.should.be.a('object');
					item.should.include.keys(expectedKeys);
				});
			});
	});

	it('should create a new blog post on POST', function() {
		const newPost = {title: 'More Menhirs on Sale', content: 'This is a one-off sale on last season\'s menhirs.', author: 'Obelix', publishDate: 'Gallo-Roman times'};
		return chai.request(app)
			.post('/blog-posts')
			.send(newPost)
			.then(function(res) {
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('object');
				res.body.should.include.keys('id', 'title', 'content', 'author');
				res.body.id.should.not.be.null;
				res.body.should.deep.equal(Object.assign(newPost, {id: res.body.id}));

			});
	});

});