//定义接口
let path = require('path');
let fs = require('fs');
let jwt = require('jsonwebtoken');
//引用multer.diskStorage可以解析出地址，更新路径
let multer = require('multer');
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname + '/upload'));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.')[1]);
    }
})
var upload = multer({ storage: storage })
module.exports = function (app) {
    //首页商品列表的接口
    const goodsPath = path.resolve(__dirname, 'goodslist');
    app.get("/api/index/recommend.action", (req, res) => {
        // console.log(req.query);
        if (req.query.page > 3) {
            res.json({
                code: 1000,
                msg: "没有更多数据"
            })
        } else {
            let list = fs.readFileSync(goodsPath + `/list${req.query.page}.json`, 'utf-8');
            // console.log(list);
            res.end(list);
        }

    })
    const queryApi = require('./queryApi');
    //分类接口 FlURL:https://m.gome.com.cn/index.php?ctl=goods_class&act=ajaxGetClassList&cid=17951829
    app.get('/api/classify', (req, res) => {
        queryApi(`/index.php?ctl=goods_class&act=ajaxGetClassList&cid=${req.query.cid}`).then(data => {
            res.end(data);
        })
    })

    //注册接口
    let userpath = path.resolve(__dirname + '/user');
    app.post('/api/user/register', (req, res) => {
        // console.log(req.body);
        let userpath = path.resolve(__dirname + '/user');
        let userlist = JSON.parse(fs.readFileSync(userpath + '/userlist.json', 'utf-8'));
        // console.log(userlist);
        //some遍历数据判断username排除相同的用户
        if (userlist.some(item => {
            return item.username == req.body.username;
        })) {
            res.json({
                msg: 'failed',
                info: '该用户已存在'
            })
            return;
        }
        //所有数据在userlist中
        userlist.push(req.body);
        fs.writeFile(userpath + '/userlist.json', JSON.stringify(userlist), function (err) {
            err ? res.json({
                msg: 'err',
                code: 0
            }) : res.json({
                msg: 'success',
                code: 1
            })
        })
    })

    //登录接口
    app.post('/api/user/login', (req, res) => {
        // console.log(req.body);
        // console.log(req.headers);
        //通过token设置密匙1601E

        let userlist = JSON.parse(fs.readFileSync(userpath + '/userlist.json', 'utf-8'));
        if (userlist.some(item => {
            return item.username == req.body.username && item.password == req.body.password;
        })) {
            let token = jwt.sign(req.body, '1601E', { expiresIn: 60 * 360 });
            res.json({
                msg: 'success',
                code: 1,
                token
            })
        } else {
            res.json({
                msg: '账号或密码错误',
                code: 0
            })
        }
    })

    //购物车接口 购物车列表
    let shoppath = userpath + '/shoplist.json';
    let shoplist = JSON.parse(fs.readFileSync(shoppath, 'utf-8'));
    app.post('/api/shopcart', (req, res) => {
        //解析token, err报错信息  decoded传递过来的正确信息 username password iat=>超时时间  exp
        jwt.verify(req.body.token, '1601E', function (err, decoded) {
            if (err) {
                res.json({
                    msg: '登录失败，重新登录',
                    code: 0
                })
            } else {
                res.json({
                    msg: 'success',
                    code: 1,
                    data: shoplist[decoded.username] || []
                })
            }
        })

    })

    //添加购物车
    app.post('/api/addcart', (req, res) => {
        if (!req.body.token) {
            res.json({
                msg: '参数传递错误,token缺失！',
                code: 0
            })
            return;
        }
        jwt.verify(req.body.token, '1601E', function (err, decoded) {
            // console.log(decoded);
            if (err) {
                res.json({
                    msg: '账号或密码错误，重新登录',
                    code: 0
                })
            } else {
                if (shoplist[decoded.username]) {
                    let flag = false;
                    shoplist[decoded.username].map((item, i) => {
                        if (item.wname == req.body.data.wname) {
                            ++item.count;
                            flag = true;
                        }
                    })
                    if (!flag) {
                        let o = {
                            ...req.body.data,
                            count: 1
                        }
                        shoplist[decoded.username].push(o);
                    }
                } else {
                    shoplist[decoded.username] = [{ count: 1, ...req.body.data }];
                }
                fs.writeFile(shoppath, JSON.stringify(shoplist), function (err) {
                    if (err) {
                        res.json({
                            msg: '添加失败',
                            code: 0
                        })
                    } else {
                        res.json({
                            msg: '添加成功',
                            code: 1
                        })
                    }
                })

            }
        })

    })

    //购物车count改变
    app.post('/api/shopcart/count', (req, res) => {
        // console.log(req.body);
        if (!req.body.token) {
            res.json({
                msg: '参数传递错误,token缺失！',
                code: 0
            })
            return;
        }
        jwt.verify(req.body.token, '1601E', function (err, decoded) {
            // console.log(decoded);
            if (err) {
                res.json({
                    msg: '账号或密码错误，重新登录',
                    code: 0
                })
            } else {
                let goodslist = shoplist[decoded.username];
                goodslist = goodslist.map((item, index) => {
                    if (item.wname == req.body.goodsname) {
                        item.count = req.body.count
                    }
                    return item;
                })
                shoplist[decoded.username] = goodslist;
                fs.writeFile(shoppath, JSON.stringify(shoplist), function (err) {
                    // console.log(shoplist);
                    if (err) {
                        res.json({
                            msg: '修改失败',
                            code: 0
                        })
                    } else {
                        res.json({
                            msg: '修改成功',
                            code: 1
                        })
                    }
                })

            }
        })

    })

    //删除购物车
    app.post('/api/cart/delete', (req, res) => {
        if (!req.body.token) {
            res.json({
                msg: '参数传递错误,token缺失！',
                code: 0
            })
            return;
        }
        jwt.verify(req.body.token, '1601E', function (err, decoded) {
            if (err) {
                res.json({
                    msg: '账号或密码错误，重新登录',
                    code: 0
                })
            } else {
                let arr=[];

                // let goodslist = shoplist[decoded.username];
                // console.log(req.body.name)
                // if (shoplist[decoded.username]) {
                //     shoplist[decoded.username].forEach((v, i) => {
                //         req.body.name.forEach((item, ind) => {
                //             if (v.wname === item) {
                //                 shoplist[decoded.username].splice(i, 1)
                //             }
                //         })
                //     })
                // }
                // console.log(goodslist)
                // let ind;
                // goodslist = goodslist.map((item, index) => {
                //     if (item.wname == req.body.name) {
                // console.log(index)
                //         ind = index
                //     }
                //     return item;
                // })
                // goodslist.splice(ind,1);
                let goodslist = shoplist[decoded.username];
                goodslist = goodslist.map((key, i) => {
                    req.body.name.map((item, index) => {
                        console.log(goodslist[i]);
                        key.wname === item ? delete goodslist[i] : ''
                    })

                })
                shoplist[decoded.username] = goodslist;
                fs.writeFile(shoppath, JSON.stringify(shoplist), function (err) {
                    if (err) {
                        res.json({
                            msg: '删除失败',
                            code: 0
                        })
                    } else {
                        res.json({
                            msg: '删除成功',
                            code: 1
                        })
                    }
                })

            }
        })
    })

    //地址接口管理，请求省市区 
    let additempath = path.resolve(__dirname, 'user/addaddr.json');
    let additemlist = JSON.parse(fs.readFileSync(additempath, 'utf-8'));
    app.post('/api/additem', (req, res) => {
        // console.log(req.body);
        jwt.verify(req.body.token, '1601E', function (err, decoded) {
            // console.log(additemlist[decoded.username]);
            if (!req.body.token) {
                res.json({
                    msg: '参数传递错误,token缺失！',
                    code: 0
                })
                return;
            } else {
                res.json({
                    msg: 'sucess！',
                    code: 1,
                    data: additemlist[decoded.username] || []
                })
            }
        })
    })
    //添加地址
    app.post('/api/addaddr', (req, res) => {
        if (!req.body.token) {
            res.json({
                msg: '参数传递错误,token缺失！',
                code: 0
            })
            return;
        } else {
            //解析token 
            jwt.verify(req.body.token, '1601E', function (err, decoded) {
                if (err) {
                    res.json({
                        msg: '登录失败，重新登陆！',
                        code: 0
                    })
                } else {
                    //读取路径
                    if (additemlist[decoded.username]) {
                        additemlist[decoded.username].push(req.body.data);
                    } else {
                        additemlist[decoded.username] = [req.body.data];
                    }
                    //写入
                    fs.writeFile(additempath, JSON.stringify(additemlist), function (err) {
                        if (err) {
                            res.json({
                                msg: '写入失败！',
                                code: 0
                            })
                        } else {
                            res.json({
                                msg: '写入成功！',
                                code: 1
                            })
                        }
                    })
                }
            })
        }
    })

    //删除地址
    app.post('/api/addaddr/delete', (req, res) => {
        if (!req.body.token) {
            res.json({
                msg: '参数传递错误,token缺失！',
                code: 0
            })
            return;
        }
        jwt.verify(req.body.token, '1601E', function (err, decoded) {
            if (err) {
                res.json({
                    msg: '账号或密码错误，重新登录',
                    code: 0
                })
            } else {
                // if (additemlist[decoded.username]) {
                //     additemlist[decoded.username].forEach((v, i) => {
                //         if (req.body.name.username === v.username) {
                //             additemlist[decoded.username].splice(i, 1)
                //         }
                //     })
                // }
                fs.writeFile(shoppath, JSON.stringify(additemlist), function (err) {
                    if (err) {
                        res.json({
                            msg: '删除失败',
                            code: 0
                        })
                    } else {
                        res.json({
                            msg: '删除成功',
                            code: 1
                        })
                    }
                })
            }
        })
    })

    //上传图片
    app.post('/api/upload', upload.single('img'), (req, res) => {
        console.log(req.file);
        res.json({
            msg: 'success',
            code: 1,
            url: 'http://localhost:3000/upload/' + req.file.filename
        })
    })
}