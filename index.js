const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const PORT = 8080;

const server = http.createServer((req, res) => {
	let filePath = path.join(
		__dirname,
		'public',
		req.url === '/' ? 'index.html' : req.url
	);

	let testPath = url.parse(req.url, true);
	console.log(path.join(testPath.path));

	let fileExtent = path.extname(filePath);
	let contentType = 'text/html';

	switch (fileExtent) {
		case '.css':
			contentType = 'text/css';
			break;
		case '.html':
			contentType = 'text/html';
			break;
	}

	console.log(filePath);

	fs.readFile(filePath, (err, content) => {
		if (err) {
			if (err.code == 'ENOENT') {
				fs.readFile(
					path.join(__dirname, 'public', '404.html'),
					(err, content) => {
						res.writeHead(200, { 'Content-Type': 'text/html' });
						res.end(content, 'utf8');
					}
				);
			}
		} else {
			res.writeHead(200, { 'Content-Type': contentType });
			res.end(content, 'utf8');
		}
	});
});

server.listen(PORT, () => console.log(`Server running -- ${PORT}`));
