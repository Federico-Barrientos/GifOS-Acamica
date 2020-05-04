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
// Botenes capturados
// const btnCapture = document.getElementById('btn-capture');
// const btnReady = document.getElementById('btn-ready');



const video = document.getElementById('video-capture');


function stage1ToStage2(){
    stage1.classList.add('hidden');
    stage2.classList.remove('hidden');
}

// function stage2ToStage3(){
//     document.getElementById('gif-capture-head').innerHTML = "Capturando Tu Gifo";
//     btnCapture.classList.add('hidden');
//     btnReady.classList.remove('hidden');

// }

function testVideo(){
    stage1ToStage2();
    // getMedia();
    
}

let constraintObj = {
    audio: false,
    video: true
}

// if (navigator.mediaDevices === undefined) {
//     navigator.mediaDevices = {};
//     navigator.mediaDevices.getUserMedia = function(constraintObj) {
//         let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
//         if (!getUserMedia) {
//             return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
//         }
//         return new Promise(function(resolve, reject) {
//             getUserMedia.call(navigator, constraintObj, resolve, reject);
//         });
//     }
// }else{
//     navigator.mediaDevices.enumerateDevices()
//     .then(devices => {
//         devices.forEach(device=>{
//             console.log(device.kind.toUpperCase(), device.label);
//             //, device.deviceId
//         })
//     })
//     .catch(err=>{
//         console.log(err.name, err.message);
//     })
// }

navigator.mediaDevices.getUserMedia(constraintObj)
.then(function(mediaStreamObj) {
    //connect the media stream to the first video element
    // let video = document.querySelector('video');
    if ("srcObject" in video) {
        video.srcObject = mediaStreamObj;
    } else {
        //old version
        video.src = window.URL.createObjectURL(mediaStreamObj);
    }
    
    video.onloadedmetadata = function(ev) {
        //show in the video element what is being captured by the webcam
        video.play();
    };
    
    //add listeners for saving video/audio
    let btnBegin = document.getElementById('btn-comenzar');

    let btnCapture = document.getElementById('btn-capture');
    let btnReady = document.getElementById('btn-ready');
    let btnStage4 = document.getElementById('buttons-stage4');
    let vidSave = document.getElementById('recorded-video');
    let mediaRecorder = new MediaRecorder(mediaStreamObj);
    let chunks = [];


const stage1 = document.getElementById('stage1');
const stage2= document.getElementById('stage2');
    

    btnCapture.addEventListener('click', (ev)=>{
        mediaRecorder.start();
        console.log(mediaRecorder.state);
        document.getElementById('gif-capture-head').innerHTML = "Capturando Tu Gifo";
        btnCapture.classList.add('hidden');
        btnReady.classList.remove('hidden');
    })
    btnReady.addEventListener('click', (ev)=>{
        mediaRecorder.stop();
        console.log(mediaRecorder.state);
        btnReady.classList.add('hidden');
        btnStage4.classList.remove('hidden');
        video.classList.add('hidden');
        vidSave.classList.remove('hidden');
     });
    mediaRecorder.ondataavailable = function(ev) {
        chunks.push(ev.data);
    }
    mediaRecorder.onstop = (ev)=>{
        let blob = new Blob(chunks, { 'type' : 'gif;' });
        chunks = [];
        let videoURL = window.URL.createObjectURL(blob);
        vidSave.src = videoURL;
        
    }
})
.catch(function(err) { 
    console.log(err.name, err.message); 
});