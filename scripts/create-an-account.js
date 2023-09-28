firebase.auth()
    .onAuthStateChanged((user) => {
        if(user){
            window.location.href= '../pages/my-birds.html'
        };
    }); /*Caso exista um usuário logado, ele é redirecionado para a página inicial. */

const newUserForm = { /* Objeto com todos os elementos HTML do processo de criação de novo usuário. */
    email: () => document.getElementById('new-email').value,
    invalidEmailError: () => document.getElementById('new-account-invalid-email-error'),
    requiredEmailError: () => document.getElementById('new-account-required-email-error'),
    password: () => document.getElementById('new-password').value,
    confirmPassword: () => document.getElementById('confirm-password').value,
    invalidPasswordError: () => document.getElementById('new-account-invalid-password-error'),
    requiredPasswordError: () => document.getElementById('new-account-required-password-error'),
    passwordsDontMatchError: () => document.getElementById('passwords-dont-match-error'),
    createAccountBtn: () => document.getElementById('create-account-btn')
};

async function createNewUser(event){ /* Função que realiza a criação de novo usuário com firebase authentication. */
    event.preventDefault();
    showLoading();
    await firebase.auth()
    .createUserWithEmailAndPassword(newUserForm.email(), newUserForm.password())
    .then(() => {
        hideLoading();
        alert('The user has been created!');
        window.location.href = "../index.html";
    })
    .catch(error => {
        hideLoading();
        alert(getErrorMessage(error.code));
    });
};










