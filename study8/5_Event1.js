const events = require('events');
// 이벤트관련 메소드를 사용할 수 있도록 eventEmitter 객체를 만듭니다.
const eventEmitter = new events.EventEmitter();

const connectHandler = function connected(){
    console.log('연결 성공');
    eventEmitter.emit('data_received');
}


eventEmitter.on("connection",connectHandler);
eventEmitter.on('data_received',function(){
    console.log('데이터 수신!');
});

eventEmitter.emit('connection');
console.log('프로그램을 종료합니다.');

