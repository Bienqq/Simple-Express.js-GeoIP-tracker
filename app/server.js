const express = require("express")
const axios = require("axios")

const UNIQUE_TOKEN_LENGHT = 10

const GEO_IP_API_URL = "http://ip-api.com/json/"
const SERVER_DOMAIN = "http://www.localhost:8090/tracking/"

module.exports = class MyServer {
    constructor(port) {
        this.app = express()

        // directory with html, styles, scripts
        this.app.use(express.static("public"))
        // directory with Vue dependencies
        this.app.use(express.static("../node_modules/vue/dist"))
        //directory with libs to send AJAX request
        this.app.use(express.static("../node_modules/axios/dist"))
        //using ejs template engine
        this.app.set('view engine', 'ejs');


        this.viewsDir = __dirname + "\\public\\views\\"

        this.app.listen(port);
    }

    init() {
        this.app.get("/index", (request, response) => {
            response.statusCode = 200
            response.render(this.viewsDir + "index")
        });

        this.app.get("/generate", (request, response) => {
            response.statusCode = 200
            var generatedLink = SERVER_DOMAIN + generateUniqueString()
            response.send(generatedLink)
        });

        this.app.get("/tracking/:code", (request, response) => {
            response.statusCode = 200
            response.contentType = "text/html"
            var ip = request.connection.remoteAddress;
            ip = "89.64.54.42" // to be removed

            axios.get(GEO_IP_API_URL + ip).then(responseGeo => {
                const {
                    city,
                    country,
                    lat,
                    lon,
                    regionName,
                    zip
                } = responseGeo.data

                response.render(this.viewsDir + "tracking", {
                    data: {
                        ip: ip,
                        city: city,
                        country: country,
                        lat: lat,
                        lon: lon,
                        regionName: regionName,
                        zip: zip
                    }
                })
            })
        })

        this.app.get("/*", (request, response) => {
            response.statusCode = 404
            response.header("Content-Type", "text/plain");
            response.send("404 page not found")
        })
    }
}

function generateUniqueString() {
    var text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < UNIQUE_TOKEN_LENGHT; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    }
    return text;
}