const express = require('express');
const bodyParser = require('body-parser'); //post 데이터를 전달받기 위해
const app = express(); //생성자
const port = 3000;

// body-parser을 이용해 apllication/x-www-form-urlencoded 파싱
//extended를 false로 해줘야 우리가 평소에 쓰는 POST방식의 데이터를 전달받을수 있다.
app.use(bodyParser.urlencoded({extended: false}))
app.use((req,res)=>{
    console.log('첫번째 미들웨어 실행');

    const paramId = req.body.userid;
    const paramPw = req.body.userpw;
    //지금이게 body-parser모듈안에서 urlencoded메서드를 extended:false
    //해가지고 req.body.userid랑 req.body.userpw를 post방식으로 받아온건데
    //paramId랑 paramPw로 상수를 정해줘서 여기다가 값을 받아왔다.라는것
    

    res.writeHead(200,{'content-type':'text/html;charset=utf8'});
    res.write('<h1>익스프레스 서버에서 응답한 메세지입니다.</h1>');
    res.write(`<p>아이디 : ${paramId}</p>`);
    res.write(`<p>비밀번호 : ${paramPw}</p>`);
    res.end();//write안에 들어있는 버퍼를 플러쉬 시킴

})



app.listen(port,() =>{
    console.log(`${port}번 포트로 서버 실행중....`);
});
