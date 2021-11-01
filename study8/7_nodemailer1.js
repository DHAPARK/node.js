const nodemailer = require('nodemailer');

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
    from: "박도현<pdh4182@gmail.com>",
    to: "박도현 <lulichiyo@naver.com>",
    subject :"node.js의 nodemailer 테스트중입니다.",
    //text : "안녕하세요.메일이 잘 전달되나요????"
    html : "<h1>안녕하세요 . 메일이 잘 전달되었나요????</h1><p>정말 잘 되네요~~</p>"
};

transporter.sendMail(mailOptions,(err,info)=>{
    transporter.close();//메일이 정상적으로 들어왔다하면 트랜스포터 연결한걸끊어주고
    if(err){
        console.log(err);
    }else{
        console.log(info);
    }
});