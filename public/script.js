const form = document.querySelector('form');
const image = document.getElementById('uploaded-image');
const showButton = document.getElementById('show-button');
// Assuming you have included the socket.io client library in your HTML file
// Assuming you have an image element with the ID 'yourImageElementId'
const imageElement = document.getElementById('uploaded-image');

// Handle the upload form submission
const uploadForm = document.querySelector('form');
uploadForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(uploadForm);

    // Send the form data to the server using fetch or XMLHttpRequest
    // Assuming you have an image element with the ID 'yourImageElementId'


    // Function to refresh the image
    function refreshImage() {
        const timestamp = Date.now();
        imageElement.src = `/image?timestamp=${timestamp}`;
    }

    // Refresh the image every 2 seconds
    setInterval(refreshImage, 2000);

    fetch('/upload', {
        method: 'POST',
        body: formData,
    })
        .then((response) => response.json())
        .then((data) => {
            // Check if the upload was successful
            if (data.success) {
                // Reload the image
                imageElement.src = '/image?' + new Date().getTime();
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
);

setInterval(reloadImage, 2000);

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

