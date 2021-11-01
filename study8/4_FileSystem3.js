const fs = require('fs');

//비동기 처리는 예외처리를 할 필요가없습니다.
//이미 에러에관한 함수를 가지고있어어 이미 예외처리가 되어있다.
fs.readFile('text1.txt','utf-8',(err,data)=>{
    if(err){
        console.log('에러 발생 - 비동기');
    }else{
        console.log(data)
    }
});
try{
const text = fs.readFileSync('text11.txt','utf-8');
console.log(text);
}catch(e){
    // console.log(e);
    console.log('에러 발생! -동기')
}