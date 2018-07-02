const express = require('express');
const apilist = require('./apilist');
const path = require('path');
let app = express();
//请求方式为post时引入插件，并使用
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.all('*', function (req, res, next) {
    res.header({
        'Access-Control-Allow-Origin': "*",//cors
        'Access-Control-Allow-Headers': "Content-Type"
    })
    //调用下一步
    next();
});
app.use(express.static(path.resolve(__dirname)));
console.log(path.resolve(__dirname))
app.get('/', (req, res) => {
    res.render('index', {
        title: 'HTML'
    })
})
apilist(app);

app.listen('3000', function () {
    console.log('server start at:3000');
})