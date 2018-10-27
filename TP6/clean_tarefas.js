var fs = require('fs')

fs.writeFile('tarefas.json', '[]', erro => {
    if (erro)
        console.log("Erro a limpar o ficheiro tarefas.json.")
    else
        console.log("Ficheiro tarefas.json limpo com sucesso.")
})