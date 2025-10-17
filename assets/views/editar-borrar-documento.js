let docIdEBD     = 0;
let idsSetedEBD  = new Set();
let dataSetedEBD = new Set();
let fileCodeEBD  = '';

function editarBorrarDocumentoInit(){
    document.title = "Editar/Borrar Documento";
    document.getElementById('slugTitle').innerHTML = '<h2 class="text-xl font-semibold mb-4">Editar/Borrar Documento</h2>';

    initPageEBD();
}

function initPageEBD(){
    let pageRoute = parseHashRoute();
    docIdEBD = pageRoute.params.doc_id;

    getDepartmentTagsCND();
    getDocumentById();
}

function paintDocEBD(doc){
    document.getElementById('file_name_edb').innerHTML   = doc.file_name;
    document.getElementById('doc_title_edb').value       = doc.title;
    document.getElementById('doc_description_edb').value = doc.descrption;
    document.getElementById('doc_date_edb').value        = doc.expiration_date;
    document.getElementById('email_aviso_edb').value     = doc.notification_emails;
}

function paintTagsEBD(tags){
    if(tags && tags.length > 0){ // console.log(tags)
        for(let i = 0; i < tags.length; i++){
            if (idsSetedEBD.has(tags[i].tag_id)){ continue; }
            idsSetedEBD.add(tags[i].tag_id);
            dataSetedEBD.add({id: tags[i].tag_id, name: tags[i].tag_name});
        }
        showTagsInDocEBD();
    }
}

function getDocumentById(){
    onlyGet('public/doc/get/doc_by_id/?doc_id='+docIdEBD, (r) => {
        if(r && r.data && r.data.doc && r.data.doc && r.data.doc.user_id == window.localStorage.getItem('user_id')){
            fileCodeEBD = r.data.doc.code;
            paintDocEBD(r.data.doc);
            paintTagsEBD(r.data.tags);
            showInframeEBD(r.data.doc.file_name, r.data.doc.code);
        } else {
            showM('No hay suficientes permisos..', 'warning')    
        }
    });
}

function getDepartmentTagsCND(){
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

function showPrevieEBD(){
    window.open(HTTP_HOST+'public/doc/get/serve_document/?code='+fileCodeEBD, '_blank');
}

function showInframeEBD(fileName, code){
    if (fileName.includes(".pdf")) {
        document.getElementById('iframeEBD').style.display = 'block';
        document.getElementById('iframeEBD').src = HTTP_HOST+'public/doc/get/serve_document/?code='+fileCodeEBD;
    }
}