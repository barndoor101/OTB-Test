//import Handlebars from "handlebars";

async function getResults() {
    let url = 'data/hotels.json';
    try {
        let res = await fetch(url, {
            mode: "no-cors",
            credentials: "same-origin",
            eaders: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
              }
        });
        return await res.json();
        console.log(res);
    } catch (error) {
        console.log(error);
    }
}

getResults();