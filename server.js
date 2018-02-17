const express= require('express');

const hbs = require('hbs');

const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');



app.use((req,res,next)=>{ // middleware
var now = new Date().toString();
var log = `${now} : ${req.method} ${req.url}`;
console.log(log);
fs.appendFile('server.log',log + '\n', (err)=>{
  if(err){
    console.log('unable to append to server.log');
  }
});
next(); // app won't run until next is called ,it will be in loading state ,next name can be anything ,like n

});

// app.use((req,res,next)=>{
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public')); // middleware

hbs.registerHelper('getCurrentYear',()=>{
return  new Date().getFullYear()
});


hbs.registerHelper('screamIt', (text1, text2)=>{
  return text1.toUpperCase() + text2.toLowerCase() ;
})


app.get('/',(request,response)=>{
  response.render('home.hbs',{
    pageTitle : 'Home',
    //currentYear : getCurrentYear,
    welcomeMessage : 'Welcome to my website home page'
  })
});

// app.get('/',(request,response)=>{
//   //response.send('<h1>Express is started</h1>');
//     response.send({
//       name : 'prashant',age :26,country : 'India'
//     });
// });


app.get('/about', (req,res)=>{
res.render('about.hbs',{
  pageTitle : 'About',
//  currentYear : new Date().getFullYear()
});
});

app.get('/bad',(req,res)=>{
res.send({errormessage : 'unable to connect'});

});

app.listen(3000,()=>{
  console.log('server is up on port 3000');
});
