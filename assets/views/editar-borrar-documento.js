let docIdEBD     = 0;
let idsSetedEBD  = new Set();
let dataSetedEBD = new Set();

function editarBorrarDocumentoInit(){
    let pageRoute = parseHashRoute();
    docIdEBD = pageRoute.params.doc_id;

    document.title = "Editar/borrar documento";
    document.getElementById('slugTitle').innerHTML = '<h2 class="text-xl font-semibold mb-4">Editar/borrar documento</h2>';

    getDepartmentTagsEBD();
    getDocumentByIdEBD();
}

function paintDocEBD(doc){
    document.getElementById('doc_title_edb').value       = doc.title;
    document.getElementById('slugTitle').innerHTML       = `<h2 class="text-xl font-semibold mb-4">Editar/borrar ${doc.title}</h2>`;
    document.getElementById('doc_description_edb').value = doc.descrption;
    document.getElementById('doc_date_edb').value        = doc.expiration_date;
    document.getElementById('email_aviso_edb').value     = doc.notification_emails;
}

function paintDocTagsEBD(tags){
    if(tags && tags.length > 0){
        for(let i = 0; i < tags.length; i++){
            if (idsSetedEBD.has(tags[i].tag_id)){ continue; }
            idsSetedEBD.add(tags[i].tag_id);
            dataSetedEBD.add({id: tags[i].tag_id, name: tags[i].tag_name});
        }
        showTagsInDocEBD();
    }
}

function getDocumentByIdEBD(){
    onlyGet('public/doc/get/doc_by_id/?doc_id='+docIdEBD+'&user_id='+window.localStorage.getItem('user_id'), (r) => {
        console.log(r.data)
        /*  
            I only allow the user who created the document to edit it 
            Solo permito que el usuario que creó el documento lo edite,
            quizas habria que hacer desde el usuario que tiene action_pass
        */
        if(r && r.data && r.data.doc && r.data.doc && r.data.doc.user_id == window.localStorage.getItem('user_id')){
            paintDocEBD(r.data.doc);
            paintDocTagsEBD(r.data.doc_tags);
            showInframeEBD(r.data.doc_lines);
        } else {
            showM('No hay suficientes permisos..', 'warning')    
        }
    });
}

function getDepartmentTagsEBD(){
    suzdalenkoGet('documentor/tag/get/get_department_tags/', function(response){
        if(response && response.data && response.data){
            document.getElementById('tagsListEBD').innerHTML = '';
            let htmlTags = '';
            response.data.forEach(tag => {
                htmlTags += `<span class="taggrey" onclick="addToDocumentEBD(${tag.id}, '${tag.name}')" title="Añadir la etiqueta al documento">${tag.name}</span>`;
            });
            document.getElementById('tagsListEBD').innerHTML = htmlTags;
        }
    });
}

function addToDocumentEBD(){
    let htmlTagsCDN = '';
    dataSetedEBD.forEach(tag => { htmlTagsCDN += `<span class="tagcne" onclick="deleteThisEBD(${tag.id})" title="Eliminar la etiqueta del documento">${tag.name}</span>`; });
    document.getElementById('selectedTagsEDB').innerHTML = htmlTagsCDN;
}

function addToDocumentEBD(tagId, tagName){
    if (idsSetedEBD.has(tagId)){ return; }
    idsSetedEBD.add(tagId);
    dataSetedEBD.add({id: tagId, name: tagName});
    showTagsInDocEBD();
}

function deleteThisEBD(tagId){
    if (!idsSetedEBD.has(tagId)){ return; }
    idsSetedEBD.delete(tagId);
    dataSetedEBD.forEach(tag => { if (tag.id === tagId){ dataSetedEBD.delete(tag); } });
    showTagsInDocEBD();
}

function showTagsInDocEBD(){
    let htmlTagsEDB = '';
    dataSetedEBD.forEach(tag => { htmlTagsEDB += `<span class="tagcne" onclick="deleteThisEBD(${tag.id})" title="Eliminar la etiqueta del documento">${tag.name}</span>`; });
    document.getElementById('selectedTagsEDB').innerHTML = htmlTagsEDB;
}

function showInframeEBD(doc_tags){
    let fileNames  = '';
    let framesHtml = '';
    doc_tags.map(l => {
        let url  = HTTP_HOST + 'public/doc/get/serve_document/?code='+l.code;
        let url2 = HTTP_HOST + 'public/doc/get/serve_document/?code='+l.code;
        if(!l.file_name.includes('.pdf')){ url = 'https://suzdalenko-dev.github.io/html-documentor/assets/img/template.png'; }
        framesHtml += `<div>
                          <iframe src="${url}" class="doc-preview"></iframe>
                          <div class="doc-actions"><button class="btn-view" onclick="window.open('${url2}', '_blank')">👁️ Ver </button></div>
                        </div>`;
        fileNames += `<a href="${url2}" target="_blank" class="link_id_dlg ml-3"> ${l.file_name} </a>`;
    });
    document.getElementById('link_files_ebd').innerHTML     = fileNames;
    document.getElementById('iframeContainerEBD').innerHTML = framesHtml;
}

/* UPDATE BUTTON */
function updateEBD(){
    let title           = document.getElementById('doc_title_edb').value.trim();
    let description     = document.getElementById('doc_description_edb').value.trim();
    let expiration_date = document.getElementById('doc_date_edb').value;
    let email_aviso     = document.getElementById('email_aviso_edb').value.trim();
    let fileInput       = document.getElementById('doc_file_edb');
    let files           = fileInput.files;
    let tags            = Array.from(dataSetedEBD).map(tag => tag.id).join(',');

    if(!title || !expiration_date || !email_aviso){
        showM('Por favor, completa todos los campos del formulario.', 'warning');
        return;
    }
    let formData = new FormData();
        formData.append('doc_id', docIdEBD)
        formData.append('title', title);
        formData.append('description', description);
        formData.append('expiration_date', expiration_date);
        formData.append('email_aviso', email_aviso);
        formData.append('tags', tags);

    // 🔹 Añadir cada archivo al FormData
    for (let i = 0; i < files.length; i++) { formData.append('files', files[i]); }

    fetch(HTTP_HOST + 'documentor/doc/post/update_old_doc/', {
        method: 'POST',
        body: formData,
        headers: {'Authorization': 'Bearer ' + (window.localStorage.getItem('token') || 'xxx')}
    }).then(res => res.json()).then(res => {
        if (res && res.data && res.data.error == 'no' && res.data.id > 0) {
            showM('Documento guardado correctamente ✅', 'success');
            setTimeout(() => { window.location.href = '/dashboard/#ver-detalle-documento?doc_id='+res.data.id; }, 1000);
        } else {
            showM('Error al guardar: ' + (res.message || 'Error desconocido'), 'error');
        }
    }).catch(err => showM('Error de conexión: ' + err, 'error'));
}