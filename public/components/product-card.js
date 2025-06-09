// Definim el Web Component per als productes
class ProductCard extends HTMLElement {
    constructor() {
        super();
        // TO-DO: Creem un shadow DOM per al component
        this.attachShadow({ mode: 'open' });
    }

    // El mètode per actualitzar el contingut del component
    connectedCallback() {
        // TO-DO: Obtenim les propietats del producte des de l'atribut del component
        const productoNombre = this.getAttribute('nombre') || 'Nombre Aleatorio';
        const productoPrecio = this.getAttribute('precio') || '0.00';
        const productoImagen = this.getAttribute('imagen') || '';
        const productoDescripcion = this.getAttribute('descripcion') || 'No hay descripción disponible.';
        
        //TO-DO: Definim el contingut HTML del producte
        this.shadowRoot.innerHTML = `
            <style>
                .product-card {
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    padding: 16px;
                    text-align: center;
                    width: 200px;
                }
                .product-card img {
                    max-width: 100%;
                    height: auto;
                }
                .product-card h2 {
                    font-size: 1.5em;
                    margin: 0.5em 0;
                }
                .product-card p {
                    color: #555;
                }
                .product-card .price {
                    font-weight: bold;
                    color: #333;
                }
            </style>
            <div class="product-card">
                <img src="${productoImagen}" alt="${productoNombre}">
                <h2>${productoNombre}</h2>
                <p>${productoDescripcion}</p>
                <p class="price">$${productoPrecio}</p>
            </div>
        `;

    }
}

// Registrem el Web Component
customElements.define('product-card', ProductCard);
