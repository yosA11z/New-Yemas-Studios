const sections = document.querySelectorAll("section");
const header = document.querySelector("header");
const btnBurger = document.querySelector("#burger-menu");
const nav = document.querySelector(".navigation");
const linkNav = document.querySelectorAll(".navigation a");

btnBurger.addEventListener("click", () => {
  nav.classList.toggle("active");
  btnBurger.classList.toggle("bx-x");
});

linkNav.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
    btnBurger.classList.remove("bx-x");
  });
});

window.addEventListener("scroll", () => {
  nav.classList.remove("active");
  btnBurger.classList.remove("bx-x");
});

const handleScroll = () => {
  header.classList.toggle("active", window.scrollY > 1000);
};

window.addEventListener("resize", () => {
  if (window.innerWidth >= 1024) {
    window.addEventListener("scroll", handleScroll);
  } else {
    window.removeEventListener("scroll", handleScroll);
  }
});

const scrollActive = () => {
  sections.forEach((section) => {
    let top = window.scrollY;
    let offset = section.offsetTop - 150;
    let height = section.offsetHeight;
    let id = section.getAttribute("id");

    if (top >= offset && top < offset + height) {
      linkNav.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector(`.navigation a[href*=${id}]`)
          .classList.add("active");
      });
    }
  });
};

window.addEventListener("scroll", scrollActive);

