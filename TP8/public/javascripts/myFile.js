$(() => {
    $('#ficheiros').load('http://localhost:7900/file')

    $('#enviar').click(e => {
        const file = $('#ficheiro')[0].files[0];
        var filename = file.name
        e.preventDefault()
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
        var time = d+'/'+m+'/'+y+' '+h+':'+min+'h'
        $('#ficheiros').append('<tr><td>'+'<a href="/uploaded/'+filename+'">'+filename+'</td>'+
                           '<td>' + $('#desc').val() + '</td>'+
                           '<td>' + time + '</td></tr>')
        ajaxPost()
    })

    function ajaxPost() {
        const form = new FormData($('#form')[0]);
        $.ajax({
            url: "http://localhost:7900/uploaded",
            type: "POST",
            processData: false,
            contentType: false,
            data: form,
            mimeType: 'multipart/form-data',
            /*success: f => alert(JSON.stringify(f)),
            error: e => {
                alert('Erro no post: ' + JSON.stringify(e))
                console.log("Erro no post: " + JSON.stringify(e))
            }*/
        })
        $('#ficheiro').val('')
        $('#desc').val('')
    }
})