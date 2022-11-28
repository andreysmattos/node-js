const EventEmitter = require('events');
const customEmitter = new EventEmitter();

customEmitter.on('response', (name, age)=>{
    console.log(`data recieved: ${name}, ${age}`)
});

customEmitter.emit('response', 'Andrey', 28)