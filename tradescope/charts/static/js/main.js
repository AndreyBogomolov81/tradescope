const BASE_CHARTS_URL = 'http://0.0.0.0:8000/charts/api/v1/';
const exchange_default = 'Bybit';
const current_instruments_list = [];

const categories = {
  'Фьючерсы': 'futures',
  'Опционы': 'option',
  'Акции': 'share',
  'Облигации': 'bond',
  'Спот': 'spot'
};

//загрузка инструментов для выделенной категориий
const modal_categories = new MutationObserver((mutationsList, modal_categories) => {
  // загрузка инструментов при выборе биржи

  // for (let mutation of mutationsList) {
  //   if (mutation.type === 'childList')
  //     break;
  // }
  get_instruments();
});

const targetNodeModalCategories = document.querySelector('#modal-btn-categories');
modal_categories.observe(targetNodeModalCategories, {
  childList: true,
});

//создание события при изменении списка инструментов внутри модального окна
const instruments_list = new MutationObserver((mutationsList, instruments_list) => {
  //получчаем дочерние элементы у отслеживаемого объекта
  let elements = mutationsList[0].target.children;

  //когда список изменяется создается для каждого элемента событие на клик
  for (let li of elements) {
    //для li добавляем событие закрытия модального окна
    li.setAttribute('data-bs-dismiss', 'modal');
    li.addEventListener('click', () => {

      let t = li.children[0].innerText;
      document.querySelector('#btn-instruents').innerHTML = t;

      // console.dir(temp.includes(('b')));
    })
  }

  //при создании нового списка создаем событие фильтрации элементов по мере ввода в строку название инструмента
  //сортировка при вводе инструмента
  const searchInput = document.querySelector('#modal-inputfield-search');
  let previousValue = '';
  searchInput.addEventListener('input', () => {
    //получили значение ввода
    let v = searchInput.value.toLowerCase();

    // перебираем все элементы списка и проверяем есть ли строка
    // в тектсе элемента, если нет то присваиваем display = none
    if (v.length != previousValue.length) {
      for (let li of elements) {
        let t = li.children[0].textContent.toLowerCase();
        if (!t.includes(v))
          li.style.display = 'none';
        else
          li.style.display = '';          
      }
    }
    
    previousValue = v;


    //событие очистки поля ввода
    if (v === '') {
      for (let li of elements)
        li.style.display = '';
    }

  })
});

const targetNodeinstrList = document.querySelector('#modal-instrument-list');
instruments_list.observe(targetNodeinstrList, {
  childList: true,
});

//загрузка документа
document.addEventListener('DOMContentLoaded', function (event) {

  //загрузка фильтров для модального окна 
  let url_exch = BASE_CHARTS_URL + `categories/${exchange_default}/`;
  fetch(url_exch)
    .then(response => response.json())
    .then(data => set_filters_category_modal(data));

});

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

//загрузка данных об инструментах при событии закрытия списка dropdown с биржами
document.querySelector('#dropdown_market_list')
  .addEventListener('hidden.bs.dropdown', () => {
    //1 получаем значение кнопки 
    let exchange = document.querySelector('#markets-list-btn').innerHTML;

    //2 получим значение категорий для выбранного элемента
    let url_exch = BASE_CHARTS_URL + `categories/${exchange}/`

    fetch(url_exch)
      .then(response => response.json())
      .then(data => set_filters_category_modal(data));

    //3 делаем запрос на сервер получаем список json объектов
    //4 создаем список инструментов добавлем в спико модального окна
  });


//Фукнция инициализации фильтров выбора инструмента в модальном окне
function set_filters_category_modal(data) {
  let category_filters = document.querySelector('#modal-btn-categories');
  //удаляем старый список
  category_filters.innerHTML = '';

  //перебираем все элементы и создаем новый список кнопок для фильтра
  for (let value of data.categories) {
    let btn = document.createElement('button');
    btn.classList.add('btn', 'btn-sm', 'rounded-pill');
    btn.innerHTML = value.description;

    if (value.title == 'spot' || value.title == 'share') {
      btn.classList.add('btn-selected');
      category_filters.insertBefore(btn, category_filters.firstChild);
    } else {
      btn.classList.add('btn-secondary');
      category_filters.appendChild(btn);
    }
  }

  //добавляем события на нажатие кнопок фильтра
  for (let b of category_filters.children) {
    b.addEventListener('click', () => {
      if (b.classList.contains('btn-secondary')) {
        //переназначение классов btn-selected, btn-secondary
        let s = document.querySelector('.btn-selected');
        for (let c of ['btn-selected', 'btn-secondary']) {
          s.classList.toggle(c);
          b.classList.toggle(c);
        }
        //получаем н=инструменты
        get_instruments();
      }
    });
  }
  
}

//функция для получения инструментов
function get_instruments() {
  //получаем список инструментов
  let selected_cat = document.querySelector('.btn-selected').innerHTML; //Спот
  let exchange = document.querySelector('#markets-list-btn').innerText.trim();

  let url_instr = BASE_CHARTS_URL + `instrument-symbol-list/${exchange}/${categories[selected_cat]}`

  fetch(url_instr)
    .then(response => response.json())
    .then(data => {
      set_instr_modals(data);
    });
}

//функция для заполнения списка инструментов в модальном окне
function set_instr_modals(data) {
  let ul = document.querySelector('#modal-instrument-list');
  ul.innerHTML = '';

  let count = 0;
  for (let item of data.symbols) {
    if (count == 0) {
      document.querySelector('#modal-inputfield-search').placeholder = item.symbol;
      //из списка выбираем первый инструмент и назначаем его кнопке открытия modal
      document.querySelector('#btn-instruents').innerHTML = item.symbol;
      count++;
    }
    let li = document.createElement('li');
    li.classList.add('instrument-item');

    let a = document.createElement('a');
    a.href = '#';
    a.innerHTML = item.symbol;

    li.appendChild(a);
    ul.appendChild(li);
  }
}