async function getData() {
    let platforms = document.getElementsByName("platform");
    let platform;
    for (let i = 0; i < platforms.length; i++) {
        if (platforms[i].checked) {
            platform = platforms[i].value;
            break;
        }
    }

    let category = document.getElementById("category").value; 
    let sortBy = document.getElementById("sortBy").value;

    if (platform && category && sortBy) {
        let endpoint = `https://mmo-games.p.rapidapi.com/games?platform=${platform}&category=${category}&sort-by=${sortBy}`;
        console.log(endpoint);
        try {
            const response = await fetch(endpoint, {
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
            displayRecommendations(data);
            createFooter();
        } catch (err) {
            console.error(err);
            displayError("Sorry, an error occurred while fetching data.");
        }
    } else {
        displayError("Please select the platform.");
    }
}

document.getElementById('recommendation').addEventListener('click', getData);

function displayRecommendations(data) {
    const gameDiv = document.getElementById("game");
    gameDiv.innerHTML = ""; 

    // Create header and hint elements
    const headerDiv = document.createElement("div");
    headerDiv.classList.add("header"); 

    const headerHint = document.getElementById("headerHint");
    headerHint.innerHTML = "";

    const header = document.createElement("h2");
    header.textContent = `Game Recommendations:`;
    const hint = document.createElement("p");
    hint.textContent = `Hint: double click a game item to highlight it!`;
    
    headerDiv.appendChild(header);
    headerDiv.appendChild(hint);
    headerHint.appendChild(headerDiv); 

    const games = Array.isArray(data) ? data : [data];

    games.forEach(game => {
        const gameItem = document.createElement("div");
        gameItem.classList.add("game-item");

        const title = document.createElement("h4");
        title.textContent = `${game.title}`;
        title.classList.add("title"); 

        const thumbnail = document.createElement("img");
        thumbnail.src = game.thumbnail;
        thumbnail.alt = `${game.title} thumbnail`;
        thumbnail.style.width = "100%"; 

        const description = document.createElement("p");
        description.innerHTML = `<strong>Description:</strong> ${game.short_description}`;

        const genre = document.createElement("p");
        genre.innerHTML = `<strong>Genre:</strong> ${game.genre}`;

        const platform = document.createElement("p");
        platform.innerHTML = `<strong>Platform:</strong> ${game.platform}`;

        const publisher = document.createElement("p");
        publisher.innerHTML = `<strong>Publisher:</strong> ${game.publisher}`;

        const developer = document.createElement("p");
        developer.innerHTML = `<strong>Developer:</strong> ${game.developer}`;

        const releaseDate = document.createElement("p");
        releaseDate.innerHTML = `<strong>Release Date:</strong> ${game.release_date}`;

        const gameURL = document.createElement("p");
        gameURL.innerHTML = `<a href="${game.game_url}">Play Now</a>`;
        gameURL.classList.add("gameURL"); 


        gameItem.appendChild(title);
        gameItem.appendChild(thumbnail);
        gameItem.appendChild(description);
        gameItem.appendChild(genre);
        gameItem.appendChild(platform);
        gameItem.appendChild(publisher);
        gameItem.appendChild(developer);
        gameItem.appendChild(releaseDate);
        gameItem.appendChild(gameURL);
        gameDiv.appendChild(gameItem);
    });

    document.querySelectorAll('.game-item').forEach(game => {
        game.addEventListener('dblclick', () => {
            game.classList.toggle('highlight');
        });
    });
}

function displayError(errorMessage) {
    const gameDiv = document.getElementById("game");
    gameDiv.innerHTML = ""; 

    const errorElement = document.createElement("p");
    errorElement.textContent = errorMessage;
    errorElement.classList.add("error");
    gameDiv.appendChild(errorElement);
}

function clearData() {
    const gameDiv = document.getElementById("game");
    gameDiv.innerHTML = ""; 
}

document.getElementById('clear').addEventListener('click', clearData);


document.addEventListener("DOMContentLoaded", function() {
    const textElement = document.querySelector('.text-reveal');
    const text = textElement.textContent;
    textElement.textContent = ''; 

    let index = 0; 
    function type() {
        if (index < text.length) {
            textElement.textContent += text.charAt(index); 
            index++;
            setTimeout(type, 60); 
        }
    }

    setTimeout(type,4000); 
});

    setTimeout(() => {
        const splashScreen = document.getElementById('splash-screen');
        splashScreen.style.transform = 'translateY(-100%)'; 
    }, 3100); 

    function createFooter() {
            if (document.querySelector('footer')) {
        return; 
    }
    const footer = document.createElement('footer');

    const subheading = document.createElement('h3');
    subheading.classList.add('subheading');
    subheading.textContent = 'Leave me a follow ^-^:';
  

    const nav = document.createElement('nav');
    nav.classList.add('contacts');
    nav.id = 'contact';

    const links = [
        {
            href: 'https://github.com/Hajar-h',
            imgSrc: 'media/GH.png',
            alt: 'Github logo'
        },
        {
            href: 'https://www.linkedin.com/in/hajar-habeeb-a87618284?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
            imgSrc: 'media/Li.png',
            alt: 'Linked in logo'
        },

    ];

    links.forEach(link => {
        const a = document.createElement('a');
        a.href = link.href;

        const img = document.createElement('img');
        img.src = link.imgSrc;
        img.alt = link.alt;
        img.height = 30;

        a.appendChild(img);
        nav.appendChild(a);
    });

    footer.appendChild(subheading);
    footer.appendChild(nav);

    document.body.appendChild(footer); // Change to the desired container if necessary
}
