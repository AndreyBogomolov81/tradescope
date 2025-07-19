
//первый вариант загрузки данных пачками
//не рабочий
let isLoaded = false;
async function gatKlines() {
  try {
    if (isLoaded) return;
    isLoaded = true;
    //проверяем на соответствие уже загруженным данным
    // извлекаем уже загруженные  данные
    const {
      exchange: loaded_exch,
      symbol: loaded_symb,
      interval: loaded_interval,
      category: loaded_category,
      data: loaded_all_data,
    } = loaded;

    let exchange = document.querySelector('#markets-list-btn').textContent.trim();
    let symbol = document.querySelector('#btn-instruents').textContent.trim();
    let interval = document.querySelector('#timeframe-btn').textContent.trim();
    let category = 'spot';

    let url = BASE_CHARTS_URL + `historical-data/?exchange=${exchange}
    &symbol=${symbol}&interval=${interval}&category=${category}`;  

    const response = await fetch(url);
    if (!response.ok) throw new Error('ошибка сети');

    const query = await response.json();
    if (query['result']) {
      //загружаем стартовую дату
      loaded.start_date = query['start_date'];
      //если параметры запроса равны прежним то обновляем данные с учетом хронологии
      if (
        loaded_exch == exchange && 
        loaded_symb == symbol && 
        loaded_interval == interval && 
        loaded_category == category      
      ) {
        loaded.data = [...loaded_all_data, ...query['data']];
      }
      else {
        loaded.data = query['data'];
      }
        //если с момента последнего объявления выбрана другая биржа или инструмент, то обновляем данные    
      if (exchange != loaded_exch)
        loaded.exchange = exchange;

      if (symbol != loaded_symb)
        loaded.symbol = symbol;

      if (interval != loaded_interval)
        loaded.interval = interval;

      mainSeries.setData(query['data']);
      createLegend(query['data']);
      loaded.flag = true;
    }
    else
      console.log('данные отсутствуют');

  } catch (error) {
    console.log('Ошибка:', error);
  } finally {
    isLoaded = false;
  }
}

chart.timeScale().subscribeVisibleLogicalRangeChange(async range => {
  // console.dir(range);
  //обновление диапазона
  const step = new Map([
    ['1h', 890000]
  ]);

  let {start_date} = loaded;  
  const date_to = chart.timeScale().getVisibleRange().to;

  if ((date_to - start_date) < step.get('1h')) {
    await gatKlines();
    console.log(start_date); 
   }

})