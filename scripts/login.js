firebase.auth()
    .onAuthStateChanged((user) => {
        if(user){
            window.location.href= './pages/my-birds.html'
        };
    });


const loginForm = { /* Objeto que contém todos os elementos HTML relacionados ao login. */
    email: () => document.getElementById('email').value,
    password: () => document.getElementById('password').value,
    invalidEmail: () => document.getElementById('invalid-email-error'),
    loginButton: () => document.getElementById('login-btn'),
    obrigatoryEmail: () => document.getElementById('obrigatory-email-error'),
    invalidPassword: () => document.getElementById('invalid-password-error'),
    obrigatoryPassword: () => document.getElementById('obrigatory-password-error')
};

/* Chamada da função de login ao clicar no botão de Login */
loginForm.loginButton().addEventListener('click', (event)=>{
    event.preventDefault();
    login();
});

async function login(){ /*Função que faz a comunicação com o firebase authentication para a realização do login ou não.*/ 
    showLoading();
    await firebase.auth()
    .signInWithEmailAndPassword(loginForm.email(), loginForm.password())
    .then(response => window.location.href = "./pages/my-birds.html")
    .catch(error => {
        hideLoading();
        alert(getErrorMessage(error.code))});
};




