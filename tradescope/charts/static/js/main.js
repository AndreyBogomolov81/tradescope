
//работа с кнопками toolbar
//изменение значений dropdown
for (let item of document.querySelector('#markets-list').children) {
  item.addEventListener('click', (e) => {
    document.querySelector('#markets-list-btn').innerHTML = item.textContent;
  })
}

for (let item of document.querySelector('#timeframe-list').children) {
  item.addEventListener('click', (e) => {
    document.querySelector('#timeframe-btn').innerHTML = item.textContent;
  })
}

//обработать событие выбора кнопок внутри модального окна (стилизация)