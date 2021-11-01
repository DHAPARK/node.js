//패스포트 회원가입
//로컬 회원가입
//npm i passport-local
const LocalStrategy = require('passport-local').Strategy;
//내 웹사이트에 회원가입을 시키면 passport에 등록되도록
//
module.exports = new LocalStrategy({
    usernameField:'userid',
    //회원가입의 아이디를 뭐로할거냐
    passwordField:'userpw',
    passReqToCallback:true
    //패스워드의 맞/틀을 판단해서 콜백받을거다.
     
},(req,userid,userpw,done)=>{
    const name = req.body.name;
    const age = req.body.age;
    console.log(`passport의 local-signup 호출 : userid = ${userid},userpw=${userpw},name=${name},age=${age}`);
    
    //실행문장에서 데이터가 blocking 되지 않도록 사용-> async 방식으로 변경
    //뭔말이냐면
    process.nextTink(()=>{
        //비동기방식으로 처리
        //만약이 여러명이 접속해도 대기가아니라 병렬형식으로 젖ㅂ속이 되도록
        const database = req.app.get('database');//데이터베이스 값을 얻어와서 저장을해주고
        database.MemberModel.findOne({userid:userid},(err,user)=>{
            //중복확인
            if(err){
                return done(err);
            }
            if(user){
                console.log('이미 가입한 계정입니다.');
                return done(null,false);
                //에레ㅓ는 아닌데 진행하면안돼
            }else{
                let user = new database.MemberModel({userid:userid,userpw:userpw,name:name,age:age});
                //이런식으로몽고디비에 저장할객체를 유저라고 줍니다.
                user.save((err)=>{
                    if(err){
                        throw err;}
                    console.log('가입완료');
                    return done(null,user);
                });
            }
        })
    })
})