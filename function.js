function openNav(){
    document.getElementById("mobile-menu").style.width = "40%";
    document.getElementById("mobile-menu").style.height = "50%";
  }
  
  function closeNav(){
     document.getElementById("mobile-menu").style.width = "0%";
  }
  
  window.addEventListener("scroll", function() {
    var header = document.querySelector(".header");
    var scrollY = window.scrollY;
  
    if (scrollY > 0) {
      header.classList.add("fixed-header");
    } else {
      header.classList.remove("fixed-header");
    }
  });
  
  if(document.querySelector('#container-slider')){
   
    setInterval('fntExecuteSlide("next")',5000);
  }
  
  
  
  //------------------------------ LIST SLIDER -------------------------
  if(document.querySelector('.listslider')){
    let link = document.querySelectorAll(".listslider li a");
    link.forEach(function(link) {
        link.addEventListener('click', function(e){
            e.preventDefault();
            let item = this.getAttribute('itlist');
            let arrItem = item.split("_");
            fntExecuteSlide(arrItem[1]);
            return false;
        });
    });
  }
  
  function fntExecuteSlide(side){
    let parentTarget = document.getElementById('slider');
    let elements = parentTarget.getElementsByTagName('li');
    let curElement, nextElement;
    
    for(var i=0; i<elements.length;i++){
        if(elements[i].style.opacity==1){
            curElement = i;
            break;
        }
    }
    
    if(side == 'prev' || side == 'next'){
        
        if(side=="prev"){
            nextElement = (curElement == 0)?elements.length -10:curElement -1;
        }else{
            nextElement = (curElement == elements.length -1)?0:curElement +1;
        }
    }else{
        nextElement = side;
        side = (curElement > nextElement)?'prev':'next';
    }
    //RESALTA LOS PUNTOS
    let elementSel = document.getElementsByClassName("listslider")[0].getElementsByTagName("a");
    elementSel[curElement].classList.remove("item-select-slid");
    elementSel[nextElement].classList.add("item-select-slid");
    elements[curElement].style.opacity=0;
    elements[curElement].style.zIndex =0;
    elements[nextElement].style.opacity=1;
    elements[nextElement].style.zIndex =1;
  }
  
  // script.js mostrador
  // Ejemplo de funcionalidad adicional (puedes personalizar según tus necesidades)
  
  const botonesComprar = document.querySelectorAll('.boton-comprar');
  
  botonesComprar.forEach((boton) => {
      boton.addEventListener('click', () => { 
          alert('¡Producto agregado al carrito de compras!');
      });
  });

  // Función para calcular la distancia de Levenshtein entre dos cadenas
function levenshteinDistance(a, b) {
    if (a.length === 0) return b.length; 
    if (b.length === 0) return a.length; 

    var matrix = [];

    // Inicializar la primera fila y la primera columna de la matriz
    for (var i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    for (var j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    // Calcular la distancia de Levenshtein
    for (var i = 1; i <= b.length; i++) {
        for (var j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }

    return matrix[b.length][a.length];
}

// Función para buscar pasteles con coincidencia difusa en el atributo "alt"
function searchCakes() {
    var input = document.getElementById("search-input").value.toLowerCase().trim();
    var searchWords = input.split(' ').filter(Boolean); // Divide la entrada del usuario en palabras individuales y elimina palabras vacías
    var products = document.querySelectorAll(".producto");
    var slider = document.getElementById("filtered-cakes-slider");

    // Limpia el slider antes de agregar nuevas tarjetas
    slider.innerHTML = '';

    document.getElementById("message").style.display = "none";

    products.forEach(function(product) {
        var productTitle = product.querySelector("img").alt.toLowerCase();
        var found = searchWords.every(function(word) {
            // Compara cada palabra de búsqueda con cada palabra en el atributo "alt" utilizando la distancia de Levenshtein
            return productTitle.split(' ').some(function(titleWord) {
                return levenshteinDistance(word, titleWord) <= 2; // Permitimos hasta 2 cambios en las letras para considerarlo una coincidencia
            });
        });

        if (found) {
            // Clona la tarjeta de pastel coincidente y la agrega al slider
            var clonedProduct = product.cloneNode(true);
            slider.appendChild(clonedProduct);
        }
    });

    // Muestra el contenedor de tarjetas filtradas
    document.getElementById("filtered-cakes-container").style.display = "block";
    document.getElementById("message").style.display = "block";
    showButton();
}

function closeFilteredCakes() {
    // Oculta el contenedor de tarjetas filtradas al hacer clic en el botón de cerrar
    document.getElementById("filtered-cakes-container").style.display = "none";
    document.getElementById("message").style.display = "none";

    // Limpia el slider cuando se cierra la sección
    var slider = document.getElementById("filtered-cakes-slider");
    slider.innerHTML = '';
}

function showButton() {
    document.getElementById("boton2").style.display = "block"; // Mostrar el botón
}

function sendWhatsAppMessage(button) {
    // Encuentra la tarjeta de producto asociada al botón
    var productCard = button.closest(".producto");
    
    // Obtiene la imagen de la tarjeta de producto
    var productImage = productCard.querySelector("img");

    // URL de WhatsApp con el número de teléfono y el mensaje predefinido
    var phoneNumber = "50762577948"; // Reemplaza con el número de teléfono al que deseas enviar el mensaje
    var message = "¡Hola! Me gustaría pedir este pastel:";
    var imageBase64 = getBase64Image(productImage); // Obtiene la imagen en formato base64

    // Codifica los caracteres especiales de la URL
    message = encodeURIComponent(message);
    imageBase64 = encodeURIComponent(imageBase64);

    // Construye la URL completa de WhatsApp
    var whatsappURL = "whatsapp://send?phone=" + phoneNumber + "&text=" + message + "%0A" + imageBase64;

    // Abre WhatsApp con el mensaje predefinido y la imagen
    window.location.href = whatsappURL;
}

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

