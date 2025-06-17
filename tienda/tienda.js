document.addEventListener('DOMContentLoaded', () => {
    // 1. Funcionalidad del botón "Mostrar más" en la descripción
    const showMoreBtn = document.getElementById('showMoreBtn');
    const longDescription = document.getElementById('longDescription');
    

    if (showMoreBtn && longDescription) {
        requestAnimationFrame(() => {
            if (longDescription.scrollHeight > longDescription.clientHeight) {
                showMoreBtn.style.display = 'block';
                longDescription.classList.remove('expanded');
                showMoreBtn.innerHTML = 'Mostrar más <span class="arrow-down">▼</span>';
            } else {
                showMoreBtn.style.display = 'none';
            }
        });

        showMoreBtn.addEventListener('click', () => {
            if (longDescription.classList.contains('expanded')) {
                longDescription.classList.remove('expanded');
                showMoreBtn.innerHTML = 'Mostrar más <span class="arrow-down">▼</span>';
            } else {
                longDescription.classList.add('expanded');
                showMoreBtn.innerHTML = 'Mostrar menos <span class="arrow-down">▲</span>';
            }
        });
    }

    // 2. Funcionalidad de los botones de compra y lista de deseos (ejemplos)
    const buyNowBtn = document.getElementById('buyNowBtn');
    const addToCartBtn = document.getElementById('addToCartBtn');
    const addToWishlistBtn = document.getElementById('addToWishlistBtn');

    

    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            alert('Arithmia ha sido añadido a tu carrito.');
        });
    }

    if (addToWishlistBtn) {
        addToWishlistBtn.addEventListener('click', () => {
            alert('Arithmia ha sido añadido a tu lista de deseos.');
        });
    }

    // 3. Funcionalidad de los botones de Pestañas (Resumen, Logros)
    const gameTabs = document.querySelectorAll('.game-tabs a');
    const logrosContent = document.getElementById('logrosContent');

    function showTabContent(activeTabId) {
        const togglableMainContentSections = [
            document.querySelector('.game-description-top'),
            document.getElementById('longDescription').parentElement,
            document.querySelector('.about-game'),
            document.querySelector('.system-requirements'),
            logrosContent
        ].filter(el => el);

        togglableMainContentSections.forEach(section => {
            if (section) section.style.display = 'none';
        });

        const gameSidebar = document.querySelector('.game-sidebar');
        if (gameSidebar) gameSidebar.style.display = 'flex';

        if (activeTabId === 'resumen') {
            if (document.querySelector('.game-description-top')) document.querySelector('.game-description-top').style.display = 'block';
            if (document.getElementById('longDescription').parentElement) document.getElementById('longDescription').parentElement.style.display = 'block';
            if (document.querySelector('.about-game')) document.querySelector('.about-game').style.display = 'block';
            if (document.querySelector('.system-requirements')) document.querySelector('.system-requirements').style.display = 'block';
            
            if (longDescription && showMoreBtn) {
                requestAnimationFrame(() => {
                    if (longDescription.scrollHeight > longDescription.clientHeight) {
                        showMoreBtn.style.display = 'block';
                        longDescription.classList.remove('expanded');
                        showMoreBtn.innerHTML = 'Mostrar más <span class="arrow-down">▼</span>';
                    } else {
                        showMoreBtn.style.display = 'none';
                    }
                });
            }
        } else if (activeTabId === 'logros') {
            if (logrosContent) logrosContent.style.display = 'block';
            if (gameSidebar) gameSidebar.style.display = 'none';
        }
    }

    if (gameTabs.length > 0) {
        gameTabs[0].classList.add('active');
        showTabContent('resumen');
    }

    if (gameTabs) {
        gameTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();

                gameTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                const tabName = tab.getAttribute('data-tab');
                showTabContent(tabName);
            });
        });
    }

    // 4. Funcionalidad del botón "Ver todas las ediciones y complementos"
    const viewEditionsBtn = document.getElementById('viewEditionsBtn');

    if (viewEditionsBtn) {
        viewEditionsBtn.addEventListener('click', () => {
            alert('¡Aquí iría una ventana emergente o redirección con todas las ediciones y sus contenidos!');
        });
    }

    // 5. Funcionalidad del botón "Compartir"
    const shareBtn = document.getElementById('shareBtn');

    if (shareBtn) {
        shareBtn.addEventListener('click', async () => {
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: 'Arithmia - ¡Descubre mi nuevo juego!',
                        text: '¡Echa un vistazo a Arithmia, una aventura de ciencia ficción épica!',
                        url: window.location.href,
                    });
                    console.log('Contenido compartido con éxito');
                } catch (error) {
                    console.error('Error al compartir:', error);
                    prompt('Copia este enlace para compartir:', window.location.href);
                }
            } else {
                prompt('Copia este enlace para compartir:', window.location.href);
            }
        });
    }

    // 6. Funcionalidad del botón "Denunciar"
    const reportBtn = document.getElementById('reportBtn');

    if (reportBtn) {
        reportBtn.addEventListener('click', () => {
            window.location.href = '/formulario/formulario.html';
        });
    }

    // --- FUNCIONALIDAD DE LA GALERÍA DE MINIATURAS MEJORADA ---
    const thumbnailsContainer = document.querySelector('.thumbnails-container');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    const mainVideo = document.getElementById('mainVideo'); // Usamos el ID
    const mainImage = document.getElementById('mainImage'); // Usamos el ID

    if (thumbnailsContainer && thumbnails.length > 0) {
        // Establecer el contenido principal inicial
        const initialThumbnail = thumbnails[0];
        const initialContentType = initialThumbnail.getAttribute('data-type');
        const initialContentUrl = initialThumbnail.getAttribute('data-full-url');
        const initialPoster = initialThumbnail.getAttribute('src'); // La miniatura como póster

        if (initialContentType === 'video' && mainVideo) {
            mainVideo.src = initialContentUrl;
            mainVideo.poster = initialPoster;
            mainVideo.load();
            mainVideo.style.display = 'block';
            if (mainImage) mainImage.style.display = 'none'; // Asegurarse de que la imagen esté oculta
        } else if (initialContentType === 'image' && mainImage) {
            mainImage.src = initialContentUrl;
            mainImage.style.display = 'block';
            if (mainVideo) {
                mainVideo.pause(); // Pausa el video si se muestra una imagen
                mainVideo.style.display = 'none'; // Asegurarse de que el video esté oculto
            }
        }


        // Función para cambiar el contenido principal al hacer clic en la miniatura
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', () => {
                thumbnails.forEach(t => t.classList.remove('active'));
                thumbnail.classList.add('active');

                const contentType = thumbnail.getAttribute('data-type');
                const contentUrl = thumbnail.getAttribute('data-full-url');
                const posterUrl = thumbnail.getAttribute('src'); // La miniatura como póster

                if (contentType === 'video') {
                    if (mainVideo) {
                        mainVideo.src = contentUrl;
                        mainVideo.poster = posterUrl;
                        mainVideo.load();
                        mainVideo.play();
                        mainVideo.style.display = 'block'; // Mostrar el video
                    }
                    if (mainImage) mainImage.style.display = 'none'; // Ocultar la imagen
                } else if (contentType === 'image') {
                    if (mainImage) {
                        mainImage.src = contentUrl;
                        mainImage.style.display = 'block'; // Mostrar la imagen
                    }
                    if (mainVideo) {
                        mainVideo.pause(); // Pausar el video
                        mainVideo.style.display = 'none'; // Ocultar el video
                    }
                }
            });
        });

        // Funcionalidad de desplazamiento con flechas (sin cambios)
        const scrollAmount = 200;

        if (leftArrow) {
            leftArrow.addEventListener('click', () => {
                thumbnailsContainer.scrollBy({
                    left: -scrollAmount,
                    behavior: 'smooth'
                });
            });
        }

        if (rightArrow) {
            rightArrow.addEventListener('click', () => {
                thumbnailsContainer.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            });
        }

        const checkScrollArrows = () => {
            const scrollLeftMax = thumbnailsContainer.scrollWidth - thumbnailsContainer.clientWidth;

            if (thumbnailsContainer.scrollLeft <= 5) {
                if (leftArrow) leftArrow.style.display = 'none';
            } else {
                if (leftArrow) leftArrow.style.display = 'flex';
            }

            if (thumbnailsContainer.scrollLeft >= scrollLeftMax - 5) {
                if (rightArrow) rightArrow.style.display = 'none';
            } else {
                if (rightArrow) rightArrow.style.display = 'flex';
            }
        };

        checkScrollArrows();
        thumbnailsContainer.addEventListener('scroll', checkScrollArrows);
        window.addEventListener('resize', checkScrollArrows);
    }
});











































