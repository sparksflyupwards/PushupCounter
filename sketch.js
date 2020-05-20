// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;
let poseNet;
let poses = [];
let outputLabel;
highest_y = 0
lowest_y = 10000
state = ""
pushups = 0

function setup() {
    outputLabel = select('#output')
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
    image(video, 0, 0, width, height);
    strokeWeight(2);
  
      
    // For one pose only (use a for loop for multiple poses!)
    if (poses.length > 0) {
     
      let pose = poses[0].pose;
      fill(213, 0, 143);
      let left_shoulder = pose['leftShoulder'];
      ellipse(left_shoulder.x, left_shoulder.y, 20, 20);

      let right_shoulder = pose['rightShoulder'];
      ellipse(right_shoulder.x, right_shoulder.y, 20, 20);

      

      if(left_shoulder.y>300){
        
        state = "bottom"
      }
      if(left_shoulder.y<200){
        if(state == "bottom"){
          
          pushups = pushups + 1
          outputLabel.html('Total pushups: '+pushups);
        }
        state = "top"
      }
      
      /** 
      // Create a pink ellipse for the nose
      fill(213, 0, 143);
      let left_wrist = pose['leftWrist'];
      ellipse(left_wrist.x, left_wrist.y, 20, 20);
  
      // Create a yellow ellipse for the right eye
      fill(255, 215, 0);
      let right_wrist = pose['rightWrist'];
      ellipse(right_wrist.x, right_wrist.y, 20, 20);
  
      // Create a yellow ellipse for the right eye
      fill(189, 189, 0);
      let leftEye = pose['leftEye'];
      ellipse(leftEye.x, leftEye.y, 20, 20);
        delta = left_wrist.y-right_wrist.y
        error_margin =100;
      if(Math.abs(left_wrist.y-right_wrist.y)<30){
        outputLabel.html('BALANCED WRISTS');
      }
      else if(left_wrist.y>right_wrist.y){
          outputLabel.html('RIGHT WRISTS HIGH');
      }
      else if(left_wrist.y<right_wrist.y){
        outputLabel.html('LEFT WRISTS HIGH');
      }
      */
      
    }
  }

// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}