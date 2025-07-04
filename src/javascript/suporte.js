document.addEventListener('DOMContentLoaded', function() {
    // Accordion functionality
    const accordionTriggers = document.querySelectorAll('.accordion-trigger');
    
    accordionTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const accordionItem = this.closest('.accordion-item');
            const isActive = accordionItem.classList.contains('active');
            
            accordionTriggers.forEach(otherTrigger => {
                const otherItem = otherTrigger.closest('.accordion-item');
                otherItem.classList.remove('active');
            });
            
            if (!isActive) {
                accordionItem.classList.add('active');
            }
        });
    });

    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        if (!name || !email || !subject || !message) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, insira um email válido.');
            return;
        }
        
        showToast();
        
        contactForm.reset();
        
        console.log('Formulario enviado:', { name, email, subject, message });
    });
    
    function showToast() {
        const toast = document.getElementById('toast');
        toast.classList.remove('hidden');
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
            toast.classList.add('hidden');
        }, 5000);
    }
    
    const searchInput = document.querySelector('.search-input');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const accordionItems = document.querySelectorAll('.accordion-item');
        
        accordionItems.forEach(item => {
            const question = item.querySelector('.accordion-trigger').textContent.toLowerCase();
            const answer = item.querySelector('.accordion-content p').textContent.toLowerCase();
            
            if (question.includes(searchTerm) || answer.includes(searchTerm) || searchTerm === '') {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
    
    const chatCard = document.querySelector('.chat-card');
    
    chatCard.addEventListener('click', function() {
        alert('Funcionalidade de chat ao vivo será implementada em breve!');
    });
    
});