
const local_signup = requrie('./passport/local_signup');
const local_login = require('./passport/local_login');
const facebook = require('./passport/facebook');



module.exports = function(app,passport){
    console.log('config/passport 호출!');
    


    passport.serializerUser((user,done)=>{
        //이게뭐냐면 패스포트객체의 그 시리얼라이저 유저라는건 일단 가입이 되거나 또는 로그인이 되거나 했을때 자동으로호출되는친구 그때  
        console.log('serializeUser() 호출!',user);
        done(null,user);//콜백에서 넘겨주는 user객체의 정보를 이용하여 세션을 생성합니다.
        //null은 에러객체
        //정상적으로 패스포트에 로그인이 된다면 얘가 자동으로 호출이된다.
        //페이스북을 사용할거니까 페이스북에서 정상적인 호출이 이뤄지면 여기 user객체안쪽으로 자기들이가지고있는정보를 user안쪽으로 일로 보내준다.
        //그럼 요고를자ㅣ고 찌겅보ㅕㅁㄴ 페이스부이 보내준 정보를 알수있다.
        //그러고 done를 호출하면 user를 가지고 사이트에다가 정보를 저장하거나 사용할수있게된다.

    })
    passport.deserializeUser((user,done)=>{
        console.log('deserializerUser() 호출!',user);
        done(null,user);
        //얘는 세션이 사라질 때 자동으로 호출되는애
    })
    //순서대로 세션이 생길때, 사라질때 자동으로 생성되는애들
    //얘네는 정해진애들이다 원래있는
    //근데 문제가 얘네가 호출되기위해서 로그인하고 회원가입쪽에 로그인을 일단 시도한다음에얘네가 호출되거나 해야하는데
    //그래서 여따 모듈을 추가할거
    passport.use('local-signup',local_signup);       
    passport.use('local-login',local_login);
    passport.use('facebook',facebook(app,passport));
       
}