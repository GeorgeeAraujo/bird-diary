firebase.auth()
    .onAuthStateChanged((user) => {
        if(user){
            window.location.href= '../pages/my-birds.html'
        };
    });

const recoverForm = { /* Objeto que contém todos os elementos HTML do formulário de recuperação de senha.*/
    email: ()=> document.getElementById('recovery-email').value,
    goToRecoverBtn: ()=> document.getElementById('go-to-recover-btn'),
    recoverBtn: () => document.getElementById('recovery-password-btn'),
    invalidRecoveryEmailError: ()=> document.getElementById('invalid-recovery-email-error'),
    obligatoryRecoveryEmailError: ()=> document.getElementById('obligatory-recovery-email-error')
};

recoverPasswordListener();

function validateRecoverForm(){ /*Validação do formulário de recuperação de senha. Habilita ou desabilita o botão de enviar. */
    if(validateEmail(recoverForm.email(), recoverForm.obligatoryRecoveryEmailError(), recoverForm.invalidRecoveryEmailError())){
        recoverForm.recoverBtn().removeAttribute("disabled");
    } else {
        recoverForm.recoverBtn().setAttribute("disabled","disabled");
    };
};

async function sendRecoveryPasswordEmail(){ /* Envia, a partir do Firebase Authentication, o email de vereificação de senha. */
    await firebase.auth().sendPasswordResetEmail(recoverForm.email())
    .then(r => alert('Email sent! Check your email or span box.'))
    .catch(error => alert(getErrorMessage(error.code)));
};

function recoverPasswordListener(){
    recoverForm.recoverBtn().addEventListener('click', event => { /* Ouvinte de eventos que chama a função de enviar o email de recuperação quando o usuário clica no botão..*/
    event.preventDefault();
    sendRecoveryPasswordEmail();
});
}

