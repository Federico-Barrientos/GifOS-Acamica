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

//LO NUEVO !





    //add listeners for saving video/audio
    const start = document.getElementById('btn-comenzar');

    const record = document.getElementById('btn-capture');
    const stop = document.getElementById('btn-ready');
    let btnStage4 = document.getElementById('buttons-stage4');
    let preview = document.getElementById('preview');
    // let mediaRecorder = new MediaRecorder(mediaStreamObj);
    // let chunks = [];


    const video = document.querySelector('video');
    
    const stage1 = document.getElementById('stage1');
    const stage2= document.getElementById('stage2');
    const stage3 = document.getElementById('stage3');


// Constantes útiles

const apiKey = 'JQhP1sBxi7d1SKpBsMlFDJYPGUobpcpK';
const apiBaseUrl = 'https://api.giphy.com/v1/gifs/';

// Subir gifs

// Elementos del HTML con los que vamos a interactuar

const restart = document.getElementById('restart');
const upload = document.getElementById('upload');
const progressBar = document.getElementsByClassName('progress-bar-item');
const uploadMessage = document.getElementById('upload-msg')
const download = document.getElementById('download')
const copy = document.getElementById('copy')
const nav = document.getElementById('nav')
const main  = document.getElementById('main')


 // definimos el objeto recorder - tiene que se global para que podamos accederlo en todos los listeners
 let recorder;

 // También una variable recording para manejar el timer
 let recording = false;

// Obtener video y grabación

function getStreamAndRecord () {
   
    // empieza a correr la cámara
    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: { 
      height: { max: 480 }
    }
  })
    .then(function(stream) {

      // Usamos el stream de la cámara como source de nuestra tag <video> en el html
      video.srcObject = stream;
      video.play()
       
      record.addEventListener('click', () => {
        recording = !recording

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
      
        // modificamos el dom para que se note que estamos grabando
        record.classList.add('button-recording')
        record.innerHTML = 'Listo'
        stop.classList.add('button-recording')

        // cortamos el stream de la cámara
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

  // le damos el formato requerido a la data que vamos a enviar como body de nuestro 
  // POST request
  let form = new FormData();
  form.append("file", recorder.getBlob(), 'test.gif');
  
  // upload.addEventListener('click', () => {
  //   uploadMessage.classList.remove('hidden');
  //   preview.classList.add('hidden')
  //   animateProgressBar(progressBar);
  //   uploadGif(form)
  // })

  objectURL = URL.createObjectURL(recorder.getBlob());
  preview.src = objectURL;

  // modificamos el dom para mostrar la preview, remover el timer
  preview.classList.remove('hidden')
  video.classList.add('hidden')
  document.getElementById('video-record-buttons').classList.add('hidden');
  document.getElementById('video-upload-buttons').classList.remove('hidden');


  recorder.destroy();
  recorder = null;
 
}

start.addEventListener('click', () => {
  // cambiamos de modal pre a modal grabación
  stage1.classList.add('hidden');
  stage2.classList.remove('hidden');  
  getStreamAndRecord()
});

// restart.addEventListener('click', () => {
//   location.reload();
//   getStreamAndRecord()
// })


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












