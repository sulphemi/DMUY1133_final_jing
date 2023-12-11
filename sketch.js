class HeaderBar {

}

class Wind {

}

let img;
function setup() {
    createCanvas(800, 800);
    img = getLoremImage();
}

function draw() {
    image(img, 0, 0, img.width, img.height);
}

function getLoremImage(imgWidth, imgHeight, imgSubject) {
    imgWidth = imgWidth ?? Math.floor(random() * 500) + 300;
    imgHeight = imgHeight ?? Math.floor(random() * 500) + 300;
    
    if (typeof imgSubject !== undefined) {
        let loadURL = `https://picsum.photos/${imgWidth}/${imgHeight}`;
        console.log(loadURL);
        return loadImage(loadURL);
    } else {
        return loadImage(`https://loremflickr.com/${imgWidth}/${imgHeight}/${imgSubject}`);
    }
}