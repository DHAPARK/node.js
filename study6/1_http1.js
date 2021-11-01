const http = require('http');

http.createServer((req,res) => {
    
    res.writeHead(200,{'content-type':'text/html'});
    res.end('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Node.js</title></head><body><p>처음으로 만드는 Node.js 웹서버 </p></body></html>')

}).listen(3000,() => {
    console.log("서버 실행중...");
});
// 3000은 포트번호 so 포트번호까지 맞아야 들어올수있음
// ex) localhost:3000 번이어야 들어오기 가능