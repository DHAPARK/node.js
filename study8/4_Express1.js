const express = require('express');
const app = express(); //생성wk
const port = 3000;

app.get('/',(req,res)=>{
    res.send('익스 프레스 서버 테스트!');
});

app.listen(port,() =>{
    console.log(`${port}번 포트로 서버 실행중....`);
});
