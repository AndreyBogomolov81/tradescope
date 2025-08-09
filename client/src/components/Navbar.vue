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

        <DropDown :items="list_of_periods" :selectionItem="selected_period" @selected="handleSelectPeriod"/>      
    </div>



</template>

<script>
import '@/assets/js/bootstrap.bundle.min.js'
import DropDown from './DropDown.vue'
import InstrumentsModal from './InstrumentsModal.vue'
export default {
  data() {
    return {
      list_of_exchanges: ['MOEX', 'Crypto Market'],
      selected_exhcange: 'Crypto Market',
      list_of_periods: ['1m', '5m', '15m', '1h', '4h', '1D', '1W', '1M'],
      selected_period: '5m'
    }
  },
  methods: {
    handleSelectExch(data) {
      this.selected_exhcange = data
    },
    handleSelectPeriod(data) {
      this.selected_period = data
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
</style>