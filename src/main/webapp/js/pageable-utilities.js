var	size;
var	sorting = 'asc';
var search;

const ajaxJS = (url, callback) => {
    let xhr = new XMLHttpRequest();
    console.log(xhr);
    xhr.onreadystatechange = function(){
        if (xhr.status === 200 && xhr.readyState === 4){
            console.log(xhr.response);
            callback(JSON.parse(xhr.response));
        }
    }
    xhr.open('GET', url, true);
    xhr.send();
}

const clear = tag => {
	while (tag.firstChild) {
		tag.removeChild(tag.firstChild);
	}
}
const makeHTML = data => {
    let documentFragment = document.createDocumentFragment();
	for(let index in data){
	    documentFragment.appendChild(makeRow(data[index], index));
     }
    return documentFragment;
}

const makePageNavigation = pages => {
    let documentFragment = document.createDocumentFragment();
    for(let i = 0; i < pages; i++)
        documentFragment.appendChild(makePages(i));
    return documentFragment;
}

const makePages = i => {
    let anchor = document.createElement('label');
    anchor.setAttribute('class','btn btn-light');
    anchor.style.marginLeft='5px';
    anchor.appendChild(document.createTextNode(i+1));
    anchor.onclick = () => {
        showResults(`${urlPath}?page=${i}&size=${size.value}&search=${search.value}&sorting=${sorting}`);
    }
    return anchor;
}

const showResults = url => {
	ajaxJS(url, (response) => {
        let tbody = document.getElementById('pageable-list');
        let div = document.getElementById('page-navigation');
        clear(div);
        clear(tbody);
        div.setAttribute('class','container');
        div.style.margin = 'auto';
        div.style.textAlign = 'center';
        let totalElements = response.totalElements;
        let pageSize = response.size;
        let pages = Math.ceil(totalElements/pageSize);
        tbody.appendChild(makeHTML(response.content));
        div.appendChild(makePageNavigation(pages));
	});
}

const wizard = urlPath => {
    size = document.querySelector(`#size`);
    search = document.querySelector(`#search`);
    sorting_desc = document.querySelector(`#desc`);
    sorting_asc = document.querySelector(`#asc`);
    sorting_desc.onclick = () => {
        sorting = sorting_desc.value;
        showResults(`${urlPath}?size=${size.value}&search=${search.value}&sorting=${sorting}`);
    }
    sorting_asc.onclick = () => {
        sorting = sorting_asc.value;
        showResults(`${urlPath}?size=${size.value}&search=${search.value}&sorting=${sorting}`);
    }
    size.onkeyup = () => {
         showResults(`${urlPath}?size=${size.value}&search=${search.value}&sorting=${sorting}`);
    }
    search.onkeyup = () => {
        showResults(`${urlPath}?size=${size.value}&search=${search.value}&sorting=${sorting}`);
    }
	showResults(urlPath);
}