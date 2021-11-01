const express = require('express');
const fs = require('fs');
//npm install ejs
const ejs = require('ejs');

const app= express();
const port =3000;

const router = express.Router();

router.route('/login').post((req,res)=>{
   const userinfo = {userid:'apple',userpw:'1234'};
   fs.readFile('ejslogin.ejs','utf8',(err,data)=>{
       res.writeHead(200,{'content-type':'text/html'});
       res.end(ejs.render(data,userinfo));
   });
});

app.use('/',router);
app.all('*',(req,res)=>{
    res.status(404).send('<h1>페이지를 찾을수 없습니다.</h1>');
});

app.listen(port,() =>{
    console.log('포트 ${port}번으로 서버 실행중...');
});