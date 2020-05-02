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

const video = document.getElementById('video-capture');




let constraintObj = {
    audio: false,
    video: {
        facingMode: "user",
        width:832,
    }
}
//ACAMICA
// function getStreamAndRecord () { 

//     navigator.mediaDevices.getUserMedia({
    
//     audio: false,
    
//     video: {
    
//     height: { max: 480 }
    
//     }
    
//     })
    
//     .then(function(stream) {
    
//     video.srcObject = stream;
    
//     video.play();
    
//     })




//VICKY
// const videoCapture = document.getElementById('video-capture');
// let constraints = {
//     audio: false,
//     video: {
//             width: { min: 1280 },
//             height: { min: 720 }
// }
// }
// let btnCapture = document.getElementById('btn-capture');
// //muestro el video en un chequeo antes de empezar
// btnCapture.addEventListener("click", getAndRecordMedia)

//  function getAndRecordMedia() {
//     getMedia(constraints).then(showMedia).catch(errorGetMedia)
// }

// var media; //necesito esta varaible para parar la camara en StopRecording
// //obtengo video
// function getMedia(constraints) {
//     return navigator.mediaDevices.getUserMedia(constraints).then( x=> {
//         media = x  
//         return media
//   }).catch(err => {
//           console.log("erorr tipo " + err)
//   });
//   }

//   //muestro el video en un chequeo antes de empezar
// function showMedia(media) {
//     try {
//         if (videoCapture.srcObject !== undefined) {
//         videoCapture.srcObject = media;
//       } else {
//         videoCapture.src = media;
//       }
//           videoCapture.play()
//     } catch (error) {
//         alert("error: " + error)
//     }

// }

// function errorGetMedia(error) {
//     alert(error)
// }
