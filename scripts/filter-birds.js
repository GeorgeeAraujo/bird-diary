import { createBirdsOnScreen, findBirds } from "./my-birds.js";
export {arrayOfFilterBtns, objectOfFilterBtns, removeClickedClass, addClickedClass};

let userLogged;
const arrayOfFilterBtns = Array.from(document.querySelectorAll('.filter__btn'));
const objectOfFilterBtns = {
    all: ()=> document.getElementById('show-all'),
    oldest:()=> document.getElementById('filter-oldest'),
    search: ()=> document.getElementById('search-btn-filter'),
    searchField: ()=> document.getElementById('search-field'),
    
};

getUserLogged(); /* Faz a captura do usuário logado e armazena na variavel userLogged.*/
searchChangeListener();
toggleFilters();

function filter(id){
    if(id == 'show-all'){
        hideFilterSearchBar();
        findBirds(userLogged);
    } else if (id == 'filter-oldest'){
        hideFilterSearchBar();
        sortByOldest();
    } else{
        showFilterSearchBar();
        filterBySearch();
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

function filterBySearch(){
    removeClickedClass(arrayOfFilterBtns);
    addClickedClass(objectOfFilterBtns.search());
    showLoading();
    const searchBtn = document.getElementById('search-btn');
    const searchField = document.getElementById('search-field');
    searchBtn.addEventListener('click',()=>{
        let birds = getBirdsElements();
        const keyword = searchField.value;
        birds.forEach(bird => showBirdElement(bird));
        let birdsDontMatch = birds.filter(bird => !bird.innerText.includes(keyword));
        if(birds.length != birdsDontMatch.length){
            birdsDontMatch.forEach(bird => hideBirdElement(bird))
        } else {
            alert('No birds were found! Try again.')
        }
        
    });
    hideLoading();
}

function sortByOldest(){
        showLoading();
        removeClickedClass(arrayOfFilterBtns);
        addClickedClass(objectOfFilterBtns.oldest())
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
        cleanSearchResult();
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
    objectOfFilterBtns.searchField().addEventListener('change', (event)=> isSearchEmpty(event.target));
}

function cleanSearchResult(){
    let birds = getBirdsElements();
    birds.forEach(bird => showBirdElement(bird));
}

function toggleFilters(){
    arrayOfFilterBtns.forEach(filterButton => {
        filterButton.addEventListener('click', (event) => {
            filter(event.target.id)
        })
    });
};