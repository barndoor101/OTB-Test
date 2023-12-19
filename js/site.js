var rawData;
var orderRating = false;
var orderName = false;
var orderPrice = true; //lowest first

async function getData(){
    fetch('./data/hotels.json')
        .then(response => response.json())
        .then(data => {
            rawData = data;
            renderResults(rawData);
        })
        .catch(error => console.log(error));
}

function renderResults(data) {

    let holidayData = data.data.holidayResults;
    let hotelData = data.data.hotels;
    let resultArray = new Array;

    holidayData.forEach(holiday => {
        hotelData.forEach(hotel => {
            if (holiday.hotelId === hotel.id) {
                holiday.departDate = dayjs(holiday.departDate, "DD/MM/YYYY").format('D MMM YYYY');
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

function sortByRating() {
    var $wrapper = $('#contentContainer');
    orderRating = !orderRating;
    $wrapper.find('.hotelContainer').sort(function(a, b) {
        return (orderRating ? +b.dataset.rating - +a.dataset.rating : +a.dataset.rating - +b.dataset.rating)
    })
    .appendTo($wrapper);
}

function sortByName(order) {
    var $wrapper = $('#contentContainer');
    orderName = !orderName;
    $wrapper.find('.hotelContainer').sort(function(a, b) {
        return (orderName ? String.prototype.localeCompare.call($(a).data('name').toLowerCase(), $(b).data('name').toLowerCase()) : String.prototype.localeCompare.call($(b).data('name').toLowerCase(), $(a).data('name').toLowerCase()));
    })
    .appendTo($wrapper);
}

function sortByPrice(order) {
    var $wrapper = $('#contentContainer');
    orderPrice = !orderPrice
    $wrapper.find('.hotelContainer').sort(function(a, b) {
        return (orderPrice ? +b.dataset.price - +a.dataset.price : +a.dataset.price - +b.dataset.price);
    })
    .appendTo($wrapper);
}

function expandDrawer(id) {
    let drawer = $(id).siblings('.expandDrawer')
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