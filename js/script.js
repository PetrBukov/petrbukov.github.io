// a temporary base for the storage of information about the game
let playersData = [
    {
    	playerName: 'Рик Санчез',
    	currentPoints: 0,
    	pointsList: [0, -250, -90, 0],
        playerAvatar: 'img/player-card__photo/9.png',
    },
    {
    	playerName: 'Морти Смит',
    	currentPoints: 40,
    	pointsList: [-200, 0, -100, -160, 9],
        playerAvatar: 'img/player-card__photo/11.png',
    },
    {
    	playerName: 'Джерри Смит',
    	currentPoints: 1,
    	pointsList: [-200, -200, 0, -99],
        playerAvatar: 'img/player-card__photo/2.png',
    },
    {
    	playerName: 'Бэт Смит',
    	currentPoints: 480,
    	pointsList: [-5, -5, -5, -5],
        playerAvatar: 'img/player-card__photo/3.png',
    }
];

// Code

displayCards(playersData);
addListenerToAddPlayerBtn();

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

    let cardImg = makeElement('img', 'player-card__img');
    cardImg.src = playerData.playerAvatar;
    cardImg.alt = 'Карточка игрока ' + playerData.playerName;
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
    let pointsValue = +getValue(playerId);
    if (pointsValue === undefined || !isNumeric(pointsValue) || pointsValue <= 0) {
        alert('Сумма очков должна быть положительным числом ;)');
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
    playersData[playerIndex].currentPoints = 500;
    playersData[playerIndex].pointsList = [];
    playersData[playerIndex].playerAvatar = 'img/player-card__photo/' + randomInteger(0, 16) + '.png';
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

}





// function addCardData(name) {
//     cardData(cardsData.length) = {
//         playerName: name,
//         currentPoints: '',
//         pointsList: [],
//         playerCardPhoto: ''
//     }
// }
// addListenerToPlayerCards();
//
// function addListenerToPlayerCards() {
//     let playerCarts = document.querySelectorAll(".player-card")
//     for (let i = 0; i < playerCarts.length; i++) {
//         playerCarts[i].addEventListener('click', addPointsToUser);
//     }
// }
//
// function addPointsToUser() {
//     if(event.target.classList.find('player-card__add-points-btn')) {
//         const name = event.currentTarget.querySelector('.player-card__name').textContent
//         if(name) {
//             alert(playersData.findIndex(name));
//         }
//     }
// }
