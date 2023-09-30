if(!isNewBird()){ /* Detecta se é criação de um pássaro novo, ou modificação de um já existente.*/
    const uid = getBirdUid();
    findBirdByUid(uid);
    changeTheTitleToUpdate();
};

const newDiaryForm = { /* Objeto que contém todos os elementos HTML do formulário de criação ou modificação de diário.*/
    date: ()=>document.getElementById('date'),
    sciname: ()=>document.getElementById('sci-name'),
    popname: ()=>document.getElementById('pop-name'),
    place: ()=>document.getElementById('place'),
    lat:()=> document.getElementById('lat'),
    long:()=> document.getElementById('long'),
    img:()=> document.getElementById('img-uploaded'),
    imgUrl: '',
    storagePath: '',
    saveButton: ()=> document.getElementById('save-btn')
};

newDiaryForm.saveButton().addEventListener('click', e => { /* Ouvinte de evento que chama a função de salvar o diário no database, quando o botão de Salvar é clicado.*/
    showLoading();
    firebase.auth().onAuthStateChanged((user) => {
        saveDiary(e, user)});
});


async function saveDiary(e, user){ /* Função que salva novo pássaro ou atualiza um existente.*/
    e.preventDefault();
    if(isNewBird()){
        save(user);
    } else{
        update(user);
    };
};

async function save(user){ /* Função que salva novo pássaro no database.*/
    await uploadImage(user); 
    const bird = createBird(user);
    firebase.firestore()
    .collection('birds')
    .add(bird)
    .then(r=>{
        alert('The bird was added to your list!');
        hideLoading();
        window.location.href = '../pages/my-birds.html';
    })
    .catch(error => {
        hideLoading();
        alert('Error!');
    });
};

function createBird(user){ /* Função que cria um objeto com as informações do diário passadas pelo usuário.*/
    return {
        date: newDiaryForm.date().value,
        sciname: newDiaryForm.sciname().value,
        popname: newDiaryForm.popname().value,
        place: newDiaryForm.place().value,
        lat: newDiaryForm.lat().value,
        long: newDiaryForm.long().value,
        img: newDiaryForm.imgUrl,
        storagePath: newDiaryForm.storagePath,
        user: {
            uid: user.uid
        }};
};

async function uploadImage(user){ /* Função que salva ou atualiza a imagem do pássaro no Firebase Storage.*/
    if(newDiaryForm.img().files[0]){
        if(!isNewBird()){
            deleteImageOnStorage();
        };
        let storageRef = firebase.storage().ref();
        let path = `/${user.uid}/${newDiaryForm.img().files[0].name}`;
        let imageRef = storageRef.child(path);
        
        await imageRef.put(newDiaryForm.img().files[0]);
        await imageRef.getDownloadURL().then(url => {
            newDiaryForm.imgUrl = url;
            newDiaryForm.storagePath = path;
        });
    };
};

function deleteImageOnStorage(){ /* Função que deleta a imagem no Firebase Storage.*/
    firebase.storage().ref().child(newDiaryForm.storagePath)
    .delete()
    .then((r)=>console.log(r))
    .catch((error) => console.log(error));
};



/* Início das funções de MODIFICAÇÃO de pássaros.*/

async function update(user){ /* Função que atualiza um pássaro no database.*/
    await uploadImage(user);
    const bird = createBird(user);
    firebase.firestore()
    .collection('birds')
    .doc(getBirdUid())
    .update(bird)
    .then(r=>{
        alert('The bird was updated!');
        hideLoading();
        window.location.href = '../pages/my-birds.html';
    })
    .catch(error => {
        hideLoading();
        alert('Error!');
    });
};

function getBirdUid(){ /*Função recupera o ID do pássaro a partir do URL, quando o usuário deseja fazer modificações.*/
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('uid');
};

function isNewBird(){ /* Função que identifica se o usuário deseja criar ou modificar um novo pássaro.*/
    return getBirdUid() ? false : true;
};

function findBirdByUid(uid){ /* Função que recupera no database o documento do pássaro que o usuário deseja modificar.*/
    showLoading();
    firebase.firestore()
    .collection("birds")
    .doc(uid)
    .get()
    .then(doc => {
        hideLoading();
        if(doc.exists){
            fillBirdOnTheForm(doc.data());
        } else {
            alert('Bird not found!');
            window.location.href = '../pages/my-birds.html';
        };
    })
    .catch((error)=>{
        hideLoading();
        console.log(error);
        alert('Error!');
        window.location.href = '../pages/my-birds.html';
    }
    );
};

function fillBirdOnTheForm(bird){ /* Função que preenche o formulário com as informações recuperadas do pássaro para modificação.*/
    newDiaryForm.date().value = bird.date;
    newDiaryForm.sciname().value = bird.sciname;
    newDiaryForm.popname().value = bird.popname;
    newDiaryForm.place().value = bird.place;
    newDiaryForm.lat().value = bird.lat;
    newDiaryForm.long().value = bird.long;
    newDiaryForm.imgUrl = bird.img;
    newDiaryForm.storagePath = bird.storagePath;
};

function changeTheTitleToUpdate(){
    document.querySelector(".container__title").innerHTML = 'Update bird';
};
            
/* Fim das funções de MODIFICAÇÃO de pássaros.*/




   

