const os = require('os');

// info about current user
console.log('os.userInfo()', os.userInfo());

// method return the system uptime in seconds
console.log('os.uptime()', os.uptime());


const currentOs = {
    name: os.type(),
    release: os.release(),
    totalMem: os.totalmem(),
    freeMem: os.freemem()
}

console.log('currentOs', currentOs);