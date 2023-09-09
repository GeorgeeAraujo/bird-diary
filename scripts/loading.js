function showLoading(){ /* Função que cria o componente de loading.*/
    const div = document.createElement('div');
    div.classList.add("loading", "centralize");
    
    const label = document.createElement("label");
    label.innerText = 'Loading...'
    div.appendChild(label);

    document.body.appendChild(div);
};

function hideLoading(){ /* Função que remove o componente de loading.*/
    const loadings = document.getElementsByClassName("loading");
    if(loadings.length){
        loadings[0].remove();
    };
};
