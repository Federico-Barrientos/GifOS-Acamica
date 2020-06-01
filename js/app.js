// THEME SWITCH
let dropSailor = document.getElementById('drop-sailor');
let themeValue;

function toggleThemesMenu() {
    if (dropSailor.style.display === "none") {
      dropSailor.style.display = "block";
    } else {
      dropSailor.style.display = "none";
    }
  }
function sailorLight(){
        document.documentElement.setAttribute('theme', 'light');
        themeValue = "light";
        localStorage.setItem('themeValue', themeValue);
        dropSailor.style.display = "none";
    }
function sailorDark(){
        document.documentElement.setAttribute('theme', 'dark');
        themeValue = "dark";
        localStorage.setItem('themeValue', themeValue);
        dropSailor.style.display = "none";
    }
// THEME LOAD
    function loadTheme(){
        let storedTheme = localStorage.getItem('themeValue');
        if(storedTheme == null){
            sailorLight();
        }else{
          document.documentElement.setAttribute('theme', storedTheme);
      }

    }
  loadTheme();

///////////////////////////////

//GIPHY API
const GIPHY_KEY = 'vSf42uKTUkCGczyq2WpawfwgaiEhSwBs';
const GIPHY_API_URL = 'https://api.giphy.com/v1/gifs/';

///////////////////////////////

//TRAER Y RENDERIZAR SUGERENCIAS

async function GifSugestion1(){
  let url = GIPHY_API_URL + "random?api_key=" + GIPHY_KEY;
  let verMas1 = document.getElementById('verMas1');
  return fetch(url).then(response => response.json())
  .then(content =>{
    // console.log(content.content);
    let p = document.getElementById('sugestion-text1');
    let img = document.getElementById('random1');
    img.src = content.data.images.fixed_height.url;
    if(content.data.title == ""){
      p.innerHTML = "#Animated #GIF";
      verMas1.onclick = x => {
        search.value = "animated gif";
        getSearchResults(event);
  
    };
    } else{
      p.innerHTML = content.data.title.replace(/(^|\s+)/g, "$1#");
      verMas1.onclick = x => {
        search.value = content.data.title;
        getSearchResults(event);
      };
    }


  })
}

async function GifSugestion2(){
  let url = GIPHY_API_URL + "random?api_key=" + GIPHY_KEY;
  let verMas2 = document.getElementById('verMas2');
  return fetch(url).then(response => response.json())
  .then(content =>{
    // console.log(content.data);
    let p = document.getElementById('sugestion-text2');
    let img = document.getElementById('random2');
    img.src = content.data.images.fixed_height.url;
    if(content.data.title == ""){
      p.innerHTML = "#Animated #GIF";
      verMas1.onclick = x => {
        search.value = "animated gif";
        getSearchResults(event);
  
    };
    } else{
      p.innerHTML = content.data.title.replace(/(^|\s+)/g, "$1#");
      verMas2.onclick = x => {
        search.value = content.data.title;
        getSearchResults(event);
      };
    }
  })
}

async function GifSugestion3(){
  let url = GIPHY_API_URL + "random?api_key=" + GIPHY_KEY;
  let verMas3 = document.getElementById('verMas3');
  return fetch(url).then(response => response.json())
  .then(content =>{
    // console.log(content.data);
    let p = document.getElementById('sugestion-text3');
    let img = document.getElementById('random3');
    img.src = content.data.images.fixed_height.url;
    if(content.data.title == ""){
      p.innerHTML = "#Animated #GIF";
      verMas1.onclick = x => {
        search.value = "animated gif";
        getSearchResults(event);
  
    };
    } else{
      p.innerHTML = content.data.title.replace(/(^|\s+)/g, "$1#");
      verMas3.onclick = x => {
        search.value = content.data.title;
        getSearchResults(event);
      };
    }
  })
}

async function GifSugestion4(){
  let url = GIPHY_API_URL + "random?api_key=" + GIPHY_KEY;
  let verMas4 = document.getElementById('verMas4');
  return fetch(url).then(response => response.json())
  .then(content =>{
    // console.log(content.data);
    let p = document.getElementById('sugestion-text4');
    let img = document.getElementById('random4');
    img.src = content.data.images.fixed_height.url;
    if(content.data.title == ""){
      p.innerHTML = "#Animated #GIF";
      verMas1.onclick = x => {
        search.value = "animated gif";
        getSearchResults(event);
  
    };
    } else{
      p.innerHTML = content.data.title.replace(/(^|\s+)/g, "$1#");
      verMas4.onclick = x => {
        search.value = content.data.title;
        getSearchResults(event);
      };
    }
    

  })
}
GifSugestion1();
GifSugestion2();
GifSugestion3();
GifSugestion4();


///////////////////////////////

// CONTENEDOR RESULTADOS TENDENCIAS
const searchResultsContainer = document.getElementById('search-results-container');

