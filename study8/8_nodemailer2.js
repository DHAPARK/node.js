const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:false}));
// localhost:3000/mail
const router = express.Router();
router.route('/mail').get((req,res)=>{
    fs.readFile('mail.html','utf8',(err,data)=>{
        if(!err){
            res.writeHead(200,{'content-type':'text/html;charset=utf-8'});
            res.end(data);
        }else{
            console.log('err');
        }
    });
    
});
router.route('/mailok').post((req,res)=>{
    //메일 보내기
    const fromemail = req.body.fromemail;
    const from = req.body.from;
    const to = req.body.to;
    const toemail = req.body.toemail;
    const title = req.body.title;
    const content = req.body.content;
    
    const fromMsg = `${from}<${fromemail}>`;
    const toMsg = `${to}<${toemail}>`;

    const transporter =  nodemailer.createTransport({
        service: 'Gmail',
        auth:{
            user: 'pdh4182@gmail.com',
            pass: 'venessa486',
        },
        host: 'smtp.mail.com',
        port: '465'
    });
    
    const mailOptions = {
        from : fromMsg,
        to : toMsg,
        subject : title,
        text : content
    };
    
    transporter.sendMail(mailOptions,(err,info)=>{
        transporter.close();//메일이 정상적으로 들어왔다하면 트랜스포터 연결한걸끊어주고
        if(err){
            console.log(err);
        }else{
            console.log(info);
        }
    });
});


app.use('/',router);//테스트를 등록해준거고 서버에
app.all('*',(req,res)=>{
    res.status(404).send('<h1>페이지를 찾을 수 없습니다.</h1>');
    // 사용자브라우저에게 이런페이지 없다고 띄워주는것
});

app.listen(port,()=>{
    console.log(`서버${port}번 포트로 실행중`);
});