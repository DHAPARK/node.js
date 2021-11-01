const LocalStrategy = require('passport-local').Strategy;
//local을 다룰수있는 그니까 내가만든 회원가입,로그인을 다룰수있는객체를만드는것
module.exports = new LocalStrategy({
    usernameField:'userid',
    passwordField:'userpw',
    passReqToCallback:true,

}),(req,userid,userpw,done)=>{
    console.log(`passport의 local-login 호출 : userid=${userid},userpw=${userpw}`);
    let database = req.app.get('database');
    database.MemberModel.findOne({userid:userid},(err,user)=>{
        if(err){return done(err);}
        if(!user){
            console.log('계정이 일치하지 않습니다.');
            return done(null,false);//에러는 아니지만 null   보낼계정은 없어요false
        }
        let authenticate = user.authenticate(password,user.salt,user.hashed_password);
        if(!authenticate){
            console.log('비밀번호가일치하지않습니다.');
            return done(null,false);
        }
        return done(null,user);
        
    });
        
    }