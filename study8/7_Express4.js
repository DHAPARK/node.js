const express = require('express');
const app = express(); //생성wk
const port = 3000;

app.use((req,res)=>{
    console.log('첫번째 미들웨어 실행');
    res.redirect('https://www.google.com');
    
})










app.listen(port,() =>{
    console.log(`${port}번 포트로 서버 실행중....`);
});
