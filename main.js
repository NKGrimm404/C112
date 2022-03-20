prediction="";
Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera=document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot(){
Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML='<img id="capture_image" src="'+data_uri+'">'
})
}
console.log('ml5version',ml5.version);

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/letBIsAGE/model.json',modelLoaded);
function modelLoaded(){
    console.log('model is loaded');
}

function speak(){
    synth = window.speechSynthesis;
    speak_data = "The Prediction is"+prediction;
    utter_this=new SpeechSynthesisUtterance(speak_data);
    synth.speak(utter_this);
}

function check(){
    img=document.getElementById('capture_image');
    classifier.classify(img, gotResult);

}
function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML=results[0].label;
        prediction=results[0].label;
        speak();
        if(results[0].label=="Loser"){
            document.getElementById("update_gesture").innerHTML="&#128070;";
        }
        if(results[0].label=="Hello"){
            document.getElementById("update_gesture").innerHTML="&#128075;";
        }
        if(results[0].label=="Okay"){
            document.getElementById("update_gesture").innerHTML="&#128076;";
        }
    }
}

