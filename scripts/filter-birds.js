let userLogged;
firebase.auth().onAuthStateChanged((user) => { /* Faz a captura do usuário logado e passa a informação para a busca no banco de dados..*/
    if(user){
        userLogged = user;
    };
});


function filter(id){
    if(id == 'filter-newest'){
        hideFilterSearchBar();
        filterByNewest();
    } else if (id == 'filter-oldest'){
        hideFilterSearchBar();
        filterByOldest();
    } else if (id == 'filter-bird'){
        showFilterSearchBar();
        filterByBird();
    } else if (id == 'filter-place'){
        showFilterSearchBar();
        filterByPlace();
    };
};

function showFilterSearchBar(){
    const searchBar = document.getElementById('search');
    searchBar.style.display = "block";
};

function hideFilterSearchBar(){
    const searchBar = document.getElementById('search');
    searchBar.style.display = "none";
};

function filterByBird(){
    const searchBtn = document.getElementById('search-btn');
    const searchField = document.getElementById('search-field');
    searchBtn.addEventListener('click',()=>{
        const keyword = searchField.value;
        showLoading();
        firebase.firestore()
        .collection('birds')
        .where('user.uid', '==', userLogged.uid)
        .where('popname', '==', keyword)
    .get()
        .then(snapshot => {
            hideLoading();
            const birds = snapshot.docs.map((doc) => ({
                ...doc.data(),
                uid:doc.id
         }));
            const birdsList = document.getElementById('birds-list');
            birdsList.innerHTML = '';
            createBirdsOnScreen(birds);
            })
        .catch(error => {
            hideLoading();
            console.log(error);
            alert('Error on loading your birds! Please, try again.')
        });
    
    });
}

function filterByPlace(){
    const searchBtn = document.getElementById('search-btn');
    const searchField = document.getElementById('search-field');
    searchBtn.addEventListener('click',()=>{
        const keyword = searchField.value;
        showLoading();
        firebase.firestore()
        .collection('birds')
        .where('user.uid', '==', userLogged.uid)
        .where('place', '==', keyword)
    .get()
        .then(snapshot => {
            hideLoading();
            const birds = snapshot.docs.map((doc) => ({
                ...doc.data(),
                uid:doc.id
         }));
            const birdsList = document.getElementById('birds-list');
            birdsList.innerHTML = '';
            createBirdsOnScreen(birds);
            })
        .catch(error => {
            hideLoading();
            console.log(error);
            alert('Error on loading your birds! Please, try again.')
        });
    
    });
}

function filterByNewest(){
    showLoading();
    firebase.firestore()
    .collection('birds')
    .where('user.uid', '==', userLogged.uid)
    .orderBy('date', 'desc')
    .get()
    .then(snapshot => {
        hideLoading();
        const birds = snapshot.docs.map((doc) => ({
            ...doc.data(),
            uid:doc.id
     }));
        const birdsList = document.getElementById('birds-list');
        birdsList.innerHTML = '';
        createBirdsOnScreen(birds);
        })
    .catch(error => {
        hideLoading();
        console.log(error);
        alert('Error on loading your birds! Please, try again.')
    });
}

function filterByOldest(){
        showLoading();
        firebase.firestore()
        .collection('birds')
        .where('user.uid', '==', userLogged.uid)
        .orderBy('date')
        .get()
        .then(snapshot => {
            hideLoading();
            const birds = snapshot.docs.map((doc) => ({
                ...doc.data(),
                uid:doc.id
         }));
            const birdsList = document.getElementById('birds-list');
            birdsList.innerHTML = '';
            createBirdsOnScreen(birds);
            })
        .catch(error => {
            hideLoading();
            console.log(error);
            alert('Error on loading your birds! Please, try again.')
        });
}