const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
//post 데이터를 받기위한 모듈
//얘를 사용하기위해선 라우터를 만들어서 express에 얘를 등록도 해줘야함


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:false}))
//이러면 실제 post로 데이터를 보내서 받을 수 있게된다.

const router = express.Router();
//라우터는 각각 rest를 분리(류?)하기위해서 쓸수있는 미들웨어

//mongodb 모듈 설치해야 실행가능
//npm install mongodb



let database;

// mongodb 연결 함수
function connectDB(){
    const databaseUrl = "mongodb://localhost:27017";
    MongoClient.connect(databaseUrl,(err,db)=>{
        //에러가나면 err객체가
        //연결이되면 db객체가 돌아옴
        if(err){
            console.log(err);
        }else{
            const tempdb = db.db('nodedb');
            const database = tempdb;
            console.log('mongodb 데이터베이스 연결 성공!');
        }
    })
}
//Rest 작성
//localhost:3000/member/regist (post)
router.route('/member/regist').post((req,res)=>{
    console.log('/member/regist 호출!');
    const userid = req.body.userid;
    const userpw = req.body.userpw;
    const name = req.body.username;
    const age = req.body.userage;

    console.log(`매개변수 : userid:${userid},userpw:${userpw},name:${name},age:${age}`);
    
    if(database){
        //아까 넘겨준 자료들ㅇ이 db에 있니? 
        addMember(database,userid,userpw,name,age,(err,result)=>{
            if(err){
                console.log(err);
                res.writeHead('200',{'content-type':'text/html;charset=utf8'});
                res.write('<h2>회원가입 실패</h2>');
                res.write('<p>서버 오류 발생! 회원가입에 실패하였습니다.</p>');
                res.end();        
            }
            if(result.insertedCount > 0){
                res.writeHead('200',{'content-type':'text/html;charset=utf8'});
                res.write('<h2>회원가입 성공</h2>');
                res.write('<p>회원가입이 성공적으로 되었습니다.</p>');
                res.end();
            }else{
                res.writeHead('200',{'content-type':'text/html;charset=utf8'});
                res.write('<h2>회원가입 실패</h2>');
                res.write('<p>회원가입에 실패하였습니다.</p>');
                res.end();
            }
        });

    }else{
        res.writeHead('200',{'content-type':'text/html;charset=utf8'});
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.write('<p>mongodb 데이터베이스에 연결하지 못했습니다.</p>');
        res.end();
    }

});

//localhost:3000/member/login (post)
router.route('/member/login').post((req,res)=>{
    console.log('/member/login 호출!');
    const userid = req.body.userid;
    const userpw = req.body.userpw;
    console.log(`매개변수 : userid:${userid},userpw:${userpw},name:${name},age:${age}`);
    
    if(database){
        loginMember(database,userid,userpw,(err,result)=>{
            if(err){
                console.log(err);
                res.writeHead('200',{'content-type':'text/html;charset=utf8'});
                res.write('<h2>로그인 실패</h2>');
                res.write('<p>서버 오류 발생! 로그인에 실패했습니다</p>');
                res.end();
            }
            if(result){
                console.dir(result); //객체를 확인해 볼수있음
                const resultUserid = result[0].userid;
                const resultUserpw = result[0].userpw;
                const resultUsername = result[0].username;
                
                res.writeHead('200',{'content-type':'text/html;charset=utf8'});
                res.write('<h2>로그인 성공</h2>');
                res.write(`<p>아이디 : ${resultUserid}</p>`);
                res.write(`<p>비밀번호 : ${resultUserpw}</p>`);
                res.write(`<p>이름 : ${resultUserName}</p>`);
                res.end();

            }else{
                res.writeHead('200',{'content-type':'text/html;charset=utf8'});
                res.write('<h2>로그인 실패</h2>');
                res.write('<p>아이디 또는 비밀번호를 확인하세요.</p>');
                res.end();
            }
        });
    }else{
        
            res.writeHead('200',{'content-type':'text/html;charset=utf8'});
            res.write('<h2>데이터베이스 연결 실패</h2>');
            res.write('<p>mongodb 데이터베이스에 연결하지 못했습니다.</p>');
            res.end();
           
    }
});


//로그인 확인
const loginMember = function(database,userid,userpw,callback){
    console.log('loginMember 호출!');
    const members = database.collection('member');

    //result[0] result[1] .. 

    members.find({userid:userid,userpw:userpw}).toArray((err,result)=>{
        if(err){
            console.log(err);
            callback(err,null);
            return;
        }
        if(result.length >0){
            console.log('사용자를 찾았습니다.');
            callback(null,result);
        }else{
            console.log('일치하는 사용자를 찾지 못했습니다.');
            callback(null,null);
        }
    });
}

