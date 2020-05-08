//MY GIFS
function getMyGifs () {
    let items = [];
    for (var i = 0; i < localStorage.length; i++){
      let item = localStorage.getItem(localStorage.key(i))
      console.log(item)
      if (item.includes('data')) {
        itemJson = JSON.parse(item)
        items.push(itemJson.data.images.fixed_height.url)
        console.log(items)
      }
    }
    return items
  }
  
  window.addEventListener('load', () => {
    const localGifs = getMyGifs()
    console.log(localGifs)
    localGifs.forEach(item => {
      const img = document.createElement('img')
      img.src = item;
      img.classList.add('results-thumb');
      document.getElementById('results').appendChild(img);
    })
  })
  
  getMyGifs();
    
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