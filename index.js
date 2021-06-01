// neem express-module en steek functionaliteit in constante
const express = require('express');

//constante aanmaken die als webserver zal dienen
const app = express();

// vertel aan webserver dat ik gebruik maak van een view engine en
//dan ook nog de welke, namelijk EJS.
app.set("views", "views");
app.set("view engine", "ejs");

// vertel aan de webserver waar de publieke bestanden zitten
app.use(express.static('public'));

// databestand inladen
const projectposts = require('./data/project.json');
const activiteitposts = require('./data/activiteit.json');


// webserver luister naar GET-commando van de homepagina
app.get("/", function(request, response){
  response.render("start",{
    title: "",
    terug: "",
    terugclass: "hidden",
  });
});

app.get("/inlog", function(request, response){
  response.render("inlog",{
    title: "",
    terug: "",
    terugclass: "hidden",
    bodyclass: "header2"
  });
});

app.get("/home", function(request, response){
    response.render("home",{
      title: "home",
      terug: "",
      terugclass: "hidden",
      bodyclass: "header1"
    });
});

app.get("/evalueren", function(request, response){
  //let data = require('./data/games.json');
    response.render("evalueren",{
      title: "activiteiten evalueren",
      terug: "/home",
      posts: activiteitposts.activiteit,
      terugclass: "",
      bodyclass: "header2"
    });
});

app.get("/evaluatiespel/:postid", function(request, response){
    let color;
    switch (request.params.postid) {
      case "0":
      case "4":
        color= "blue";
        break;
      case "1":
      case "5":
        color= "red";
        break;
      case "2":
      case "6":
        color= "orange";
        break;
      case "3":
      case "7":
        color= "green";
        break;

    }
    response.render("evaluatiespel",{
      title: "evaluatie spel",
      terug: "/evalueren",
      post: activiteitposts.activiteit[request.params.postid],
      terugclass: "",
      color: color,
      bodyclass: "header3"
    });
});

app.get("/bedankt", function(request, response){
  //let data = require('./data/games.json');
    response.render("bedankt",{
      title: "bedankt",
      terug: "/evalueren",
      terugclass: "hidden",
      bodyclass: "header4"
    });
});

app.get("/bedanktfavorieten", function(request, response){
  //let data = require('./data/games.json');
    response.render("bedanktfavorieten",{
      title: "bedankt",
      terug: "/home",
      terugclass: "hidden",
      bodyclass: "header1"
    });
});

app.get("/favorieten", function(request, response){
    response.render("favorieten",{
      title: "favoriete spelletjes",
      terug: "/home",
      terugclass: "",
      bodyclass: "header2"
    });
});

app.get("/spelletjes", function(request, response){
    response.render("spelletjes",{
      title: "spelletjes",
      terug: "/home",
      posts: projectposts.project,
      terugclass: "",
      bodyclass: "header3"
    });
});

app.get("/speluitleg/:postid", function(request, response){
  let color;
  switch (request.params.postid) {
    case "0":
    case "4":
      color= "blue";
      break;
    case "1":
    case "5":
      color= "red";
      break;
    case "2":
    case "6":
      color= "orange";
      break;
    case "3":
    case "7":
      color= "green";
      break;

  }
    response.render("speluitleg",{
      title: "speluitleg",
      terug: "/spelletjes",
      post: projectposts.project[request.params.postid],
      terugclass: "",
      color: color,
      bodyclass: "header4"
    });
});

app.use(function(request, response){
  response.statusCode = 404;
  response.render("404")
});



// server opstarten en beschikbaar maken via URL
//app.listen(2002);
app.set('port', (process.env.PORT || 2002));
app.listen(app.get('port'), function() { });
