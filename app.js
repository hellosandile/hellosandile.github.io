/*
This library is still compute heavy. 
This is mainly because of the neural net 
operations needed to predict bounding boxes.
*/

// DOCUMENTATION ABOUT THIS LIBRARY https://victordibia.com/handtrack.js/#/docs

const modelParams = {
    flipHorizontal: true,
    imageScaleFactor: 0.7,
    maxNumBoxes: 1,
    iouThreshold: 0.5,
    scoreThreshold: 0.8,
};

navigator.getUserMedia = navigator.getUserMedia || navigator.webKitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

//Select everything from html
const video = document.querySelector('#video');


let model = null;  //This library comes with a premade model

handTrack.startVideo(video)
    .then(status => {
        if(status){
            navigator.getUserMedia({video: {}}, stream => {
                video.srcObject = stream;
                //RUN DETECTION
                setInterval(runDetection, 800);
            }, 
            err => console.log(err));
        }
    });

function runDetection() {
    model.detect(video).then(predictions => {
            if(predictions.length !== 0){
                let videoHand = predictions[0].bbox;
                let x = videoHand[0];
                let y = videoHand[1];
                //PRINTING x & y coordinates to figure out range to trigger action
                console.log("X:", x);
                console.log("Y: ", y);
            }
        });
}

//This loads the model

handTrack.load(modelParams).then((lmodel) => {
        model = lmodel;
    });