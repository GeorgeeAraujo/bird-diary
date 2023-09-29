import { arrayOfFilterBtns, objectOfFilterElements, addClickedClass, removeClickedClass } from "./filter-birds.js";
export{createBirdsOnScreen, findBirds};

firebase.auth().onAuthStateChanged((user) => { /* Faz a captura do usuário logado e passa a informação para a busca no banco de dados..*/
    if(user){
        findBirds(user);
    };
});


function findBirds(user){ /* Função que realiza a busca no banco de dados, de acordo com o usuário.*/
    showLoading();
    removeClickedClass(arrayOfFilterBtns);
    addClickedClass(objectOfFilterElements.all())
    firebase.firestore()
    .collection('birds')
    .where('user.uid', '==', user.uid)
    .orderBy('date', 'desc')
    .get()
    .then(snapshot => {
        hideLoading();
        const birds = snapshot.docs.map((doc) => ({
            ...doc.data(),
            uid:doc.id
        }));
        createBirdsOnScreen(birds);
        })
    .catch(error => {
        hideLoading();
        console.log(error);
        alert('Error on loading your birds! Please, try again.')
    });
    
};

function createBirdsOnScreen(birds){ /* Função que cria os elementos na tela, com as informações resgatadas do database.*/
    const birdsList = document.getElementById('birds-list');
    birdsList.innerHTML = '';
    if(areThereBirdsToShow(birds)){
        birds.forEach((bird) => {
            const birdDiv = document.createElement('div');
            birdDiv.classList.add("bird");
            birdDiv.id = bird.uid; /* Acrescenta o mesmo id do documento no elemento, para que seja possível remover se o usuário quiser.*/
            birdDiv.addEventListener('click', () => window.location.href = `../pages/new-diary.html?uid=${bird.uid}`); /* Cria o elemento já com um ouvinte de evento, para que seja possível a modificação dos dados.*/
    
            const img = document.createElement('img');
            img.classList.add('bird__image');
            img.src = bird.img;
            birdDiv.appendChild(img);
    
            const sciname = document.createElement('p');
            sciname.classList.add('bird__info');
            sciname.innerHTML = `Scientific name: ${bird.sciname}`;
            birdDiv.appendChild(sciname);
    
            const popname = document.createElement('p');
            popname.classList.add('bird__info');
            popname.innerHTML = `Popular name: ${bird.popname}`;
            birdDiv.appendChild(popname);
    
            const date = document.createElement('p');
            date.classList.add('bird__info');
            date.innerHTML = `Date: ${bird.date}`;
            birdDiv.appendChild(date);
            
    
            const place = document.createElement('p');
            place.classList.add('bird__info');
            place.innerHTML = `Place: ${bird.place}`;
            birdDiv.appendChild(place);
    
            const coord = document.createElement('p');
            coord.classList.add('bird__info');
            coord.innerHTML = `Coordinates: ${bird.lat},${bird.long}`;
            birdDiv.appendChild(coord);
    
            const removeBtn = document.createElement('button');
            removeBtn.classList.add('delete-btn');
            removeBtn.innerHTML = 'Delete';
            removeBtn.addEventListener('click', (event) => {
                event.stopPropagation();
                askRemoveBird(bird);
            });
            birdDiv.appendChild(removeBtn);
    
            birdsList.appendChild(birdDiv);
    
    })} else{
        createNoBirdsMessage();
    }

}


function askRemoveBird(bird){ /* Realiza a confirmação da ação de remover o pássaro.*/
    const shouldRemove = confirm('Do you really want to delete this bird?')
    if(shouldRemove){
        removeBird(bird);
    };
};

function removeBird(bird){ /* Função que deleta o documento desejado do database.*/
    showLoading();
    firebase.firestore()
    .collection('birds')
    .doc(bird.uid)
    .delete()
    .then(() => {
        hideLoading();
        document.getElementById(bird.uid).remove();
        removeImage(bird.storagePath);
        const birds = Array.from(document.querySelectorAll('.bird'));
        if(areThereBirdsToShow(birds) == 0){
            createNoBirdsMessage()
        }
    })
    .catch((error) =>{
        console.log(error);
        alert('Error on deleting the bird! Try again.');
    });
};

function removeImage(path){ /* Função que remove a imagem do pássaro desejado do storage.*/
    firebase.storage().ref().child(path)
        .delete()
        .then(()=>console.log('Image removed from storage!'))
        .catch((error) => console.log(error));
};


function areThereBirdsToShow(birds){
    return birds.length != 0;
}

function createNoBirdsMessage(){
    const birdsList = document.getElementById('birds-list')
    const noBirdsMessage = document.createElement('div');
    noBirdsMessage.innerHTML = `You dont't have birds to show! Add a new diary.`
    noBirdsMessage.classList.add('no-birds-message')

    birdsList.appendChild(noBirdsMessage)

}



