const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));



app.use((req, res, next) => {

	var now = new Date().toString();
	var mes = `${now}: ${req.method} ${req.url}`;

	console.log(mes);
	fs.appendFile('server.log', mes + '\n', (err) => {
		if (err) {
			console.log('unable to append to server.log');
		}
	});
	next();
});

// app.use((req, res, next) => {
// 	res.render('maintenance.hbs');
// });



hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});



app.get('/', (req, res) => {
	// res.send('Hello Express!');
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMessage: 'yo dude asuh',
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page',
	});
});

app.get('/bad' , (req, res) => {
	res.send({
		errorMessage: 'errored out bro'
	});
});

app.listen(3000, () => {
	console.log('server is up on port 3000');
});


//create new view file matinence.hbs
//render inside of a new piece of middleware
