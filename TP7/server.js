var express = require('express')
var http = require('http')
var pug = require('pug')
var fs = require('fs')
var formidable = require('formidable')
var logger = require('morgan')
var jsonfile = require('jsonfile')

var myBD = "files.json"

var app = express()

app.use(express.static('uploaded'))
app.use(logger('combined'))

app.all('*', (req, res, next) => {
    if (req.url != '/w3.css')
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
    next()
})

app.get('/', (req, res) => {
    jsonfile.readFile(myBD, (erro, ficheiros) => {
        if (!erro) {
            res.write(pug.renderFile('form-ficheiro.pug',{fich: ficheiros}))
            res.end()
        }
        else {
            res.write(pug.renderFile('erro.pug', {e: 'Ocorreram erros na leitura do ficheiro.'}))
            res.end()
        }
    })
})

app.get('/w3.css', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/css'})
    fs.readFile('stylesheets/w3.css', (erro, dados) => {
        if (!erro)
            res.write(dados)
        else
            res.write(pug.renderFile('erro.pug', {e: erro}))
        res.end()
    })
})

app.post('/processaForm', (req, res) => {
    var form = new formidable.IncomingForm()
    form.parse(req, (erro, fields, files) => {
        var fenviado = files.ficheiro.path
        var fnovo = './uploaded/'+ files.ficheiro.name
        n =  new Date();
        y = n.getFullYear();
        m = n.getMonth() + 1;
        d = n.getDate();
        h = n.getHours();
        min = n.getMinutes();
        fs.rename(fenviado, fnovo, erro => {
            if (!erro) {
                jsonfile.readFile(myBD, (erro, ficheiros) => {
                    if (!erro) {
                        var id = ficheiros.length
                        if (ficheiros.length > 0) {
                            var string = JSON.stringify(ficheiros).split(']')[0] + ',{"id":"'+id+'", "nome":"'+files.ficheiro.name+'", "desc":"'+fields.desc+'", "path":"'+fnovo+'", "timestamp":"'+d+'/'+m+'/'+y+' '+h+':'+min+'h"}]'
                            ficheiros = JSON.parse(string)
                        }
                        else {
                            var string = '{"id":"'+id+'", "nome":"'+files.ficheiro.name+'", "desc":"'+fields.desc+'", "path":"'+fnovo+'", "timestamp":"'+d+'/'+m+'/'+y+' '+h+':'+min+'h"}'
                            var result = JSON.parse(string)
                            ficheiros.push(result)
                        }
                        jsonfile.writeFile(myBD, ficheiros, erro => {
                            if (erro)
                                console.log(erro)
                            else
                                console.log('Registo gravado com sucesso.')
                        })
                    }
                    res.write(pug.renderFile('form-ficheiro.pug',{fich: ficheiros}))
                    res.end()
                })
            }
            else {
                res.write(pug.renderFile('erro.pug', {e: 'Ocorreram erros no armazenamento do ficheiro.'}))
                res.end()
            }
        })
    })
})

var myServer = http.createServer(app)

myServer.listen(7900, () => {
    console.log('Servidor à escuta na porta 7900...')
})