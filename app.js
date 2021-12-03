const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const util = require("util")
const app = express();
/* 引入cors */
const cors = require('cors');
app.use(cors());
/* 引入body-parser */
const bodyParser = require('body-parser');
const { get } = require('http');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.all('*', function (req, res, next) {
//   if (!req.get('Origin')) return next();
//   // use "*" here to accept any origin
//   res.set('Access-Control-Allow-Origin', '*');
//   res.set('Access-Control-Allow-Methods', 'GET');
//   res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
//   // res.set('Access-Control-Allow-Max-Age', 3600);
//   if ('OPTIONS' == req.method) return res.send(200);
//   next();
// });

app.use((req, res, next) => {
  //设置请求头
  res.set({
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Max-Age': 1728000,
      'Access-Control-Allow-Origin': req.headers.origin || '*',
      'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
      'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
      'Content-Type': 'application/json; charset=utf-8'
  })
  req.method === 'OPTIONS' ? res.status(204).end() : next()
})


let cookie = ""

app.get('/', (req, res) => {
  res.send('<p style="color:red">服务已启动</p>');
})

// 获取网易云登陆后的用户信息
app.get('/api/wyuserinfo',(req, res) => {
    request({
        url: 'https://netease-cloud-music-api-seven-omega.vercel.app/user/account',
        method:'GET',
        headers: {
            Cookie: req.query.cookie
        }
    },function (error, response, body) {
        res.send(body)
    })
})

// 获取网易云登陆后的用户歌单
app.get('/api/wyusersonglist', (req, res) => {
    request({
        url: 'https://netease-cloud-music-api-seven-omega.vercel.app/user/playlist',
        method:'GET',
        headers: {
            Cookie: req.query.cookie
        },
        qs: {
            uid: req.query.id
        }
    },function (error,response, body) {
        res.send(body)
    })
})

// 获取账号信息
app.get('/api/accountinfo', (req, res) => {
    request({
        url: 'https://netease-cloud-music-api-seven-omega.vercel.app/user/subcount',
        method:'GET',
        headers: {
            Cookie: req.query.cookie
        }
    },function (error,response, body) {
        res.send(body)
    })
})

// 获取用户详情
app.get('/api/accountmoreinfo', (req, res) => {
    request({
        url: 'https://netease-cloud-music-api-seven-omega.vercel.app/user/detail',
        method:'GET',
        headers: {
            Cookie: req.query.cookie
        },
        qs: {
            uid: req.query.id
        }
    },function (error,response, body) {
        res.send(body)
    })
})

// 获取网易云登陆后的歌单信息
app.get('/api/loginuserlist', (req, res) => {
    request({
        url: 'https://netease-cloud-music-api-seven-omega.vercel.app/playlist/detail',
        method:'GET',
        headers: {
            Cookie: req.query.cookie
        },
        qs: {
            id: req.query.id
        }
    },function (error,response, body) {
        res.send(body)
    })
})

/* 监听端口 */
app.listen(3001, () => {
  console.log('listen:3001');
})

module.exports = app