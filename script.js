
const url = "http://10.92.198.38:8080/feed/posts";
const urlImage = "http://10.92.198.38:8080/"
const main = document.getElementById("image");
const btnLoadMore = document.getElementById("btnLoadMore");
    const cardContainer = document.getElementById("cardContainer");
 
    let currentPage = 0;
    const cardsPerPage = 10; 
 
    btnLoadMore.addEventListener("click", function (e) {
      e.preventDefault();    
      fetch(url)
  .then((response) => response.json())
  .then((data) => cards(data));

  function cards(data) {
  const dataArray = data.posts;

  dataArray.forEach((element) => {
    const card = document.createElement("div");
    card.className = "container";
    card.innerHTML = `
    
    <div class="blog-card" > 
    <h3 class="h4">
    <a href="#" class="card-title hover:underline">
    ${element.title}
    </a>
  </h3>
  <p class="card-text">
  ${element.content}
  </p>
  <figure class="card-banner img-holder" style="--width: 550; --height: 550;">
  <img src="${urlImage + element.imageUrl}" width="250" height="300" loading="lazy"
    alt="" class="img-cover">
  </figure>
  </div>
 

   
  `;
    main.appendChild(card);
  });
}
    });
