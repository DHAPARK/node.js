const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const nodemailer = require('nodemailer');

const app=express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: false}));

const router = express.Router();
//http://localhost:3000/mail
router.route('/mail').get((req,res)=>{

        fs.readFile('mail.html','utf8',(err,data)=>{
            if(!err){
            res.writeHead(200,{'content-type':'text/html'});
            res.end(data);
            }else{
                console.log(err);
            }
        });
});


router.route('/mail_ok').post((req,res)=>{
   //여기서 메일을 보내기 하면됨
    const fromemail = req.body.fromemail;
    const from = req.body.from;
    const toemail = req.body.toemail;
    const to = req.body.to;
    const title = req.body.title;
    const content = req.body.content;

    const fromMsg = `${from}<${fromemail}>`;
    const toMsg = `${to}<${toemail}>`

    const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth:{
        user: 'pdh4182@gmail.com',
        pass: 'venessa486'
    },
    host: 'smtp.mail.com',
    port: '465'
});

const mailOptions = {
    form:  fromMsg,
    to: toMsg,
    subject : title,
    text : content
};

transporter.sendMail(mailOptions,(err,info) => {
    transporter.close();
    if(err){
        console.log(err);
    }else{
        console.log(info);
    }
});
});



app.use('/',router);
app.all('*',(req,res)=>{
    res.status(404).send('<h1>페이지를 찾을수 없습니다.</h1>');
});

app.listen(port,() =>{
    console.log('포트 ${port}번으로 서버 실행중...');
});