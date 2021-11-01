const express = require('express');
const app = express(); //생성wk
const port = 3000;
// http://localhost:3000/?userid=apple이런식으로 호출해야 userid값이나옴
app.use((req,res)=>{
    console.log('첫번째 미들웨어 실행');
    const userAgent = req.header('user-Agent');
    // req객체에는 다양한 정보가 담겨있는데
    //user-Agent 는 사용자의 ip os정보 브라우저 정보가 담겨져있는 항목임
    //그걸 header에서 가져다가 여따 저장해달라는거임
    console.log(userAgent);

    const paramName = req.query.userid;
    console.log(paramName);
    // 이거는 서버에다가 찍는거임
    //그럼 사용자에게도 찍어주도록 할게요
    res.writeHead(200,{'content-type':'text/html;charset=utf8'});
    res.write('<h1>익스프레스 서버에서 응답한 메세지입니다.</h1>');
    res.write(`<p>User-Agent : ${userAgent}</p>`);
    res.write(`<p>paramName : ${paramName}</p>`);
    res.end();//write안에 들어있는 버퍼를 플러쉬 시킴

})



app.listen(port,() =>{
    console.log(`${port}번 포트로 서버 실행중....`);
});
