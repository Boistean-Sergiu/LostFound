var http = require('http');
var fs = require('fs');
var url = require('url');
var mongodb = require("mongodb");


var port = 8085;
var MongoClient = mongodb.MongoClient;

var collections = {
    animale: null, //done
    electronice: null, //done
    useri: null, //done
    haine: null, //done
    bijuterii: null, //done
    tichete: null, //done
    accesorii: null, //done
    bani: null, //done
    jucarii: null, //done
    messages: null  //done
};

Init = function (callback) {   // make a module for that ?
    MongoClient.connect(
            "mongodb://localhost:27017/lost_and_found",
            function (err, db) {
                if (!err) {
                    console.log("[Init] MongoClient we are conected");


                    collections.jucarii = db.collection('jucarii');
                    if (collections.jucarii != null) {
                        console.log("connected to 'jucarii' collection ");
                    } else {
                        console.log(" collections.jucarii is NULL ");
                    }

                    collections.bani = db.collection('bani');
                    if (collections.bani != null) {
                        console.log("connected to 'bani' collection ");
                    } else {
                        console.log(" collections.bani is NULL ");
                    }

                    collections.accesorii = db.collection('accesorii');
                    if (collections.accesorii != null) {
                        console.log("connected to 'accesorii' collection ");
                    } else {
                        console.log(" collections.accesorii is NULL ");
                    }

                    collections.tichete = db.collection('tichete');
                    if (collections.tichete != null) {
                        console.log("connected to 'tichete' collection ");
                    } else {
                        console.log(" collections.tichete is NULL ");
                    }

                    collections.bijuterii = db.collection('bijuterii');
                    if (collections.bijuterii != null) {
                        console.log("connected to 'bijuterii' collection ");
                    } else {
                        console.log(" collections.bijuterii is NULL ");
                    }

                    collections.haine = db.collection('haine');
                    if (collections.haine != null) {
                        console.log("connected to 'haine' collection ");
                    } else {
                        console.log(" collections.haine is NULL ");
                    }

                    collections.animale = db.collection('animale');
                    if (collections.animale != null) {
                        console.log("connected to 'animale' collection ");
                    } else {
                        console.log(" collections.animale is NULL ");
                    }

                    collections.useri = db.collection('useri');
                    if (collections.useri != null) {
                        console.log("connected to 'useri' collection ");
                    } else {
                        console.log(" collections.user is NULL ");
                    }

                    collections.electronice = db.collection('electronice');
                    if (collections.electronice != null) {
                        console.log("connected to 'electronice' collection ");
                    } else {
                        console.log("'collections.electronice' is NULL ");
                    }
                    // de adaugat modificat colectii in functie de ce avem nevoie ...

                } else {
                    console.log(err);
                }
                callback;
            }
    );
};
Init(null);

function send404Response(response) {
    response.writeHead(404, {
        "Content-Type": "text/plain"
    });
    response.write("Error 404: Page not found! ");
    response.end();
}

