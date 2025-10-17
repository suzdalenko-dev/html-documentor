function crearNuevaEtiquetaInit(){
    document.title = "Crear nueva etiqueta";
    document.getElementById('slugTitle').innerHTML = '<h2 class="text-xl font-semibold mb-4">Crear nueva etiqueta<h/2>';

    getUserTagsCNE();
}

function deleteThisCNE(tagId){
    if(!confirm('¿Estás seguro de que deseas eliminar la etiqueta?')){ return; }

    suzdalenkoGet('documentor/tag/post/delete_tag/?tag_id='+tagId, function(response){
        if(response && response.data && response.data.error == 'no'){
            showM('Etiqueta eliminada correctamente', 'success');
        } else {
            if(response.data && response.data.message){
                showM(response.data.message, 'warning');
            } else {
             showM('Error al eliminar la etiqueta. Inténtalo de nuevo.', 'error');
            }
        }
        getUserTagsCNE();
    });
}

function getUserTagsCNE(){
    suzdalenkoPost('documentor/tag/post/get_user_tags/', {}, function(response){
        if(response && response.data && response.data.tags){
            document.getElementById('tagsListCNE').innerHTML = '';
            let htmlTags = '';
            response.data.tags.forEach(tag => {
                htmlTags += `<span class="taggrey" onclick="deleteThisCNE(${tag.id})" title="Eliminar esta etiqueta">${tag.name}</span>`;
            });
            document.getElementById('tagsListCNE').innerHTML = htmlTags;
        }
    });
}

function createTagCNE(){
    
    let tagCNE = document.getElementById('tagCNE').value;
    if(tagCNE.trim() == ''){
        showM('El nombre de la etiqueta no puede estar vacío.', 'warning');
        return;
    }

    suzdalenkoPost('documentor/tag/post/create_tag/', {name: tagCNE}, function(response){
       if(response && response.data && response.data.id > 0){
            document.getElementById('tagCNE').value = '';
            showM('Creacion de etiqueta exitosa', 'success');
       } else {
            if(response && response.data && response.data.error == 'yes'){ alert('1')
                showM(response.data.message, 'warning');
            } else {
                showM('Error al crear la etiqueta. Inténtalo de nuevo.', 'error');
            }
        }
        getUserTagsCNE();
    });
}