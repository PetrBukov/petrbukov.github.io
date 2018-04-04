let cardsData = [
    {
        playerName: 'Глойн',
        currentPoints: 219,
        pointsList: [-151, -130],
        playerCardPhoto: ''
    }
];

function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}

let makeElement = function (tagName, className, text) {
    let element = document.createElement(tagName);
    element.classList.add(className);
    if (text) {
        element.textContent = text;
    }
    return element;
};

let createCard = function (product) {
    //создаем карточку игрока
    let listItem = makeElement('div', 'player-card');
    //создаем шапку карточки игрока
    let header = makeElement('header', 'player-card__header');
    listItem.appendChild(header);

    let playerCardName = makeElement('div', 'player-card__name', product.playerName);
    header.appendChild(playerCardName);

    let playerCardCurrentPoints = makeElement('div', 'player-card__current-points', product.currentPoints);
    header.appendChild(playerCardCurrentPoints);
    //создаем блок с картинкой
    let playerCardPhoto = makeElement('div', 'player-card__photo');
    listItem.appendChild(playerCardPhoto);

    let cardImg = makeElement('img', 'player-card__img');
    cardImg.src = 'img/player-card__photo/' + randomInteger(0, 16) + '.png';
    cardImg.alt = 'Карточка игрока ' + product.name;
    playerCardPhoto.appendChild(cardImg);

    //создаем блок с перечнем очков
    let playerCardPointsList = makeElement('div', 'player-card__points-list');
    listItem.appendChild(playerCardPointsList);

    //ВРЕМЕННО для отладки создаем очки предыдущих раундов
    let playerCardPointsListItem1 = makeElement('div', 'player-card__points-list-item', '-151');
    playerCardPointsList.appendChild(playerCardPointsListItem1);

    let playerCardPointsListItem2 = makeElement('div', 'player-card__points-list-item', '-151');
    playerCardPointsList.appendChild(playerCardPointsListItem2);

    //Создаем футер карточки
    let playerCardFooter = makeElement('div', 'player-card__footer');
    listItem.appendChild(playerCardFooter);

    let footerInput = makeElement('input', 'test');
    footerInput.setAttribute('type', 'number');
    playerCardFooter.appendChild(footerInput);

    let footerButton = makeElement('button', 'test', 'OK');
    playerCardFooter.appendChild(footerButton);

    return listItem;
};

let cardsList = document.querySelector('.cards-list');

for (let i = 0; i < cardsData.length; i++) {
    let cardItem = createCard(cardsData[i]);
    cardsList.appendChild(cardItem);
}