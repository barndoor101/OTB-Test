//import Handlebars from "handlebars";

async function getData(){
    fetch('./data/hotels.json')
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
}

getData();

function renderResults(sortOption) {
    console.log(sortOption);
}