

function avisosCaducidadInit(){
    document.title = 'Avisos de caducidad';
    document.getElementById('slugTitle').innerHTML = '<h2 class="text-xl font-semibold mb-4">Avisos de caducidad</h2>';
    
    onChangeAC(22);
}

function onChangeAC(val){
    dateAC = addDaysFunc(val);
    showAC(val, dateAC);
}

function showAC(daysVal, dateAC){
    document.getElementById('selectedDaysAC').innerText = daysVal;
    document.getElementById('expiredUntilAC').innerText = formatLongDate(dateAC);

    let url = 'public/doc/get/exp_doc/?user_id='+window.localStorage.getItem('user_id')+'&exp_to='+dateAC
    onlyGet(url, r => {
        let htmlAC = '';
        if(r.data.docs && r.data.docs.length > 0){
            r.data.docs.forEach(d => { console.log(d)
                htmlAC += `<tr>
                            <td class="border px-2 py-1 text-center" onclick="showPreviewAC('${d.id}')"><a class="link_id_dlg">${d.id}</a></td>
                            <td class="border px-2 py-1 text-left">${d.title}</td>
                            <td class="border px-2 py-1 text-left">${d.descrption}</td>
                            <td class="border px-2 py-1 text-center">${formatDateToEuropean(d.created_at)}</td>
                            <td class="border px-2 py-1 text-center">${formatDateToEuropean(d.expiration_date)}</td>
                            <td class="border px-2 py-1 text-left">${semicolonReplace(d.notification_emails)}</td>
                            <td class="border px-2 py-1 text-left">${notNull(d.tags)}</td>
                            <td class="border px-2 py-1 text-left">${showEditPancelAC(d.user_id, d.id)}</td>
                        </tr>`;
            });
        }
        
        document.getElementById('tableAV').innerHTML = htmlAC;
    });
}

function showPreviewAC(doc_id){
    window.open('/dashboard/#ver-detalle-documento?doc_id='+doc_id, '_self');
}

function showEditPancelAC(docUserId, docId){
    if(window.localStorage.getItem('user_id') > 0 && window.localStorage.getItem('user_id') == docUserId){
        return `<span onclick="openDocEditAC(${docId})" class="hovered">📝</span>`;
    } else {
        return '';
    }
}

function openDocEditAC(docId){
    window.open('/dashboard/#editar-borrar-documento?doc_id='+docId, '_self')
}
