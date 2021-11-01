const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: false}));

const router = express.Router();


let database;
// const로 넣지않은이유는 변수로 만들거니까 밑에서 또 tempdb를 대입을 해야하니까 ㅇㅇ
// Mongodb와 연결하는 함수
function connectDB(){
    const databaseUrl = "mongodb://localhost:27017";
    MongoClient.connect(databaseUrl,(err,db)=>{
        if(err){
            console.log(err);
        }else{
            const tempdb = db.db('');
            database = tempdb;
            console.log('mongodb 데이터베이스 연결 성공!');
        }
    });
}

//npm i mongodb


//Rest 작성
//회원 가입부터 만들어보자
//localhost:3000/member/regist를 (post)방식으로 부르는것
router.route('/member/regist').post((req,res)=>{
    console.log('/member/regist 호출되었습니다.');
    const userid = req.body.userid;
    const userpw = req.body.userpw;
    const name = req.body.username;
    const age = req.body.userage;

    console.log(`매개변수 : userid:${userid},
    userpw:${userpw},name:${name},age:${age}`);

    if(database){
        addMember(database,userid,userpw,name,age,(err,result)=>{
            if(err){
            console.log(err);
                res.writeHead('200',{'content-type':'text/html;charset=utf8'});
                res.write("<h2>회원가입 실패</h2>");
                res.write("<p>서버 오류발생! 회원가입에 실패!</p>");
                res.end();
        }

        if(result.insertedCount>0){
            console.log(err);
                res.writeHead('200',{'content-type':'text/html;charset=utf8'});
                res.write("<h2>회원가입 성공</h2>");
                res.write("<p> 회원가입이 성공적으로 되었습니다.</p>");
                res.end();
        }else{
            res.writeHead('200',{'content-type':'text/html;charset=utf8'});
            res.write("<h2>회원가입 실패</h2>");
            res.write("<p>회원가입에 실패하였습니다.</p>");
            res.end();
        }
        });


    }else{
        res.writeHead(200,{'content-type':'text/html;charset=utf8'});
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.write('<p>몽고디비 데이터베이스에 연결하지 못했습니다.</p>');
        res.end();
    }

});

//rest고 localhost:3000/member/login (post)로 호출
router.route('/member/login').post((req,res)=>{
    console.log('/member/login 호출!');
    const userid = req.body.userid;
    const userpw = req.body.userpw;
    console.log(`매개변수:userid:${userid},userpw:${userpw}`);

    if(database){
        loginMember(database,userid,userpw,(err,result)=>{
            if(err){
                console.log(err);
                res.writeHead('200',{'content-type':'text/html;charset=utf8'});
                res.write('<h2>로그인 실패</h2>');
                res.write('<p>서버 오류발생! 로그인에 실패했습니다.</p>');
                res.end();
            }
            if(result){
                console.dir(result); //객체확인 여기 답겨있는객체가 result의 0번이다.
                //여러사람이면 여러사람의 객체가보일것
                const resultUserid = result[0].userid;
                //db에서 0번객체의 아이디를 가져와서 resultUserid 에 넣어주는것
                const resultUserpw = result[0].userpw;
                const resultUserName = result[0].username;

                res.writeHead('200',{'content-type':'text/html;charset=utf8'});
                res.write('<h2>로그인 성공</h2>');
                res.write(`<p>아이디:${resultUserid},비밀번호:${resultUserpw},이름:${resultUserName}</p>`);
                res.end();
            }
        });
    }else{
        res.writeHead('200',{'content-type':'text/html;charset=utf8'});
            res.write("<h2>로그인 실패</h2>");
            res.write("<p>아이디 또는 비밀번호를 확인하세요</p>");
            res.end();
    }
});
//localhost:3000/member/edit (post)
router.route('/member/edit').post((req,res)=>{
    console.log('/member/edit 호출!');

    const userid = req.body.userid;
    const userpw = req.body.userpw;
    const name = req.body.username;
    const age= req.body.userage;
    console.log(`매개변수 :userid:${userid},userpw:${userpw},name:${name},age:${age}`);

    if(database){
        editMember(database,userid,userpw,name,age,(err,result)=>{
            if(err){
                console.log(err);
                res.writeHead('200',{'content-type':'text/html;charset=utf8'})
                res.write('<h2>회원정보 수정 실패</h2>');
                res.write('<p>서버 오류 발생! 정보 수정에실패했습니다.</p>');
                res.end();
            }
            if(result.modifiedCount>0){
                res.writeHead('200',{'content-type':'text/html;charset=utf8'});
                res.write('<h2>회원정보 수정 실패</h2>');
                res.write('<p>정보 수정에 실패했습니다.</p>');
                res.end();
            }
        });
    }else{
        res.writeHead('200',{'content-type':'text/html;charset=utf8'});
                res.write('<h2>로그인 실패</h2>');
                res.write('<p>서버 오류발생! 로그인에 실패했습니다.</p>');
                res.end();
    }
});

