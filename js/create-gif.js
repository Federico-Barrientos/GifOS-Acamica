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


    const cancel = document.getElementById('cancel');
    const restart = document.getElementById('restart');
    const upload = document.getElementById('upload');
    const progressBar = document.getElementsByClassName('progress-bar-item');
    const uploadMessage = document.getElementById('upload-msg')
    const download = document.getElementById('download')
    const copy = document.getElementById('copy')
    const main = document.getElementById('main-container');
    const header = document.getElementById('header');
    const mainLogo = document.getElementById('main');
    const start = document.getElementById('btn-comenzar');
    const record = document.getElementById('btn-capture');
    const stop = document.getElementById('stop');
    let btnStage4 = document.getElementById('buttons-stage4');
    let preview = document.getElementById('preview');
    let gifCapturaHead = document.getElementById('gif-capture-head');
    const btnContainer = document.getElementById('btn-container');
    const video = document.querySelector('video');
    
    const stage1 = document.getElementById('stage1');
    const stage2= document.getElementById('stage2');
    const stage3 = document.getElementById('stage3');


//GIPHY
const apiKey = 'vSf42uKTUkCGczyq2WpawfwgaiEhSwBs';
const apiBaseUrl = 'https://api.giphy.com/v1/gifs/';

//RECORDRTC

 let recorder;

 let recording = false;


function getStreamAndRecord () {
   
    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: { 
      height: { max: 480 }
    }
  })
    .then(function(stream) {

      video.srcObject = stream;
      video.play()
       
      record.addEventListener('click', () => {
        recording = !recording
        document.getElementById('camera-button').src = 'img/recording.svg'

      if (recording === true) {
        this.disabled = true;
        recorder = RecordRTC(stream, {
          type: 'gif',
          frameRate: 1,
          quality: 10,
          width: 360,
          hidden: 240,
          onGifRecordingStarted: function() {
            console.log('started')
          },
        });
        
        recorder.startRecording();
        getDuration()
      
        record.classList.add('button-recording');
        record.innerHTML = 'Listo';
        stop.classList.add('button-recording');
        document.getElementById('timer').classList.remove('hidden');
        btnContainer.style.justifyContent = "space-between";
        gifCapturaHead.innerHTML = "Capturando Tu Guifo";

        // para cortar stream de la camara
        recorder.camera = stream; 

    } else {
        this.disabled = true;
        recorder.stopRecording(stopRecordingCallback);
        recording = false;      
      }
    });
  });
}


function stopRecordingCallback() {

  recorder.camera.stop();


  let form = new FormData();
  form.append("file", recorder.getBlob(), 'test.gif');
  
  upload.addEventListener('click', () => {
    uploadMessage.classList.remove('hidden');
    preview.classList.add('hidden');
    animateProgressBar(progressBar);
    uploadGif(form);
    btnStage4.classList.add('hidden');
    cancel.classList.remove('hidden');
    document.getElementById('timer').classList.add('hidden');
    btnContainer.style.justifyContent = "flex-end";
    gifCapturaHead.innerHTML = "Subiendo Gifo";
  })

  objectURL = URL.createObjectURL(recorder.getBlob());
  preview.src = objectURL;


  preview.classList.remove('hidden')
  video.classList.add('hidden')
  record.classList.add('hidden');
  btnStage4.classList.remove('hidden');
  document.getElementById('video-record-buttons').classList.add('hidden');
  gifCapturaHead.innerHTML = "Vista Previa";

  recorder.destroy();
  recorder = null;
 
}

start.addEventListener('click', () => {
  stage1.classList.add('hidden');
  stage2.classList.remove('hidden');  
  getStreamAndRecord()
});

restart.addEventListener('click', () => {
  location.reload();
  getStreamAndRecord()
})


/////////////////////////////////////////////////////////////////////////////////////////////////////



function getDuration() {
  let seconds = 0;
  let minutes = 0;
  let timer = setInterval(() => {
    if (recording) {
      if (seconds < 60) {
        if (seconds <= 9) {
          seconds = '0' + seconds;
        }
        document.getElementById('timer').innerHTML=`00:00:0${minutes}:${seconds}`;
        seconds++;
      } else {
        minutes++;
        seconds = 0;
      }
    }
    else {
      clearInterval(timer)
    }
  }, 1000);
} 

//CANCELAR SUBIDA DE GIF

let controller = new AbortController();
let signal = controller.signal;

cancel.addEventListener('click' , () => {
    controller.abort();
    controler = new AbortController();
    console.log("abortito");
    location.reload();
})

// Barra de progreso

let counter = 0;
function animateProgressBar (bar) {
    setInterval(() => {
      if (counter < bar.length) {
        bar.item(counter).classList.toggle('progress-bar-item-active')
        counter++;
      } else {
        counter = 0;
      }
    }, 200)
} 

function uploadGif(gif) {

  fetch('https://upload.giphy.com/v1/gifs' + '?api_key=' + apiKey, {
    signal: controller.signal,
    method: 'POST',
    body: gif,
  }).then(res => {
    console.log(res.status)
    if (res.status != 200 ) {
      uploadMessage.innerHTML = `<h3>Hubo un error subiendo tu Guifo</h3>`
    }
    return res.json();  
  }).then(data => {  
    uploadMessage.classList.add('hidden');
    document.getElementById('share-modal-wrapper').classList.remove('hidden')
    const gifId = data.data.id
    getGifDetails(gifId)

  })
}

function getGifDetails (id) {

  fetch(apiBaseUrl + id + '?api_key=' + apiKey) 
      .then((response) => {
         return response.json()
      }).then(data => {
          const gifUrl = data.data.url
          localStorage.setItem('gif' + data.data.id, JSON.stringify(data));

          document.getElementById('share-modal-preview').src = data.data.images.fixed_height.url;
          const copyModal = document.getElementById('copy-success');
          preview.classList.remove('hidden');
          main.classList.add('gray');
          header.classList.add('gray');
          mainLogo.classList.add('gray');
        
          download.href = gifUrl

          copy.addEventListener('click', async () => {
            await navigator.clipboard.writeText(gifUrl);
            copyModal.innerHTML = 'Link copiado con éxito!'
            copyModal.classList.remove('hidden')
            setTimeout(() => { copyModal.classList.add('hidden') }, 1500);
          })

          document.getElementById('embed').addEventListener('click', async () => {
            await navigator.clipboard.writeText(data.data.embed_url)
            copyModal.innerHTML = 'Código copiado con éxito!'
            copyModal.classList.remove('hidden')
            setTimeout(() => { copyModal.classList.add('hidden') }, 500);
          })

          document.getElementById('finish').addEventListener('click', () => {
            location.reload();
          })
      })
      .catch((error) => {
          return error
      })
}

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

getMyGifs()

document.getElementById('share-done').addEventListener('click', () => {
  location.reload();
})









