//import frameworks, libs, and other needed components
const express = require('express');
const app = express();

const port = 12345;

app.listen(port, () => {
	console.log('listening on port ' + port);
});

//Tells which library to use for parsing the request body
//True = qs ---supports nested objects---
//False = querystring ---supports only strings---
app.use(express.urlencoded({ extended: true }));
//JSON parser to info comming from post
app.use(express.json());

app.use(routes);

app.listen(port, () => {
	console.log('listening on port ' + port);
});
