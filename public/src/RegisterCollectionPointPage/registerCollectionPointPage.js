function ufPopulation(){
    const ufSelector = document.querySelector("select[name=uf]");
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then( (dataUFs) => { return dataUFs.json()})
            .then( (states) => {
                for(const state of states){
                    ufSelector.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
                }
            }).catch((error) => {console.log(error);})
}

ufPopulation();

function getCity(event){
    const citySelector = document.querySelector("select[name=city]");
    const showState = document.querySelector("input[name=state]");
    const ufValue = event.target.value;
    const cityURL = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;
    const indexOfSelectedState = event.target.selectedIndex;
    showState.value = event.target.options[indexOfSelectedState].text;

    citySelector.innerHTML = "<option value>Selecione a Cidade</option>";
    citySelector.disabled = true;

    fetch(cityURL)
        .then( (dataCities) => { return dataCities.json()})
            .then( (cities) => {
                for(const city of cities){
                    citySelector.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
                }
                citySelector.disabled = false;
            }).catch((error) => {console.log(error);})
}



document.querySelector("select[name=uf]")
    .addEventListener("change", getCity)



//! items collect

let selectedItems = [];
const collectedItems = document.querySelector("input[name=items]");

function handleSelectedItem(event){
    const itemReference = event.target;

    itemReference.classList.toggle("itemCollectionSelected")
    const itemId = itemReference.dataset.id;

    const alreadySelected = selectedItems.findIndex( (item) => {
        return (item === itemId);
    })

    if(alreadySelected >= 0){
        const removeItem = selectedItems.filter( (item) => {
            return item != itemId
        })
        selectedItems = removeItem;
    } else {
        selectedItems.push(itemId);
    }

    collectedItems.value = selectedItems;

}

const itemsCollectionGrid = document.querySelectorAll(".itemsCollectionGrid li");
for(const itemSelected of itemsCollectionGrid){
    itemSelected.addEventListener("click", handleSelectedItem)
}                                           