//TRAER TENDENCIAS
function getTrends(ammount) {
  const url = GIPHY_API_URL + 'trending?api_key=' + GIPHY_KEY + '&limit=' + ammount;
  return fetch(url).then(response => response.json());

}

//RENDERIZACION DE RESULTADOS (AGREGAR COMO RESOLVER EN CASO DE QUE NO HAYA RESULTADOS)
function renderSearchResults(results) {
  results.data.forEach(item => renderGifItem(item));
}

//RENDERIZACION INDIVIDUAL
function renderGifItem(item) {
  const imgUrl = item.images.fixed_height.url;
  const div = document.createElement('div');
  const img = document.createElement('img');
  let div2 = document.createElement('div');
  let p = document.createElement('p');  

  div.classList.add('gif-item');
  div.append(img);
  img.setAttribute('src', imgUrl);
  p.innerHTML = item.title.replace(/(^|\s+)/g, "$1#");;
  div2.classList.add('tendencia-title');
  div.appendChild(div2);
  div2.appendChild(p);


  searchResultsContainer.append(div);


  
}

//CANTIDAD DE GIFS
const ammount = 27;
getTrends(ammount).then(response => renderSearchResults(response));

///////////////////////////////

// CONTENEDOR DE RESULTADOS DE BUSQUEDA
const searchResults = document.getElementById('search-results');
const searchTitle = document.getElementById('result-title');
const searchHistory = [];
const searchHistoryCont = document.getElementById('search-history');

function searchCleaner(){
  if(searchResults !== ''){
    searchResults.innerHTML = '';
  }else{
    return false;
  }
}

//TRAER Y RENDERIZAR RESULTADOS DE BUSQUEDA
async function getSearchResults(event){
  event.preventDefault();
  searchCleaner();
  searchHistoryCont.innerHTML = "";
  let url = `${GIPHY_API_URL}search?api_key=${GIPHY_KEY}&limit=11&q=`;
  let str = document.getElementById('search').value.trim();
  url = url.concat(str);
  if(str !== ""){
    return fetch(url).then(response => response.json())
    .then(content =>{
       for (let i = 0; i < 10; i++) { 
        let div = document.createElement('div');
        let img = document.createElement('img');
        let div2 = document.createElement('div');
        let p = document.createElement('p');
        img.src = content.data[i].images.fixed_height.url;
        p.innerHTML = content.data[i].title.replace(/(^|\s+)/g, "$1#");
        searchResults.appendChild(div);
        div.appendChild(img);
        div2.classList.add('tendencia-title');
        div.appendChild(div2);
        div2.appendChild(p);
        div.classList.add('gif-item');       
        }  
        document.getElementById('search').value = "";
        sugerencias.style.display = "none";
        boton.classList.remove('btn-active');
        boton.classList.add('btn-inactive');
        searchTitle.classList.remove('hidden');
        searchTitle.innerHTML = str + "(resultados)";
        //agregamos la busqueda a nuestro array
        searchHistory.unshift(str);
        //despues de la primera busqueda dejamos visible el contenedor
        searchHistoryCont.classList.remove('hidden');
        //nos aseguramos de que siempre queden los ultimos 3 resultados de busqueda
        for(let i = 0; i < 3; i++){
          if(searchHistory[i] === undefined){
            return false;
          }else {
            let div = document.createElement('div');
            div.innerHTML = searchHistory[i];
            div.classList.add('history-item');
            searchHistoryCont.appendChild(div);
          }
        }


        
    })
  }

}








//SUGERENCIAS DE BUSQUEDA Y EXTRAS

const searchInput = document.querySelector('#search');
const sugerencias = document.querySelector('.sugerencias');
const boton = document.getElementById('btnSearch');
const ul = document.querySelector('.sugerencias');
let timerFetch = undefined;

searchInput.addEventListener('keyup', function(){
  const input = searchInput.value;
  sugerencias.innerHTML = "";
  if(input !== ""){
    sugerencias.style.display = "flex";
    boton.classList.remove('btn-inactive')
    boton.classList.add('btn-active');
   }else{
     sugerencias.style.display = "none";
     boton.classList.remove('btn-active')
     boton.classList.add('btn-inactive');
    }
    let dataMuse = 'https://api.giphy.com/v1/tags/related/';
    if(timerFetch !== undefined){
      clearTimeout(timerFetch);
    }
    if(input !== ""){
      timerFetch = setTimeout(()=> {
        dataMuse = dataMuse  + input + '?api_key=' + GIPHY_KEY + '&max=3';
        console.log(dataMuse);
        return fetch(dataMuse).then(response => response.json())
        .then(content =>{
          for(let i = 0; i < 3; i++){
          const li = document.createElement('li');
          li.innerHTML = content.data[i].name;
          ul.appendChild(li);
  
          li.onmousedown = x => {
            search.value = li.innerText;
            getSearchResults(event);
  
        };
        }   
        })
      },1000)
    }

})






