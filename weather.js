
// $.post(URL, data, callback);

let colorTemp = [
    { LimitTemp: 40, color: `red` },
    { LimitTemp: 35, color: `orange` },
    { LimitTemp: 30, color: `yellow` },
    { LimitTemp: 20, color: `deepskyblue` },
    { LimitTemp: 10, color: `purple` },
    { LimitTemp: 0, color: `grey` },
    { LimitTemp: -50, color: `white` },
];

$(document).ready(ev => {
    $(`form`).submit(ev => {
        ev.preventDefault();
        let apiKey = `2d70da17ad06b13d58132d756541cf43`;
        let city = $('input').val();
        let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}`;

        $.ajax(weatherUrl)
            .done(data => {
                console.log(data);
                let TempInCel = Math.round(data.main.temp - 273);
                let humid = data.main.humidity;
                let windSpd=Math.round(data.wind.speed*1,60934);
                console.log(data.weather[0].description);
                let icn= data.weather[0].id;
                let color = colorTemp.find(entry => TempInCel > entry.LimitTemp).color;
                let section = document.createElement(`SECTION`);
                let h1 = document.createElement(`H1`);
                let article = document.createElement(`ARTICLE`);
                let article1 = document.createElement(`ARTICLE`);
                let article2 = document.createElement(`ARTICLE`);
                let article3 = document.createElement(`ARTICLE`);
                let icons = document.createElement(`I`);
                icons.classList.add("owf","owf-"+`${icn}`,"owf-5x");
                h1.innerText =data.name;
                article1.innerText = data.weather[0].description;
                article2.innerText = "Humidity:"+" "+humid;
                article3.innerText = "Wind Speed:"+" "+windSpd+" "+"kph";
                article.innerText = TempInCel;
                section.style.borderColor = color;                
                $(`#mainBox`).prepend(section);  
                // $(`section`).css({ "background": "blue" });
        
                section.append(h1,icons, article1, article2 , article3 , article );
            })
            .fail(err => { })
            $('input:text').val(' '); 


    })

})
