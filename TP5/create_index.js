var fs = require('fs')

const dir = './obras-musicais-json/json';

var files = fs.readdirSync(dir);

var composers = []
var files_seen = []
var mydata, data, dados, composer, compositor
var string = "[\n\t";

for (i = 0; i < files.length; i++) {
    if (files[i].split('.')[1] != 'json') {
        files.splice(i, 1);
        i--;
    }
}

for (i = 0; i < files.length; i++) {
    dados = fs.readFileSync('obras-musicais-json/json/'+ files[i]);
    if (!files_seen.includes(files[i])) {
        files_seen.push(files[i]);
        mydata = JSON.parse(dados);
        composer = mydata.compositor;
        if (!composer)
            composer = mydata.arranjo;
        if (!composers.includes(composer)) {
            composers.push(composer);
        }
    }
}

composers.sort((a,b) => a.localeCompare(b))

files_seen = []
for (k = 0; k < composers.length; k++) {
    for (i = 0; i < files.length; i++) {
        if (!files_seen.includes(files[i])) {
            dados = fs.readFileSync('obras-musicais-json/json/'+ files[i]);
            mydata = JSON.parse(dados);
            composer = mydata.compositor;
            if (!composer)
                composer = mydata.arranjo;
            if (composers[k] == composer) {
                files_seen.push(files[i]);
                string += '{\n\t\t"compositor": "'+composer+'",\n\t\t"musicas": [\n\t\t\t{\n\t\t\t\t"_id": "'+mydata._id+'",\n\t\t\t\t"titulo": "'+mydata.titulo+'"\n\t\t\t}';
                i++;
                for (; i < files.length; i++) {
                    if (!files_seen.includes(files[i])) {
                        dados = fs.readFileSync('obras-musicais-json/json/'+ files[i]);
                        data = JSON.parse(dados);
                        compositor = data.compositor;
                        if (!compositor)
                            compositor = data.arranjo;
                        if (composer == compositor) {
                            files_seen.push(files[i]);
                            string += ',\n\t\t\t{\n\t\t\t\t"_id": "'+data._id+'",\n\t\t\t\t"titulo": "'+data.titulo+'"\n\t\t\t}';
                        }
                    }    
                }
            }
        }
    }
    if (files_seen.length == files.length) {
        string += '\n\t\t]\n\t}\n]';
    }
    else {
        string += '\n\t\t]\n\t},\n\t';
    }
}

fs.writeFile("./obras-musicais-json/index.json", string, (erro) => {
    if (!erro)
        console.log("Ficheiro index.json criado com sucesso!")
    else
        console.log("Erro ao criar o ficheiro index.json!")
});