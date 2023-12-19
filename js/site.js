var rawData;
var sortOption = "price";

async function getData(){
    fetch('./data/hotels.json')
        .then(response => response.json())
        .then(data => {
            rawData = data;
            renderResults(rawData, sortOption);
        })
        .catch(error => console.log(error));
}

function renderResults(data, sortOption) {

    let holidayData = data.data.holidayResults;
    let hotelData = data.data.hotels;
    let resultArray = new Array;

    holidayData.forEach(holiday => {
        hotelData.forEach(hotel => {
            if (holiday.hotelId === hotel.id) {
                holidayResult = {...holiday, ...hotel}
                resultArray.push(holidayResult)
            }
            
        });
    });

    var holidayResult = document.getElementById('holidayResult').innerHTML;
    var compiled_template = Handlebars.compile(holidayResult);
    var rendered = compiled_template(resultArray);
    document.getElementById('contentContainer').innerHTML = rendered;
}

function expandDrawer(id) {
    let drawer = $(id).siblings('.expandDrawer')
    console.log(drawer);
    drawer.toggleClass('hide');
}

window.onload = function() {
    getData();

    Handlebars.registerHelper('renderStars', (rating) => {
        let result = '';
        for (let i = 1; i <= rating; i++) {
          result += `&#9733;`;
        }
        return new Handlebars.SafeString(result);
    });

};