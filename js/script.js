// a temporary base for the storage of information about the game
let playersData = [
    // {
    //  playerName: 'Рик Санчез',
    //  currentPoints: 0,
    //  pointsList: [0, -250, -90, 0],
    //     playerAvatar: 'img/player-card__photo/9.png',
    //     avatarModificator: 40,
    // },
    // {
    //  playerName: 'Морти Смит',
    //  currentPoints: 40,
    //  pointsList: [-200, 0, -100, -160, 9],
    //     playerAvatar: 'img/player-card__photo/11.png',
    //     avatarModificator: 50,
    // },
    // {
    //  playerName: 'Джерри Смит',
    //  currentPoints: 1,
    //  pointsList: [-200, -200, 0, -99],
    //     playerAvatar: 'img/player-card__photo/2.png',
    //     avatarModificator: 70,
    // },
    // {
    //  playerName: 'Бэт Смит',
    //  currentPoints: 480,
    //  pointsList: [-5, -5, -5, -5],
    //     playerAvatar: 'img/player-card__photo/3.png',
    //     avatarModificator: 8,
    // }
];

let gameRules = {
    numberOfLives: 500,
};

// Code

displayCards(playersData);
addListenerToAddPlayerBtn();

let btnNewGame = document.querySelector('.start-new-game-btn');
    btnNewGame.addEventListener('click', startNewGame);

let btnNewRound = document.querySelector('.start-new-round-btn');
    btnNewRound.addEventListener('click', startNewRound);

let btnSettings = document.querySelector('.settings-btn');
    btnSettings.addEventListener('click', displaySettings);

let btnGameRules = document.querySelector('.game-rules-btn');
    btnGameRules.addEventListener('click', displayGameRules);

// functions

function displayCards(data) {
    let cardsList = document.querySelector('.cards-list');
    for (let i = 0; i < data.length; i++) {
        let card = createCard(data[i]);
        card.id = 'player-' + i;
        cardsList.appendChild(card);
    }
};

function createCard(playerData) {
    //создаем карточку игрока
    let listItem = makeElement('div', 'player-card');
    //создаем шапку карточки игрока
    let header = makeElement('header', 'player-card__header');
    listItem.appendChild(header);

    let playerCardName = makeElement('div', 'player-card__name', playerData.playerName);
    header.appendChild(playerCardName);

    let playerCardCurrentPoints = makeElement('div', 'player-card__current-points', String(playerData.currentPoints));
    header.appendChild(playerCardCurrentPoints);
    //создаем блок с картинкой
    let playerCardPhoto = makeElement('div', 'player-card__photo');
    listItem.appendChild(playerCardPhoto);

    if (playerData.currentPoints <= 0) {
        listItem.classList.add('wasted');
    }

    let cardImg = makeElement('img', 'player-card__img');
    cardImg.src = playerData.playerAvatar;
    cardImg.alt = 'Карточка игрока ' + playerData.playerName;
    cardImg.style.cssText = "filter: hue-rotate(" + playerData.avatarModificator + "deg)";
    playerCardPhoto.appendChild(cardImg);

    //создаем блок с перечнем очков
    let playerCardPointsList = makeElement('div', 'player-card__points-list');
    listItem.appendChild(playerCardPointsList);

    //создаем очки предыдущих раундов
    for (j = 0; j < playerData.pointsList.length; j++) {
        let playerCardPointsListItem = makeElement('div', 'player-card__points-list-item', playerData.pointsList[j]);
        playerCardPointsList.appendChild(playerCardPointsListItem);
    }

    //Создаем футер карточки
    let playerCardFooter = makeElement('div', 'player-card__footer');
    listItem.appendChild(playerCardFooter);

    let footerInput = makeElement('input', 'player-card__input');
    footerInput.setAttribute('type', 'number');
    playerCardFooter.appendChild(footerInput);

    let footerButton = makeElement('button', 'player-card__add-points-btn', 'OK');
    footerButton.addEventListener('click', addPoints);
    playerCardFooter.appendChild(footerButton);

    return listItem;
};

