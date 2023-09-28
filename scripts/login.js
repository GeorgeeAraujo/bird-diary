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
    obrigatoryPassword: () => document.getElementById('obrigatory-password-error'),
    recoverBtn: ()=> document.getElementById('go-to-recover-btn'),
    createAccountBtn: ()=> document.getElementById('go-to-create-account-btn')
};

/*Funções que adicionam ouvintes de evento de clique nos botões da página de login*/
loginListener(); 
recoverPasswordListener(); 
createAnAccountListener();


async function login(){ /*Função que faz a comunicação com o firebase authentication para a realização do login ou não.*/ 
    showLoading();
    await firebase.auth()
    .signInWithEmailAndPassword(loginForm.email(), loginForm.password())
    .then(() => window.location.href = "./pages/my-birds.html")
    .catch(error => {
        hideLoading();
        alert(getErrorMessage(error.code))});
};

function loginListener(){
    loginForm.loginButton().addEventListener('click', (event)=>{
        event.preventDefault();
        login();
    });
}

function recoverPasswordListener(){
    loginForm.recoverBtn().addEventListener('click', (event)=>{
        event.preventDefault();
        window.location.href = "../pages/recover-password.html";
    });
};

function createAnAccountListener(){
    loginForm.createAccountBtn().addEventListener('click', (event)=>{
        event.preventDefault();
        window.location.href = "../pages/create-an-account.html";
    });
};




