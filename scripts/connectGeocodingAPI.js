async function getCoordinates(){ /* Acessa, a partir da API Geocoding, informações de latitude e longitude da localização fornecida pelo usuário. */
    if(!newDiaryForm.place().value){
        cleanCoordinates();
    } else{
        try{
            showLoading();
            const coordinates = await fetch(`https://geocode.maps.co/search?q=${newDiaryForm.place().value}`);
            const coordinatesConverted = await coordinates.json();
            fillCoordinatesOnTheForm(coordinatesConverted[0].lat, coordinatesConverted[0].lon);
            hideLoading();
        } catch(error){
            hideLoading();
            console.log(error);
            alert('Place not found! Try again');
        };
    };
};

function fillCoordinatesOnTheForm(lat, long){ /* Preenche automaticamente as coordenadas no formulário. */
    newDiaryForm.lat().value = lat;
    newDiaryForm.long().value = long;
};

function cleanCoordinates(){ /* Limpa as coordenadas no formulário, caso o campo de lugar esteja vazio. */
    newDiaryForm.lat().value = '';
    newDiaryForm.long().value = '';    
};