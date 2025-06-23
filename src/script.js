document.querySelectorAll(".question-wrapper").forEach(function (wrapper) {
    wrapper.addEventListener("click", function () {
        const container = wrapper.closest(".accordion");
        const answer = container.querySelector(".answer-wrapper");
        const icon = container.querySelector("i");

        if (answer.style.display === "block") {
            answer.style.display = "none";
            icon.classList.remove("fa-minus");
            icon.classList.add("fa-plus");
        } else {
            answer.style.display = "block";
            icon.classList.remove("fa-plus");
            icon.classList.add("fa-minus");
        }
        wrapper.classList.toggle("active");
        container.classList.toggle("expanded");
    });
});

function togglePassword(fieldId) {
    const field = document.getElementById(fieldId);
    const button = field.nextElementSibling;

    if (field.type === 'password') {
        field.type = 'text';
        button.textContent = '🙈';
    } else {
        field.type = 'password';
        button.textContent = '👁';
    }
}

const SUPABASE_URL = 'https://prgqlljavrgteqvflcqy.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InByZ3FsbGphdnJndGVxdmZsY3F5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1MjA3OTMsImV4cCI6MjA2NjA5Njc5M30.V_qIskDuZvViFaettAKxiLTfo2SKwJmWT-6XcqELWEk'; // mantenha sua chave real aqui

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.getElementById('registrationForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    // Limpa mensagens anteriores
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    document.querySelectorAll('input').forEach(el => el.classList.remove('error'));

    // Campos
    const nome = document.getElementById('firstName').value.trim();
    const sobrenome = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('phone').value.trim();
    const senha = document.getElementById('password').value;
    const confirmarSenha = document.getElementById('confirmPassword').value;
    const cpf = document.getElementById('cpf').value.trim();
    const termos = document.getElementById('terms').checked;

    let isValid = true;

    // Validação (igual à sua atual)
    if (!nome) { showError('firstName', 'Nome é obrigatório'); isValid = false; }
    if (!sobrenome) { showError('lastName', 'Sobrenome é obrigatório'); isValid = false; }
    if (!email || !/\S+@\S+\.\S+/.test(email)) { showError('email', 'Email inválido'); isValid = false; }
    if (!telefone || !/^\+?[\d\s\-\(\)]+$/.test(telefone)) { showError('phone', 'Número inválido'); isValid = false; }
    if (!senha || senha.length < 8) { showError('password', 'Senha precisa de pelo menos 8 caracteres'); isValid = false; }
    if (senha !== confirmarSenha) { showError('confirmPassword', 'Senhas não coincidem'); isValid = false; }
    if (!termos) { showError('terms', 'Você precisa aceitar os termos'); isValid = false; }

    if (!isValid) return;

    // Envia para Supabase
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.textContent = 'Criando conta...';
    submitBtn.disabled = true;

    const { data, error } = await supabaseClient.auth.signUp({
        email,
        password: senha,
        nome,
        sobrenome,
        telefone,
        cpf
    });

    if (error) {
        alert("Erro ao criar conta: " + error.message);
    } else {
        alert("Conta criada! Verifique seu email.");
        document.getElementById('registrationForm').reset();
    }

    submitBtn.textContent = 'Criar conta';
    submitBtn.disabled = false;
});

function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + 'Error');
    const field = document.getElementById(fieldId);
    if (errorElement) errorElement.textContent = message;
    if (field) field.classList.add('error');
}

