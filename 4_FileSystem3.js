const fs = require('fs');
//비동기처리는 예외처리를 할필요가없다.
fs.readFile("text1.txt",'utf-8',(err,data)=>{
if(err){
    console.log('에러발생! - 비동기');
}else{
    console.log(data);
}

});
try{
const text = fs.readFileSync('text1.txt',utf-8);
console.log(text);
}catch(e){

    console.log('에러발생! - 동기');
}