//localhost:3000/member/delete (post)
router.route('/member/delete').post((req,res)=>{
    console.log('/member/delete 호출!');
    
    const userid = req.body.userid;

    console.log(`매개변수:userid:${userid}`);

    if(database){
        deleteMember(database,userid,(err,result)=>{
            if(err){
                console.log(err);
                res.writeHead('200',{'content-type':'text/html;charset=utf8'});
                res.write('<h2>회원정보 삭제 실패</h2>');
                res.write('<p>서버 오류 발생! 정보 삭제에 실패하였습니다.</p>');
                res.end();
            }
            if(result.deletedCount> 0){
                res.writeHead('200',{'content-type':'text/html;charset=utf8'});
                res.write('<h2>회원정보 삭제 성공</h2>');
                res.write('<p>서버 오류 발생! 정보 삭제에 성공하였습니다.</p>');
                res.end();
            }else{
                res.writeHead('200',{'content-type':'text/html;charset=utf8'});
                res.write('<h2>회원정보 삭제 실패</h2>');
                res.write('<p>정보 삭제에 실패하였습니다.</p>');
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



//회원가입 db저장
const addMember = function(database,userid,userpw,name,age,callback){
    console.log('addMember 호출!');
    const members = database.collection('member');

    members.insertMany([{userid:userid,userpw:userpw,username:name,age:age}],(err,result)=>{
        if(err){
            console.log(err);
            callback(err,null); //err:err object,result result에는null을 집어넣어서 보낸다.
            return;
        }
        if(result.insertedCount>0)//insertedCount는 데이터가 들어간게 몇개니? 세주는거
            {
                console.log(`사용자 document ${result.insertedCount} 추가되었음.`);
            }else{
                console.log(`사용자 document 추가되지 않음!`);
            }
            //err가 안났으니 null이고 result를 되돌려줄것
            callback(null,result);//null을 보내면 err:null 즉 에러가 없다는말,그리고 result처럼 무슨 값을 넣었다하면 err가 null이고 result에 값을 돌려준다.
        
        //인서트매니 자체가 인서트를 여러개 할수있기때문에
        //,{},{}이런식으로 배열형으로 넣어주는거니까 어쨋든 1개를넣어도
        //배열형으로 [] 감싸줘야함
        //mongodb에 insertMany 메서드 안에 객체형식으로 넣어줌
        }
        //해석 지금넘어온 userid 를 userid로 넣겠다.
    )};

//로그인 확인
const loginMember = function(database,userid,userpw,callback){
    console.log('loginMember 호출!');
    const members = database.collection('member');
    //result[0] result[0]
    members.find({userid:userid,userpw:userpw}).toArray((err,result)=>{
        if(err){
            console.log(err);
            callback(err,null);
            return;
        }
        if(result.length>0){
            console.log('사용자를 찾았습니다.');
            callback(null,result);
        }else{
            console.log('일치하는 사용자를 찾지못했습니다.');
            callback(null,null); //err도 아니지만 data도 없어라는 뜻
        }
    });

}
//회원정보 수정
const editMember = function(database,userid,userpw,name,age,callback){
    console.log('editMember 호출!');
    const members = database.collection('member');

    members.updateOne({userid:userid},{$set:{userid:userid,userpw:userpw,
    username:name,age:age}},(err,result)=>{
        if(err){
            console.log(err);
            callback(err,null);
            return;
        }
        if(result.modifiedCount>0){
            console.log(`사용자 document ${result.modifiedCount}개 수정됨.`);
        }else{
            console.log('수정된 document가 없음');
        }
        callback(null,result);
    });
}

//회원정보 삭제
const deleteMember = function(database,userid,callback){
    console.log('deleteMember 호출!');
    const members = database.collection('member');

    members.deleteOne({userid:userid},(err,result)=>{
        if(err){
            console.log(err);
            callback(err,null);
            return;
        }
        if(result.deletedCount > 0){
            // deletedCount 
            console.log(`사용자 document ${result.deletedCount}개가 삭제됨`);
            console.log(`사용시 document가 삭제됨`);
        }else{
            console.log('사용자 document가 삭제되지 않음.');
        }
        callback(null,result);
    });
}
app.use("/",router);


app.listen(port,()=>{
    console.log(`${port}번 포트로 서버 동작중...`);
    connectDB();
    // 서버에 띄우고 대기하면서 DB까지 연결
});