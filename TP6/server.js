var http = require('http')
var url = require('url')
var pug = require('pug')
var fs = require('fs')
var jsonfile = require('jsonfile')

var {parse} = require('querystring')

var myBD = "tarefas.json"

var myServer = http.createServer((req, res) => {
    var purl = url.parse(req.url, true)
    var query = purl.query

    console.log('Recebi o pedido: '+ purl.pathname)
    console.log('Com o método: '+ req.method)

    if (req.method == 'GET') {
        if ((purl.pathname == '/') || (purl.pathname == '/index')) {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.write(pug.renderFile('index.pug'))
            res.end()
        }
        else if (purl.pathname == '/registo') {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.write(pug.renderFile('registar.pug'))
            res.end()
        }
        else if (purl.pathname == '/lista') {
            jsonfile.readFile(myBD, (erro, tarefas) => {
                if (!erro) {
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write(pug.renderFile('consultar.pug', {lista: tarefas}))
                    res.end()
                }
                else {
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write(pug.renderFile('erro.pug', {e: "Erro: na leiura da BD"}))
                    res.end()
                }
            })
        }
        else if (purl.pathname == '/apagar') {
            jsonfile.readFile(myBD, (erro, tarefas) => {
                if (!erro) {
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write(pug.renderFile('apagar.pug', {lista: tarefas}))
                    res.end()
                }
                else {
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write(pug.renderFile('erro.pug', {e: "Erro: na leiura da BD"}))
                    res.end()
                }
            })
        }
        else if (purl.pathname == '/concluir') {
            jsonfile.readFile(myBD, (erro, tarefas) => {
                if (!erro) {
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write(pug.renderFile('concluir.pug', {lista: tarefas}))
                    res.end()
                }
                else {
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write(pug.renderFile('erro.pug', {e: "Erro: na leiura da BD"}))
                    res.end()
                }
            })
        }
        else if (purl.pathname == '/registada') {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.write(pug.renderFile('registada.pug', {tarefa: query}))
            res.end()
        }
        else if (purl.pathname == '/apagada') {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.write(pug.renderFile('apagada.pug', {tarefa: query}))
            res.end()
        }
        else if (purl.pathname == '/concluida') {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.write(pug.renderFile('concluida.pug', {tarefa: query}))
            res.end()
        }
        else if (purl.pathname == '/w3.css') {
            res.writeHead(200, {'Content-Type': 'text/css'})
            fs.readFile('stylesheets/w3.css', (erro, dados) => {
                if (!erro)
                    res.write(dados)
                else
                    res.write(pug.renderFile('erro.pug', {e: erro}))
                res.end()
            })
        }
        else {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.write(pug.renderFile('erro.pug', {e: "Erro: "+ purl.pathname +" não está implementado!"}))
            res.end()
        }
    }
    else if (req.method == 'POST') {
        if (purl.pathname == '/registada') {
            recuperaInfo(req, resultado => {
                jsonfile.readFile(myBD, (erro, tarefas) => {
                    if (!erro) {
                        resultado = JSON.stringify(resultado)
                        var new_result = resultado.split('}')[0] 
                        new_result += ',"id":"'+tarefas.length+'"}'
                        new_result = JSON.parse(new_result)
                        tarefas.push(new_result)
                        console.dir(tarefas)
                        jsonfile.writeFile(myBD, tarefas, erro => {
                            if (erro)
                                console.log(erro)
                            else
                                console.log('Registo gravado com sucesso.')
                        })
                    }
                })
                res.end(pug.renderFile('registada.pug', {tarefa: resultado}))
            })
        }
        else if (purl.pathname == '/apagada') {
            recuperaInfo(req, resultado => {
                jsonfile.readFile(myBD, (erro, tarefas) => {
                    if (!erro) {
                        for (i = 0; i < tarefas.length; i++) {
                            if (resultado.id == tarefas[i].id) {
                                tarefas[i].apagar = 'sim'
                                //ou tarefas.splice(i, 1);
                            }
                        }
                        console.dir(tarefas)
                        jsonfile.writeFile(myBD, tarefas, erro => {
                            if (erro)
                                console.log(erro)
                            else
                                console.log('Registo gravado com sucesso.')
                        })
                    }
                })
                res.end(pug.renderFile('apagada.pug', {tarefa: resultado}))
            })
        }
        else if (purl.pathname == '/concluida') {
            recuperaInfo(req, resultado => {
                jsonfile.readFile(myBD, (erro, tarefas) => {
                    if (!erro) {
                        for (i = 0; i < tarefas.length; i++) {
                            if (resultado.id == tarefas[i].id) {
                                tarefas[i].estado = 'Concluída'
                                //ou tarefas.splice(i, 1);
                            }
                        }
                        console.dir(tarefas)
                        jsonfile.writeFile(myBD, tarefas, erro => {
                            if (erro)
                                console.log(erro)
                            else
                                console.log('Registo gravado com sucesso.')
                        })
                    }
                })
                res.end(pug.renderFile('concluida.pug', {tarefa: resultado}))
            })
        }
        else {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.write(pug.renderFile('erro.pug', {e: "Erro: "+ purl.pathname +" não está implementado!"}))
            res.end()
        }
    }
    else {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
        res.write(pug.renderFile('erro.pug', {e: "Método: "+ req.method +" não suportado!"}))
        res.end()
    }
})

myServer.listen(7900, () => {
    console.log('Servidor à escuta na porta 7900...')
})

function recuperaInfo (request, callback) {
    if (request.headers['content-type'] == 'application/x-www-form-urlencoded') {
        let body = ''
        request.on('data', bloco => {
            body += bloco.toString()
        })
        request.on('end', () => {
            callback(parse(body))
        })
    }
    else
        callback(null)
}