function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}

function makeElement(tagName, className, text) {
    let element = document.createElement(tagName);
    element.classList.add(className);
    if (text) {
        element.textContent = text;
    }
    return element;
}

function addListenerToAddPlayerBtn() {
    let buttonCreateCard = document.querySelector('.add-player-btn');
    buttonCreateCard.addEventListener('click', createNewPlayer);
}

// function addListenerToAddPointsBtns() {
//     let buttonsAddPoints = document.querySelectorAll('.player-card__add-points-btn');
//     for (i = 0; i < buttonsAddPoints.length; i++) {
//         buttonsAddPoints[i].addEventListener('click', addPoints);
//     }
// }

function addPoints() {
    let playerId = this.parentNode.parentNode.id;
    let pointsValue = getValue(playerId);
    if (pointsValue === undefined || !isNumeric(pointsValue) || pointsValue < 0) {
        alert('Сумма очков должна быть положительным числом или равна нулю!');
        return;
    }
    let playerIndex = takeNumberFromString(playerId);
    let pointsListLength = playersData[playerIndex].pointsList.length;
    playersData[playerIndex].pointsList[pointsListLength] = '-'+pointsValue;
    playersData[playerIndex].currentPoints -= pointsValue;

    removeAllCards();
    displayCards(playersData);
};

function removeAllCards() {
    let allPlayerCards = document.querySelectorAll('.player-card');
    for (let i = 0; i < allPlayerCards.length; i++) {
        allPlayerCards[i].remove();
    }
}

function takeNumberFromString(string) {
    let number = "";
    for (i = 0; i < string.length; i++) {
        if (!isNaN(string.charAt(i))) {
            number = number + string.charAt(i);
        }
    }
    return number;
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function createNewPlayer() {
    let playerIndex = playersData.length;
    playersData[playerIndex] = {};
    playersData[playerIndex].playerName = prompt('Введите имя игрока', '');
    playersData[playerIndex].currentPoints = gameRules.numberOfLives;
    playersData[playerIndex].pointsList = [];
    playersData[playerIndex].playerAvatar = 'img/player-card__photo/' + randomInteger(0, 16) + '.png';
    playersData[playerIndex].avatarModificator = randomInteger(0, 360);
    let cardsList = document.querySelector('.cards-list');
    let card = createCard(playersData[playerIndex]);
    card.id = 'player-' + playerIndex;
    cardsList.appendChild(card);
}

function getValue(parentId) {
    let cardSelector = "#" + parentId + " .player-card__input";
    let cardItem = document.querySelector(cardSelector);
    return cardItem.value;
}

function startNewGame() {
    let isConfirm = confirm("Вы уверены, что хотите начать новую игру? Информация о текущих игроках будет удалена!");
    if (isConfirm) {
        playersData = [];
        removeAllCards();
    } else {
        return;
    }
}

function startNewRound() {
    let isConfirm = confirm("Вы уверены, что хотите начать новый раунд с текущими игроками?");
    if (isConfirm) {
        for (let i = 0; i < playersData.length; i++) {
            playersData[i].currentPoints = gameRules.numberOfLives;
            playersData[i].pointsList = [];
        }
        removeAllCards();
        displayCards(playersData);
    } else {
        return;
    }
}

function displaySettings() {
    usersNumberOfRules = prompt('Какое количество жизней у каждого игрока на начало игры?', '');
    if (usersNumberOfRules === undefined || !isNumeric(usersNumberOfRules) || usersNumberOfRules <= 0) {
        alert('Сумма очков должна быть положительным числом!');
        return;
    } else {
        gameRules.numberOfLives = usersNumberOfRules;
        removeAllCards();
        displayCards(playersData);
    }
}

function displayGameRules() {
    alert('Функционал находится в разработке!');
}

// всё для работы модального окна:

// конец кода для модального окна