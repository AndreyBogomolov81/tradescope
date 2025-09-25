<template>
  <div class="btn-group">
     <button id="markets-list-btn" :disabled="play" type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown"
    aria-expanded="false">
        {{ selected }}
    </button>
    <ul class="dropdown-menu" id="markets-list">
        <li v-for="item in items" :key="item" @click="handleSelectItem(item)">{{ item }}</li>
    </ul>
</div>
</template>

<script>
export default {
    props: [
        'play', 
        'items',
        'selectionItem',
    ],
    data() {
      return {
        selected: this.selectionItem
      }
    },
    methods: {
        handleSelectItem(item) {
            this.selected = item
            this.$emit('selected', item)
        },
    }

}
</script>

<style scoped>

button, 
button[disabled] {
  margin-right: 4px;
  padding: 5px 8px;
  border: none;
  background: #23272F;
  color: #eceff1;
  border-radius: 4px;
  cursor: pointer;
}

button[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}

button:hover {
  background: #2980b9;
}

li {
  color: #eceff1;
  padding: 4px;
  cursor: pointer;
}

.btn.show {
    background: #2980b9;
}

li:hover {
  background: #2980b9;
}

.dropdown-menu {
  background-color: #181c27; /* Светло-серый */
  max-height: 500px;
  overflow-y: auto;
}

.dropdown-menu::-webkit-scrollbar {
  width: 10px;                /* Ширина скроллбара */
}

.dropdown-menu::-webkit-scrollbar-thumb {
  background: #181c27;       /* Цвет ползунка */
  border-radius: 4px;        /* Скругление */
}

.dropdown-menu::-webkit-scrollbar-track {
  background: #f1f1f1;       /* Цвет фона скроллбара */
}

.dropdown-item {
  color: #fff;
}

</style>