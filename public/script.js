// Importem el WebComponent per al producte
import './components/product-card.js';


function gestionaLinks() {
    // TO-DO (Exercici 1)

    const links = document.querySelectorAll('nav a');
    const secciones = document.querySelectorAll('section');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const target = document.querySelector(link.getAttribute('href'));
            secciones.forEach(sec => sec.style.display = 'none'); // Ocultar las secciones y que solo salga la que hemos seleccionado
            target.style.display = 'block'; // Enseñar la seccion q toca
        });
    });
    // Mostrar solo la primera seccion por defecto
    if (secciones.length > 0) {
        secciones.forEach(sec => sec.style.display = 'none'); // Ocultar las demas secciones para que no salgan con la primera
        secciones[0].style.display = 'block'; // Primera seccion que haya se muestra
    }
}


function carregaProductes() {
    // TO-DO (Exercici 3)
    // Realitza una petició a l'endpoint /get-products del servidor, i genera el product-card corresponent per a cada producte.
    fetch('/get-products')
        .then(response => response.json())
        .then(data => {
            const productContainer = document.getElementById('productos');
            if (productContainer) {
                data.forEach(product => {
                    const productCard = document.createElement('product-card');
                    productCard.setAttribute('nombre', product.name);
                    productCard.setAttribute('precio', product.price);
                    productCard.setAttribute('imagen', product.image);
                    productCard.setAttribute('descripcion', product.description);
                    productContainer.appendChild(productCard);
                });
            } else {
                console.error('No se encontraron los productos');
            }
        })
        .catch(error => console.error('Error al cargar los productos:', error));




    // TO-DO (Exercici 4)
    const productSelect = document.getElementById('productosSelect');
    fetch('/get-products')
        .then(response => response.json())
        .then(data => {
            if (productSelect) {
                data.forEach(product => {
                    const option = document.createElement('option');
                    option.value = product.name;
                    option.textContent = product.name; 
                    productSelect.appendChild(option);
                });
            } else {
                console.error('No se encontró el select de productos');
            }
        })
        .catch(error => console.error('Error al cargar los productos para el select:', error));


}


function preparaFormulari() {
    const form = document.getElementById('enviarCita');


    // Exercici 5

    form.addEventListener('submit', async (e) => {
        // Inhibim l'enviament automàtic del formulari
        e.preventDefault();

        // Agafem les dades del formulari en formData, com a parells clau/valor
        // Podeu consultar la documentació de la interfície FormData en: 
        // https://developer.mozilla.org/en-US/docs/Web/API/FormData
        // Per agafar les propietats des d'aquesta interfície fem ús de form.get('nom_del_camp_del_formulari')

        const formData = new FormData(form);

        /* TO-DO
 
            Prepara un objece JSON amb la informació guardada al formulari

        */

        // Preparem l'objecte amb les dades per enviar al servidor
        // I l'enviem, fent ús d'una petició POST
        // Recordeu convertir el JSON a un string per enviar-lo al servidor
        // Una vegada rebuda la resposta, creeu una URL amb ell, un enllaç
        // i forceu el clic en ell per descarregar el document.

    });

}

// Esperem a que el document estigui completament carregat
document.addEventListener('DOMContentLoaded', () => {

    carregaProductes();
    gestionaLinks();
    preparaFormulari();

});
