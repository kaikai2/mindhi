var express = require('express')
var serveStatic = require('serve-static')

var app = express();

app.use(serveStatic('public', {redirect: true}));
/*app.use(function(req, res){
	res.redirect('/');
});
*/
app.listen(3000);
