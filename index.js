const https = require("https");
const fs = require("fs");
const express = require('express')
const path = require('path')
const app = express()
const port = 443
const host = '127.0.0.1'


https.createServer(
  {
    key: fs.readFileSync("cert/example.com.key"),
    cert: fs.readFileSync("cert/example.com.crt"),
  },
  app
).listen(port, host, ()=>{
    console.log('server is runing.')
});

app.use(express.static(path.join(__dirname, 'public')))

app.get('/A', (req, res) => {
  res.cookie('test_cookie_a', 'test_cookie_A', {secure: true, path: '/', sameSite: "none", partitioned: true});
  res.send('<!DOCTYPE html><html><body><h1>Hello A!</h1><script src="/xhr.js"></script></body></html>')
})

app.get('/B', (req, res) => {
  res.cookie('test_cookie_b', 'test_cookie_B');
  res.send('<!DOCTYPE html><html><body><h1>Hello B!</h1><script src="/xhr.js"></script></body></html>')
})

app.get('/dummyget', (req, res) => {
  res.send('nothing here!')
})
