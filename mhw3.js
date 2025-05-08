function cambia_immagine1(event){  
    const immagine = document.querySelector('#Img_header');
    immagine.src = 'https://mangayo.it/modules/an_homeslider/img/dbe9025c3ea02d547839aa85d4487187_1.webp';  
    const clicked_dot = event.currentTarget;  
    const dot2 = document.querySelector('header #header_dot2');
    const dot3 = document.querySelector('header #header_dot3');  
    dot2.classList.remove('current_used_dot');
    dot3.classList.remove('current_used_dot');  
    clicked_dot.classList.add('current_used_dot');
  }
  
  function cambia_immagine2(event){  
    const immagine = document.querySelector('#Img_header');
    immagine.src = 'https://mangayo.it/modules/an_homeslider/img/a87e3a3e76d94fa44f48db43e3222676_1.webp';  
    const clicked_dot = event.currentTarget;  
    const dot1 = document.querySelector('header #header_dot1');
    const dot3 = document.querySelector('header #header_dot3');  
    dot1.classList.remove('current_used_dot');
    dot3.classList.remove('current_used_dot'); 
    clicked_dot.classList.add('current_used_dot');
  }
  
  function cambia_immagine3(event){
    const immagine = document.querySelector('#Img_header');
    immagine.src = 'https://mangayo.it/modules/an_homeslider/img/8242d08002ed4900d740502dfa89a2a2_1.webp'; 
    const clicked_dot = event.currentTarget; 
    const dot2 = document.querySelector('header #header_dot2');
    const dot1 = document.querySelector('header #header_dot1');  
    dot2.classList.remove('current_used_dot');
    dot1.classList.remove('current_used_dot');  
    clicked_dot.classList.add('current_used_dot');
  }
  
  const bottone1 = document.querySelector('header #header_dot1');
  bottone1.addEventListener('click', cambia_immagine1);
  const bottone2 = document.querySelector('header #header_dot2');
  bottone2.addEventListener('click', cambia_immagine2);
  const bottone3 = document.querySelector('header #header_dot3');
  bottone3.addEventListener('click', cambia_immagine3);
  
  
  function mostra_carrello(event){
    const view_carrello = document.querySelector('#view_carrello');
    view_carrello.classList.remove('hidden');
    document.body.classList.add('no_scroll');
  }
  const carrello = document.querySelector('#shop_button');
  carrello.addEventListener('click', mostra_carrello);
  
  function leva_carrello(event){
    event.currentTarget.classList.add('hidden');
    document.body.classList.remove('no_scroll');
  }
  const view_carrello = document.querySelector('#view_carrello');
  view_carrello.addEventListener('click', leva_carrello);
  
  
  function aggiorna_carrello(event){
    console.log('Carrello Aggiornato');
    const clicked_button = event.currentTarget;
    const index_button = clicked_button.dataset.index;
    const view_prodotti = document.querySelector('#view_products_shop');   
    const all_products = document.querySelectorAll('.prod_descr');  
    for(const prodotto of all_products){
      const index_prodotto = prodotto.dataset.index;      
      if(index_prodotto == index_button){      
        const product_to_add = document.createElement('div');
        product_to_add.classList.add('prodotto_carrello');
        view_prodotti.appendChild(product_to_add); /* Tutto bene */      
        const img_scelta = prodotto.querySelector('img')
        const testo_scelto = prodotto.querySelector('p');
        const prezzo = prodotto.querySelector('.price');     
        const immagine = document.createElement('img');  
        product_to_add.appendChild(immagine);   
        immagine.src = img_scelta.src;     
        const testo = document.createElement('p');
        product_to_add.appendChild(testo);
        testo.textContent = testo_scelto.textContent;  
        const costo = document.createElement('p');
        product_to_add.appendChild(costo);
        costo.textContent = prezzo.textContent;
        }  
      } 
    }
  
  const button_shop_upload = document.querySelectorAll('.prodotto .button');
  for(const singolo_bottone of button_shop_upload){
    singolo_bottone.addEventListener('click', aggiorna_carrello);
  }
  
  
  
  //API per la ricerca di info sui manga:

  //funzione per la rimozione della view di ricerca manga
  function close_manga_library(event){
    const manga_view = document.querySelector("#manga_search_div");
    manga_view.classList.add('hidden');
    document.body.classList.remove('no_scroll');
  }
  
  //funzione per mostrare la view di ricerca di informazioni sui manga
  function open_manga_library(event){
    const target_view = document.querySelector("#manga_search_div");
    target_view.classList.remove('hidden');
    document.body.classList.add('no_scroll');
    const close_button = document.querySelector("#div_gestione div");
    close_button.addEventListener('click', close_manga_library);
    console.log("Evento associato al tasto Esci");
  }
  const link_pag_manga = document.querySelector("#manga_info");
  link_pag_manga.addEventListener('click', open_manga_library);


  // funzioni effettive per l'uso delle API
  function JSON_handler(json){  
      const div_img = document.querySelector("#searched_manga_img");
      div_img.innerHTML = '';
      const manga_img = document.createElement('img');
      manga_img.src = json.data[0].images.jpg.large_image_url;
      div_img.appendChild(manga_img);

      const div_author = document.querySelector("#autore div");
      div_author.innerHTML = '';
      const manga_author = document.createElement('p');
      manga_author.textContent = json.data[0].authors[0].name;
      div_author.appendChild(manga_author);

      const div_genre = document.querySelector("#genere div");
      div_genre.innerHTML = '';
      const manga_genre = document.createElement('p');
      const generi = json.data[0].genres;
      var all_genres = '';
      for(const genere of generi){
        const singolo_genere = genere.name; 
        all_genres = all_genres + ', ' + genere.name;
      }
      manga_genre.textContent = all_genres;
      div_genre.appendChild(manga_genre);

      const div_sinossi= document.querySelector("#sinossi div");
      div_sinossi.innerHTML = '';
      const manga_sinossi = document.createElement('p');
      manga_sinossi.textContent = json.data[0].synopsis;
      div_sinossi.appendChild(manga_sinossi);
  }
  
  function onSuccess_or_Failure(response){
    if(!response.ok){
        console.log('Errore ricezione della promise!!');
    } else if(response === undefined) {
        console.log('Errore nella promise, risula undefined!!')
    } else {
      console.log(response);
      const json = response.json();
      return json;
    }
  }
  
  function ricerca_manga(event){ 
    event.preventDefault();
    console.log("Ricarica pagina annullata con Successo");
    const nome_manga = document.querySelector('#nome_manga');
    const manga_value = encodeURIComponent(nome_manga.value); 
    console.log('Eseguo ricerca: '+ manga_value);
    rest_url = "https://api.jikan.moe/v4/manga?q="+ manga_value;
    console.log("L'URL è: " + rest_url);
    fetch(rest_url).then(onSuccess_or_Failure).then(JSON_handler);
    cerco_info_album();
  }
  const form = document.querySelector('form');
  form.addEventListener('submit', ricerca_manga);


