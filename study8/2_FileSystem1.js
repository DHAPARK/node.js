const fs = require('fs'); // 파일을 다루는 모듈
fs.readFile('text1.txt','utf-8',(err,data)=>{
    // 만약에내가 여기에다가 파일을 넣고 utf-8이라고 읽어와서 쓰게되면 쓰고나서 파일이
    // 정삭적으로 읽혔다그러면 그 내용을 data에 넣어주고 뭔가 읽다가 잘못되면
    // err객체가 만들어진다. 얘가 비동기 방법이기떄문에 시스템에서 호출하게된다.
    // 
    if(err){
        console.log(err);

    }else{
        console.log(`비동기식으로 읽음:${data}`);
    }
});
const text = fs.readFileSync('text1.txt','utf8'); //동기식으로 데이터를읽었다고 할수있음
console.log(`동기식으로 읽음:${text}`);


// 얘는 콜백함수이다. readFile 형태를보면 안다. 마우스 오래되면 보임