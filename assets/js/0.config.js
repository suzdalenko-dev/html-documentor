var HTTP_HOST = window.location.host.includes("127.0.0.1:3000") ? 'http://127.0.0.1:8000/' : window.location.origin+'/api/';

var CURRENT_YEAR =  new Date().getFullYear();

var LIST_ARTICLES = [];

/* GET AND POST SUZDALENKO API START */

function onlyGet(url, callback) {
  fetch(HTTP_HOST+url).then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }).then(callback)
  .catch(error => {
    showM('Error AppGet '+ error, 'error');
  });
}

function suzdalenkoGet(url, callback) {
  const token = window.localStorage.getItem('token') || 'xxx';
  fetch(HTTP_HOST+url, {method: "GET", headers: {"Authorization": "Bearer "+token}}).then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }).then(callback)
  .catch(error => {
    showM('Error AppGet '+ error, 'error');
  });
}

function suzdalenkoPost(url, objectValues = {}, callback) {
  const formData = new FormData();
  Object.keys(objectValues).forEach(key => formData.append(key, objectValues[key]));

  const options = {
    method: 'POST',
    body: formData,
    headers: {'Authorization': 'Bearer '+ window.localStorage.getItem('token') || 'xxx'}
  };
  
  fetch(HTTP_HOST + url, options).then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
    }

    if (response.status != 200) {
      throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
    }
  
    return response.json();
  }).then(callback)
    .catch(error => {
      showM('Error AppGetPost ' + error, 'error');
  });
}

/* GET AND POST SUZDALENKO API END */

function reloadPagesSuzdalenko(){
  setTimeout(() => {
    window.location.reload();
  }, 2200);
}