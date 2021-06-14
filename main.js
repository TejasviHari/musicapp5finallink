song1="";
song2="";

song1stat="";
song2stat="";

leftWristX="";
leftWristY="";

rightWristX="";
rightWristY="";

scoreLeftWrist="";
scoreRightWrist="";

function preload(){
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3")
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video,modeloaded);
    posenet.on('pose',gotPoses);
}

function modeloaded(){
    console.log("Posenet initialized");
}

function draw(){
    image(video,0,0,600,500);

fill(255,0,0);
stroke(255,0,0);
if(scoreRightWrist>0.2){
circle(rightWristX,rightWristY,20);
song2.stop();
if(song2stat==false){
    song1.play();
    document.getElementById("song").innerHTML="Now playing Harry Potter"
}
}
//
if(scoreLeftWrist>0.2){
circle(leftWristX,leftWristY,20);
song1.stop();
if(song1stat==false){
    song2.play();
    document.getElementById("song").innerHTML="Now playing Peter Pan";
}
}
}



function gotPoses(results){
    if(results.length>0){
        console.log(results)
        scoreRightWrist=results[0].pose.keypoints[10].score;
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("Left wrist X:"+leftWristX+", Left wrist Y:"+leftWristY);
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("Right wrist X:"+rightWristX+", Right wrist Y:"+rightWristY)
    }
}