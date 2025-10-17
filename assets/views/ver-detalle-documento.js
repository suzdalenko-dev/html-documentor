function verDetalleDocumentoInit(){
    let pageRoute = parseHashRoute();
    let docIdVDD = pageRoute.params.doc_id;

    document.title = `Documento ${docIdVDD}`;
    document.getElementById('slugTitle').innerHTML = '';
    getFilesVDD(docIdVDD);
}

function getFilesVDD(docId){
    onlyGet('public/doc/get/doc_by_id/?doc_id='+docId+'&user_id='+window.localStorage.getItem('user_id'), (r) => {
        if(r && r.data && r.data.error == 'no'){ console.log(r.data)
            // https://suzdalenko-dev.github.io/html-documentor/assets/img/template.png
            let fileNames   = '';
            if(r.data.doc_lines && r.data.doc_lines.length > 0){
                let framesHtml = '';
                r.data.doc_lines.map(l => { console.log(l.file_name)
                    let url = HTTP_HOST + 'public/doc/get/serve_document/?code='+l.code;
                    if(!l.file_name.includes('.pdf')){ url = 'https://suzdalenko-dev.github.io/html-documentor/assets/img/template.png'; }
                    framesHtml += `<div>
                                      <iframe src="${url}" class="doc-preview"></iframe>
                                      <div class="doc-actions"><button class="btn-view" onclick="window.open('${url}', '_blank')">👁️ Ver </button></div>
                                    </div>`;
                    fileNames += `<a href="${url}" target="_blank" class="link_id_dlg ml-3"> ${l.file_name} </a>`;
                });
                document.getElementById('iframeContainerVDD').innerHTML = framesHtml;
            }
            document.getElementById('slugTitle').innerHTML       = `<h2 class="text-xl font-semibold mb-4">${r.data.doc.title}<h/2>`;
            document.getElementById('file_links_vdd').innerHTML  = fileNames;
            document.getElementById('doc_title_vdd').value       = r.data.doc.title;
            document.getElementById('doc_description_vdd').value = r.data.doc.descrption;
            document.getElementById('doc_date_vdd').value        = r.data.doc.expiration_date;
            document.getElementById('email_aviso_vdd').value     = r.data.doc.notification_emails;
            
            let htmlTags = '';
            r.data.doc_tags.map(t => { htmlTags += `<span class="tagcne">${t.tag_name}</span>`; });
            document.getElementById('tagsListVDD').innerHTML = htmlTags;
        } else {
            if(r && r.data && r.data.message){
                showM(r.data.message, 'error');
            } else {
                showM('Error desconocido', 'error');
            }
        }

    });
}