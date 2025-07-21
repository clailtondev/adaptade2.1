/*
 * main.js
 * Este arquivo centraliza todo o JavaScript essencial para a navegação
 * e interatividade básica do site Adaptade.
 */
document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA PARA A TELA DE AUTENTICAÇÃO (auth.html) ---
    const authPage = document.getElementById('auth-page');
    if (authPage) {
        const profileSelectionDiv = document.getElementById('profile-selection');
        const loginFormContainer = document.getElementById('login-form-container');
        const profileButtons = document.querySelectorAll('.profile-btn');
        const nextButton = document.getElementById('next-to-login');
        const backButton = document.getElementById('back-to-profiles');
        const loginTitle = document.getElementById('login-title');
        const loginForm = document.getElementById('login-form');
        const registerLinkContainer = document.getElementById('institution-register-link-container');

        let selectedProfile = null;

        // Mapeia os perfis para seus títulos e URLs de destino
        const profileDetails = {
            // CORRIGIDO: Redireciona o aluno para a anamnese.
            aluno: { title: 'Login do Aluno', dashboard: 'student_anamnesis.html' }, 
            professor: { title: 'Login do Professor', dashboard: 'teacher/dashboard.html' },
            psicologo: { title: 'Login do Psicólogo', dashboard: 'psychologist/dashboard.html' },
            psicopedagogo: { title: 'Login do Psicopedagogo', dashboard: 'psychopedagogue/dashboard.html' },
            instituicao: { title: 'Login da Instituição', dashboard: 'institution/dashboard.html' }
        };

        // Adiciona evento de clique para cada botão de perfil
        profileButtons.forEach(button => {
            button.addEventListener('click', () => {
                profileButtons.forEach(btn => btn.classList.remove('selected'));
                button.classList.add('selected');
                selectedProfile = button.dataset.profile;
                nextButton.disabled = false;
                nextButton.classList.remove('opacity-50', 'cursor-not-allowed');
            });
        });

        // Evento para o botão "Prosseguir"
        nextButton.addEventListener('click', () => {
            if (selectedProfile) {
                profileSelectionDiv.classList.add('hidden');
                loginFormContainer.classList.remove('hidden');
                
                const details = profileDetails[selectedProfile];
                loginTitle.textContent = details.title;
                loginForm.dataset.dashboard = details.dashboard;

                if (selectedProfile === 'instituicao' && registerLinkContainer) {
                    registerLinkContainer.classList.remove('hidden');
                } else if (registerLinkContainer) {
                    registerLinkContainer.classList.add('hidden');
                }
            }
        });

        // Evento para o botão "Voltar"
        backButton.addEventListener('click', () => {
            loginFormContainer.classList.add('hidden');
            profileSelectionDiv.classList.remove('hidden');
            loginForm.reset();
            selectedProfile = null;
            profileButtons.forEach(btn => btn.classList.remove('selected'));
            nextButton.disabled = true;
            nextButton.classList.add('opacity-50', 'cursor-not-allowed');
            if (registerLinkContainer) {
                registerLinkContainer.classList.add('hidden');
            }
        });

        // Evento de envio do formulário de login
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const dashboardUrl = loginForm.dataset.dashboard;
            if (dashboardUrl) {
                // Simulação de login - redireciona para o destino correto
                window.location.href = dashboardUrl;
            }
        });
    }

    // --- LÓGICA PARA NAVEGAÇÃO DOS PAINÉIS (TODOS OS dashboards) ---
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        // Ativa o link do menu da página atual
        const currentPage = window.location.pathname.split('/').pop();
        const navLinks = document.querySelectorAll('.sidebar-nav .nav-item');
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href').split('/').pop();
            // Garante que o link da dashboard principal também seja ativado
            if (linkPage === currentPage || (currentPage === 'dashboard.html' && link.getAttribute('href') === 'dashboard.html')) {
                link.classList.add('active');
                link.classList.remove('text-blue-200', 'hover:text-white');
                link.classList.add('text-white', 'font-semibold');
            } else {
                link.classList.remove('active', 'text-white', 'font-semibold');
                link.classList.add('text-blue-200', 'hover:text-white');
            }
        });

        // Controle do menu mobile
        const hamburgerBtn = document.getElementById('hamburger-btn');
        const mobileOverlay = document.getElementById('mobile-overlay');

        const openMenu = () => {
            if (sidebar) sidebar.classList.remove('-translate-x-full');
            if (mobileOverlay) mobileOverlay.classList.remove('hidden');
        };

        const closeMenu = () => {
            if (sidebar) sidebar.classList.add('-translate-x-full');
            if (mobileOverlay) mobileOverlay.classList.add('hidden');
        };

        if (hamburgerBtn) hamburgerBtn.addEventListener('click', openMenu);
        if (mobileOverlay) mobileOverlay.addEventListener('click', closeMenu);
    }
});
