const http = require('http')

const server = http.createServer(function (req, res) {

    if (req.url === "/getSecretData") {
        res.end("U ARE FOOLED! NO SECRET DATA")
    }

    res.end("Hello")
})

server.listen(7777)