//PASARELA DE PAGO


// PASARELA DE PAGO

const STRIPE_PUBLISHABLE_KEY = "pk_test_51RZwAcRUVRDzQwxh2L7IS1aEX0S8vLNIq2H4ixDysVGFgx6fOg3iKEYn1ylTsbneLa880uSAXGoEUEi2ZdJyKvoc00qbU0bknn";
const SPECIFIC_PRICE_ID = "price_1RZwtHRUVRDzQwxhZ1A3MDxA";

const $d = document;
const $payButton = $d.getElementById("buyNowBtn"); // Asegúrate de que el ID "buyNowBtn" sea el correcto en tu HTML

const stripe = Stripe(STRIPE_PUBLISHABLE_KEY);

$payButton.addEventListener("click", async (e) => {
    e.preventDefault(); // Añade esta línea si el botón está dentro de un <form> para evitar recarga de página

    try {
        const result = await stripe.redirectToCheckout({
            lineItems: [{
                price: SPECIFIC_PRICE_ID,
                quantity: 1,
            }],
            mode: "payment",
            // Asegúrate de que estas URLs sean válidas en tu servidor o dominio.
            successUrl: "https://new-yemas-studios.vercel.app/pasareladepago/success.html", // ¡Actualiza a tu dominio real!
            cancelUrl: "https://new-yemas-studios.vercel.app/pasareladepago/cancel.html" // ¡Actualiza a tu dominio real!
        });

        if (result.error) {
            
            console.error("Error en redirectToCheckout:", result.error.message);
            
        }
    } catch (error) {
        
        console.error("Ocurrió un error inesperado al intentar redirigir a Checkout:", error);
        
    }
});

