document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA DO CARROSSEL ---
    const carouselItems = document.querySelectorAll('.carousel-item');
    if (carouselItems.length > 0) {
        const prevButton = document.getElementById('carousel-prev');
        const nextButton = document.getElementById('carousel-next');
        let currentSlide = 0;
        const totalSlides = carouselItems.length;

        function showSlide(slideIndex) {
            // Garante que o índice fique dentro dos limites (0 a totalSlides - 1)
            currentSlide = (slideIndex + totalSlides) % totalSlides;

            // Esconde todos os slides
            carouselItems.forEach(item => {
                item.classList.add('hidden');
            });

            // Mostra o slide atual
            carouselItems[currentSlide].classList.remove('hidden');
        }

        if(nextButton) {
            nextButton.addEventListener('click', () => showSlide(currentSlide + 1));
        }
        if(prevButton) {
            prevButton.addEventListener('click', () => showSlide(currentSlide - 1));
        }
        
        // Inicia a troca automática de slides a cada 5 segundos
        setInterval(() => showSlide(currentSlide + 1), 5000);
        
        // Mostra o primeiro slide ao carregar a página
        showSlide(0);
    }

    // --- LÓGICA PARA O MENU MOBILE ---
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', () => {
            if (mobileMenu) mobileMenu.classList.remove('-translate-x-full');
        });
    }
    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', () => {
            if (mobileMenu) mobileMenu.classList.add('-translate-x-full');
        });
    }

    // --- LÓGICA PARA O BOTÃO DE ACESSIBILIDADE ---
    const accessibilityBtn = document.getElementById('accessibility-btn');
    const accessibilityMenu = document.getElementById('accessibility-menu');

    if (accessibilityBtn) {
        accessibilityBtn.addEventListener('click', (event) => {
            event.stopPropagation(); // Impede que o clique feche o menu imediatamente
            if (accessibilityMenu) accessibilityMenu.classList.toggle('hidden');
        });
    }

    // Fecha o menu de acessibilidade se clicar em qualquer outro lugar da página
    document.addEventListener('click', (event) => {
        if (accessibilityMenu && !accessibilityMenu.classList.contains('hidden') && !accessibilityBtn.contains(event.target)) {
            accessibilityMenu.classList.add('hidden');
        }
    });
});
