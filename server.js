/********************************************************************************/
/*										*/
/*		server.js							*/
/*										*/
/*	Demonstration Node.JS server using CdQuery database			*/
/*										*/
/********************************************************************************/

// import {madlibs} from './public/js/madlibs.js'

// import * as views from './views'

/********************************************************************************/
/*										*/
/*	Constants								*/
/*										*/
/********************************************************************************/

var PORT = 3000;



/********************************************************************************/
/*										*/
/*	Imports 								*/
/*										*/
/********************************************************************************/

var express = require('express');

var bodyparser = require('body-parser');

var exphbs = require('express-handlebars');
var handlebars = exphbs.create( { defaultLayout: 'main' } )

var session = require('express-session');

const SESSION_KEY = "this is my key";
var uuid = require('uuid');


/********************************************************************************/
/*										*/
/*	Setup routing using express						*/
/*										*/
/********************************************************************************/

function setup()
{
   var app = express();

   app.engine('handlebars', handlebars.engine);
   app.set('view engine', 'handlebars');

   app.use('/html', express.static(__dirname + "/html"));
   app.get('/', function (req,res) { res.redirect("/html/index.html"); } );

   app.use(bodyparser.urlencoded({ extended : false }));

   app.use(session( { secret : SESSION_KEY }));
   app.use(sessionManager);

   app.get('/madlib', requestMadlib);
   app.post('/madlib', displayResult);

   app.all('*', handle404);
   app.use(errorHandler);

   var server = app.listen(PORT);
   console.log("Listening on port " + PORT);
}



/********************************************************************************/
/*										*/
/*	Handle madlib requests							*/
/*										*/
/********************************************************************************/

function requestMadlib(req,res)
{ 
   /*
      
      Task: Fill in the code here to fetch a random madlib and render it. 
      Hints:
         - You can make use of ./views/madlibs.html to render the madlibs.
         - Make use of your code from previous labs to fetch random madlibs.
         - You can make use of sessions to keep track of the madlib that was served to a user
            to render the results upon submit.
   */

   //find random madlib randomly
   //check session?? need to get input from getwords.handlebars
   
   //render result
   // madlibs of randomId .content

   var randomId = Math.random(madlibs.length);
   //input fields 
   
   res.render('./views/madlibs.html', {body: madlibs[randomId]});
}



function displayResult(req,res)
{ 
   /*

      Task: Fill in the code here to render the madlib results.
   */
   //fill in madlib from req.params inputs
   // for (const p of req.params) {
      //need to use the regex function to replace words replaceItems
   // }
   const madlib_index = req.param('index');
   res.render('./views/results.html', { body: replaceItems(madlibs[madlib_index], req.params)});
   //post request

}



/********************************************************************************/
/*										*/
/*	Session creation							*/
/*										*/
/********************************************************************************/

function sessionManager(req,res,next)
{
   if (req.session.uuid == null) {
      req.session.uuid = uuid.v1();
      req.session.save();
   }
   next();
}






/********************************************************************************/
/*										*/
/*	Error handling								*/
/*										*/
/********************************************************************************/

function handle404(req,res)
{
   res.redirect("/html/error.html");
}



function errorHandler(err,req,res,next)
{
   console.log("ERROR on request %s %s %s", req.method, req.url, err);
   console.log("STACK", err.stack);
   res.redirect("/html/error.html");
}




/********************************************************************************/
/*										*/
/*	Main program								*/
/*										*/
/********************************************************************************/

setup();



/* end of server.js */
