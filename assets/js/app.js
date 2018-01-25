/* Almacena 'Tweets' en el LocalStorage */

// Constantes y Variables
const listaTweets = document .getElementById( 'lista-tweets' );     // Obtiene el elemento donde se desplegarán los 'Trinos'

// Event Listeners
eventListeners();

function eventListeners() {
    // Envío del formulario  
    document .querySelector( '#formulario' ) .addEventListener( 'submit', agregarTweet );     // 'submit' ---> Evento de envio de formulario

    // Eliminar 'Tweets'
    listaTweets .addEventListener( 'click', borrarTweet );
}

// Agregar Tweet al DOM desde el formulario
function agregarTweet( event ) {
    event .preventDefault();            // Prevenir abrir lo que se tenga en el 'action' del formulario
    console .log( 'agregarTweet() ', 'Formulario enviado' );

    // Tomar el valor del 'textarea'
    const tweet = document .getElementById( 'tweet' ) .value;
    console .log( 'tweet (textarea) ', tweet );

    const botonBorrar = document .createElement( 'a' );  // Crea elemento 'a' 
    botonBorrar .classList = 'borrar-tweet';             // Agrega clase ( también se puede usar el .add )
    botonBorrar .textContent = 'X';                      // Agrega texto de contenido al enlace 

    const li = document .createElement( 'li' );     // Crea el elemento 'li'
    li .innerText = tweet;                          // Asigna el contenido del 'tweet' en el elemento 'textarea'
    li.appendChild( botonBorrar );                  // Agrega el elemento 'a' al elemento 'li'
    listaTweets .appendChild( li );                 // Tomamos el elemento Padre en el que vamos a desplegar el elemento en el DOM

    agregarTweetLocalStorage( tweet );              // Añadir 'Tweet' al Local Storage (solo el valor)
}

// Eliminar 'Tweet' del DOM desde el enlace X de cada 'Tweet'
function borrarTweet( event ) {
    event .preventDefault();            // Prevenir abrir lo que se tenga en el 'action' del formulario
    console .log( 'borrarTweet() ', 'Click! a la lista' );

    if( event .target .className === 'borrar-tweet' ) {
        console .log( 'Click! Botón eliminar ', event .target .parentElement );       

        event .target .parentElement .remove();         // Removemos el elemento padre del 'a' y lo enviamos a la consola
        alert( 'Tweet eliminado' );
    }/*
    else {
        console .log( 'Diste Click en otra parte' );
    }*/
}

// Agregar 'Tweet' al Local Storage
function agregarTweetLocalStorage( tweet ) {
    let tweets;

    tweets = obtenerTweetsLocalStorage();       // Obtener los 'Tweets' existentes
    tweets .push( tweet );                      // Agregar 'Tweet' al final del arrego a los ya existentes
    tweets = JSON .stringify( tweets );         // Convertir un JSON a un 'String'
    localStorage .setItem( 'tweets', tweets  );  // Agrega el 'String' al Local Storage

    console .log( 'JSON.stringify ' , tweets );
}

// Obtener 'Tweets' del Local Storage
function obtenerTweetsLocalStorage() {
    let tweets;

    // Validamos si el LocalStorage tiene valores
    if( localStorage .getItem( 'tweets' ) === null ) {
        // _No existen 'Tweets' 
        tweets = [];          // Inicializa un 'Array' vacío  
    }
    else {
        // Ya existen 'Tweets' 
        tweets = localStorage .getItem( 'tweets' );     // Obtenemos los 'Tweets' que existen del LocalStorage
        tweets = JSON .parse( tweets );                 // Convertir un JSON a un 'Array'

        console .log( 'JSON.parse ', tweets );
    }

    return tweets;  // Retorna un 'Array'
}