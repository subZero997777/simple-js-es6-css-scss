const http  = require('http');
const fs = require('fs');
const path = require('path');
const port = 3000;
const open = require('open');
const host = 'http://localhost'

const httpServer = http.createServer(requestResponseHandler);

httpServer.listen(port, () => {
  console.log('Node.JS static file server is listening on port '+port+'.');
  open(host+":"+port);
})

function requestResponseHandler(req, res){
  console.log(`Request came: ${req.url}`);
  if(req.url === '/'){
    sendResponse('index.html', 'text/html', res)
  }else{
    sendResponse(req.url, getContentType(req.url), res);
  }
}

function sendResponse(url, contentType, res){
  let file = path.join(__dirname, url);
  fs.readFile(file, (err, content) => {
    if(err){
      res.writeHead(404);
      res.write(`File '${file}' Not Found!`);
      res.end();
      console.log(`Response: 404 ${file}, err`);
    }else{
      res.writeHead(200, {'Content-Type': contentType});
      res.write(content);
      res.end();
      console.log(`Response: 200 ${file}`);
    }
  })
}


function getContentType(url){
  switch (path.extname(url)) {
    case '.html':
      return 'text/html';
    case '.css':
      return 'text/css';
    case '.js':
      return 'text/javascript';
    case '.json':
      return 'application/json';
    default:
      return 'application/octate-stream';
  }
}