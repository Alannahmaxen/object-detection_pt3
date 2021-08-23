img = "";
status = "";
objects = [];
objectDetector = "";


function preload() {
    img = loadImage('computer.JPG');
}

function setup() {
    canvas = createCanvas(640, 420);
    canvas.parent('canvas');
    //canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);

    document.getElementById("status").innerHTML = " Detection in Progress..."
}

function draw() {
    r = random(255);
    g = random(255);
    b = random(255);
    image(img, 0, 0, 640, 420)
    if (status != "") {
    
        for (var i = 0; i < objects.length; i++) {
            console.log('working');
            document.getElementById("status").innerHTML = " Detection Completed!";

            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "% ", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}


function modelLoaded() {
    console.log("Model is Loaded!");
    status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function back() {
    window.location = "index.html";
}