// code

let playersData = JSON.parse(localStorage.getItem('playersData')) || [];

let gameSettings = {
    numberOfLives: 500,
    maxNumberOfPlayers: 10
};

const cardsList = document.querySelector('.cards-list');
cardsList.addEventListener('click', addPoints);
cardsList.addEventListener('click', callModalNewPlayer);

const btnNewGame = document.querySelector('[data-button-name="new-game"]');
btnNewGame.addEventListener('click', callModalNewGame);

const btnNewRound = document.querySelector('[data-button-name="new-round"]');
btnNewRound.addEventListener('click', callModalNewRound);

const btnDisplayGameRules = document.querySelector('[data-button-name="display-game-rules"]');
btnDisplayGameRules.addEventListener('click', displayGameRules);

const btnGameSettings = document.querySelector('[data-button-name="game-settings"]');
btnGameSettings.addEventListener('click', editGameSettings);

const modalWindow = document.querySelector('.modal-window');
const backgroundModalWindow = document.querySelector(".modal-background");

const btnFreePik = document.querySelector('[data-button-name="thanks"]');
btnFreePik.addEventListener('click', callModalFreePik);

displayCards(playersData);

// functions

function displayCards(data) {
    cardsList.innerHTML = '<button class="add-player-btn">Добавить игрока...</button>' + data.map(playerInfo => {
        return createCard(playerInfo);
    }).join('');

    localStorage.setItem('playersData', JSON.stringify(data));
}

function createCard(playerData) {
    let playerCardPointsList = "";
    if (playerData.pointsList.length) {
        playerData.pointsList.forEach(pointsValue => playerCardPointsList += `<div class="player-card__points-list-item">${pointsValue}</div>`);
    }
    return `
        <div class="player-card" data-player-id="${playerData.playerId}">
            <header class="player-card__header">
                <div class="player-card__name">${playerData.playerName}</div>
                <div class="player-card__current-points">${String(playerData.currentPoints)}</div>
            </header>
            <div class="player-card__photo">
                <img class="player-card__img" src="${playerData.playerAvatar}" alt="Карточка игрока ${playerData.playerName}" style="filter: hue-rotate(${playerData.avatarModificator}deg);">
            </div>
            <div class="player-card__points-list">
                ${playerCardPointsList}
            </div>
            <div class="player-card__footer">
                <input class="player-card__input" type="number">
                <button class="player-card__add-points-btn" data-player-id="${playerData.playerId}">OK</button>
            </div>
        </div>
    `;
}

function callModalNewPlayer(e) {
    if (!e.target.matches('.add-player-btn')) return; 
    if (playersData.length >= gameSettings.maxNumberOfPlayers) {
        const formContent = `
            <form name="information" id="information" class="modal-window__form">
                <p>Достигнуто максимальное колличество игроков!</p>
                <button type="button" onclick="closeModalWindow();">OK</button>
            </form>
        `
        callModalWindow('Упс!', formContent)
        return;
    }
    const formContent = `
        <form name="new-player" id="new-player" class="modal-window__form">
            <label for="new-player-name">Введите имя игрока:</label>
            <input id="new-player-name" name="new-player-name" type="text">
            <button type="button" onclick="createNewPlayer()">Создать</button>
        </form>
    `
    callModalWindow('Добавить игрока', formContent)
}

function createNewPlayer() {
    const playerIndex = playersData.length;
    playerName = document.querySelector('#new-player-name').value;
    if (playerName === null || playerName === '') {
        return
    }
    playersData[playerIndex] = {
        playerName,
        currentPoints: gameSettings.numberOfLives,
        pointsList: [],
        playerAvatar: 'img/player-card__photo/' + randomInteger(0, 16) + '.png',
        avatarModificator: randomInteger(0, 360),
    };
    if (playersData.length === 1) {
        playersData[playerIndex].playerId = 0;
    } else {
        let maxId = 0;
        playersData.forEach(player => {
            if (player.playerId > maxId) {
                maxId = player.playerId;
            }
        });
        playersData[playerIndex].playerId = maxId + 1;
    }
    displayCards(playersData);
    closeModalWindow()
}

function addPoints(e) {
    if (!e.target.matches('button')) return;
    const playerId = e.target.dataset.playerId;
    const input = document.querySelector(`.player-card[data-player-id="${playerId}"] .player-card__input`);
    const pointsValue = input.value;
    if (pointsValue === undefined || !isNumeric(pointsValue) || pointsValue < 0) {
        const formContent = `
            <form name="information" id="information" class="modal-window__form">
                <p>Сумма очков должна быть положительным числом или равна нулю!</p>
                <button type="button" onclick="closeModalWindow();">OK</button>
            </form>
        `
        callModalWindow('Упс!', formContent)
        return;
    }
    // проверяем у всех ли игроков очки предыдущих раундов записаны
    const pointsListLength = playersData[playerId].pointsList.length;
    isAllRoundWrote = true;
    playersData.forEach(player => pointsListLength > player.pointsList.length ? isAllRoundWrote = false : '')
    if (!isAllRoundWrote) {
        const formContent = `
            <form name="information" id="information" class="modal-window__form">
                <p>⚠️ Заполните данные о предыдущих раундах у остальных игроков!</p>
                <button type="button" onclick="closeModalWindow();">OK</button>
            </form>
        `;
        callModalWindow('Упс!', formContent);
        return
    }
    // добавляем сумму очков в pointsList игрока
    if (pointsValue == 0) {
        playersData[playerId].pointsList[pointsListLength] = '🎈0 - Вы великолепны!🎈'
    } else {
        playersData[playerId].pointsList[pointsListLength] = '-'+pointsValue;
    }

    playersData[playerId].currentPoints -= pointsValue;
    input.value = '';

    displayCards(playersData);
};

