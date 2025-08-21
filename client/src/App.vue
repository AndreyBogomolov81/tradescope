<template>
  <div id="app">
    <div class="row mainChart">
      <LightWeightChart/>
    </div>
  </div>
</template>

<script>
import LightWeightChart from './components/LightWeightChart.vue';

export default {
  name: 'app',
  components: {
    LightWeightChart
  }
}
</script>

<style>

</style>
