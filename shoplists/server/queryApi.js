let http = require('http')

function queryApi(url) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'm.gome.com.cn',
            port: 80,
            path: url,
            method: 'GET',
            headers: {
                // 'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        let data = ''
        const req = http.request(options, (res) => {
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                resolve(data)
            
            });
        });

        req.on('error', (e) => {
            reject(`请求遇到问题: ${e.message}`);
        });
        req.end();
    })
}
module.exports = queryApi;