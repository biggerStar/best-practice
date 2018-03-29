// if you need extra debug function,
// console.log() outputs to the debug panel.
var request = require("request");
var urllib = require("url");
console.log("aaa");
//var opt = urllib.parse("www.baidu.com");
const querystring = require('querystring');
var http = require("http");

const postData = querystring.stringify({
  'msg' : 'Hello World!'
});

const options = {
  hostname: 'www.google.com',
  port: 80,
  path: '/upload',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = http.request(options, (res) => {
  console.log(`状态码: ${res.statusCode}`);
  console.log(`响应头: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`响应主体: ${chunk}`);
  });
  res.on('end', () => {
    console.log('响应中已无数据。');
  });
});

req.on('error', (e) => {
  console.error(`请求遇到问题: ${e.message}`);
});
req.setTimeout(1000,function(err){console.log("timeout");
    req.abort();
});
//req.setTimeout(1000);
// 写入数据到请求主体
console.log("write");
req.write(postData);
console.log("end:");
req.end();
