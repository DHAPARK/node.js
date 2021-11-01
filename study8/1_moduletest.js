const express = require('express');
const fs = require('fs');
const app = express();
const bodyparser = require('body-parser');
const port = 3000;

app.engine('html',require('ejs').renderFile) // 실제 폴더를 views에서 찾는다.템플릿에 해당하는 파일을 찾아다가 html로 변환시켜주는데

app.use(bodyparser.urlencoded());

const module1 = require('./router/module1')(app,fs);

app.listen(port,()=>{
    console.log(`${port}번 포트로 서버 실행중...`);

});