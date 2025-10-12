function listadoEtiquetasInit() {
    document.title = "Departamentos > Usuarios > Etiquetas";
    document.getElementById('slugTitle').innerHTML = '<h2 class="text-xl font-semibold mb-4">Departamentos > Usuarios > Etiquetas</h2>';

    getAllTags();
}

function getAllTags() {
    onlyGet('public/tag/get/get_my_tags/', function(response) {
        let htmlLE = '';
        response.data.map(x => {
            let users = '';
            let tags  = '';
            x.users.map(u => { 
                let userName = u.name.charAt(0).toUpperCase() + u.name.slice(1);
                users += userName + ', '; 
            });
            x.tags.map(t => { tags += t.name+', '; });

            htmlLE += `<tr>
                            <td class="border px-2 py-1 text-left">${x.department_id}.${x.name}</td>
                            <td class="border px-2 py-1 text-right">${users}</td>
                            <td class="border px-2 py-1 text-right">${tags}</td>
                    </tr>`;
        });
        document.getElementById('tableLE').innerHTML = htmlLE;
    });
}

