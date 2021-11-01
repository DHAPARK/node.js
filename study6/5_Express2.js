const express = require('express');
const app = express(); //생성자
const port = 3000;

// 1xx : 사용자 처레에 따른 에러 = 100번대 에러
// 2xx : 정상적인 페이지 호출을 의미
// 4xx : 400번대 에러는 페이지가 없는 에러
// 5xx : 500번대는 서버에서 에러가 발생했을때





app.use((req,res)=>{
    res.writeHead('200',{'content-type':'text/html;charset=utf-8'});
    res.end('<h1>익스프레스 서버에서 응답한 메세지이비다.</h1>');
});



app.listen( port, ()=> {
    console.log(`${port} 포트로 서버 실행중....`);
});