function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function callModalNewGame() {
    const formContent = `
        <form name="new-game" id="new-game" class="modal-window__form">
            <p>Вы уверены, что хотите начать новую игру? Информация о текущих игроках будет удалена!</p>
            <button type="button" onclick="startNewGame()">Продолжить</button>
        </form>
    `
    callModalWindow('Новая игра', formContent)
}

function startNewGame() {
    playersData = [];
    displayCards(playersData);
    closeModalWindow()
}

function callModalNewRound() {
    const formContent = `
        <form name="new-round" id="new-round" class="modal-window__form">
            <p>Вы уверены, что хотите начать новый раунд с текущими игроками?</p>
            <button type="button" onclick="startNewRound()">Продолжить</button>
        </form>
    `
    callModalWindow('Новый раунд', formContent)
}

function startNewRound() {
    playersData.forEach(player => {
        player.currentPoints = gameSettings.numberOfLives;
        player.pointsList = [];
    })
    displayCards(playersData);
    closeModalWindow()
}

function displayGameRules() {
    const formContent = `
        <form name="information" id="information" class="modal-window__form">
            <p>😥 Их съела собака! Честно ...</p>
            <button type="button" onclick="closeModalWindow();">OK</button>
        </form>
    `;
    callModalWindow('Упс!', formContent);
}

function editGameSettings() {
    const formContent = `
        <form name="game-settings" id="game-settings" class="modal-window__form">
            <label for="number-of-lives">Колличество жизней на начало игры:</label>
            <input id="number-of-lives" name="number-of-lives" type="text" value="500">
            <label for="number-of-players">Максимальное колличество игроков:</label>
            <input id="number-of-players" name="number-of-players" type="text" value="10">
            <button type="button" class="game-settings-form-btn" onclick="applySettings()">Применить</button>
        </form>
    `
    callModalWindow('Настройки игры', formContent)
}

function applySettings() {
    let newNumberOfLives = document.querySelector("#number-of-lives").value;
    let newMaxNumberOfPlayers = document.querySelector("#number-of-players").value;
    if (newNumberOfLives === undefined || !isNumeric(newNumberOfLives) || newNumberOfLives < 0 || newMaxNumberOfPlayers === undefined || !isNumeric(newMaxNumberOfPlayers) || newMaxNumberOfPlayers < 0) {
        closeModalWindow()
        const formContent = `
            <form name="information" id="information" class="modal-window__form">
                <p>😡 Колличество жизней и количество игроков должно быть положительным числом!</p>
                <button type="button" onclick="closeModalWindow();">OK</button>
            </form>
        `;
        callModalWindow('Упс!', formContent);
        return
    } else {
        gameSettings.numberOfLives = newNumberOfLives;
        gameSettings.maxNumberOfPlayers = newMaxNumberOfPlayers;
        closeModalWindow()
        displayCards(playersData);
    }
}

function callModalFreePik() {
    const formContent = `
        <form name="thanks" id="thanks" class="modal-window__form">
            <p>Большое спасибо Freepik за предоставленные вектора:</p>
            <ul>
                <li><a href='https://ru.freepik.com/free-vector/векторы_1528571.htm' target="_blanc">Монстриков</a></li>
                <li><a href="https://ru.freepik.com/free-vector/_1528574.htm" target="_blanc">Ещё монстриков</a></li>
                <li><a href="https://ru.freepik.com/free-vector/_887838.htm" target="_blanc">Сердечко</a></li>
            </ul>
            <button type="button" onclick="callModalWindow()">Закрыть</button>
        </form>
    `
    callModalWindow('Благодарности', formContent)
}

function callModalWindow(modalHeader, formContent) {
    const modalWindowContent = `
        <div class="modal-window__content">
            <h2>${modalHeader}</h2>
            <button class="modal-window__close-btn" onclick="closeModalWindow()" title="Закрыть окно"><div class="modal-window__close-btn_inner"></div></button>
            ${formContent}
        </div>
    `;
    modalWindow.innerHTML = modalWindowContent;
    modalWindow.classList.toggle('modal-window_display');
    backgroundModalWindow.classList.toggle("modal-background_display");
}

function closeModalWindow() {
    modalWindow.classList.toggle("modal-window_display");
    backgroundModalWindow.classList.toggle("modal-background_display");
}