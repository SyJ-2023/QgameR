// Función para verificar si la app está instalada
function isAppInstalled() {
    return new Promise((resolve) => {
        const appScheme = "qgamer://"; // El esquema que la app debe tener
        const timeout = setTimeout(() => resolve(false), 2000); // Timeout de 2 segundos

        // Intentamos abrir la app utilizando el esquema personalizado
        const iframe = document.createElement("iframe");
        iframe.style.display = "none";
        iframe.src = appScheme;
        document.body.appendChild(iframe);

        iframe.onload = () => {
            clearTimeout(timeout);
            resolve(true); // Si la app se abrió, está instalada
        };
    });
}

// Función para cargar los juegos desde el almacenamiento local (simulando el backend)
function loadGames() {
    const games = JSON.parse(localStorage.getItem('games')) || []; // Cargar desde localStorage
    const gamesList = document.getElementById('gamesList');

    if (games.length === 0) {
        gamesList.innerHTML = "<p>No hay juegos disponibles. Añade QR en el panel de administración.</p>";
    } else {
        gamesList.innerHTML = ''; // Limpiar el contenido previo
        games.forEach(game => {
            const gameElement = document.createElement('div');
            gameElement.classList.add('game');
            gameElement.innerHTML = `
                <img src="${game.qrUrl}" alt="${game.name}">
                <p>${game.name}</p>
                <button onclick="redirectToApp('${game.qrUrl}')">Abrir en QgameR</button>
            `;
            gamesList.appendChild(gameElement);
        });
    }
}

// Función para redirigir a la app QgameR
async function redirectToApp(qrUrl) {
    if (await isAppInstalled()) {
        window.location.href = "qgamer://addGame?qrUrl=" + encodeURIComponent(qrUrl); // Redirigir a la app
    } else {
        alert('La app QgameR no está instalada. Por favor, instálala para continuar.');
        // Aquí se pondría el link para descargar la app
        window.location.href = "https://link-a-descargar-la-app.com"; // Reemplaza con el link real
    }
}

// Función para simular la carga de juegos
function loadGamesFromAdmin() {
    // Esta función se simula en el almacenamiento local
    const exampleGames = [
        { name: "Juego 1", qrUrl: "game1.qgamer" },
        { name: "Juego 2", qrUrl: "game2.qgamer" },
        { name: "Juego 3", qrUrl: "game3.qgamer" }
    ];

    localStorage.setItem('games', JSON.stringify(exampleGames)); // Guardamos los juegos en localStorage
    loadGames(); // Cargamos los juegos en la página
}

// Llamamos a la función para cargar los juegos al iniciar la página
loadGamesFromAdmin();
