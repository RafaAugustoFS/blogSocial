const url = "http://10.92.198.38:8080/user/profile";
const main = document.getElementById("cardUser");
const urlImage = "http://10.92.198.38:8080/";

const authToken = localStorage.getItem('token'); // Obter o token armazenado no localStorage

if (main) {
  fetch(url, {
    headers: {
      'Authorization': `Bearer ${authToken}` // Adiciona o token ao cabeçalho da solicitação
    }
  })
    .then((response) => {
      if (!response.ok) {
        if (response.status === 401) {
        console.log('Não autorizado. Verifique suas credenciais.');
        }
      console.log(`Erro HTTP! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log('Resposta da API:', data);

      if (data.token) {
        // Utiliza o token conforme necessário
        const token = data.token;
        console.log('Token recebido:', token);
        // Por exemplo, você pode redirecionar para outra página e passar o token como um parâmetro
        window.location.href = `index2.html?token=${token}`;
      } else {
        console.log('Token não encontrado na resposta da API');
        console.log(localStorage);
        // Chame a função cardsUser se não houver token, presumindo que você queira renderizar o perfil do usuário
        cardsUser(data);
      }
    })
    .catch((err) => {
      console.log('Erro na busca:', err);
    });
} else {
  console.log('Elemento com ID "cardUser" não encontrado no DOM.');
}

function cardsUser(data) {
  const user = data.profile;
  console.log(data.profile);
  const postUser = user.posts;
  if (user) {
    const userCard = document.createElement("div");
    userCard.className = "containerUser";
    userCard.innerHTML = `
      <div class="container3">
        <h2>Perfil do Usuário</h2>
        <div class="user-info">
          <img class="userIcon" src="${user.avatar}">
          <div class="user-Content" id="infoUser">
            <p><strong>Nome:</strong> ${user.name}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Posts:</strong></p>
            <img class="userIcon" src="${urlImage + user.posts}">
          </div>
        </div>
      </div>
    `;
    
    main.appendChild(userCard);

    postUser.forEach(post => {
      const postCard = document.createElement("div");
      postCard.className = "container";
      postCard.innerHTML = `
        <div class="blog-card">
          <h3 class="h4">
            <a href="#" class="card-title hover:underline">${post.title}</a>
          </h3>
          <p class="card-text">${post.content}</p>
          <figure class="card-banner img-holder" style="--width: 550; --height: 550;">
            <img src="${urlImage + post.imageUrl}" width="250" height="300" loading="lazy" alt="" class="img-cover">
          </figure>
        </div>
      `;

      main.appendChild(postCard);
    });
  } else {
    console.log(' Posts não econtrado ' );
  }
}
