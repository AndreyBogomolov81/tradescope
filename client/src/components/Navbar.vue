<template>
    <div class="toolbar">
        <!-- markets -->
        <DropDown :items="list_of_exchanges" :selectionItem="selected_exhcange" @selected="handleSelectExch"/>

        <!--кнопка для вызова модального окна -->
        <button id="btn-instruents" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#searchModal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="16" width="3" height="5" rx="1" fill="#27ae60"/>
          <rect x="9" y="11" width="3" height="10" rx="1" fill="#e74c3c"/>
          <rect x="15" y="6" width="3" height="15" rx="1" fill="#27ae60"/>
          <path d="M4 16L10.5 11L16.5 6" stroke="#2980b9" stroke-width="1" fill="none"/>
          <circle cx="16.5" cy="6" r="1.5" fill="#2980b9"/>
        </svg>
        </button>

        <DropDown class="interval" :items="periods" :selectionItem="_sel_period" @selected="handleSelectPeriod"/> 

        <button v-if="!isTesting" class="btn btn-dark" @click="handleRunTest">Тестирование</button>  
        <button v-else class="btn btn-dark" @click="handleResetTest">Сброс теста</button>

        <button v-if="btn_play" :disabled="!isTesting" class="play-btn" aria-label="Play" @click="handlePlay">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M8 5v14l11-7-11-7z"/>
          </svg>
          <!-- <span class="label">Play</span> -->
        </button>  

        <button v-else class="pause-btn" aria-label="Pause" @click="handlePause">
          <!-- Иконка ⏸ -->
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M6 5h4v14H6zM14 5h4v14h-4z"/>
          </svg>
          <!-- <span class="label">Pause</span> -->
        </button>

    </div>



</template>

<script>
import '@/assets/js/bootstrap.bundle.min.js'
import DropDown from './DropDown.vue'
import InstrumentsModal from './InstrumentsModal.vue'
export default {
  props: {
    periods: Array,
    selected_period: String,
  },
  data() {
    return {
      btn_play: true,
      isTesting: false,
      list_of_exchanges: ['MOEX', 'Crypto Market'],
      selected_exhcange: 'Crypto Market',
      _sel_period: this.selected_period
    }
  },
  methods: {
    handleSelectExch(data) {
      this.selected_exhcange = data
    },

    handleSelectPeriod(data) {
      this.$emit('select_period', data)
      this._sel_period = data
    },

    handlePlay() {
      this.btn_play = false 
    },

    handlePause() {
      this.btn_play = true
    },

    handleRunTest() {
      //функция запускает тестирование
      this.isTesting = true
      this.$emit('run_test')      
    },

    handleResetTest() {
      this.isTesting = false
    }
  },
  components: {
    DropDown,
    InstrumentsModal
  }, 
    
}
</script>

<style scoped>

.toolbar {
  position: relative;
  left: 5px;
  top: 10px;
  z-index: 10;
  display: flex;
  align-items: center;
  padding: 0 10px;
}

#btn-instruents {
  margin-right: 4px;
  padding: 5px 8px;
  border: none;
  background: #23272F;
  color: #eceff1;
  border-radius: 4px;
  cursor: pointer;
}

.interval {
  margin-right: 40px;
}

button {
  margin-right: 4px;
  padding: 5px 8px;
  border: none;
  background: #23272F;
  color: #eceff1;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #2980b9;
}

.play-btn {
    display:inline-flex; align-items:center; gap: 5px;
    padding: 5px 8px; border-radius:8px; border:1px solid #17c3a3;
    background:#17c3a3; color:#fff; cursor:pointer;
    transition:transform .1s, background .2s, box-shadow .2s;
  }

.pause-btn {
  display:inline-flex; align-items:center; gap: 5px;
  padding: 5px 8px; border-radius:8px; border:1px solid #f23645;
  background:#f23645; color:#fff; cursor:pointer;
  transition:transform .1s, background .2s, box-shadow .2s;
}

.play-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.play-btn:hover { 
  background:#10b394; 
}

.pause-btn:hover { 
  background:#f23645; 
}

.play-btn:active, 
.pause-btn{ 
  transform:scale(.96); 
}

.play-btn:focus, 
.pause-btn { 
  outline:none; box-shadow:0 0 0 3px rgba(16,179,148,.25); 
}

.play-btn svg, 
.btn-pause svg { 
  display:block; 
}
</style>