let currentPageDLG     = 1;
let totalPagesDLG      = 1;

let tagsSelectedDLG    = window.localStorage.getItem('filtered_tags_dlg') ? JSON.parse(window.localStorage.getItem('filtered_tags_dlg')) : [];

let tagIdsDLG          = '';
let oldPageNumberDLG   = 0;
let oldTagsIdsDLG      = '';


function documentosListadoGeneralInit(){
    document.title = "Filtrar documentos";
    document.getElementById('slugTitle').innerHTML = '<h2 class="text-xl font-semibold mb-4"><span class="searchDLG" onclick="closeOpenFilterDLG()">🔎</span> Listado documentos</h2>';

    getDocDLG();
    getSetFromDLG();
    getUserTagsDLG();
    showFilteredTags();
}

function getDocDLG(load_false){
    if(load_false && load_false === 'load_false'){
        // No cargamos
    } else {
        document.getElementById('tableDLG').innerHTML = '<br>Cargando..';
    }

    let url = 'public/doc/get/all_doc/?user_id='+window.localStorage.getItem('user_id');
    if(window.localStorage.getItem('filter_text_dlg') && window.localStorage.getItem('filter_text_dlg') != ''){ url += '&filter_text='+window.localStorage.getItem('filter_text_dlg');}
    if(window.localStorage.getItem('creation_date_from') && window.localStorage.getItem('creation_date_from') != ''){ url += '&creation_date_from='+window.localStorage.getItem('creation_date_from');}
    if(window.localStorage.getItem('creation_date_to') && window.localStorage.getItem('creation_date_to') != ''){ url += '&creation_date_to='+window.localStorage.getItem('creation_date_to'); }
    if(window.localStorage.getItem('expiration_date_from') && window.localStorage.getItem('expiration_date_from') != ''){ url += '&expiration_date_from='+window.localStorage.getItem('expiration_date_from');}
    if(window.localStorage.getItem('expiration_date_to') && window.localStorage.getItem('expiration_date_to') != ''){ url += '&expiration_date_to='+window.localStorage.getItem('expiration_date_to');}
    let tagsStored = window.localStorage.getItem('filtered_tags_dlg');
    if (tagsStored) {
        if((oldPageNumberDLG == currentPageDLG && oldTagsIdsDLG != tagIdsDLG) || (oldPageNumberDLG == currentPageDLG && oldTagsIdsDLG == '')){
            currentPageDLG = 0;
        }

        let tagsArray = JSON.parse(tagsStored);
        if (Array.isArray(tagsArray) && tagsArray.length > 0) {
            tagIdsDLG = tagsArray.map(t => t.id).join(',');
            url += '&tag_ids=' + tagIdsDLG;
            oldTagsIdsDLG = tagIdsDLG;
        }
    }
    if(currentPageDLG && currentPageDLG > 1){ 
        url += '&number_page='+currentPageDLG; 
        oldPageNumberDLG = currentPageDLG;
    }

    onlyGet(url, function (r) {
        if(r && r.data && r.data.docs && r.data.docs.length > 0){
            let htmlDLG = '';
            r.data.docs.forEach(d => {
                htmlDLG += `<tr>
                                <td class="border px-2 py-1 text-center">${d.id}</td>
                                <td class="border px-2 py-1 text-left">${d.title}</td>
                                <td class="border px-2 py-1 text-left">${d.descrption}</td>
                                <td class="border px-2 py-1 text-center">${formatDateToEuropean(d.created_at)}</td>
                                <td class="border px-2 py-1 text-center">${formatDateToEuropean(d.expiration_date)}</td>
                                <td class="border px-2 py-1 text-left">${semicolonReplace(d.notification_emails)}</td>
                                <td class="border px-2 py-1 text-left">${notNull(d.tags)}</td>
                            </tr>`;
            });
            document.getElementById('tableDLG').innerHTML = htmlDLG;
            console.log(r.data);
            document.getElementById('totalDocsCount').innerText = r.data.total_docs ? r.data.total_docs : '0';
            document.getElementById('pageInfoDLG').innerText = 'Página '+(r.data.page ? r.data.page : '1')+' de '+(r.data.total_pages ? r.data.total_pages : '1');
            currentPageDLG = r.data.page ? r.data.page : 1;
            totalPagesDLG  = r.data.total_pages;
        } else {
            document.getElementById('tableDLG').innerHTML = '<br>No hay documentos disponibles';
            document.getElementById('totalDocsCount').innerText = '0';
            document.getElementById('pageInfoDLG').innerText = 'Página 0 de 0';
            currentPageDLG = 0;
            totalPagesDLG  = 0;
        }
    });
}

function closeOpenFilterDLG(){
    let situationFP = window.localStorage.getItem('situation_fp');
    if(situationFP === 'closed' || !situationFP){
        document.getElementById('filterPanelDLG').style.display = 'block';
        window.localStorage.setItem('situation_fp', 'open');
    } else {
        document.getElementById('filterPanelDLG').style.display = 'none';
        window.localStorage.setItem('situation_fp', 'closed');
    }
}

