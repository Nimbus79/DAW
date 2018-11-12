var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile')
var formidable = require('formidable')
var fs = require('fs');

var myBD = __dirname + '/files.json'

/* GET home page. */
router.get('/', (req, res) => {res.render('index')})

router.get('/file', (req, res) => {
  jsonfile.readFile(myBD, (erro, files) => {
    if (!erro)
      res.render('lista', {lista: files})
    else
      res.render('error', {e: erro})
  })
})

router.post('/uploaded', (req, res) => {
  var form = new formidable.IncomingForm()
  form.parse(req, (erro, fields, files) => {
    if (!erro) {
      var fenviado = files.ficheiro.path
      var fnovo = '/home/nimbus/Desktop/4º ano/Complementares/DAW/TPCs/TPC8/fileUpload/public/uploaded/'+ files.ficheiro.name
      n =  new Date();
      y = n.getFullYear();
      m = n.getMonth() + 1;
      d = n.getDate();
      h = n.getHours();
      min = n.getMinutes();
      if (d < 10)
        d = '0'+d
      if (h < 10)
        h = '0'+h
      if (min < 10)
        min = '0'+min
      time = d+'/'+m+'/'+y+' '+h+':'+min+'h'
      fs.rename(fenviado, fnovo, erro1 => {
        if (!erro1) {
          jsonfile.readFile(myBD, (erro2, ficheiros) => {
            if (!erro2) {
              var id = ficheiros.length
              if (ficheiros.length > 0) {
                var string = '{"id":"'+id+'", "nome":"'+files.ficheiro.name+'", "desc":"'+fields.desc+'", "path":"'+fnovo+'", "timestamp":"'+time+'"}'
                var result = JSON.stringify(ficheiros).split(']')[0] + ',' + string + ']'
                ficheiros = JSON.parse(result)
              }
              else {
                var string = '{"id":"'+id+'", "nome":"'+files.ficheiro.name+'", "desc":"'+fields.desc+'", "path":"'+fnovo+'", "timestamp":"'+time+'"}'
                var result = JSON.parse(string)
                ficheiros.push(result)
              }
              jsonfile.writeFile(myBD, ficheiros, erro3 => {
                if (erro3)
                  console.log('Erro na escrita na BD: '+erro3)
                else
                  console.log('Registo gravado com sucesso.')
              })
            }
            else
              console.log('Erro na leitura da BD: '+erro2)
          })
        }
        else
          console.log('Erro na alteração do caminho: '+erro1)
      })
    }
    else
      console.log('Erro no parse: '+erro)
  })
  res.json(string)
})

module.exports = router;