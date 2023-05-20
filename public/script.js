const form = document.querySelector('form');
const image = document.getElementById('uploaded-image');
const showButton = document.getElementById('show-button');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    fetch('/upload', {
        method: 'POST',
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                image.src = data.filename;
                image.style.display = 'inline';
                showButton.style.display = 'inline';
            } else {
                alert('Upload failed!');
            }
        });
});

showButton.addEventListener('click', () => {
    image.style.display = 'inline';
});

window.addEventListener('load', () => {
    fetch('/image')
        .then(response => response.json())
        .then(data => {
            if (data.filename) {
                image.src = data.filename;
                image.style.display = 'inline';
                showButton.style.display = 'inline';
            }
        });
});