//localhost:3000/member/edit(post)
router.route('/member/edit').post((req,res)=>{
    console.log('/member/edit 호출!');

    const userid = req.body.userid;
    const userpw = req.body.userpw;
    const name = req.body.username;
    const age = req.body.userage;


    console.log(`매개변수 : userid:${userid},userpw:${userpw},name:${name},age:${age}`);

    if(database){

        editMember(database,userid,userpw,name,age,(err,result)=>{
            if(err){
                console.log(err);
                res.writeHead('200',{'content-type':'text/html;charset=utf8'});
                res.write('<h2>회원정보 수정 실패</h2>');
                res.write('<p>서버 오류 발생! 정보 수정에 실패했습니다.</p>');
                res.end();
            }
            if(result.modifiedCount > 0){
                res.writeHead('200',{'content-type':'text/html;charset=utf8'});
                res.write('<h2>회원정보 수정 성공</h2>');
                res.write('<p>회원정보 수정에 성공했습니다.</p>');
                res.end();
            }else{
                res.writeHead('200',{'content-type':'text/html;charset=utf8'});
                res.write('<h2>회원정보 수정 실패</h2>');
                res.write('<p>회원정보 수정에 실패했습니다.</p>');
                res.end();
            }
        });

    }else{
        res.writeHead('200',{'content-type':'text/html;charset=utf8'});
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.write('<p>mongodb 데이터베이스에 연결하지 못했습니다.</p>');
        res.end();
    }
});


//localhost:3000/member/delete
router.route('/member/delete').post((req,res)=>{
    console.log('/member/delete 호출!');

    const userid = req.body.userid;

    console.log(`매개변수 : userid:${userid}`);


    if(database){
        deleteMember(database,userid,(err,result)=>{
           if(err){
            console.log(err);
            res.writeHead('200',{'content-type':'text/html;charset=utf8'});
            res.write('<h2>회원정보 삭제 실패</h2>');
            res.write('<p>서버 오류 발생! 정보 삭제에 실패했습니다.</p>');
            res.end();
           }
           if(result.deletedCount > 0){
            res.writeHead('200',{'content-type':'text/html;charset=utf8'});
            res.write('<h2>회원정보 삭제 성공</h2>');
            res.write('<p>회원정보 삭제에 성공했습니다.</p>');
            res.end();
           }else{
            res.writeHead('200',{'content-type':'text/html;charset=utf8'});
            res.write('<h2>회원정보 삭제 실패</h2>');
            res.write('<p>회원정보 삭제에 실패했습니다.</p>');
            res.end();
           }
        });   
    }else{
        res.writeHead('200',{'content-type':'text/html;charset=utf8'});
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.write('<p>mongodb 데이터베이스에 연결하지 못했습니다.</p>');
        res.end();
    }
});






//회원가입 db 저장
const addMember = function(database,userid,userpw,name,age,callback){
    console.log('addMember 호출!');
    const members = database.collection('member'); 

    members.insertMany([{userid:userid, userpw:userpw,username:name,age:age}],(err,result) =>{
        if(err){
            console.log(err);
            callback(err,null); //err:err object,result:null
            return;
        }
        if(result.insertedCount > 0){
            //insertedCount 는 result 에 들어간개 몇개인지 세어주는 애? 머라해야하지
            console.log(`사용자 다큐먼트${result.insertedCount}개가 추가되었습니다  .`);
        }else{
            console.log('사용자 document가 추가되지 않음!');
        }
        callback(null,result);
    });
    //insertMany자체가 여러개를 같이 insert할수있기때문에 대괄호로 감싼다.
    //insertMany() mongodb에 데이터를 인서트 시킬때 쓰는 메서드 데이터를 객체형식으로 넣기가능
    //err가 없다 err:null이라는 뜻 err이 null이면서 result에 결과를 return 하라는 얘기

}

//회원정보 수정
const editMember = function(database,userid,userpw,name,age,callback){
    console.log('editMember 호출!');
    const members = database.collection('member');

    members.updateOne({userid:userid}, {$set:{userid:userid,userpw:userpw,username:name,age:age}},(err,result)=>{

        if(err){
            console.log(err);
            callback(err,null);
            return;
        }
        if(result.modifiedCount > 0){
            console.log(`사용자 document ${result.modifiedCount}개 수정됨.`);
        }else{
            console.log('수정된 document가 없음');
        }
        callback(null,result);
    });
}



//회원정보 삭제
const deleteMember = function(database,userid,callback){
    console.log('deleteMember 호출 !');
    const members = database.collection('member');
    members.deleteOne({userid:userid},(err,result)=>{
        if(err){
            console.log(err);
            callback(err,null);
            return;
        }
        if(result.deletedCount > 0){
            console.log(`사용자 document ${result.modifiedCount}개 삭제됨`);
        }else{
            console.log(`사용자 document 가 삭제되지 않음`);
        }
        callback(null,result);

    });
}



app.use("/",router);




app.listen(port,()=>{
    console.log(`${port}포트로 서버 동작중...`);
    connectDB();
});