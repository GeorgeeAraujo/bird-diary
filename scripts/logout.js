async function logoutUser(){ /* Função que realiza o logout do usuário. */
    showLoading();
    await firebase.auth()
    .signOut()
    .then(()=> {
        hideLoading();
        window.location.href = "../index.html"
    })
    .catch(error => {
        hideLoading(); 
        console.log(error)});
};