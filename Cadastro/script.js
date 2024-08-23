// O JavaScript permanece o mesmo que na versão anterior
const form = document.getElementById('cadastroForm');
const nome = document.getElementById('nome');
const email = document.getElementById('email');
const senha = document.getElementById('senha');
const confirmarSenha = document.getElementById('confirmarSenha');
const feedbackMessage = document.getElementById('feedbackMessage');
const downloadLink = document.getElementById('downloadLink');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm()) {
        const userData = {
            nome: nome.value.trim(),
            email: email.value.trim(),
            senha: senha.value.trim()
        };
        
        simulateUpload(userData);
    } else {
        showFeedback('Por favor, corrija os erros no formulário.', 'error');
        shakeForm();
    }
});

function simulateUpload(userData) {
    showFeedback('Enviando dados...', 'info');
    
    setTimeout(() => {
        if (Math.random() < 0.9) {
            showFeedback('Cadastro realizado com sucesso!', 'success');
            createDownloadLink(userData);
            form.reset();
        } else {
            showFeedback('Erro ao cadastrar. Por favor, tente novamente.', 'error');
        }
    }, 1500);
}

function showFeedback(message, type) {
    feedbackMessage.textContent = message;
    feedbackMessage.className = show ${type};
    
    setTimeout(() => {
        feedbackMessage.className = '';
    }, 5000);
}

function createDownloadLink(userData) {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(userData));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "cadastro_usuario.json");
    dlAnchorElem.textContent = "Clique aqui para baixar o cadastro em JSON";
    
    downloadLink.innerHTML = '';
    downloadLink.appendChild(dlAnchorElem);
    downloadLink.style.display = 'block';
}

function validateForm() {
    let isValid = true;

    if (!validateNome()) isValid = false;
    if (!validateEmail()) isValid = false;
    if (!validateSenha()) isValid = false;
    if (!validateConfirmarSenha()) isValid = false;

    return isValid;
}

function validateNome() {
    const nomeValue = nome.value.trim();
    if (nomeValue === '') {
        setError(nome, 'O nome é obrigatório');
        return false;
    } else if (nomeValue.length < 3) {
        setError(nome, 'O nome deve ter pelo menos 3 caracteres');
        return false;
    } else {
        setSuccess(nome);
        return true;
    }
}

function validateEmail() {
    const emailValue = email.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailValue === '') {
        setError(email, 'O e-mail é obrigatório');
        return false;
    } else if (!emailRegex.test(emailValue)) {
        setError(email, 'Digite um e-mail válido');
        return false;
    } else {
        setSuccess(email);
        return true;
    }
}

// Array de validações
//const validações = [
//    {
//        regex: /^$/, // Regex para verificar se a senha está vazia
//        mensagem: 'A senha é obrigatória',
//        valida: (senhaValue) => senhaValue === ''
//    },
//    {
//        regex: /.{6,}/, // Regex para verificar se a senha tem pelo menos 6 caracteres
//        mensagem: 'A senha deve ter pelo menos 6 caracteres',
//        valida: (senhaValue) => senhaValue.length < 6
//    },
//    {
//        regex: /[A-Z]/, // Regex para verificar se a senha contém pelo menos uma letra maiúscula
//        mensagem: 'A senha deve conter pelo menos uma letra maiúscula',
//        valida: (senhaValue) => !/[A-Z]/.test(senhaValue)
//    },
//    {
//        regex: /[a-z]/, // Regex para verificar se a senha contém pelo menos uma letra minúscula
//        mensagem: 'A senha deve conter pelo menos uma letra minúscula',
//        valida: (senhaValue) => !/[a-z]/.test(senhaValue)
//    },
//    {
//        regex: /[0-9]/, // Regex para verificar se a senha contém pelo menos um número
//        mensagem: 'A senha deve conter pelo menos um número',
//        valida: (senhaValue) => !/[0-9]/.test(senhaValue)
//    },
//    {
//        regex: /[!@#$%^&*(),.?":{}|<>]/, // Regex para verificar se a senha contém pelo menos um caractere especial
//        mensagem: 'A senha deve conter pelo menos um caractere especial',
//        valida: (senhaValue) => !/[!@#$%^&*(),.?":{}|<>]/.test(senhaValue)
//    }
//];

function validateSenha() {
const senhaValue = senha.value.trim();
return ![
   { valida: (val) => val === '', mensagem: 'A senha é obrigatória' },
   { valida: (val) => val.length < 6, mensagem: 'A senha deve ter pelo menos 6 caracteres' },
   { valida: (val) => !/[A-Z]/.test(val), mensagem: 'A senha deve conter pelo menos uma letra maiúscula' },
   { valida: (val) => !/[a-z]/.test(val), mensagem: 'A senha deve conter pelo menos uma letra minúscula' },
   { valida: (val) => !/[0-9]/.test(val), mensagem: 'A senha deve conter pelo menos um número' },
   { valida: (val) => !/[!@#$%^&*(),.?":{}|<>]/.test(val), mensagem: 'A senha deve conter pelo menos um caractere especial' }
].some(({ valida, mensagem }) => { if (valida(senhaValue)) { setError(senha, mensagem); return true; } return false; }) || (setSuccess(senha), true);
}

function validateSenha() {
const senhaValue = senha.value.trim();

// Itera sobre as validações
for (const validação of validações) {
   if (validação.valida(senhaValue)) {
       setError(senha, validação.mensagem);
       return false;
   }
}

// Se todas as validações passaram
setSuccess(senha);
return true;
}


function validateConfirmarSenha() {
    const confirmarSenhaValue = confirmarSenha.value.trim();
    const senhaValue = senha.value.trim();
    if (confirmarSenhaValue === '') {
        setError(confirmarSenha, 'A confirmação de senha é obrigatória');
        return false;
    } else if (confirmarSenhaValue !== senhaValue) {
        setError(confirmarSenha, 'As senhas não coincidem');
        return false;
    } else {
        setSuccess(confirmarSenha);
        return true;
    }
}

function setError(input, message) {
    const formGroup = input.parentElement;
    const errorDisplay = formGroup.querySelector('.error');
    errorDisplay.innerText = message;
    input.classList.add('error');
    input.classList.remove('success');
}

function setSuccess(input) {
    const formGroup = input.parentElement;
    const errorDisplay = formGroup.querySelector('.error');
    errorDisplay.innerText = '';
    input.classList.add('success');
    input.classList.remove('error');
}

function shakeForm() {
    form.classList.add('shake');
    setTimeout(() => {
        form.classList.remove('shake');
    }, 820);
     }