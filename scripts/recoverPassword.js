firebase.auth()
    .onAuthStateChanged((user) => {
        if(user){
            window.location.href= './my-birds.html'
        };
    });

const recoverForm = { /* Objeto que contém todos os elementos HTML do formulário de recuperação de senha.*/
    email: ()=> document.getElementById('recovery-email').value,
    recoverBtn: () => document.getElementById('recovery-password-btn'),
    invalidRecoveryEmailError: ()=> document.getElementById('invalid-recovery-email-error'),
    obrigatoryRecoveryEmailError: ()=> document.getElementById('obrigatory-recovery-email-error')
};

recoverForm.recoverBtn().addEventListener('click', e => { /* Ouvinte de eventos que chama a função de enviar o emailde recuperação quando o usuário clica no botão..*/
    e.preventDefault();
    sendRecoveryPasswordEmail();
});

function validateRecoverForm(){ /*Validação do formulário de recuperação de senha. Habilita ou desabilita o botão de enviar. */
    if(validateEmail(recoverForm.email(), recoverForm.obrigatoryRecoveryEmailError(), recoverForm.invalidRecoveryEmailError())){
        recoverForm.recoverBtn().removeAttribute("disabled");
    } else {
        recoverForm.recoverBtn().setAttribute("disabled","disabled");
    };
};

async function sendRecoveryPasswordEmail(){ /* Envia, a partir do Firebase Authentication, o email de vereificação de senha. */
    await firebase.auth().sendPasswordResetEmail(recoverForm.email())
    .then(r => alert('Email sent! Verify your email box or your span box.'))
    .catch(error => alert(getErrorMessage(error.code)));
};

