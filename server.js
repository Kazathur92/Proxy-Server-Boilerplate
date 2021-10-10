'use strict'

// express is an npm package for node https://www.npmjs.com/package/express this makes it possible for this server to listen to specific queries
//made from the specified port and other things such as .use() method to set the headers to avoid cors issues.


const express = require('express')
// you assign express to variable app
const app = express()
// here you are saying if port is not specified used whatever defaulted port or 3000
const port = process.env.PORT || 8000
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


// WITH RAPID API
//.get() is also a method from express, here you are telling the server to perform an action when the "passcode" (/api/madeUpRoute) is received
app.get('/api/madeUpRoute', (req, res) => {
  // over in panda-aja! prototype, the app fetched to this server by doing a fetch('localhost:3000/api/madeUpRoute?&propertyInFrontEndquery="someValue"&anotherPropertyInFrontEndQuery="someOtherValue") the values after the "?"
  // are sent here as an object which we can access using the parameter of req, req.query and then by using dot notation you can access each value
  const url = `https://madeUpUrl.com/routeFromUrl?queryParam=${req.query.propertyInFrontEndQuery}&anotherQueryParam=${req.query.anotherPropertyInFrontEndQuery}`
  console.log('req', req.query, 'call', url);
  // those values are not restricted to be used in the url, you can also use them anywhere you'd like inside this .get() function, and so
  // you are putting the phrase in the body.
  const body = [
		{
			"Text": `${req.query.yetAnotherPropertyInFrontEndQuery}`
		}
	]

  // The code below is fetching to the microsoft translation external api. The url above is being attached to the fetch below and being passed are
  //also the headers that rapid api provides, which works as authentication
    fetch(`${url}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "x-rapidapi-key": "apiKeyGoesHere",
        "x-rapidapi-host": "microsoft-translator-text.p.rapidapi.com",
        "Accept": '*/*'
      },
      body: JSON.stringify(body)
  })
  .then((response) => response.json())
  .then((data) => res.send(data));

});

// OTHER APIs
app.get('/api/madeUpRoute', (req, res) => {
const url = `https://madeUpUrl.com/routeFromUrl?queryParam=${req.query.propertyInFrontEndQuery}&anotherQueryParam=${req.query.anotherPropertyInFrontEndQuery}`
  console.log('req', req.query, 'call', url);
  const body = [
		{
			"Text": `${req.query.yetAnotherPropertyInFrontEndQuery}`
		}
	]
    fetch(`${url}`, {
      method: 'POST',
      authorization: `Bearer ${tokenGoesHere}`,
      headers: {
        "Content-Type": "application/json",
        "Accept": '*/*'
      },
      body: JSON.stringify(body)
  })
  .then((response) => response.json())
  .then((data) => res.send(data));

});

// here express is listening to the port for those passcode queries example: /api/translate
app.listen(port, () =>
  console.log(`Listening on port: ${port}`)
)