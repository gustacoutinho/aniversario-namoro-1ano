$(document).ready(function () {

  // Data de início: 29 de março de 2024
  const startDate = new Date('2024-03-29T20:30:00');

  function updateCounter() {
    const currentDate = new Date();
    const timeDifference = currentDate - startDate;

    // Calcular valores
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    // Atualizar o HTML
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
  }

  // Atualizar imediatamente e depois a cada segundo
  updateCounter();
  setInterval(updateCounter, 1000);


  // Atualizar o mapa quando a janela for redimensionada
  $(window).on('resize', function () {
    map.invalidateSize();
  });

  // Menu Mobile
  $('.mobile-menu').click(function () {
    $('.nav-links').toggleClass('active');
  });

  // Scroll suave para as seções
  $('a[href*="#"]').not('[href="#"]').click(function (event) {
    if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top - 70
        }, 1000);
      }
    }
  });

  // Modal para galeria
  let currentImageIndex = 0;
  const galleryItems = $('.gallery-item');
  const totalImages = galleryItems.length;

  function showImage(index) {
    const imgSrc = $(galleryItems[index]).find('img').attr('src');
    $('#modal-img').attr('src', imgSrc);
    currentImageIndex = index;
  }

  function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % totalImages;
    showImage(currentImageIndex);
  }

  function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
    showImage(currentImageIndex);
  }

  $('.gallery-item').click(function () {
    currentImageIndex = $(this).index();
    showImage(currentImageIndex);
    $('#modal').fadeIn();
  });

  $('.modal-close').click(function () {
    $('#modal').fadeOut();
  });

  $('#modal').click(function () {
    showNextImage();
  });

  $(document).keydown(function (e) {
    if (e.keyCode === 27) {
      $('#modal').fadeOut();
    } else if (e.keyCode === 37) { // Seta esquerda
      showPrevImage();
    } else if (e.keyCode === 39) { // Seta direita
      showNextImage();
    }
  });

  // Efeito de coração flutuante
  function createHearts() {
    $('#floating-hearts').show();
    for (var i = 0; i < 20; i++) {
      var heart = $('<i class="fas fa-heart heart"></i>');
      heart.css({
        left: Math.random() * 100 + '%',
        opacity: Math.random(),
        fontSize: Math.random() * 20 + 10 + 'px',
        animationDuration: Math.random() * 5 + 5 + 's'
      });

      $('#floating-hearts').append(heart);

      // Remove o coração quando a animação terminar
      setTimeout(function (heartElement) {
        return function () {
          heartElement.remove();
        };
      }(heart), (Math.random() * 5 + 5) * 1000);
    }
  }

  // Ativa o efeito de corações quando passar sobre certos elementos
  $('.hero-content h1, .final-message h2, .heart-icon').hover(function () {
    createHearts();
  });

  // Também ativa quando clicar em um item da galeria
  $('.gallery-item').click(function () {
    createHearts();
  });

  // Atualizar o ano atual no footer
  $('#current-year').text(new Date().getFullYear());

  // Ativar o efeito de corações ocasionalmente
  setInterval(function () {
    if (Math.random() > 0.7) { // 30% de chance de ativar
      createHearts();
    }
  }, 10000); // Verifica a cada 10 segundos

  // Ativar corações ao carregar a página
  $(window).on('load', function () {
    setTimeout(function () {
      createHearts();
    }, 1500);
  });   // Inicializar o mapa
  var map = L.map('map').setView([-20.431033, -54.607976], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // Adicionar marcadores no mapa
  var places = [
    { name: 'Castilhos - Nosso Primeiro Encontro 😎', lat: -20.431033, lng: -54.607976, description: 'No aniverário do Alessandro. "Na casa da sua prima 😂"' },
    { name: 'Sésamo - Água com gás, Gelato e Café 🍦', lat: -20.453806, lng: -54.597290, description: 'Onde tomamos nosso primeiro sorvete, você me pagou meu primeiro café e eu descobri que você odiava agua com gás!' },
    { name: 'Parque das Nações - O vestidinho azul 🥥', lat: -20.456037, lng: -54.572573, description: 'Nossa Primeira Água de coco' },
    { name: 'AP - Sambarilove 😈', lat: -20.509166, lng: -54.611759, description: 'A primeira vez que pisei na sua cabeça' },
    { name: 'Picadinho - Nosso Primeiro Beijo 💋', lat: -20.443153, lng: -54.597334, description: 'Aqui eu vi que você já era louca por mim' },
    { name: 'Feira Central - Nosso Primeiro Sobá 🍜', lat: -20.452168, lng: -54.620517, description: 'Soba não tem graça, mas você é uma gracinha...Pagou até a conta 💸' },
    { name: 'Casa da Janeta - Maluca 🧙‍♀️', lat: -20.521537, lng: -54.628084, description: 'Aceitar entrar nesse beco só pra me ver fazer uma live? Só pode ser loucura de amor!' },
    { name: 'SESC - Treino The Flash ⚡', lat: -20.461613, lng: -54.603458, description: 'Foi treinar um dia só pra me ver e nunca mais voltou' },
    { name: 'Botteghe Café - Nosso Primeiro Brunch 🥗', lat: -20.462362, lng: -54.598667, description: 'Estava devendo até o padeiro quando te levei aqui...Mas eu tinha certeza que ia valer a pena!' },
    { name: 'Correria 🏃‍♂️', lat: -20.511317, lng: -54.617680, description: 'Deixei o celular em cima do capô, ele caiu só chegando em casa. Parei o carro no meio da rua e sai correndo pra procurar kkkkk' },
    { name: 'Muié bonita e gado nelore só tem quem pode 🐮', lat: -20.487404, lng: -54.618476, description: 'Nossa primera EXPO juntos' },
    { name: 'ai ai', lat: -20.399465, lng:  -54.618982, description: 'Daqui eu não me esqueço nunca' },
    // { name: '', lat: -20.462362, lng: -54.598667, description: '' },
    // { name: '', lat: -20.462362, lng: -54.598667, description: '' },
    // { name: '', lat: -20.462362, lng: -54.598667, description: '' },
    // { name: '', lat: -20.462362, lng: -54.598667, description: '' },

  ];

  places.forEach(function (place) {
    var marker = L.marker([place.lat, place.lng]).addTo(map);
    marker.bindPopup('<b>' + place.name + '</b><br>' + place.description);
  });

  let playlist = [
    { name: "All of Me - John Legend", url: "./musicas/John Legend - All of Me.mp3" },
    { name: "Ai Já Era - Jorge & Mateus", url: "./musicas/Jorge & Mateus - Ai Já Era - [Novo DVD Live in London] - (Clipe Oficial).mp3" },
    { name: "Ponto Fraco", url: "./musicas/Ponto Fraco.mp3" },
    { name: "Perfect - Ed Sheeran", url: "./musicas/Ed Sheeran - Perfect (Official Music Video).mp3" },
    { name: "Make It Rain - Foy Vance", url: "./musicas/Foy Vance -Make It Rain.mp3" },
    { name: "Amor Não é Jogo de Azar - Jorge & Mateus", url: "./musicas/Jorge & Mateus - Amor Não é Jogo de Azar - [DVD Ao Vivo Em Goiânia] - (Clipe Oficial).mp3" },
    { name: "Quando Você Some - Victor & Leo", url: "./musicas/Victor & Leo - Quando Você Some (Ao Vivo).mp3" },
    { name: "Ela É Demais - Rick & Renner", url: "./musicas/Rick & Renner - Ela É Demais.mp3" },
    { name: "The Time Of My Life - Bill Medley & Jennifer Warnes", url: "./musicas/Bill Medley, Jennifer Warnes - The Time Of My Life .mp3" },
    { name: "93 Million Miles - Jason Mraz", url: "./musicas/Jason Mraz - 93 Million Miles.mp3" },
    { name: "Lose Control - Teddy Swims", url: "./musicas/Teddy Swims - Lose Control.mp3" },
    { name: "I'm Yours - Jason Mraz", url: "./musicas/Jason Mraz - I'm Yours.mp3" },
    { name: "Would You Go With Me - Josh Turner", url: "./musicas/Josh Turner - Would You Go With Me.mp3" },
    { name: "Jason Mraz", url: "./musicas/Jason Mraz.mp3" }
  ];

  const audioPlayer = document.getElementById('audio-player');
  const playlistElement = document.getElementById('playlist');
  let currentIndex = 0;

  function updatePlaylist() {
    playlistElement.innerHTML = '';
    playlist.forEach((song, index) => {
      let li = document.createElement('li');
      li.innerText = song.name;
      li.onclick = () => playSong(index);
      playlistElement.appendChild(li);
    });
  }

  function playSong(index) {
    if (playlist[index]) {
      currentIndex = index;
      audioPlayer.src = playlist[index].url;
      audioPlayer.volume = 0.1;
      audioPlayer.play();
    }
  }

  audioPlayer.addEventListener('ended', () => {
    currentIndex++;
    if (currentIndex < playlist.length) {
      playSong(currentIndex);
    }
  });

  $('.explorar-historia').click(function () {
    playSong(0);
  });
  updatePlaylist();
  setTimeout(() => {
    // playSong(0);
  }, 1000);

  // Music player minimize functionality
  const minimizeBtn = document.getElementById('minimizeBtn');
  const musicPlayer = document.querySelector('.music-player');
  const musicPlayerContent = document.querySelector('.music-player-content');
  const minimizeIcon = minimizeBtn.querySelector('i');

  minimizeBtn.addEventListener('click', () => {
    if (musicPlayer.style.height === '50px' || !musicPlayer.style.height) {
      // Maximize
      musicPlayer.style.height = 'auto';
      musicPlayerContent.style.opacity = '1';
      minimizeIcon.classList.remove('fa-plus');
      minimizeIcon.classList.add('fa-minus');
      minimizeIcon.style.transform = 'rotate(0deg)';
    } else {
      // Minimize
      musicPlayer.style.height = '50px';
      musicPlayerContent.style.opacity = '0';
      minimizeIcon.classList.remove('fa-minus');
      minimizeIcon.classList.add('fa-plus');
      minimizeIcon.style.transform = 'rotate(180deg)';
    }
  });
});