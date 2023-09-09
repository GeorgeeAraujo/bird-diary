/* Impede com que indivíduos não logados no sistema acessem determinadas páginas. Caso o usuário seja nulo, ocorre o redirecionamento para a página de login. */
firebase.auth().onAuthStateChanged((user) => {
    if(!user){
        window.location.href=".././index.html";
    };
});