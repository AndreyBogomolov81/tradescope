<template>
      <!-- Модальное окно -->
  <div class="modal fade" id="searchModal" tabindex="-1" aria-hidden="true">
    <!--<div class="modal-dialog modal-lg modal-dialog-centered">-->    
    <div class="modal-dialog modal-lg modal-dialog-centered" >

      <div class="modal-content rounded-4 border-0">
        <div class="modal-header border-0 pb-0">

          <h5 class="modal-title fw-bold">
            Поиск инструментов            
          </h5>

          <button type="button" class="btn-close btn-close-white" 
                data-bs-dismiss="modal" 
                aria-label="Закрыть"></button>
        </div>
        <div class="radio-group">
          <div class="form-check" v-for="exch in _exchanges" :key="exch.value">
            <input
              class="form-check-input"
              type="radio"
              :id="exch.id"
              :value="exch.value"
              v-model="_selectedOpt"
              name="options"
            >
            <label class="form-check-label" :for="exch.id">
              {{ exch.label }}
            </label>
          </div>
        </div>


        <div class="modal-body pt-2">
          <!-- Поисковая строка -->
           <div class="row">
            <div class="input-group mb-3">
              <span class="input-group-text border-0">
                <i class="bi bi-search"></i>
                <svg xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  fill="currentColor" 
                  class="bi bi-search"
                  viewBox="0 0 16 16">
                  <path
                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 
                    1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 
                    1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
              </span>
              <input id="modal-inputfield-search" 
                  type="text" 
                  class="form-control border-0 text-white" 
                  placeholder='BTCUSDT' value=""
                  v-model="_inp_value">
            </div>
          </div>

          <!-- Фильтры -->
          <!--Необходимо запросить при открытии диалогового окна по значению которое находится в категории биржи-->
            <div class="mb-3 d-flex flex-wrap gap-2" id="modal-btn-categories">

                  <div v-for="cat in categories" :key="cat">
                      <button v-if="cat == _current_cat" class="btn btn-selected btn-sm rounded-pill" 
                      @click="handleChangeCategory($event, cat)">
                          {{ cat }}
                      </button> 
                      <button v-else class="btn btn-secondary btn-sm rounded-pill"                    
                      @click="handleChangeCategory($event, cat)">{{ cat }}</button>
                  </div>              
            </div>

            <!-- Список невыбранных инструментов -->
            <div class="search-list overflow-auto">
              <!-- длинный список -->
                <!--Загрузка элементов списка по событию открытия модального окна-->
                <ul id="modal-instrument-list" class="instrument-list rounded shadow-sm p-2">
                    <div v-for="instr in instruentList" :key="instr">

                      <li  v-if="instr.selected && instr.isBase"
                          class="instrument-item-selected" style="background: rgba(219, 50, 50, 0.4);">                          
                          <input type="checkbox" v-model="instr.selected" @change="handleChecked(instr)">
                          <span>{{ instr.title }}</span>
                        </li>

                      <li  v-else-if="instr.selected"
                          class="instrument-item-selected">
                          <input type="checkbox" v-model="instr.selected" @change="handleChecked(instr)">
                          <span>{{ instr.title }}</span>
                        </li>

                      <li  v-else
                          class="instrument-item">
                          <input v-if="_locked" type="checkbox" disabled v-model="instr.selected" @change="handleChecked">
                          <input v-else type="checkbox" v-model="instr.selected" @change="handleChecked(instr)">
                          <span>{{ instr.title }}</span>
                        </li>

                    </div>                    
                </ul>
            </div>

            <!-- Повтори для других инструментов -->
        </div>
        <div class="modal-footer border-0 rounded-bottom-4">
          <div>
            <small class="text-white-50">
              Доступно элементов {{ _num_available_instr - _countSelected }}, 
              Базовый интсрумент: <span v-if="_base_instrument">
                {{ _base_instrument.exchange}} 
                - {{ _base_instrument.category }} - {{ _base_instrument.title }}
              </span>
            </small>
          </div>
          <div>
            <button class="btn btn-primary">Apply</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: [
        'categories',
        'instruments',
    ],
    data() {
      let _base_instrument = this.instruments.filter(i => i.isBase).at(0)
      
      let {
        exchange: _current_exchange, 
        category: _current_cat     
      } = _base_instrument

      let selected_instr = this.instruments.filter(i => i.selected)
      let _countSelected = (this.instruments.filter(i => i.selected)).length

      return {
        _inp_value: '',
        _num_available_instr: 5,
        _locked: false,
        _exchanges: [
          { id: 1, value: 'Bybit', label: 'Bybit' },
          { id: 2, value: 'OKX', label: 'OKX' },
        ],
        _selectedOpt: 'Bybit',
        _countSelected,
        _base_instrument,
        _current_exchange,
        _current_cat,
        selected_instr
      }        
    },
    methods: {
      handleChangeCategory(event, cat) {
          //пробросить событие наверх
          this._current_cat = cat
          this.$emit('category_changed', cat)
      },

      handleChecked(instr) {
        //блокируем при превышении выбранного лимита
        this._countSelected = (this.instruments.filter(i => i.selected)).length
        this._locked = this._countSelected < this._num_available_instr 
          ? false : true

        if (instr.selected) {
          //если в списке нет инструментов
          if (this.selected_instr.length == 0) {
            instr.isBase = true
            this._base_instrument = instr
            this.selected_instr.push(instr)
          } else {
            this.selected_instr.push(instr)
          }

        } else {
          //исключаем его из списка выделенных инструментов

          //если инструмент базовый то преобр его в обыный
          if (instr.isBase) {
            instr.isBase = false
            this._base_instrument = null
          }

          let index = this.selected_instr.findIndex(
            i => (i.title == instr.title 
              && i.exchange == instr.exchange 
              && i.category == instr.category)
          )
          this.selected_instr.splice(index, 1)

          //если в списке есть элементы но нет базового, то берем первый и назначаем его базовым
          if (this.selected_instr.length > 0 && this.selected_instr.filter(i => i.isBase).length == 0) {
            let newBaseinst = this.selected_instr.at(0)
            newBaseinst.isBase = true
            this._base_instrument = newBaseinst
          }
        }
      },     
    },
    computed: {
        instruentList() {
            return this.instruments.filter(
              i => i.title.toLowerCase().includes(
                this._inp_value))
        },        
    },
}
</script>

