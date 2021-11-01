const express = require('express');
const static = require('serve-static');
const path = require('path'); //url정보를 가져오는 모듈임

const app = express();
const port = 3000;

app.use(static(path.join(__dirname,'public')))//이러면 현재 디렉토리를 가져올수있음 이러면 현재 디렉토리를 기준으로 public폴더를 기준으로 public에 직접 접근이 가능하게 만들어주는것

const router = express.Router();

router.route('/sunday').get((req,res)=>{
    res.send("<p>요청이미지 : <img src='/sunday.JPG' alt='일요일'></p>")
});

app.use('/',router);//테스트를 등록해준거고 서버에
app.all('*',(req,res)=>{
    res.status(404).send('<h1>페이지를 찾을 수 없습니다.</h1>');
    // 사용자브라우저에게 이런페이지 없다고 띄워주는것
});

app.listen(port,()=>{
    console.log(`서버${port}번 포트로 실행중`);
});