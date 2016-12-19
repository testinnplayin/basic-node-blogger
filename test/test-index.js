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

	//it();
});