function loadCountry() {
    $.ajax({
        url: "https://restcountries.eu/rest/v2/all",
        type: 'GET',
        dataType: "JSON",
        success : function(res) {         
            console.log(res)
            var output = "";
            for(var i in res) {
                console.log(res[i])
                output += `
                <tr>
                <td> ${i} </td>
                <td> 
                    <img class="imgFlag" src="${res[i].flag}">
                </td>
                <td> ${res[i].name} </td>
                <td> ${res[i].alpha3Code} </td>
                <td> <a class="view" href="./view.html?id=${res[i].alpha2Code}"> View </a> </td>
                </tr>
            `;
            }
            document.getElementById("tbody").innerHTML = output;
        }
    }); 
}

function getCountryById() {
    var url = new URL(window.location);
    var search_params = new URLSearchParams(url.search); 
    var id = search_params.get('id');
    
    $.ajax({
        url: "https://restcountries.eu/rest/v2/alpha/"+id,
        type: 'GET',
        dataType: "JSON",
        success : function(data) {         
            console.log(data);
            document.querySelector("#countryName").innerHTML = `<h1> ${data.name} </h1>`;
            document.querySelector("#_flag").src = data.flag;
            let view = outputView(JSON.stringify(data));
            document.querySelector("#tbody").innerHTML = view;
        }
    });    
}

function loadCountryOffLine() {
    $.ajax({
        url: "http://localhost:8080/ajax/scripts/countryData/data.json",
        type: 'GET',
        dataType: "JSON",
        success : function(res) {         
            console.log(res)
            var output = "";
            for(var i in res) {
                console.log(res[i])
                output += `
                <tr>
                <td> ${i} </td>
                <td> 
                    <img class="imgFlag" src="${res[i].flag}">
                </td>
                <td> ${res[i].name} </td>
                <td> ${res[i].alpha3Code} </td>
                <td> <a class="view" href="./view.html?id=${res[i].alpha2Code}"> View </a> </td>
                </tr>
            `;
            }
            document.getElementById("tbody").innerHTML = output;
        }
    }); 
}

function getCountryByIdOffLine() {
    var url = new URL(window.location);
    var search_params = new URLSearchParams(url.search); 
    var id = search_params.get('id');
    
    $.ajax({
        url: `http://localhost:8080/ajax/scripts/countryData/${id}.json`,
        type: 'GET',
        dataType: "JSON",
        success : function(data) {         
            console.log(data);
            document.querySelector("#countryName").innerHTML = `<h1> ${data.name} </h1>`;
            document.querySelector("#_flag").src = data.flag;
            let view = outputView(JSON.stringify(data));
            document.querySelector("#tbody").innerHTML = view;
        }
    });
}

function runArray(arr) {
    if (arr.length == 1) {
        if (arr[0].hasOwnProperty('symbol')){
            return `<li> <b>Name:</b> ${arr[0].name} <b>Symbol:</b> ${arr[0].symbol} </li>`;
        } else {
            return arr[0];
        }
    }
    let strVal = "<ul>";
    for (let i in arr) {
        if (arr.hasOwnProperty('symbol')){
            strVal += `<li> <b>Name:</b> ${arr[i].name} <b>Symbol:</b> ${arr[i].symbol} </li>`;
        } else if(arr[i].hasOwnProperty('iso639_2')) {
            strVal += `<li> <b>Name:</b> ${arr[i].name} <b>Native Name:</b> ${arr[i].nativeName} </li>`;
        } else {
            strVal += `<li>${arr[i]}</li>`;
        }
    }
    strVal += "</ul>";
    return strVal;
}

function outputView(str){
    data = JSON.parse(str);
    let view = `
        <tr>
            <td class="left">Capital</td><td class="right">${data.capital}</td>
        </tr>
        <tr>
            <td class="left">Calling Codes</td><td class="right">${runArray(data.callingCodes)}</td>
        </tr>
        <tr>
            <td class="left">Spellings for Country</td><td class="right">${runArray(data.altSpellings)}</td>
        </tr>
        <tr>
            <td class="left">Region</td><td class="right">${data.region}</td>
        </tr>
        <tr>
            <td class="left">Sub-Region</td><td class="right">${data.subregion}</td>
        </tr>
        <tr>
            <td class="left">Population</td><td class="right">${data.population}</td>
        </tr>
        <tr>
            <td class="left">Latitude</td><td class="right">${data.latlng[0]}</td>
        </tr>
        <tr>
            <td class="left">Longitude</td><td class="right">${data.latlng[1]}</td>
        </tr>
        <tr>
            <td class="left">Nationality</td><td class="right">${data.demonym}</td>
        </tr>
        <tr>
            <td class="left">Area</td><td class="right">${data.area}</td>
        </tr>
        <tr>
            <td class="left">Time Zones</td><td class="right">${runArray(data.timezones)}</td>
        </tr>
        <tr>
            <td class="left">Borders Countries</td><td class="right">${runArray(data.borders)}</td>
        </tr>
        <tr>
            <td class="left">Native Name</td><td class="right">${data.nativeName}</td>
        </tr>
        <tr>
            <td class="left">Currencies</td><td class="right">${runArray(data.currencies)}</td> 
        </tr>
        <tr>
            <td class="left">Languages</td><td class="right">${runArray(data.languages)}</td>
        </tr>
        <tr>
            <td class="left">Translations</td>
            <td class="right">
                <ul>
                    <li><b>Deutsch: </b>${data.translations.de}</li>
                    <li><b>Español: </b>${data.translations.es}</li>
                    <li><b>Français: </b>${data.translations.fr}</li>
                    <li><b>Nihonjin: </b>${data.translations.ja}</li>
                    <li><b>Italiano: </b>${data.translations.it}</li>
                </ul>
            </td> 
        </tr>
        <tr>
            <td class="left">Flag</td><td class="right"><img class="imgFlag" src="${data.flag}"></td>
        </tr>
    `;
    return view;
}