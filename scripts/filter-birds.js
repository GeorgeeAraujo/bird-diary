import { createBirdsOnScreen, findBirds } from "./my-birds.js";
export {arrayOfFilterBtns, objectOfFilterElements, removeClickedClass, addClickedClass, getBirdsElements};

let userLogged;
const arrayOfFilterBtns = Array.from(document.querySelectorAll('.filter__btn'));
const objectOfFilterElements = {
    all: ()=> document.getElementById('show-all'),
    oldest:()=> document.getElementById('filter-oldest'),
    search: ()=> document.getElementById('search-btn-filter'),
    searchField: ()=> document.getElementById('search-field'),
    searchBar: ()=>document.getElementById('search-bar'),
    searchResultBtn: ()=>document.getElementById('search-result-btn')
};

getUserLogged(); /* Faz a captura do usuário logado e armazena na variavel userLogged.*/
searchChangeListener(); /*Captura mudanãs na barra de busca, limpando o resultado da busca caso esteja vazia. */
filtersListener(); /*Redireciona para a função de filtro (toggleFilters) quando algum dos botões é clicado. */

function toggleFilters(id){ /*Alterna entre os filtros possíveis.*/
    if(id == 'show-all'){
        hideFilterSearchBar();
        findBirds(userLogged);
    } else if (id == 'filter-oldest'){
        hideFilterSearchBar();
        sortByOldest();
    } else if(id == 'search-btn-filter'){
        showFilterSearchBar();
        filterBySearch();
    };
};

function showFilterSearchBar(){
    objectOfFilterElements.searchBar().style.display = "block";
};

function hideFilterSearchBar(){
    objectOfFilterElements.searchBar().style.display = "none";
};

function filterBySearch(){
    removeClickedClass(arrayOfFilterBtns);
    addClickedClass(objectOfFilterElements.search());
    showLoading();
    objectOfFilterElements.searchResultBtn().addEventListener('click',()=>{
        const birds = getBirdsElements();
        const searchKeyword = objectOfFilterElements.searchField().value;
        const birdsDontMatch = getBirdsDontMatch(birds, searchKeyword);
        cleanSearchResult(birds);  /*É necessário limpar o resultado antes, para a busca ser realizada corretamente em todos os elementos. */      
        if(areThereResultsForTheSearch(birds, birdsDontMatch)){
            birdsDontMatch.forEach(bird => hideBirdElement(bird))
        } else if (!areThereResultsForTheSearch(birds, birdsDontMatch)){
            alert('No birds were found! Try again.')
        }
        
    });
    hideLoading();
}

function sortByOldest(){
    showLoading();
    removeClickedClass(arrayOfFilterBtns);
    addClickedClass(objectOfFilterElements.oldest())
    firebase.firestore()
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

function isSearchEmpty(searchField){
    if(searchField.value == ''){
        cleanSearchResult(getBirdsElements());
    };
};

function getBirdsElements(){
    return Array.from(document.querySelectorAll('.bird'));
};

function showBirdElement(element){
    element.style.display = 'block';
};

function hideBirdElement(element){
    element.style.display = 'none';
};

function addClickedClass(element){
    element.classList.add('clicked');
};

function removeClickedClass(element){
    if(typeof element == "object"){
        element.forEach(el => el.classList.remove('clicked'));
    } else{
        element.classList.remove('clicked');
    };
};

function getUserLogged(){
    firebase.auth().onAuthStateChanged((user) => {
        if(user){
            userLogged = user;
        };
    });
};

function searchChangeListener(){
    objectOfFilterElements.searchField().addEventListener('change', (event)=> isSearchEmpty(event.target));
}

function cleanSearchResult(birds){
    birds.forEach(bird => showBirdElement(bird));
}

function filtersListener(){
    arrayOfFilterBtns.forEach(filterButton => {
        filterButton.addEventListener('click', (event) => {
            toggleFilters(event.target.id)
        })
    });
};

function areThereResultsForTheSearch(birds, birdsDontMatch){
    if(birds.length != birdsDontMatch.length){
        return true;
    } else{
        return false;
    };
};

function getBirdsDontMatch(birds, searchKeyword){
    return birds.filter(bird => !bird.innerText.includes(searchKeyword));
}