var mySwiper = new Swiper(".swiper", {
  loop: true, // Active la boucle infinie
  autoplay: {
    delay: 3000, 
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});













//CUENTA ATARS//
document.addEventListener('DOMContentLoaded', function() {
    const daysDigitsContainer = document.querySelector('[data-unit="days"]');
    const hoursDigitsContainer = document.querySelector('[data-unit="hours"]');
    const minutesDigitsContainer = document.querySelector('[data-unit="minutes"]');
    const secondsDigitsContainer = document.querySelector('[data-unit="seconds"]');
    const eventMessage = document.getElementById('event-message');
    const callToAction = document.getElementById('call-to-action');

    // ¡REEMPLAZA ESTA FECHA CON LA FECHA Y HORA EXACTAS DEL LANZAMIENTO!
    const targetDate = new Date('2025-09-01T10:00:00').getTime();

    // Función para actualizar un solo 'flip-card' (usado para Días, Horas, Minutos)
    function updateFlipCard(flipCardElement, newValue) {
        const top = flipCardElement.querySelector('.top');
        const bottom = flipCardElement.querySelector('.bottom');
        const backTop = flipCardElement.querySelector('.back-top');
        const backBottom = flipCardElement.querySelector('.back-bottom');
        const currentValue = top.getAttribute('data-content');

        if (newValue === currentValue) return;

        backTop.setAttribute('data-content', newValue);
        backBottom.setAttribute('data-content', newValue);
        flipCardElement.classList.add('flipping');

        flipCardElement.addEventListener('transitionend', function handler() {
            flipCardElement.classList.remove('flipping');
            top.setAttribute('data-content', newValue);
            bottom.setAttribute('data-content', newValue);
            flipCardElement.removeEventListener('transitionend', handler);
        });
    }

    // Función para actualizar un solo 'slide-card' (usado para Segundos)
    function updateSlideCard(slideCardElement, newValue) {
        let currentNumDiv = slideCardElement.querySelector('.current-num');
        let nextNumDiv = slideCardElement.querySelector('.next-num');

        // Si es la primera vez o no existen, crearlos
        if (!currentNumDiv) {
            currentNumDiv = document.createElement('div');
            currentNumDiv.classList.add('current-num');
            slideCardElement.appendChild(currentNumDiv);
        }
        if (!nextNumDiv) {
            nextNumDiv = document.createElement('div');
            nextNumDiv.classList.add('next-num');
            slideCardElement.appendChild(nextNumDiv);
        }
        
        const currentValue = currentNumDiv.textContent;

        if (newValue === currentValue) return;

        nextNumDiv.textContent = newValue; // Establecer el nuevo valor en el "siguiente" número

        slideCardElement.classList.add('sliding'); // Iniciar la animación de deslizamiento

        slideCardElement.addEventListener('transitionend', function handler() {
            slideCardElement.classList.remove('sliding');
            currentNumDiv.textContent = newValue; // Mover el nuevo valor al "actual"
            nextNumDiv.textContent = ''; // Limpiar el "siguiente"
            // Resetear la posición del nextNumDiv inmediatamente para la próxima animación
            nextNumDiv.style.transform = 'translateY(100%)'; 
            nextNumDiv.style.opacity = '0';

            slideCardElement.removeEventListener('transitionend', handler);
        });
    }

    // Función para inicializar un solo 'flip-card' sin animación (Días, Horas, Minutos)
    function initializeFlipCard(flipCardElement, value) {
        const top = flipCardElement.querySelector('.top');
        const bottom = flipCardElement.querySelector('.bottom');
        const backTop = flipCardElement.querySelector('.back-top');
        const backBottom = flipCardElement.querySelector('.back-bottom');
        top.setAttribute('data-content', value);
        bottom.setAttribute('data-content', value);
        backTop.setAttribute('data-content', value);
        backBottom.setAttribute('data-content', value);
    }

    // Función para inicializar un solo 'slide-card' sin animación (Segundos)
    function initializeSlideCard(slideCardElement, value) {
        let currentNumDiv = slideCardElement.querySelector('.current-num');
        // Si no existe, crear el div para el número actual
        if (!currentNumDiv) {
            currentNumDiv = document.createElement('div');
            currentNumDiv.classList.add('current-num');
            slideCardElement.appendChild(currentNumDiv);
        }
        currentNumDiv.textContent = value;
        // Asegurarse de que no haya un next-num o que esté oculto y posicionado correctamente
        let nextNumDiv = slideCardElement.querySelector('.next-num');
        if (nextNumDiv) {
            nextNumDiv.textContent = '';
            nextNumDiv.style.transform = 'translateY(100%)';
            nextNumDiv.style.opacity = '0';
        }
    }


    // Función para manejar la actualización de una unidad de tiempo (diferenciando segundos)
    function updateTimeUnit(container, newValueStr, numDigits) {
        const currentDigits = Array.from(container.children);
        const isSecondsUnit = container.dataset.unit === 'seconds';

        // Lógica para ocultar/mostrar dígitos en Días (siempre es el mismo)
        if (container.dataset.unit === 'days') {
            const totalFlipCards = currentDigits.length;
            for (let i = 0; i < totalFlipCards; i++) {
                // Iteramos los flip-cards de izquierda a derecha en el HTML
                // Pero el valor viene alineado a la derecha
                const targetCardIndex = i; // El índice del flip-card en el DOM
                const valueIndex = i - (totalFlipCards - newValueStr.length); // Índice del dígito en newValueStr

                if (valueIndex < 0) { // Si el dígito no existe en newValueStr (es un cero a la izquierda que debe ocultarse)
                    currentDigits[targetCardIndex].classList.add('hidden');
                } else {
                    currentDigits[targetCardIndex].classList.remove('hidden');
                    const digitChar = newValueStr[valueIndex];
                    if (isSecondsUnit) {
                        updateSlideCard(currentDigits[targetCardIndex], digitChar);
                    } else {
                        updateFlipCard(currentDigits[targetCardIndex], digitChar);
                    }
                }
            }
        } else {
            // Para Horas, Minutos, Segundos (siempre 2 dígitos)
            newValueStr.padStart(numDigits, '0').split('').forEach((digitChar, index) => {
                if (isSecondsUnit) {
                    updateSlideCard(currentDigits[index], digitChar);
                } else {
                    updateFlipCard(currentDigits[index], digitChar);
                }
            });
        }
    }


    function initialRender() {
        const initialNow = new Date().getTime();
        const initialDistance = targetDate - initialNow;
        let initialDays = 0, initialHours = 0, initialMinutes = 0, initialSeconds = 0;

        if (initialDistance < 0) {
            showLaunchMessage();
            return; // Termina la función si ya pasó el tiempo
        }

        initialDays = Math.floor(initialDistance / (1000 * 60 * 60 * 24));
        initialHours = Math.floor((initialDistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        initialMinutes = Math.floor((initialDistance % (1000 * 60 * 60)) / (1000 * 60));
        initialSeconds = Math.floor((initialDistance % (1000 * 60)) / 1000);
        
        const formattedInitialDays = String(initialDays);
        const formattedInitialHours = String(initialHours).padStart(2, '0');
        const formattedInitialMinutes = String(initialMinutes).padStart(2, '0');
        const formattedInitialSeconds = String(initialSeconds).padStart(2, '0');

        // Renderizar Días (flip)
        const daysFlipCards = Array.from(daysDigitsContainer.children);
        const totalDaysCards = daysFlipCards.length;
        for (let i = 0; i < totalDaysCards; i++) {
            const targetCardIndex = i;
            const valueIndex = i - (totalDaysCards - formattedInitialDays.length);
            if (valueIndex < 0) {
                daysFlipCards[targetCardIndex].classList.add('hidden');
            } else {
                daysFlipCards[targetCardIndex].classList.remove('hidden');
                initializeFlipCard(daysFlipCards[targetCardIndex], formattedInitialDays[valueIndex]);
            }
        }
        
        // Renderizar Horas y Minutos (flip)
        initializeFlipCard(hoursDigitsContainer.children[0], formattedInitialHours[0]);
        initializeFlipCard(hoursDigitsContainer.children[1], formattedInitialHours[1]);
        initializeFlipCard(minutesDigitsContainer.children[0], formattedInitialMinutes[0]);
        initializeFlipCard(minutesDigitsContainer.children[1], formattedInitialMinutes[1]);

        // Renderizar Segundos (slide)
        initializeSlideCard(secondsDigitsContainer.children[0], formattedInitialSeconds[0]);
        initializeSlideCard(secondsDigitsContainer.children[1], formattedInitialSeconds[1]);
    }

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(countdownInterval);
            showLaunchMessage();
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const formattedDays = String(days);
        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');

        updateTimeUnit(daysDigitsContainer, formattedDays, 3);
        updateTimeUnit(hoursDigitsContainer, formattedHours, 2);
        updateTimeUnit(minutesDigitsContainer, formattedMinutes, 2);
        updateTimeUnit(secondsDigitsContainer, formattedSeconds, 2);
    }

    function showLaunchMessage() {
        eventMessage.classList.remove('hidden');
        eventMessage.classList.add('visible');
        callToAction.classList.remove('hidden');
        callToAction.classList.add('visible');
        // Opcional: Aquí podrías reproducir un sonido de fanfarria
    }

    initialRender();
    const countdownInterval = setInterval(updateCountdown, 1000);
});