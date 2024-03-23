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

  function searchCakes() {
    var input = document.getElementById("search-input").value.toLowerCase().trim();
    var searchWords = input.split(' '); // Divide la entrada del usuario en palabras individuales
    var products = document.querySelectorAll(".producto");
    var slider = document.getElementById("filtered-cakes-slider");

    // Limpia el slider antes de agregar nuevas tarjetas
    slider.innerHTML = '';

    products.forEach(function(product) {
        var productTitle = product.querySelector("img").alt.toLowerCase();
        var found = false;

        // Verifica si alguna de las palabras de búsqueda está contenida en el texto del atributo "alt"
        searchWords.forEach(function(word) {
            if (productTitle.includes(word)) {
                found = true;
            }
        });

        if (found) {
            // Clona la tarjeta de pastel coincidente y la agrega al slider
            var clonedProduct = product.cloneNode(true);
            slider.appendChild(clonedProduct);
        }
    });

    // Muestra el contenedor de tarjetas filtradas
    document.getElementById("filtered-cakes-container").style.display = "block";
    showButton();
}

function closeFilteredCakes() {
    // Oculta el contenedor de tarjetas filtradas al hacer clic en el botón de cerrar
    document.getElementById("filtered-cakes-container").style.display = "none";

    // Limpia el slider cuando se cierra la sección
    var slider = document.getElementById("filtered-cakes-slider");
    slider.innerHTML = '';
}

function showButton() {
    document.getElementById("boton2").style.display = "block"; // Mostrar el botón
}
