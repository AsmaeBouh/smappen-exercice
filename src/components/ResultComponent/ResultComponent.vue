<template>
<div class="row">
  <div v-if="verticalTabs" class="bg-grey-12 col">
     <q-tabs  vertical  class="bg-grey-12 text-purple">
        <q-tab @click="hideVerticalTabs('entreprises')"  label="Entreprises" icon="domain" name="entreprises" />
        <q-tab @click="hideVerticalTabs('communes')"  label="Communes" icon="house" name="communes" />
        <q-tab @click="hideVerticalTabs('graphs')"  label="Graphs" icon="pie_chart" name="graphs" />
        <q-tab @click="hideVerticalTabs('dossier')"  label="Votre dossier" icon="note_add" name="dossier" />

      </q-tabs>
  </div>
  <div v-if="horizontalTabs" class="col">
    <q-toolbar class="bg-grey-12 text-primary">
      <q-btn color="purple" @click="hideHorizontalTabs()" flat round dense icon="menu" />
      <q-space/>

    </q-toolbar>

    <q-card flat class="my-card">

      <q-tabs v-model="tab" class="bg-grey-12 text-purple">
        <q-tab label="Entreprises" icon="domain" name="entreprises" />
        <q-tab label="Communes" icon="house" name="communes" />
        <q-tab label="Graphs" icon="pie_chart" name="graphs" />
        <q-tab label="Votre dossier" icon="note_add" name="dossier" />

        
      </q-tabs>
 <!-- Add checks if empty or undefined for every tab data-->
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="entreprises">
          <result-companies-list></result-companies-list>
        </q-tab-panel>

        <q-tab-panel name="communes">
          <result-area></result-area>
        </q-tab-panel>

        <q-tab-panel name="graphs">
          <result-graphs></result-graphs>
        </q-tab-panel>

        <q-tab-panel name="dossier">
          Votre dossier
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</div>
    
</template>
<script >
import ResultGraphs from './ResultComponents/ResultGraphs.vue'
import { computed, ref } from '@vue/runtime-core'
import { useStore } from 'vuex'
import ResultArea from './ResultComponents/ResultArea.vue'
import ResultCompaniesList from './ResultComponents/ResultCompaniesList.vue'
export default {
  components: { ResultGraphs, ResultArea ,ResultCompaniesList  },
    setup() {
      var tab = ref('entreprises')
      var verticalTabs = ref(true)
      var horizontalTabs = ref(false)
        const store = useStore()
        const showResults = computed(()=>store.getters['getShowResult'])
        function hideVerticalTabs(tabSelect){
          verticalTabs.value = false
          horizontalTabs.value = true
          tab.value = tabSelect
        }
        function hideHorizontalTabs(){
          verticalTabs.value = true
          horizontalTabs.value = false
        }
        return{
            showResults,
            hideVerticalTabs,
            hideHorizontalTabs,
            verticalTabs,
            horizontalTabs,
            tab
        }
    },
}
</script>

<style scoped>
.my-card{  
    min-width: 50vw;
    }
/* .resultCompany{  max-width: 500px;
    z-index: 20;
    position: fixed;
    top: 0;
    right: 0;
    } */
</style>