//API di Spotify
const ClientID = "46c0a70617fa4c57bf547965a42ae6b6"
const client_secret = "6649315cc8964b91a35f0fc32303c542";

function handler_API_JSON(json){
  const div_img_album  = document.querySelector("#div_spotify_API_TEST div");
  div_img_album.innerHTML = '';
  const img_album = document.createElement("img");  
  img_album.src = json.albums.items[0].images[0].url;
  console.log(img_album);
  div_img_album.appendChild(img_album);  
}

function handler_API_1(response){
  if(!response.ok){
    console.log("Fallimento della richiesta");
  } else {
  const json = response.json();
  return json;
  }
}

function cerco_info_album(){
  const nome_manga2 = document.querySelector('#nome_manga');
  const manga_value2 = encodeURIComponent(nome_manga2.value);
  console.log(manga_value2);
  rest_spotify_url = 'https://api.spotify.com/v1/search?q=' + manga_value2 + '&type=album';
  console.log(rest_spotify_url);
  fetch(rest_spotify_url,
    {
    method: "GET",
    headers : 
      {
      'Authorization': 'Bearer ' + token
      }
    }
  ).then(handler_API_1).then(handler_API_JSON);
}

function handler_token_JSON(json){
  console.log("il file json arrivato è il seguente: "+ json);
  token = json.access_token;
  console.log("il token è il seguente: "+ token);
}

function handler_token_1(response){
  if(!response.ok){
    console.log("Fallimento ricezione response");
  } else {
    json_token = response.json();
    return json_token;
  }
}

let token;
fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          'Authorization': 'Basic ' + btoa(ClientID + ':' + client_secret)
        },
      body: "grant_type=client_credentials",
  }).then(handler_token_1).then(handler_token_JSON); 
