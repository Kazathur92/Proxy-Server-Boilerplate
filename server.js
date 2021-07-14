'use strict'

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
app.set('port', port)
const request = require('request');
// const fetch = require('node-fetch');

// MIDDLEWARE (transform stream)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/api/translate', (req, res) => {
  // const query = `&location=${req.query.location}&radius=${req.query.radius}`
  const key = "$key=e12f972de0msh5f3353dde969f09p1be95bjsna98e93807839"
  const url = `https://microsoft-translator-text.p.rapidapi.com/translate?api-version=3.0&to=${req.query.language}&textType=plain&profanityAction=NoAction&from=en`
  const body = [
		{
			"Text": `${req.query.phrase}`
		}
	]

  console.log("body", body, req.query);
  console.log("call made to api", req.query.language)
  console.log("hello", url);
  // let lang = `${req.query.language}`

  request.post(
    {
       url: `${url}`,
       headers: {
              "content-type": "application/json",
		          "x-rapidapi-key": "e12f972de0msh5f3353dde969f09p1be95bjsna98e93807839",
		          "x-rapidapi-host": "microsoft-translator-text.p.rapidapi.com"
       },
       body: JSON.stringify(body),
      },
      function (error, response, body) {
        // console.log('error', error);
        // console.log('response', response);
        // console.log('body', body);
        res.send(body); 
      }
    );

});

app.get('/api/transliterate', (req, res) => {
  // const query = `&location=${req.query.location}&radius=${req.query.radius}`
  const url = `https://microsoft-translator-text.p.rapidapi.com/transliterate?api-version=3.0&language=${req.query.language}&fromScript=Kore&toScript=Latn`
  const body = [
    {"Text": `${req.query.phrase}`}
  ]

  console.log("body", body, req.query);
  console.log("call made to api", req.query.language)
  console.log("hello", url);
  // let lang = `${req.query.language}`

  request.post(
    {
       url: `${url}`,
       headers: {
              "content-type": "application/json",
		          "x-rapidapi-key": "e12f972de0msh5f3353dde969f09p1be95bjsna98e93807839",
		          "x-rapidapi-host": "microsoft-translator-text.p.rapidapi.com"
       },
       body: JSON.stringify(body),
      },
      function (error, response, body) {
        // console.log('error', error);
        // console.log('response', response);
        // console.log('body', body);
        res.send(body); 
      }
    );

});

app.listen(port, () =>
  console.log(`Listening on port: ${port}`)
)