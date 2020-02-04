const http = require('http');
const url = require('url')

let userArr = [{
    username: 'tj',
    password: '111'
}]
let lock = false;
http.createServer((req,res) => {
    if(req.method === 'GET') {
        let {pathname, query} = url.parse(req.url,true);
        console.log(req.url, query);
        if(pathname === '/api/login') {
            for(let i = 0; i<userArr.length; i++) {
                if(userArr[i].username === query.username && userArr[i].password === query.password) {
                    lock = true;
                } 
            }
            if(lock) {
                console.log('here')
                res.end(JSON.stringify({
                    status: true,
                    msg: '登陆成功'
                }))
            }
            else {
                res.end(JSON.stringify({
                    status: false,
                    msg: '用户名或密码错误'
                }))
            }
        }
    }
    else if(req.method === 'POST') {

    }
}).listen(8080)