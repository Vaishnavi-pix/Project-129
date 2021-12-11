leftwristx=0;
leftwristy=0;
rightwristx=0;
rightwristy=0;
scoreleftwrist=0;
scorerightwrist=0;
music1="";
music2="";
music_status1="";
music_status2="";
function preload(){
music1=loadSound("music2.mp3");
music2=loadSound("music.mp3");
}
function setup(){
    canvas=createCanvas(600,450);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video,modelLoaded);
    posenet.on("pose",gotPoses);
}
function gotPoses(results){
if(results.length>0){
leftwristx=results[0].pose.leftWrist.x;
leftwristy=results[0].pose.leftWrist.y;
console.log("left wrist x = "+leftwristx+" left wrist y = "+leftwristy);
rightwristx=results[0].pose.rightWrist.x;
rightwristy=results[0].pose.rightWrist.y;
console.log("right wrist x = "+rightwristx+" right wrist y = "+rightwristy);
scoreleftwrist=results[0].pose.keypoints[9].score;
scorerightwrist=results[0].pose.keypoints[10].score;
console.log(scoreleftwrist);
}
}
function modelLoaded(){
    console.log("model loaded");
}
function draw(){
    image(video,0,0,600,450);
    music_status1=music1.isPlaying();
    music_status2=music2.isPlaying();
    stroke("red");
    fill("red");
    
    circle(rightwristx,rightwristy,20);
    if(scoreleftwrist>=0.2){
        circle(leftwristx,leftwristy,20);
        music2.stop();
    if(music_status1==false){
        music1.play();
        document.getElementById("song").innerHTML="Song - Peter Pan";
    }
    
    }
    if(scorerightwrist>=0.2){
        music1.stop();
        if(music_status2==false){
            music2.play();
            document.getElementById("song").innerHTML="Song - Harry Potter";
        }
    }
}


    


function play(){
    music1.play();
music1.setVolume(1);
music1.rate(1);
music2.setVolume(1);
music2.rate(1);
}