const express = require('express');
const app = express(); //생성wk
const port = 3000;

app.use((req,res)=>{
    res.writeHead('200',{'content-type':'text/html;charset=utf8'}); 
    res.end('<h1>익스프레스 서버에서 응답한 메세지입니다.');

});






app.listen(port,() =>{
    console.log(`${port}번 포트로 서버 실행중....`);
});
