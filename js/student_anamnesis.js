document.addEventListener('DOMContentLoaded', () => {
    let currentStep = 1;
    const totalSteps = 6;

    const steps = document.querySelectorAll('.anamnesis-step');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const stepTitle = document.getElementById('step-title');
    const stepDescription = document.getElementById('step-description');

    const stepInfo = {
        1: { title: "1. Motivação para o Apoio", description: "Vamos entender o que te trouxe até a plataforma Adaptade." },
        2: { title: "2. Histórico de Avaliação", description: "Informações sobre diagnósticos e acompanhamentos." },
        3: { title: "3. Histórico Escolar", description: "Detalhes sobre a trajetória na escola." },
        4: { title: "4. Hábitos e Interesses", description: "Vamos conhecer um pouco sobre o dia a dia e paixões." },
        5: { title: "5. Comunicação e Saúde", description: "Como o aluno se relaciona com o mundo e cuida da saúde." },
        6: { title: "6. Observações Finais", description: "Qualquer informação extra que queira compartilhar." }
    };

    function updateStepVisibility() {
        steps.forEach((step, index) => {
            step.classList.toggle('active', (index + 1) === currentStep);
        });

        const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
        progressBar.style.width = `${progressPercentage}%`;
        progressText.textContent = `Etapa ${currentStep} de ${totalSteps}`;

        stepTitle.textContent = stepInfo[currentStep].title;
        stepDescription.textContent = stepInfo[currentStep].description;

        prevBtn.disabled = currentStep === 1;
        prevBtn.classList.toggle('opacity-50', currentStep === 1);
        prevBtn.classList.toggle('cursor-not-allowed', currentStep === 1);

        nextBtn.classList.toggle('hidden', currentStep === totalSteps);
        submitBtn.classList.toggle('hidden', currentStep !== totalSteps);
    }

    nextBtn.addEventListener('click', () => {
        if (currentStep < totalSteps) {
            currentStep++;
            updateStepVisibility();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            updateStepVisibility();
        }
    });

    submitBtn.addEventListener('click', () => {
        alert("Anamnese finalizada com sucesso! Redirecionando para o painel.");
        window.location.href = 'student/dashboard.html';
    });

    // Lógica para campos condicionais
    function setupConditionalField(radioName, detailsElementId) {
        const radios = document.querySelectorAll(`input[name="${radioName}"]`);
        const detailsElement = document.getElementById(detailsElementId);
        
        radios.forEach(radio => {
            radio.addEventListener('change', (event) => {
                if (event.target.value === 'sim') {
                    detailsElement.classList.remove('hidden');
                } else {
                    detailsElement.classList.add('hidden');
                }
            });
        });
    }

    setupConditionalField('medical_report', 'medical-report-details');
    setupConditionalField('repeated_year', 'repeated-year-details');
    setupConditionalField('medication', 'medication-details');

    updateStepVisibility();
});
