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
        console.log(data);
        if (productContainer) {
          data.productes.forEach(product => {
            const productCard = document.createElement('product-card');
            productCard.setAttribute('nombre', product.nom);
            productCard.setAttribute('precio', product.preu_unitari);
            productCard.setAttribute('imagen', product.imatge);
            productCard.setAttribute('descripcion', product.descripcio);
            productContainer.appendChild(productCard);

            // TO-DO (Exercici 4)
            const selectProducte = document.getElementById('producte');
            if (selectProducte) {
              const option = document.createElement('option');
              option.value = product.nom;
              option.textContent = product.nom;
              selectProducte.appendChild(option);
            }
          });
        } else {
          console.error('No se encontraron los productos');
        }
      })
      .catch(error => console.error('Error al cargar los productos:', error));

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
        // Exercici 5: Recollim les dades del formulari i les enviem al servidor
        const dades = {
            nom: formData.get('nom'),
            correu: formData.get('correu'),
            telefon: formData.get('telefon'),
            producte: formData.get('producte'),
            data: formData.get('data')
        };

        // Preparem l'objecte amb les dades per enviar al servidor
        // I l'enviem, fent ús d'una petició POST
        // Recordeu convertir el JSON a un string per enviar-lo al servidor
        // Una vegada rebuda la resposta, creeu una URL amb ell, un enllaç
        // i forceu el clic en ell per descarregar el document.
        fetch('/concertar-cita', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dades)
        })
        .then(response => {
            if (!response.ok) throw new Error('Error en la resposta del servidor');
            return response.blob(); // Esperem un PDF com a resposta
        })
        .then(blob => {
            // Creem una URL per descarregar el PDF
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'cita.pdf';
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        })
        .catch(error => {
            alert('Error en enviar la cita: ' + error.message);
        });

    });

}

// Esperem a que el document estigui completament carregat
document.addEventListener('DOMContentLoaded', () => {

    carregaProductes();
    gestionaLinks();
    preparaFormulari();

});
