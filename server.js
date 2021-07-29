'use strict'

// express is an npm package for node https://www.npmjs.com/package/express this makes it possible for this server to listen to specific queries 
//made from the specified port and other things such as .use() method to set the headers to avoid cors issues.


const express = require('express')
// you assign express to variable app
const app = express()
// here you are saying if port is not specified used whatever defaulted port or 3000
const port = process.env.PORT || 3000
// you set the port to express so that at the very bottom it can listen to it
app.set('port', port)
// installed node-fetch because request is deprecated
const fetch = require('node-fetch');

// MIDDLEWARE (transform stream): allows data to be received by app with no CORS errors.
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


//.get() is also a method from express, here you are telling the server to perform an action when the "passcode" (/api/translate) is received
app.get('/api/translate', (req, res) => {
  // over in panda-aja! prototype, the app fetched to this server by doing a fetch('localhost:3000/api/translate?&language=ko&phrase="woah") the values after the "?"
  // are sent here as an object which we can access using the parameter of req, req.query and then by using dot notation you can access each value
  const url = `https://microsoft-translator-text.p.rapidapi.com/translate?api-version=3.0&to=${req.query.language}&textType=plain&profanityAction=NoAction&from=${req.query.fromLanguage}`
  console.log('req', req.query, 'call', url);
  // those values are not restricted to be used in the url, you can also use them anywhere you'd like inside this .get() function, and so
  // you are putting the phrase in the body.
  const body = [
		{
			"Text": `${req.query.phrase}`
		}
	]

  // The code below is fetching to the microsoft translation external api. The url above is being attached to the fetch below and being passed are
  //also the headers that rapid api provides, which works as authentication
    fetch(`${url}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "x-rapidapi-key": "e12f972de0msh5f3353dde969f09p1be95bjsna98e93807839",
        "x-rapidapi-host": "microsoft-translator-text.p.rapidapi.com",
        "Accept": '*/*'
      },
      body: JSON.stringify(body)
  })
  .then((response) => response.json())
  .then((data) => res.send(data));

});

app.get('/api/transliterate', (req, res) => {
  const url = `https://microsoft-translator-text.p.rapidapi.com/transliterate?api-version=3.0&language=${req.query.language}&fromScript=${req.query.transliterationCode}&toScript=Latn`
  console.log('req', req.query, 'call', url);
  const body = [
    {"Text": `${req.query.phrase}`}
  ]
    fetch(`${url}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "x-rapidapi-key": "e12f972de0msh5f3353dde969f09p1be95bjsna98e93807839",
        "x-rapidapi-host": "microsoft-translator-text.p.rapidapi.com",
        "Accept": '*/*'
      },
      body: JSON.stringify(body)
  })
  .then((response) => response.json())
  .then((data) => {
    console.log('data in proxy', data);
    res.send(data)
  });

});

app.get('/api/detect', (req, res) => {
  const url = `https://microsoft-translator-text.p.rapidapi.com/Detect?api-version=3.0`
  console.log('req', req.query, 'call', url);
  const body = [
    {"Text": `${req.query.phrase}`}
  ]
    fetch(`${url}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "x-rapidapi-key": "e12f972de0msh5f3353dde969f09p1be95bjsna98e93807839",
        "x-rapidapi-host": "microsoft-translator-text.p.rapidapi.com",
        "Accept": '*/*'
      },
      body: JSON.stringify(body)
  })
  .then((response) => response.json())
  .then((data) => {
    console.log('data in proxy', data);
    res.send(data)
  });

});

// here express is listening to the port for those passcode queries example: /api/translate
app.listen(port, () =>
  console.log(`Listening on port: ${port}`)
)