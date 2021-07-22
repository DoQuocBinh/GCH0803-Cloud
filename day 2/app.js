const http = require('http')
const hostname = 'localhost'
const port = 5000;

const server= http.createServer((req,res)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/html');
    switch(req.url){
        case '/home':
        case '/':
            res.end('<h1>Home page<h1>');
            break;
        case '/about':
            res.end('<h1>About page<h1>');
            break;
        default:
            res.end('<h1>File not found<h1>');
            break;
    }
    console.log(new Date().getSeconds())
    
})

server.listen(port,hostname,()=>{
    console.log('Server is running ', port)
})