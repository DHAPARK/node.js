const http = require('http');
const fs = require('fs');

http.createServer((req,res) => {
    // 앞이 request자리고 뒤가 response자리인데 a건 b건 x건 이름은 상관없다
    // 그냥 자리만 지켜주면된다.
    fs.readFile('nodejs.png',(err,data) =>{
        if(err){
            console.log(err);
        }else{
            res.writeHead(200,{'content-type':'image/png'});
            res.end(data);
        }
    });
}).listen(3000,()=>{
    console.log('이미지 서버실행중...');
});

http.createServer((req,res)=>{
    fs.readFile('rain.mp3',(err,data)=>{
        if(err){
            console.log(err);
        }else{
            res.writeHead(200,{'content-type':'audio/mp3'});
        }
    })
}).listen(3001,()=>{
    console.log('사운드 서버실행중...');
})