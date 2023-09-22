async function getCoordinates(){ /* Acessa, a partir da API Geocoding, informações de latitude e longitude da localização fornecida pelo usuário. */
    const place = newDiaryForm.place().value;
    if(!place){
        cleanCoordinates();
    } else{
        try{
            showLoading();
            const coordinates = await fetch(`https://geocode.maps.co/search?q=${place}`);
            const coordinatesConvert = await coordinates.json();
            fillCoordinatesOnTheForm(coordinatesConvert[0].lat, coordinatesConvert[0].lon);
            hideLoading();
        } catch(error){
            console.log(error);
            alert('Place not found! Try again');
            hideLoading();
        };
    };
};

function fillCoordinatesOnTheForm(lat, long){ /* Preenche automaticamente as coordenadas no formulário. */
    let latitude = newDiaryForm.lat();
    let longitude = newDiaryForm.long();
    latitude.value = lat;
    longitude.value = long;
};

function cleanCoordinates(){ /* Limpa as coordenadas no formulário, caso o campo de lugar esteja vazio. */
    newDiaryForm.lat().value = '';
    newDiaryForm.long().value = '';    
};