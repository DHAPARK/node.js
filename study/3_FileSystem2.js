const fs = require('fs');
const data = "Hello Node.js !!!!";

fs.writeFile('text2.txt',data,'utf-8',(err) => {
    if(err){
        console.log('error!!');
    }else{
        console.log('저장완료!!-비동기');
    }
});

fs.writeFileSync('text3.txt',data,'utf-8'); //동기식이라 실행하고넘어가니까 익명함수가 필요없음
console.log('저장완료!!-동기');