<style scoped>

/* модальное окно */

.modal-content {
  background: #181c27;
  color: #DDD;
  max-width: 900px; 
  max-height:70%;
}

.modal-title {
  margin-bottom: 10px;
}

.input-group-text, .form-control {
  background: #23272F;
  color: #DDD;
}

.form-control::placeholder {
  color: #949292;
}

/* нанстройка радио button*/
.radio-group {
  display: flex;
  margin: 10px;
  gap: 20px;
}


/* сбрасываем дефолтное поведения при активации поля*/
.form-control:focus {
  background-color: inherit;
}

.btn-secondary {
  background: #23272F;
  color: #DDD;
  border: none;
}

.btn-secondary:hover {
  background: #DDD;
  color: #181c27;
}

.btn-selected {
  background: #0d6efd;
  color: #DDD;
  border: none;
}

.list-group-item {
  border-bottom: 1px solid #333333;
}
.list-group-item:last-child {
  border-bottom: none;
}

.search-list-selected {
  border-bottom: 3px solid #23272F;
}

.search-list {
  margin-top: 10px;
  height: 500px;
}

/*список инструментов*/
.instrument-item,
.instrument-item-selected
 {  
  border-bottom: 1px solid #23272F; /* светло-серая линия */
  transition: 0.2s;
  padding: 10px;
  cursor: pointer;
} 

.instrument-item-selected {
  background: #8782766e;
}

/* подсветка при наведении */
.instrument-item:hover {
  background: #0d6efdb0;
}

.instrument-item input, 
.instrument-item-selected input {
  margin-right: 20px;
}

/* ползунок модального окна*/
.search-list::-webkit-scrollbar {
  width: 10px;                /* ширина скроллбара */
  background: #23272F;       /* фон полосы прокрутки */
  border-radius: 4px;
}

.search-list::-webkit-scrollbar-thumb {
  background: #949494;       /* цвет ползунка */
  border-radius: 4px;
}

/* цвет ползунка при наведении */
.search-list::-webkit-scrollbar-thumb:hover {
  background: #0d6efd;       
}

/*modal footer*/
.modal-footer {
  background: #23272F;
}

</style>