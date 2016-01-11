var express = require("express"),
     api    = require('./api'),
     users  = require('./account'),
    app     = express();



 app
   .use(express.static('./public'))
   .use(users)
   .use('/api',api)
   .get('*',function (req,res){
   	 if (!req.user){
   	 	res.redirect('/login');

   	 }else{
   	 	res.sendFile('public/main.html');

   	 }
 	res.sendfile('public/main.html');
    })
    .listen(3000);