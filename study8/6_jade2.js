const express = require('express');
const fs = require('fs');
const jade = require('jade');
//npm install jade
const app = express(); //서버 객체만들고
const port = 3000; // 포트 만들고

const router = express.Router();

router.route('/userinfo').post((req,res)=>{
    fs.readFile('userinfo.jade','utf8',(err,data)=>{
        if(!err){
            const jd = jade.compile(data);
            res.writeHead(200,{'content-type':'text/html;charset=utf-8'});
            res.end(jd({userid:"apple",name:"김사과",desc:"착해요"}));
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
});