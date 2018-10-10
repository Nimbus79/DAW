var http = require('http')
var fs = require('fs')
var url = require('url')


http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'})
    var myUrl = url.parse(req.url, true)
    console.log(myUrl)
    var path = myUrl.path.split("/")
    var file
    if (path[1] == "index")
        file = "./website/index.html"
    else
        file = "./website/html/" + path[2] + ".html"
    fs.readFile(file, (erro, dados) => {
        if (!erro)
            res.write(dados)
        else
            res.write('<p><b>ERRO: </b>' + erro + '</p>')
        res.end()

    })
}).listen(1079, () => {
    console.log('Servidor à escuta na porta 1079...')
})
