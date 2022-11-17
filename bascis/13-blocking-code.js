const http = require('http');


const server = http.createServer((req, res)=>{

    if(req.url === '/'){
     
        setTimeout(()=>{
            res.end('Home Page');
        },0)
        
    } else if(req.url === '/about'){
        setTimeout(()=>{
            for (let index = 0; index < 1000; index++) {
                for (let j = 0; j < 500; j++) {
                    console.log(`${index} ${j}`)
                }
            }
            return res.end("About")
        },0)
       
    } else {
        return res.end('Error page');
    }

});


server.listen(5000, ()=>{
    console.log('Server is Listenning on port 5000');
})