'use strict';

/*
 * A simple Node.js program for exporting the current working directory via a webserver listing
 * on a hard code (see portno below) port. To start the webserver run the command:
 *    node webServer.js
 *
 * Note that anyone able to connect to localhost:3001 will be able to fetch any file accessible
 * to the current user in the current directory or any of its children.
 */

/* jshint node: true */

var express = require('express');

var portno = 3000;   // Port number to use

var app = express();

// We have the express static module (http://expressjs.com/en/starter/static-files.html) do all
// the work for us.
app.use(express.static(__dirname));

var server = app.listen(portno, function () {
  var port = server.address().port;
  console.log('Listening at http://localhost:' + port + ' exporting the directory ' + __dirname);
});

// app.get('/send', function(req, res){
//     console.log(req.query.feedback);
//     var transporter = nodemailer.createTransport("SMTP",{
//            service: "Gmail",  // sets automatically host, port and connection security settings
//            auth: {
//                user: "amcnary.su@gmail.com",
//                pass: "........."
//            }
// });
//     var mailOptions = {
//       from: '"Bedtime User Review" <amcnary.su@gmail.com>', // sender address
//       to: 'amcnary.su@gmail.com,', // list of receivers
//       subject: 'User Review', // Subject line
//       text: req.query.feedback, // plaintext body
//     };

//     // send mail with defined transport object
//     transporter.sendMail(mailOptions, function(error, info){
//         if(error){
//             return console.log(error);
//         }
//     });

// });