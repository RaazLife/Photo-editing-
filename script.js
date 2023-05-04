const imageInput = document.getElementById('imageInput');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let img;

imageInput.addEventListener('change', function () {
  img = new Image();
  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
  }
  img.src = URL.createObjectURL(this.files[0]);
});

document.getElementById('grayBtn').addEventListener('click', function () {
  if (img) {
    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const gray = (data[i] + data[i+1] + data[i+2]) / 3;
      data[i] = gray;
      data[i+1] = gray;
      data[i+2] = gray;
    }
    ctx.putImageData(imageData, 0, 0);
  }
});

document.getElementById('invertBtn').addEventListener('click', function () {
  if (img) {ctx.drawImage(img, 0, 0);
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
const data = imageData.data;
for (let i = 0; i < data.length; i += 4) {
  data[i] = 255 - data[i];
  data[i+1] = 255 - data[i+1];
  data[i+2] = 255 - data[i+2];
}
ctx.putImageData(imageData, 0, 0);
}
});

document.getElementById('brightnessBtn').addEventListener('click', function () {
if (img) {
ctx.drawImage(img, 0, 0);
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
const data = imageData.data;
const amount = 50;
for (let i = 0; i < data.length; i += 4) {
data[i] += amount;
data[i+1] += amount;
data[i+2] += amount;
}
ctx.putImageData(imageData, 0, 0);
}
});

document.getElementById('contrastBtn').addEventListener('click', function () {
if (img) {
ctx.drawImage(img, 0, 0);
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
const data = imageData.data;
const factor = (259 * (50 + 255)) / (255 * (259 - 50));
for (let i = 0; i < data.length; i += 4) {
data[i] = factor * (data[i] - 128) + 128;
data[i+1] = factor * (data[i+1] - 128) + 128;
data[i+2] = factor * (data[i+2] - 128) + 128;
}
ctx.putImageData(imageData, 0, 0);
}
});

document.getElementById('resetBtn').addEventListener('click', function () {
if (img) {
ctx.drawImage(img, 0, 0);
}
});

document.getElementById('downloadBtn').addEventListener('click', function () {
if (img && canvas) {
const link = document.createElement('a');
link.download = 'edited-image.png';
link.href = canvas.toDataURL();
link.click();
}
});
