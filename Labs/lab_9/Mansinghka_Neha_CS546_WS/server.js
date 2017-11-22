const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
//var db = require('./db');
const app = express();
const configRoutes = require("./routes");
const static = express.static(__dirname + '/public');

const exphbs = require("express-handlebars");

const Handlebars = require("handlebars");

const handlebarsInstance = exphbs.create({
    defaultLayout: "main",
    // Specify helpers which are only registered on this instance.
    helpers: {
      asJSON: (obj, spacing) => {
        if (typeof spacing === "number")
          return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));
  
        return new Handlebars.SafeString(JSON.stringify(obj));
      }
    }
  });

  const rewriteUnsupportedBrowserMethods = (req, res, next) => {
    // If the user posts to the server with a property called _method, rewrite the request's method
    // To be that method; so if they post _method=PUT you can now allow browsers to POST to a route that gets
    // rewritten in this middleware to a PUT route
    if (req.body && req.body._method) {
      req.method = req.body._method;
      delete req.body._method;
    }
  
    // let the next middleware run:
    next();
  };

  app.engine("handlebars", handlebarsInstance.engine);
  app.set("view engine", "handlebars");

  app.use("/public", static);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
  app.use(rewriteUnsupportedBrowserMethods);

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(flash());

  app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    /* res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error'); 
    res.locals.user = req.user || null; */
    next();
  });  
  
  configRoutes(app);

  app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
  });