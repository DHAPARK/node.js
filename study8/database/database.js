const mongoose = require('mongoose');
let database = {};

//express모듈과 config를 바다서 처리
database.init = function(app,config){
    console.log('database init() 호출!');
    connect(app,config);
    //사이트를 개발하고나면 곳곳에 포트 사이트url ㅓㅁ이런걸 적어놓는데가 많은데
    //계속 포트3000번이다 이런거 계속적었는데 나중에 포트가
    //실제로 서비스할라면 80번으로 바까줄건데
    //이런것들의 설정값을 다 일일이 바꿀순없으니까 config에 설정들을 싹다 집어넣었다가 나중에쓸거임
}

function connect(app,config){
    console.log('connect()호출!');
    mongoose.Promise = global.Promise;
    mongoose.connect(config.db_url);
    database.db = mongoose.connection;
    //몽구스의 커넥션응ㄹ 맺어서 정상적으로 잘 만들어졌다하면 데이터베이스안의 db프로퍼티안에 해당 정보를 넣어줘 라는 이야기
    
    database.db.on('error',console.error.bind(console,'mongoose connection error.'));
    database.db.on('open',()=>{
        console.log('데이터베이스 연결 성공!');
        createSchema(app,config);
    });

}

function createSchema(app,config){ //i=0일떄만 돌거 자료가 1개니까
    const schemaLen = config.db_schemas.length;
    console.log('설정된 정의된 스키마의 갯수: %d',schemaLen);
    
    for(let i=0;i<schemaLen;i++){
        const curItem = config.db_schemas[i];//{file:'./member_schema',collection:'member2',schemaName:'MemberSchema',modelName:'MembeerModel'}이 들어감
        const curSchema = require(curItem.file).createSchema(mongoose);
        //이 cur스키마는 itemfile의 모듈을 가지구와서 크리에이트 스키마에 몽구스를 넣어서 실행하게 만들어줍니다.
        console.log(`${curItem.file}모듈을 불러들인 후 스키마를 정의함.`,curItem.file);
        
        const curModel = mongoose.model(curItem.collection,curSchema);
        console.log('%s 컬렉션을 위해 모델 정의함',curItem.collection);
        //이렇게써주면 스키마만들고 거기다 컬렉션을 만들수있게 그렇게 준비가 완료
        database[curItem.schemaName]=curSchema; //database[member_schema]
        database[curItem.modelName] = curModel;  // database[member2]
        console.log('스키마이름[%s],모델이름[%s]이 데이터베이스 객체의 속성으로 추가되었습니다.',curItem.schemaName,curItem.modelName);
        app.set('database',database);
        console.log('database 객체가 app 객체의 속성으로 추가됨');
    }
};
module.exports = database;




