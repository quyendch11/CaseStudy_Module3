const fs = require('fs');

class ErrorController {
    showError404Page(req, res) {
        fs.readFile('views/404-notfound.html', 'utf-8', (err, data) => {
            if (err) {
                console.log('File NotFound!');
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                return res.end();
            }
        });
    }
}
module.exports = ErrorController;