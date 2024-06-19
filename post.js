document
  .getElementById("imageInput")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById("imagePreview").src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

const form = document.getElementById("form");

form.addEventListener("submit", function (e) {
  const title = document.getElementById("title");
  const content = document.getElementById("content");
  const image = document.getElementById("imageInput");
  const token = localStorage.getItem("token");

  e.preventDefault();

  const formData = new FormData();
  formData.append("image", image.files[0]);
  formData.append("title", title.value);
  formData.append("content", content.value);

  fetch("http://10.92.198.38:8080/feed/post", {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((result) => result.json())
    .then((data) => {
      console.log(data);
      alert("Workou");
    //   window.location.href = "index2.html";
    })

    .catch((err) => console.log(err));
});
