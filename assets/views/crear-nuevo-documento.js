let idsSetedCND  = new Set();
let dataSetedCDN = new Set();

function crearNuevoDocumentoInit(){
    document.title = "Crear nuevo documento";
    document.getElementById('slugTitle').innerHTML = '<h2 class="text-xl font-semibold mb-4">Crear nuevo documento</h2>';

    getDepartmentTagsCND();
    getUserEmalCND();
}

function saveDocCND(){
    let title = document.getElementById('doc_title').value.trim();
    let description = document.getElementById('doc_description').value.trim();
    let expiration_date = document.getElementById('doc_date').value;
    let email_aviso = document.getElementById('email_aviso').value.trim();
    let fileInput = document.getElementById('doc_file');
    let files = fileInput.files;
    let tags = Array.from(dataSetedCDN).map(tag => tag.id).join(',');

    if(!title || !expiration_date || !email_aviso || files.length == 0){
        showM('Por favor, completa todos los campos del formulario.', 'warning');
        return;
    }
    let formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('expiration_date', expiration_date);
        formData.append('email_aviso', email_aviso);
        formData.append('tags', tags);

    // 🔹 Añadir cada archivo al FormData
    for (let i = 0; i < files.length; i++) { formData.append('files', files[i]); }

    fetch(HTTP_HOST + 'documentor/doc/post/create_new_doc/', {
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

function deleteThisCND(tagId){
    if (!idsSetedCND.has(tagId)){ return; }
    idsSetedCND.delete(tagId);
    dataSetedCDN.forEach(tag => { if (tag.id === tagId){ dataSetedCDN.delete(tag); } });
    showTagsInDocCDN();
}

function showTagsInDocCDN(){
    let htmlTagsCDN = '';
    dataSetedCDN.forEach(tag => { htmlTagsCDN += `<span class="tagcne" onclick="deleteThisCND(${tag.id})" title="Eliminar la etiqueta del documento">${tag.name}</span>`; });
    document.getElementById('selectedTagsCND').innerHTML = htmlTagsCDN;
}

function addToDocumentCND(tagId, tagName){
    if (idsSetedCND.has(tagId)){ return; }
    idsSetedCND.add(tagId);
    dataSetedCDN.add({id: tagId, name: tagName});
    showTagsInDocCDN();
}

function getDepartmentTagsCND(){
    suzdalenkoGet('documentor/tag/get/get_department_tags/', function(response){
        if(response && response.data && response.data){
            document.getElementById('tagsListCND').innerHTML = '';
            let htmlTags = '';
            response.data.forEach(tag => {
                htmlTags += `<span class="taggrey" onclick="addToDocumentCND(${tag.id}, '${tag.name}')" title="Añadir la etiqueta al documento">${tag.name}</span>`;
            });
            document.getElementById('tagsListCND').innerHTML = htmlTags;
        }
    });
}

function getUserEmalCND(){
    suzdalenkoGet('documentor/user/get/get_user_email/', function(response){
        if(response && response.data && response.data.email){
            document.getElementById('email_aviso').value = response.data.email+';';
        } else {
            showM('Error al obtener el correo del usuario', 'error');
        }
    });
    document.getElementById('doc_date').value = datePlus5Years();
}