document.addEventListener('DOMContentLoaded', () => {
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevButton = document.getElementById('carousel-prev');
    const nextButton = document.getElementById('carousel-next');

    let currentSlide = 0;
    const totalSlides = carouselItems.length;

    // Função para mostrar um slide específico e esconder os outros
    function showSlide(slideIndex) {
        // Garante que o índice fique dentro dos limites (0 a totalSlides - 1)
        if (slideIndex >= totalSlides) {
            currentSlide = 0;
        } else if (slideIndex < 0) {
            currentSlide = totalSlides - 1;
        } else {
            currentSlide = slideIndex;
        }

        // Esconde todos os slides
        carouselItems.forEach(item => {
            item.classList.add('hidden');
        });

        // Mostra o slide atual
        carouselItems[currentSlide].classList.remove('hidden');
    }

    // Evento para o botão "Próximo"
    nextButton.addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });

    // Evento para o botão "Anterior"
    prevButton.addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });

    // Função para avançar o slide automaticamente
    function autoAdvance() {
        showSlide(currentSlide + 1);
    }

    // Inicia a troca automática de slides a cada 5 segundos (5000 milissegundos)
    setInterval(autoAdvance, 5000);

    // Mostra o primeiro slide ao carregar a página
    showSlide(currentSlide);
});
