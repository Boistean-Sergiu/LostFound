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

function parseCookies(request) {
    var list = {},
            rc = request.headers.cookie;

    rc && rc.split(';').forEach(function (cookie) {

        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}

http.createServer(function (request, response) {
    console.log(request.url);
    var par = url.parse(request.url, true);
    var cookies = parseCookies(request);
    console.log(cookies);
    if (request.method == "GET")
        switch (par.pathname) {
            case '/images/profile.png':
            {
                response.writeHead(200, {"Content-Type": "image/png"});
                fs.createReadStream("./images/profile.png").pipe(response);
                break;
            }
            case '/images/header.png':
            {
                response.writeHead(200, {"Content-Type": "image/png"});
                fs.createReadStream("./images/header.png").pipe(response);
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
                if (!cookies.user)

                {
                    switch (par.pathname)
                    {
                        case '/' :
                        {
                            response.writeHead(200, {"Content-Type": "text/html"});
                            fs.createReadStream("./html pages/indexPrincipal.html").pipe(response);
                            break;
                        }
                        case '/index.html' :
                        {
                            response.writeHead(200, {"Content-Type": "text/html"});
                            fs.createReadStream("./html pages/indexPrincipal.html").pipe(response);
                            break;
                        }
                        case '/indexPrincipal.html':
                        {
                            response.writeHead(200, {"Content-Type": "text/html"});
                            fs.createReadStream("./html pages/indexPrincipal.html").pipe(response);
                            break;
                        }
                        case '/login.html':
                        {
                            if (!par.query.id_utilizator) {
                                response.writeHead(200, {"Content-Type": "text/html"});
                                fs.createReadStream("./html pages/login.html").pipe(response);
                            } else {
                                var item = {
                                    _id: par.query.id_utilizator,
                                    pass: par.query.parola
                                };
                                console.log(item);
                                collections.useri.findOne({_id: par.query.id_utilizator},
                                        function (err, user) {
                                            if (user)
                                                if (user._id) {   // , parola: par.query.parola}
                                                    if (par.query.parola == user.parola) {
                                                        console.log("credintiale corecte");
                                                        var pas = Math.random() * (999999 - 100000) + 100000;
                                                        //  collections.useri.update({_id: par.query.id_utilizator}, {status: "logged", pass: pas}, function (err) {});
                                                        var cookie1 = 'user=' + par.query.id_utilizator;
                                                        response.writeHead(200, {
                                                            'Set-Cookie': cookie1,
                                                            "Content-Type": "text/html"}
                                                        );
                                                        fs.createReadStream("./html pages/index.html").pipe(response);
                                                    }
                                                } else {
                                                    console.log("credentiale gresite");
                                                }
                                            if (err)
                                                console.log(err);
                                        }
                                );
                            }
                            break;
                        }
                        case '/register.html':
                        {
                            if (!par.query.nume) {
                                response.writeHead(200, {"Content-Type": "text/html"});
                                fs.createReadStream("./html pages/register.html").pipe(response);
                            } else {
                                var item = {
                                    _id: par.query.id_utilizator,
                                    nume: par.query.nume,
                                    prenume: par.query.prenume,
                                    parola: par.query.parola,
                                    email: par.query.email,
                                    status: "log",
                                    pass: "123"
                                };
                                collections.useri.findOne({_id: par.query.id_utilizator}, function (err, user) {

                                    if (user === null) {
                                        collections.useri.insert(item, function (err, res) {
                                            if (err)
                                                console.log(err);
                                            console.log("Number of records inserted: " + res.insertedCount);
                                            response.writeHead(200, {"Content-Type": "text/html"});
                                            fs.createReadStream("./html pages/login.html").pipe(response);
                                        });
                                    } else {
                                        console.log("aces id_utilizator exista deja"); // de returna pe pagina 
                                        response.writeHead(200, {"Content-Type": "text/html"});
                                        fs.createReadStream("./html pages/login.html").pipe(response);
                                    }
                                });
                            }
                            break;
                        }
                        default:
                        {
                            send404Response(response); // or you need to log in in order to continue;
                        }
                    }

                } else {
                    console.log("logged");
                    collections.useri.findOne({_id: cookies.user}, /* , status: "logged", pass: cookies.pass*/
                            function (err, user)
                            {
                                if (err) {
                                    console.log(err);
                                    console.log("eroare")
                                }
                                if (user) {
                                    console.log("FOUND")
                                    switch (par.pathname) {
                                        case '/contul.html':
                                        {
                                            response.writeHead(200, {"Content-Type": "text/html"});
                                            fs.createReadStream("./html pages/contul.html").pipe(response);
                                            break;
                                        }
                                        case '/':
                                        {
                                            response.writeHead(200, {"Content-Type": "text/html"});
                                            fs.createReadStream("./html pages/index.html").pipe(response);
                                            break;
                                        }
                                        case '/index.html':
                                        {
                                            response.writeHead(200, {"Content-Type": "text/html"});
                                            fs.createReadStream("./html pages/index.html").pipe(response);
                                            break;
                                        }


                                        case '/gasite.html':
                                        {
                                            if (!par.query.anunturi) {
                                                response.writeHead(200, {"Content-Type": "text/html"});
                                                fs.createReadStream("./html pages/gasite.html").pipe(response);
                                            }
                                            break;
                                        }
                                        case '/gasite':
                                        {
                                            if (par.query.anunturi == 1)
                                                collections.electronice.find({'stare': "gasit"}).toArray(function (err, items) {
                                                    //console.log(items);
                                                    response.writeHead(200, {"Content-Type": "text/html"});
                                                    response.write("<table>");
                                                    for (i = 0; i < items.length; i++) {
                                                        response.write("<tr>");
                                                        response.write("<th> _id " + JSON.stringify(items[i]._id));
                                                        response.write("<th> ziua " + JSON.stringify(items[i].ziua));
                                                        response.write("<th> luna " + JSON.stringify(items[i].luna));
                                                        response.write("<th> categoria " + JSON.stringify(items[i].categoria));
                                                        response.write("</tr>");
                                                        //response.write(JSON.stringify(items));

                                                    }
                                                    response.write("</table>");
                                                    response.end();
                                                })
                                            break;
                                        }

                                        case '/pierdute.html':
                                        {
                                            if (!par.query.anunturi) {
                                                response.writeHead(200, {"Content-Type": "text/html"});
                                                fs.createReadStream("./html pages/pierdute.html").pipe(response);
                                            } else {
                                                collections.electronice.find({'stare': "pierdut"}).toArray(function (err, items) {
                                                    //console.log(items);
                                                    response.writeHead(200, {"Content-Type": "text/plain"});
                                                    response.write(JSON.stringify(items));
                                                    response.end();
                                                })
                                            }
                                            break;
                                        }
                                        case '/pierdute':
                                        {
                                            if (par.query.anunturi) {
                                                collections.electronice.find({'stare': "pierdut"}).toArray(function (err, items) {
                                                    response.writeHead(200, {"Content-Type": "text/plain"});
                                                    response.write(JSON.stringify(items));
                                                    response.end();
                                                })
                                            }
                                            break;
                                        }
                                        case '/new.html':
                                        {
                                            if (!par.query.titlul) {
                                                response.writeHead(200, {"Content-Type": "text/html"});
                                                fs.createReadStream("./html pages/new.html").pipe(response);
                                            } else {
                                                var item = {
                                                    _id: par.query.titlul,
                                                    ziua: par.query.Ziua,
                                                    luna: par.query.Luna,
                                                    anul: par.query.Anul,
                                                    Categoria: par.query.Categoria,
                                                    stare: par.query.stare,
                                                    //poza :par.query.poza,
                                                    descriere: par.query.descriere
                                                }


                                                collections[par.query.Categoria].findOne({_id: par.query.titlul}, function (err, user) {

                                                    if (user === null) {

                                                        collections[par.query.Categoria].insert(item, function (err, res) {
                                                            if (err)
                                                                console.log(err);
                                                            console.log("Number of records inserted: " + res.insertedCount);
                                                            response.writeHead(200, {
                                                                "Content-Type": "text/html"
                                                            });
                                                            fs.createReadStream("./html pages/AnuntCreat.html").pipe(response);
                                                        });
                                                    } else {
                                                        console.log("titlul anuntului este deja in baza de date la aceasta categorie"); // de returna pe pagina 
                                                        response.writeHead(200, {
                                                            "Content-Type": "text/html"
                                                        });
                                                        fs.createReadStream("./html pages/AnuntNeCreat.html").pipe(response);
                                                    }
                                                });
                                            }

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
                                        default:
                                        {
                                            send404Response(response);
                                        }

                                    }

                                } else {
                                    send404Response(response);

                                    console.log("user null")
                                    // response.write ( you need to login insend404Response(response);
                                }
                            });
                }
            }
        }
}).listen(port);
console.log("listening on port " + port);