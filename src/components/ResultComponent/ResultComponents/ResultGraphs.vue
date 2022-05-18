<template>
<div class="q-pa-md row  justify-center q-gutter-md">
    <q-card class=" my-card bg-purple text-white">
      <q-card-section>
        <div class="text-subtitle2">Totale population</div>
        <div class="text-h5">{{totalPopulation}}</div>
      </q-card-section>
    </q-card>
    <q-card class=" my-card bg-purple text-white">
      <q-card-section>
        <div class="text-subtitle2">Totale communes</div>
        <div class="text-h5">{{populationGraph.xAxis.categories.length}}</div>
      </q-card-section>
    </q-card>
      </div>
    <div class="row">
    <div class="col-6">
       <Highcharts ref="highchartsRef" :options="populationGraph" />
   </div>
    <div class="col-6">
        <Highcharts ref="highchartsRef" :options="genderGraph" />
    </div>

    </div>

</template>
<script >
import { computed, onMounted, ref } from '@vue/runtime-core'
import { useStore } from 'vuex'

export default {
    setup() {

        const store = useStore()
        const populationGraph = computed(()=>store.getters['getPopulationGraph'])
        const genderGraph = computed(()=>store.getters['getGenderGraph'])
        const totalPopulation = computed(()=>store.getters['getTotalPopulation'])
        const highchartsRef = ref(null);
        onMounted(() => {
        /* const { chart } = highchartsRef.value;
        console.log(chart) */
        });
        
        return{
           populationGraph,
           highchartsRef,
           genderGraph,
           totalPopulation
        }
    },
}
</script>
<style scoped>
.my-card{
    border-radius: 30px;
}
.highcharts-figure,
.highcharts-data-table table {
    min-width: 320px;
    max-width: 660px;
    margin: 1em auto;
}

.highcharts-data-table table {
    font-family: Verdana, sans-serif;
    border-collapse: collapse;
    border: 1px solid #ebebeb;
    margin: 10px auto;
    text-align: center;
    width: 100%;
    max-width: 500px;
}

.highcharts-data-table caption {
    padding: 1em 0;
    font-size: 1.2em;
    color: #555;
}

.highcharts-data-table th {
    font-weight: 600;
    padding: 0.5em;
}

.highcharts-data-table td,
.highcharts-data-table th,
.highcharts-data-table caption {
    padding: 0.5em;
}

.highcharts-data-table thead tr,
.highcharts-data-table tr:nth-child(even) {
    background: #f8f8f8;
}

.highcharts-data-table tr:hover {
    background: #f1f7ff;
}


</style>
