const express = require('express');
const static = require('serve-static');
const path = require('path');


const app = express();
const port = 3000;

app.use(static(path.join(__dirname,'public')));
//현재디렉토리를 기준으로 public이라는폴더를 찾아서 현재 루트로 등록해주겠다는것
//그래서 바로 직접접근이 가능하게 만들어주는것
const router = express.Router();

router.route('/cap').get((req,res) =>{
    res.send("<p>요청 이미지 : <img src='/cap.jpg' alt='일요일'></p>")
});


app.use('/',router);
app.all('*',(req,res)=>{
    res.status(404).send('<h1>페이지를 찾을수 없습니다.</h1>');
});

app.listen(port,() =>{
    console.log('포트 ${port}번으로 서버 실행중...');
});