function getSetFromDLG(){
    if(window.localStorage.getItem('situation_fp') == 'open'){
        document.getElementById('filterPanelDLG').style.display = 'block';
    } else {
        document.getElementById('filterPanelDLG').style.display = 'none';
    }
    document.getElementById('filter_text_dlg').value      = window.localStorage.getItem('filter_text_dlg') ? window.localStorage.getItem('filter_text_dlg') : '';
    document.getElementById('creation_date_from').value   = window.localStorage.getItem('creation_date_from') ? window.localStorage.getItem('creation_date_from') : '';
    document.getElementById('creation_date_to').value     = window.localStorage.getItem('creation_date_to') ? window.localStorage.getItem('creation_date_to') : '';
    document.getElementById('expiration_date_from').value = window.localStorage.getItem('expiration_date_from') ? window.localStorage.getItem('expiration_date_from') : '';
    document.getElementById('expiration_date_to').value   = window.localStorage.getItem('expiration_date_to') ? window.localStorage.getItem('expiration_date_to') : '';
}

function filterChangeDLG(){
    window.localStorage.setItem('filter_text_dlg', document.getElementById('filter_text_dlg').value.trim());
    window.localStorage.setItem('creation_date_from', document.getElementById('creation_date_from').value);
    window.localStorage.setItem('creation_date_to', document.getElementById('creation_date_to').value);
    window.localStorage.setItem('expiration_date_from', document.getElementById('expiration_date_from').value);
    window.localStorage.setItem('expiration_date_to', document.getElementById('expiration_date_to').value);
    getDocDLG('load_false');
}

function clearFilterDLG(){
    window.localStorage.removeItem('filter_text_dlg');
    window.localStorage.removeItem('creation_date_from');
    window.localStorage.removeItem('creation_date_to');
    window.localStorage.removeItem('expiration_date_from');
    window.localStorage.removeItem('expiration_date_to');
    window.localStorage.removeItem('filtered_tags_dlg');
    getSetFromDLG();
    getDocDLG();
    showFilteredTags();
}

function applyFilterDLG(){
    window.localStorage.setItem('creation_date_from', document.getElementById('creation_date_from').value);
    window.localStorage.setItem('creation_date_to', document.getElementById('creation_date_to').value);
    window.localStorage.setItem('expiration_date_from', document.getElementById('expiration_date_from').value);
    window.localStorage.setItem('expiration_date_to', document.getElementById('expiration_date_to').value);
    getDocDLG();
}

function prevPageDLG(){
   currentPageDLG--;
   if(currentPageDLG < 1){ currentPageDLG = 1; }
    getDocDLG('load_false');
}

function nextPageDLG(){
    currentPageDLG++;
    if(currentPageDLG > totalPagesDLG) {currentPageDLG = totalPagesDLG; }
    getDocDLG('load_false');
}

function getUserTagsDLG(){
    suzdalenkoPost('public/tag/get/get_tags_dep/?user_id='+window.localStorage.getItem('user_id'), {}, function(response){
        if(response && response.data && response.data.tags){
            document.getElementById('mytagsDLG').innerHTML = '';
            let htmlTags = '';
            response.data.tags.forEach(tag => {
                htmlTags += `<span class="taggrey" onclick="addTagInFilterDLG(${tag.id}, '${tag.name}')" title="Eliminar esta etiqueta">${tag.name}</span>`;
            });
            document.getElementById('mytagsDLG').innerHTML = htmlTags;
        }
    });
}

function showFilteredTags(){
    tagsSelectedDLG    = window.localStorage.getItem('filtered_tags_dlg') ? JSON.parse(window.localStorage.getItem('filtered_tags_dlg')) : [];
    let tagsHtml = '';
    
    if(tagsSelectedDLG.length  > 0){
        document.getElementById('selectedTagsDivDLG').style.display = 'block'; 
        for (let t of  tagsSelectedDLG){ tagsHtml += `<span class="tagcne" onclick="deleteThisDLG(${t.id})" title="Eliminar la etiqueta del documento">${t.name}</span>`; }
    }
    if(tagsSelectedDLG.length == 0){ document.getElementById('selectedTagsDivDLG').style.display = 'none';}
    document.getElementById('selectedTagsDLG').innerHTML = tagsHtml;
}

function addTagInFilterDLG(tgId, tgName){
    let itemExist = false;
    tagsSelectedDLG.map(tag => { if(tag.id == tgId){ itemExist = true; }});

    if(itemExist == false){ tagsSelectedDLG.push({id: tgId, name: tgName}); }
    window.localStorage.setItem('filtered_tags_dlg', JSON.stringify(tagsSelectedDLG));
    showFilteredTags();
    getDocDLG();
}

function deleteThisDLG(tagId){
    tagsSelectedDLG = tagsSelectedDLG.filter(tag => tag.id !== tagId);
    window.localStorage.setItem('filtered_tags_dlg', JSON.stringify(tagsSelectedDLG));
    showFilteredTags();
    getDocDLG();
}