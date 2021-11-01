const express = require('express');
const bodyParser = require('body-parser');
// npm i multer

const multer = require('multer');
const static = require('serve-static');
const path = require('path');
const logger = require('morgan');

const port = 3000;

const app = express();

const router = express.Router();

app.use(bodyParser.urlencoded({extened: false}));
app.use('/public'.static(path.join(__dirname,'public')));
app.use('/uploads'.static(path.join(__dirname,'uploads')));
app.use(logger('dev')) //dev,short,common,bombined


const storage = multer.diskStorage({
    destination: (req,file,callback) =>{
        //사용자가 전달할 내용들이 req로 
        //file들은 file로
        //그거에대한 콜백 결과값은 callback로 드간다.
        callback(null,'uploads');
    },
    //uploads 에 저장하겠다는 뜻
    
    filename:(req,file,callback)=>{
        const extension = path.extname(file.originalname);
        //확장명을 가져오는 것
        const basename = path.basename(file.originalname,extension);
        //실제 이 파일의 오리지널 네임과 익스텐션을 합쳐서 기본이름을 <<에 저장시켜준다.
        callback(null,basename + "_"+ Date.now()+extension);
    }
});

const upload = multer({
    storage: storage,
    limit: {
        files: 5,
        fileSize: 10 * 1024 * 1024
        //일단 키로바이트 마이트키로바이트 메가바이트 순 so 1메가까지 받을수 있게 만든것
    }
});

router.route('/write').post(upload.array('photo',1),(req,res)=>{
    console.log('/write 호출!');
    try{
        const title = req.body.title;
        const files = req.files;
        console.dir(req.files[0]);
        const originalname = files[0].originalname;
        const filename = files[0].filename;
        const mimetype = files[0].mimetype;
        const size = files[0].size;

        console.log(`파일 정보 : 원본 파일명: ${originalname}, 파일이름:${filename},MimeType:${mimetype},파일크기:${size}`);

        res.writeHead('200',{'content-type':'text/html;charset-utf8'});
        res.write('<h2>파일 업로드 성공</h2>');
        res.write('<hr>');
        res.write('<p>제목 : '+title + '</p>');
        res.write(`<p>원본 파일명 : ${originalname}</p>`);
        
        res.write(`<p>파일명 : ${filename}</p>`);
        res.write(`<p>마임 타입 : ${mimetype}</p>`);
        res.write(`<p>파일 크기 : ${size}</p>`);
        res.write(`<p><img src='/upload/${filename}' width='200'></p>`);
        res.end();
    }catch{
        console.log(e);
    }
});



app.use("/",router);

app.listen(port,()=>{
    console.log(`${port}포트로 서버 동작중...`);
    
});