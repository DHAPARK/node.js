const {Schema} = require('mongoose');
const passport = require('passport');
//npm i crypto
const crypto = require('crypto');
//얘는 암호화 시켜주는 모듈 그래서 다운드 필요

Schema.createSchema = function(mongoose){
    console.log('createSchema() 호출');
    //이 밑부터 고정 스키마
    const MemberSchema = mongoose.Schema({
        userid:{type:String,require:true,default:''},
        //String형식이 들어와야하고 꼭 들어와야하고 기본값은 없다.
        hashed_password:{type:String,dafault:''},
        //mysql떄는 특정한 단방향 암호화방법을썻는데
        //여기선 복호화도 되게 해볼거다. 뭘로 암호화시켰는지는 salt에밑에서 저장해서 그걸가지고 복호화를 할거다.
        //이 hashed_password는 밑에 멤버스키마부터
        name:{type:String,default:''},
        salt:{type:String},
        age:{type:Number,dafault:''},
        created_at:{type:Date,default:Date.now},
        updated_at:{type:Date,default:Date.now},
        provider:{type:String,default:''}//여기엔 페이스북이란걸로 가입했다 라는걸 여기다 써줄라하는거 카카오톡,네이버도 마찬가지로 만들어줄거임 나중에
        ,
        authToken: {type:String,default:''},
        facebook:{}
        
    });
    MemberSchema.virtual('userpw').set(function(userpw){
        this._userpw = userpw;
        this.salt = this.makeSalt();
        //makeSalt를 써서 우리가 만든다.
        this.hashed_password = this.encryptPassword(userpw);
    })
    .get(function(){
        return this._userpw;
    });
    //세팅할때는 set처럼 만들고 가져올때는 get로 가져가게만든다.
    MemberSchema.method('makeSalt',function(){
        //이 멤버스키마 안에서 메서드를만든느데 이름이 makeSalt라는말
        //몽구스 안에서 만드는거라는데 12월5일꺼 2번째파일 끝무렵에있음
    })


    MemberSchema.method('encryptPassword',function(plainText,inSalt){
        if(inSalt){
            return crypto.createHmac('sha1',inSalt).update(plainText).digest('hex');
            //1234 -> db에있는 salt값을 가져와서 1234랑 섞어줌->16진수 변환->비밀번호 
        }else{//회원가입
            return crypto.createHmac('sha1',this.salt).update(plainText).digest('hex');
            //1234 -> 3842313와 비밀번호 1234를 섞어서암호화->16진수로 변환 ->비밀번호
        }
    });

    MemberSchema.method('authenticate',function(plainText,inSalt,hashed_password){
        if(inSalt){
            console.log('authenticate 호출: inSalt(있음)');
            return this.encryptPassword(plainText,inSalt)==hashed_password;
        }else{
            console.log('authenticate 호출:inSalt없음');
            return this.encryptPassword(plainText)==this.hashed_password;
            
        }
    })

    MameberSchema.pre('save',(next)=>{
        if(this.isNew)//새로운값이 들어온게 아니라면
            return next();//다음페이지로 넘겨라
        if(!validatePresenceOf(this.userpw)){
            next(new Error('유효하지않은 password 입니다.'));//비밀번호가 잘못넣거나 안넣어서 통과못했다면
        }else{
            next();//만약 잘 넣었다면 next() 다음으로
        }//값을 체크해주기위한 메서드
    });
    //회원가입에 save전에 얘가 호출되란 뜻임
    //next객체는 node.js초창기때 내가 여기일을 마치고나서 미들웨어 다음으로 넘기기위해쓰는 파라미터 즉 그 다음함수로 넘기는 파라미터
    //어떤 작업이 일어나기전에 자동으로 이뤄져라 라는 메서드 pre()
    const validatePresenceOf = function(value){
        return value && value.length;
    }
    console.log('MemberSchema 정의완료!');
    return MemberSchema;
};




module.exports = Schema;
