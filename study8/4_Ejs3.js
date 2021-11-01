const express = require('express');
const fs = require('fs');
const ejs = require('ejs');
//npm install ejs
const app = express(); //서버 객체만들고
const port = 3000; // 포트 만들고

const router = express.Router();

const header = fs.readFileSync('header.ejs','utf8');
const body = fs.readFileSync('body.ejs','utf8');

router.route('/about').post((req,res)=>{
    const html = ejs.render(header,{title:'매개변수로 전달된 제목입니다.',content:ejs.render(body,{message:'매개변수로 전달된 텍스트메세지 입니다.'})});
    res.writeHead(200,{'content-type':'text/html'});
    res.end(html);
    
});




app.use('/',router);//테스트를 등록해준거고 서버에
app.all('*',(req,res)=>{
    res.status(404).send('<h1>페이지를 찾을 수 없습니다.</h1>');
    // 사용자브라우저에게 이런페이지 없다고 띄워주는것
});

app.listen(port,()=>{
    console.log(`서버${port}번 포트로 실행중`);
});