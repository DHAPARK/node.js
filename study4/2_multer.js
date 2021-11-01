const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const static = require('serve-static');
// url뒤에 바로 떙겨서 쓸수있는 __dir이랑관련있는 serve-static
const path = require('path');
//npm i morgan
const logger = require('morgan');
const port = 3000;

//npm i multer

const app = express();//express객체를 메모리에 올리구
const router = express.Router();
app.use(bodyParser.urlencoded({extended:false})); //bodyparser를 이용할수있게 즉
//post데이터를 받을수있게 
app.use('/public',static(path.join(__dirname,'public')));
app.use('/uploads',static(path.join(__dirname,'uploads')));
//url의 폴더이름을 쓰지않아도 uploads에서 찾을수있게 만들어줌
app.use(logger('dev')) //dev,short,common,bombined


const storage = multer.diskStorage({
    // 객체형식으로 
    destination:(req,file,callback)=>{
        //req=사용자가 전달할 내용들 들어오고
        //file 파일여기로 들어오고
        //그거에대한 결과값이 callback 으로 들어오게됨
        callback(null,'uploads');
    },
    //같은파일이 들어와도 다른파일로 취급하게 해주는 곳이 바로 이 밑
    filename: (req,file,callback)=>{
        const extension = path.extname(file.originalname);
        const basename = path.basename(file.originalname,extension);
        callback(null, basename + "_"+Date.now() + extension);

    }
});

//storage 설정을 완료했고 multer이 남음

const upload = multer({
    storage: storage,//어디에 저장할지 넣어주고
    limit:{
        files:5, //파일을 최대 5개까지 저장할거다.
        fileSize: 100*1024*1024//파일크기는 이정도애들만 받을거다.
        
    }
});

router.route('/write').post(upload.array('photo',1),(req,res)=>{
    console.log('/write 호출!');
    try{

        const title = req.body.title;
        const files = req.files;
        //사용자한테 전달온 files라는것을 req.files하게되면
        //req의 files들을 files에 넣어주게된다.
        console.dir(req.files[0]);
        //파일 한개의 내부를 열어보려고
        const originalname = files[0].originalname;
        const filename = files[0].filename;
        const mimetype = files[0].mimetype;
        const size  = files[0].size;
        console.log(`파일 정보 : 원본파일명:${originalname},파일이름:${filename},마임타입:${mimetype},파일크기:${size}`);
        res.writeHead('200',{'content-type':'text/html;charset=utf8'});
        res.write('<h2>파일 업로드 성공!</h2>');
        res.write('<hr>');
        res.write('<p>제목 :' + title + '</p>');
        res.write(`<p>원본 파일명 : ${originalname}</p>`);
        res.write(`<p>파일명 : ${filename}</p>`);
        res.write(`<p>Mime Type : ${mimetype}</p>`);
        res.write(`<p>파일크기 : ${size}</p>`);
        res.write(`<p><img src='/uploads/${filename}' width='200'></p>`);
        res.end();
    }catch(e){
        console.log(e);
    }
});





app.use("/",router);


app.listen(port,()=>{
    console.log(`${port}번 포트로 서버 동작중...`);
 
    // 서버에 띄우고 대기하면서 DB까지 연결
});