'use strict'

const express = require('express')
const app = express()
const port = process.env.PORT || 443
app.set('port', port)
const request = require('request');

// MIDDLEWARE (transform stream)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/api/maps', (req, res) => {
  console.log("call made to api", req.query)
  const MapsRemoteURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=public+bathroom&location=36.1627,%20-86.7816&radius=10000"
  const query = `&location=${req.query.location}&radius=${req.query.radius}`
  const key = "&key=AIzaSyDOEBqiYykHzoCJyKAij9f2UwaF-DxtuBs"
  console.log(query)
  let apiReq = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=public+bathroom&${query}${key}`
  request.get(apiReq, (err, _, body) => {
    if (err) {
      return console.error("request failed", err)
    }
    res.send(body)
  })
});

app.listen(port, () =>
  console.log(`Listening on port: ${port}`)
)