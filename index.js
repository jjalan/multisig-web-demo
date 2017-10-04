var path = require('path');
var express = require('express');
var app = express();

// Serve static files
app.use('/public', express.static(path.join(__dirname, './public')))

// Let angular handle all requests
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, './public/views/index.html')); // load our public/index.html file
});

app.listen(process.env.PORT || 3000, function () {
	console.log('Frontend server for multisig wallet');
});