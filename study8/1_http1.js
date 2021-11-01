const http = require('http');

http.createServer((req,res)=>{

    res.writeHead(200,{'content-type':'text/html'});
    res.end('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Document</title></head><body><p>처음으로 만드는 Node.js 웹서버 </p></body></html>');


}).listen(3000,()=>{
    console.log('서버 실행중...');
});

//웹서버를 띄우는데 3000번으로 띄우면서 listen으로 대기하게 되었고
//createServer로 서버를 만들어서 대기하고있었는데
//사용자가 req정보를 가지고 들어와서 근데 이걸 활용하는건 지금없고
//나는 서버를 클라이언트에게 전달해주겠대
//200 < 정상적으로 요청했고 res로 html언어를 돌려주었다. 라는뜻

// localhost:3000 으로 접속해야한다는거

