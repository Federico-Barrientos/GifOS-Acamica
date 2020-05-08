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