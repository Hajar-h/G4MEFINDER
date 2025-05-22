//Hajar habiburahman 2211350

async function getData() {// sending ajax using the fetch api
    let platforms = document.getElementsByName("platform");
    let platform;
    for (let i = 0; i < platforms.length; i++) {// take the selected value from the radio buttons
        if (platforms[i].checked) {
            platform = platforms[i].value;
            break;
        }}

    // take the value feom the select options 
    let category = document.getElementById("category").value; 
    let sortBy = document.getElementById("sortBy").value;

    if (platform && category && sortBy) {// if all the inputs are selected
        let endpoint = `https://mmo-games.p.rapidapi.com/games?platform=${platform}&category=${category}&sort-by=${sortBy}`;
        console.log(endpoint);
        try {
            const response = await fetch(endpoint, { //sending request
                method: 'GET',
                headers: {
                    'x-rapidapi-host': 'mmo-games.p.rapidapi.com',
                    'x-rapidapi-key': 'fc188809c7msh2ca603611cbdccep1b99fejsn05b574c34f5a', 
                    'useQueryString': true
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            let data = await response.json();
            displayRecommendations(data);// display the data 
        } catch (err) { // handeling errors
            console.error(err);
            displayError("Sorry, an error occurred while fetching data.");
        }
    } else {
        displayError("Please select the platform.");
    }
}

document.getElementById('recommendation').addEventListener('click', getData);




function displayRecommendations(data) { // retrieve the data and add it to the DOM and display it on the webpage
    const gameDiv = document.getElementById("game");
    gameDiv.innerHTML = ""; 

    const headerDiv = document.createElement("div");
    const header = document.createElement("h2");
    header.textContent= `Game Recommendations:`;
    const hint = document.createElement("p");
    hint.textContent=`Hint: double click a game item to highlight it!`;
    headerDiv.appendChild(header);
    headerDiv.appendChild(hint);

    gameDiv.appendChild(headerDiv);


    const games = Array.isArray(data) ? data : [data]; //make sure if data retrieved is a array or a single item

    games.forEach(game => {// for each game parse the attributes and create their elements and add them to the dom 
        const gameItem = document.createElement("div");
        gameItem.classList.add("game-item");

        const title = document.createElement("h4");
        title.textContent = `Title: ${game.title}`;
        const thumbnail = document.createElement("img");
        thumbnail.src = game.thumbnail;
        thumbnail.alt = `${game.title} thumbnail`;
        const description = document.createElement("p");
        description.textContent = `Description: ${game.short_description}`;
        const genre = document.createElement("p");
        genre.textContent = `Genre: ${game.genre}`;
        const platform = document.createElement("p");
        platform.textContent = `Platform: ${game.platform}`;
        const publisher = document.createElement("p");
        publisher.textContent = `Publisher: ${game.publisher}`;
        const developer = document.createElement("p");
        developer.textContent = `Developer: ${game.developer}`;
        const releaseDate = document.createElement("p");
        releaseDate.textContent = `Release Date: ${game.release_date}`;
        const gameURL = document.createElement("p");
        gameURL.innerHTML = `<a href="${game.game_url}">Play Now</a>`;

        const brakeElement = document.createElement("br");
        const lineElement = document.createElement("hr");

        // add the attributes to the dom
        gameItem.appendChild(title);
        gameItem.appendChild(thumbnail);
        gameItem.appendChild(description);
        gameItem.appendChild(genre);
        gameItem.appendChild(platform);
        gameItem.appendChild(publisher);
        gameItem.appendChild(developer);
        gameItem.appendChild(releaseDate);
        gameItem.appendChild(gameURL);
        gameItem.appendChild(lineElement);
        gameItem.appendChild(brakeElement);
        gameDiv.appendChild(gameItem);
    });


    // event 2, highlight the game item by double clicking it and turning it yellow 
    document.querySelectorAll('.game-item').forEach(game => {
        game.addEventListener('dblclick', () => {
            game.classList.toggle('highlight'); 
        });
    });
}

// error function
function displayError(errorMessage) {
    const gameDiv = document.getElementById("game");
    gameDiv.innerHTML = ""; 

    const errorElement = document.createElement("p");
    errorElement.textContent = errorMessage;
    errorElement.classList.add("error");
    gameDiv.appendChild(errorElement);
}

// function to remove the recommendations and restart the process
function clearData(){
    const gameDiv = document.getElementById("game");
    gameDiv.innerHTML = ""; 
}

document.getElementById('clear').addEventListener('click', clearData);



