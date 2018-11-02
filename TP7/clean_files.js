var fs = require('fs')

fs.writeFile('files.json', '[]', erro => {
    if (erro)
        console.log("Erro a limpar o ficheiro files.json.")
    else
        console.log("Ficheiro files.json limpo com sucesso.")
})