function crearNuevaEtiquetaInit(){
    document.title = "Crear nueva etiqueta";
    document.getElementById('slugTitle').innerHTML = '';
}

function createTagCNE(){
    let tagCNE = document.getElementById('tagCNE').value;
    if(tagCNE.trim() === ''){
        showM('El nombre de la etiqueta no puede estar vacío.', 'warning');
        return;
    }
}