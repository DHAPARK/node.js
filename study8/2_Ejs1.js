const express = require('express');
const fs = require('fs');
const ejs = require('ejs');
//npm install ejs
const app = express(); //서버 객체만들고
const port = 3000; // 포트 만들고


const router = express.Router(); //라우터 객체 만들고

//http://localhost:3000/test 으로 접속해야 동작 
router.route('/test').post((req,res)=>{
    fs.readFile('./ejstest.ejs','utf8',(err,data)=>{
        if(!err){    
            res.writeHead(200,{'content-type':'text/html'});
            res.end(ejs.render(data));
        }else{
            console.log(err);
        }
    });
});

app.use('/',router);//테스트를 등록해준거고 서버에
app.all('*',(req,res)=>{
    res.status(404).send('<h1>페이지를 찾을 수 없습니다.</h1>');
    // 사용자브라우저에게 이런페이지 없다고 띄워주는것
});

app.listen(port,()=>{
    console.log(`서버${port}번 포트로 실행중`);
})