http.createServer(function (request, response) {

    console.log(request.url);
    var par = url.parse(request.url, true);

    if (request.method == "GET" && par.pathname == "/login.html" && par.query.id_utilizator) {
        var item = {
            _id: par.query.id_utilizator,
            pass: par.query.parola
        };
        collections.useri.findOne({_id: par.query.id_utilizator, parola: par.query.parola},
                function (err, user) {
                    if (user)
                        if (user._id) {
                            console.log("credintiale corecte");
                            response.writeHead(200, {"Content-Type": "text/html"});
                            fs.createReadStream("./html pages/index.html").pipe(response);
                        } else {
                            console.log("credentiale gresite");
                            
                        }
                    if (err) console.log (err);
                }
        );
    }

    if (request.method == "GET" && par.pathname == "/register.html" && par.query.nume) {
        var item = {
            _id: par.query.id_utilizator,
            nume: par.query.nume,
            prenume: par.query.prenume,
            parola: par.query.parola,
            email: par.query.email,
            status : "logged"
        };
        collections.useri.findOne({_id: par.query.id_utilizator}, function (err, user) {
             
            if (user === null ) {
                collections.useri.insert(item, function (err, res) {
                    if (err)
                        console.log(err);
                    console.log("Number of records inserted: " + res.insertedCount);
                                    response.writeHead(200, {"Content-Type": "text/html"});
                fs.createReadStream("./html pages/index.html").pipe(response);
                });
            } else {
                console.log("aces id_utilizator exista deja"); // de returna pe pagina 
                                response.writeHead(200, {"Content-Type": "text/html"});
                fs.createReadStream("./html pages/login.html").pipe(response);
            }
        });

                


    } 
	if (request.method == "GET" && par.pathname == "/new.html" && par.query.titlul){
		var item = {
			titlul : par.query.titlul,
			ziua : par.query.ziua,
			luna : par.query.luna,
			anul : par.query.anul,
			categoria : par.query.categoria,
			stare : par.query.stare,
			poza : par.query.poza,
			descriere : par.query.descriere
		};
	}else
    if (request.method == "GET")
        switch (par.pathname) {
            case '/' :
            {
                response.writeHead(200, {"Content-Type": "text/html"});
                fs.createReadStream("./html pages/indexPrincipal.html").pipe(response);
                break;
            }

            case '/index.html' :
            {
                response.writeHead(200, {"Content-Type": "text/html"});
                fs.createReadStream("./html pages/index.html").pipe(response);
                break;
            }

            case '/indexPrincipal.html':
            {
                response.writeHead(200, {"Content-Type": "text/html"});
                fs.createReadStream("./html pages/indexPrincipal.html").pipe(response);
                break;
            }

            case '/contul.html':
            {
                response.writeHead(200, {"Content-Type": "text/html"});
                fs.createReadStream("./html pages/contul.html").pipe(response);
                break;
            }
            case '/script.js':
            {
                response.writeHead(200, {"Content-Type": "text/javascript"});
                fs.createReadStream("./html pages/script.js").pipe(response);
                break;
            }

            case '/login.html':
            {
                if ( par.query.id_utilizator == null ){
                response.writeHead(200, {"Content-Type": "text/html"});
                fs.createReadStream("./html pages/login.html").pipe(response);
            }
                break;
            }
            case '/conAdmin.html':
            {
                response.writeHead(200, {"Content-Type": "text/html"});
                fs.createReadStream("./html pages/conAdmin.html").pipe(response);
                break;
            }

            case '/gasite.html':
            {
                response.writeHead(200, {"Content-Type": "text/html"});
                fs.createReadStream("./html pages/gasite.html").pipe(response);
                break;
            }

            case '/register.html':
            {
                response.writeHead(200, {"Content-Type": "text/html"});
                fs.createReadStream("./html pages/register.html").pipe(response);
                break;
            }

            case '/pierdute.html':
            {
                response.writeHead(200, {"Content-Type": "text/html"});
                fs.createReadStream("./html pages/pierdute.html").pipe(response);
                break;
            }
            case '/new.html':
            {
                response.writeHead(200, {"Content-Type": "text/html"});
                fs.createReadStream("./html pages/new.html").pipe(response);
                break;
            }
            case '/reports.html':
            {
                response.writeHead(200, {"Content-Type": "text/html"});
                fs.createReadStream("./html pages/reports.html").pipe(response);
                break;
            }

            case '/mesaje.html':
            {
                response.writeHead(200, {"Content-Type": "text/html"});
                fs.createReadStream("./html pages/mesaje.html").pipe(response);
                break;
            }

            case '/newMessage.html':
            {
                response.writeHead(200, {"Content-Type": "text/html"});
                fs.createReadStream("./html pages/newMessage.html").pipe(response);
                break;
            }

            case '/mesajeTrimise.html':
            {
                response.writeHead(200, {"Content-Type": "text/html"});
                fs.createReadStream("./html pages/mesajeTrimise.html").pipe(response);
                break;
            }

            case '/obiecteleMele.html':
            {
                response.writeHead(200, {"Content-Type": "text/html"});
                fs.createReadStream("./html pages/obiecteleMele.html").pipe(response);
                break;
            }

            case '/images/header.png':
            {
                response.writeHead(200, {"Content-Type": "image/png"});
                fs.createReadStream("./images/header.png").pipe(response);
                break;
            }

            case '/images/profile.png':
            {
                response.writeHead(200, {"Content-Type": "image/png"});
                fs.createReadStream("./images/profile.png").pipe(response);
                break;
            }

            case '/images/cauta.png':
            {
                response.writeHead(200, {"Content-Type": "image/png"});
                fs.createReadStream("./images/cauta.png").pipe(response);
                break;
            }

            case '/images/returneaza.png':
            {
                response.writeHead(200, {"Content-Type": "image/png"});
                fs.createReadStream("./images/returneaza.png").pipe(response);
                break;
            }

            case '/images/index.png':
            {
                response.writeHead(200, {"Content-Type": "image/png"});
                fs.createReadStream("./images/index.png").pipe(response);
                break;
            }

            case '/images/profilephoto.png':
            {
                response.writeHead(200, {"Content-Type": "image/png"});
                fs.createReadStream("./images/profilephoto.png").pipe(response);
                break;
            }

            case '/css/homepage.css':
            {
                response.writeHead(200, {"Content-Type": "text/css"});
                fs.createReadStream("./css/homepage.css").pipe(response);
                break;
            }


            case '/css/homepagePrinc.css':
            {
                response.writeHead(200, {"Content-Type": "text/css"});
                fs.createReadStream("./css/homepagePrinc.css").pipe(response);
                break;
            }

            case '/css/login.css':
            {
                response.writeHead(200, {"Content-Type": "text/css"});
                fs.createReadStream("./css/login.css").pipe(response);
                break;
            }

            case '/css/contul.css':
            {
                response.writeHead(200, {"Content-Type": "text/css"});
                fs.createReadStream("./css/contul.css").pipe(response);
                break;
            }

            case '/css/gasite.css':
            {
                response.writeHead(200, {"Content-Type": "text/css"});
                fs.createReadStream("./css/gasite.css").pipe(response);
                break;
            }

            case '/css/mesaje.css':
            {
                response.writeHead(200, {"Content-Type": "text/css"});
                fs.createReadStream("./css/mesaje.css").pipe(response);
                break;
            }

            case '/css/new.css':
            {
                response.writeHead(200, {"Content-Type": "text/css"});
                fs.createReadStream("./css/new.css").pipe(response);
                break;
            }

            case '/css/newMessage.css':
            {
                response.writeHead(200, {"Content-Type": "text/css"});
                fs.createReadStream("./css/newMessage.css").pipe(response);
                break;
            }

            case '/css/pierdute.css':
            {
                response.writeHead(200, {"Content-Type": "text/css"});
                fs.createReadStream("./css/pierdute.css").pipe(response);
                break;
            }

            case '/css/register.css':
            {
                response.writeHead(200, {"Content-Type": "text/css"});
                fs.createReadStream("./css/register.css").pipe(response);
                break;
            }

            default:
            {
                send404Response(response);
            }
        }
}).listen(port);

console.log("listening on port " + port);
