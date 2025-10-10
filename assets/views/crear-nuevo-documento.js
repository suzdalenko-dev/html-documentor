let idsSetedCND  = new Set();
let dataSetedCDN = new Set();

function crearNuevoDocumentoInit(){
    document.title = "Crear nuevo documento";
    document.getElementById('slugTitle').innerHTML = '<h2 class="text-xl font-semibold mb-4">Crear Nuevo Documento</h2>';

    getDepartmentTagsCND();
    getUserEmalCND();
}

function saveDocCND(){
    const title = document.getElementById('doc_title').value.trim();
    const description = document.getElementById('doc_description').value.trim();
    const expiration_date = document.getElementById('doc_date').value;
    const email_aviso = document.getElementById('email_aviso').value.trim();
    const fileInput = document.getElementById('doc_file');
    const file = fileInput.files[0];
    const tags = Array.from(dataSetedCDN).map(tag => tag.id).join(',');

    if(!title || !expiration_date || !email_aviso || !file){
        showM('Por favor, completa todos los campos del formulario.', 'warning');
        return;
    }
    const formDataObj = {
        title: title,
        description: description,
        expiration_date: expiration_date,
        email_aviso: email_aviso,
        file: file,      // <- importante: pasamos el archivo
        tags: tags       // IDs de las etiquetas
    };

    suzdalenkoPost('documentor/doc/post/create_new_doc/', formDataObj, function (res) {
        if (res && res.data && res.data.error == 'no' && res.data.id > 0) {
            showM('Documento guardado correctamente ✅', 'success');
            setTimeout(() => { window.location.href = '/dashboard/#documentos-listado-general'; }, 1100);
        } else {
            showM('Error al guardar el documento: ' + (res.data.message || 'Error desconocido'), 'error');
        }
    });
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
                htmlTags += `<span class="tagcne" onclick="addToDocumentCND(${tag.id}, '${tag.name}')" title="Añadir la etiqueta al documento">${tag.name}</span>`;
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