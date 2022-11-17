const http = require("http");

const server = http.createServer((req, res) => {

    res.writeHead(200, {
        'content-type': 'text/plain'
    });

    res.write('<h1> Home Page </h1>');

    res.end();
});

server.listen("4477", function () {
  console.log("Server start");
});
