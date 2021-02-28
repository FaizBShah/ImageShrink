const path = require('path');
const os = require('os');
const { ipcRenderer } = require('electron');

const form = document.getElementById('image-form');
const slider = document.getElementById('slider');
const img = document.getElementById('img');

document.getElementById('output-path').innerText = path.join(os.homedir(), 'imageshrink');

// On Submit
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const imgPath = img.files[0].path;
  const quality = slider.value;

  ipcRenderer.send('image:minimize', {
    imgPath,
    quality
  })
})

// On Done
ipcRenderer.on('image:done', () => {
  M.toast({
    html: `Image resized to ${slider.value}% quality`
  })
})