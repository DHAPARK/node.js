const express = require('express');
const fs = require('fs');
//npm install ejs
const ejs = require('ejs');

const app = express();
const port = 3000;


const router = express.Router();

//http://localhost:3000/test 으로 들어와야지만 동작 이게 라우트임 내가 갈곳을 지정해주는것
router.route('/test').post((req,res)=>{
    fs.readFile('./ejstest.ejs','utf8',(err,data)=>{
        if(!err){
        res.writeHead(200,{'content-type':'text/html'});
        res.end(ejs.render(data));
        }else{
            console.log(err);
        }
    });
});


app.use('/',router);
app.all('*',(req,res)=>{
    res.status(404).send('<h1>페이지를 찾을 수 없습니다.</h1>');
    // 400번대는 페이지없다는 뜻임 
});

app.listen(port,() => {
    console.log(`포트 ${port}번으로 서버 실행중...`);
});