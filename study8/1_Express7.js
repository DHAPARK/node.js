const express = require('express');
const bodyParser = require('body-parser');


const app=express();
const port = 3000;

app.use(bodyParser.urlencoded({encoded:false}))

const router = express.Router();

//http://localhost:3000/member/login 으로 접속해야 동작 이게 라우터가
//하는 역할임
router.route('/member/login').post((req,res)=>{
    console.log('/member/login 호출!');
});
//http://localhost:3000/member/regist 으로 접속해야 동작 
router.route('/member/regist').post((req,res)=>{
    console.log('member/regist 호출!');
});

app.use('/',router);
app.all('*',(req,res)=>{
    res.status(404).send('<h1>페이지를 찾을 수 없습니다.</h1>');
    // 사용자브라우저에게 이런페이지 없다고 띄워주는것
});

app.listen(port,()=>{
    console.log(`서버${port}번 포트로 실행중`);
})