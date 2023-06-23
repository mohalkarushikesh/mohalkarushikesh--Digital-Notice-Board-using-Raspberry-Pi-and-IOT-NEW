<script>
    const uploadForm = document.querySelector("#uploadForm");
    const imageContainer = document.querySelector("#imageContainer");

      uploadForm.addEventListener("submit", (event) => {
        event.preventDefault();

    const formData = new FormData(uploadForm);

    fetch("/upload", {
        method: "POST", 
    body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
        imageContainer.innerHTML = `<img src="/image?filename=${data.filename}" />`;
            }
          })
          .catch((error) => {
        console.error(error);
          });
      });
</script>