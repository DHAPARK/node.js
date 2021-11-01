const express = require('express')
const app = express()

app.get('/',function(req,res){
    res.send('Hello World')
})
app.listen(3000)
// 3000번 포트로 사용자를 기다려라 라는 뜻 3000번 포트로 사용자가 들어오면 위에 app.get 함수로 드가서 get방식으로 웹에 hello world를 찍어줄것이다.(정보를 넘겨준다라는 말이 맞는듯?)
