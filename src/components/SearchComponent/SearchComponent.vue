
<template>
     <div class="q-pa-md">
    <q-expansion-item
      class="shadow-1 overflow-hidden"
      style="border-radius: 30px"
      icon="explore"
      label="Filtres"
      header-class="bg-purple text-white"
      expand-icon-class="text-white"
    >
      <q-card>
    <q-card-actions>
      <q-space/>
      <q-btn-toggle
      v-model="searchType"
      outline
      rounded
      toggle-color="purple"
      :options="[
        {value: 'distance', slot: 'one'},
        {value: 'geoshape', slot: 'two'},
      ]"
    >
      <template v-slot:one>
        <div class="row items-center no-wrap">
          <div class="text-center">
            Distance
          </div>
          <q-icon right name="straighten"></q-icon>
        </div>
      </template>

      <template v-slot:two>
        <div class="row items-center no-wrap">
          <div class="text-center">
            Commune
          </div>
          <q-icon right name="public"></q-icon>
        </div>
      </template>


      </q-btn-toggle>
      <q-space/>
    </q-card-actions>
    <q-card-section>

    <search-bar @selected-geo-data="getSelectedGeoData"></search-bar>
    <search-slider v-if="searchType === 'distance'" @selected-radius="getSelectedRadius"></search-slider>  
    
    <q-btn
        :loading="searchLoading"
        :disable="searchLoading || selectedGeoData === null ? true:false"
        color="purple"
        @click="startSearching(selectedGeoData,selectedRadius,heatmap)"
        style="width: 100px"
        type="submit"
      >
          Search
    </q-btn> 
    <q-space/>
    <q-toggle
      v-model="heatmap"
      color="purple"
      label="Include population heatmap"
    /> 
    </q-card-section>
    </q-card>
    </q-expansion-item>
  </div>

</template>

<script>
import { computed, ref } from '@vue/runtime-core'
import SearchBar from './SearchComponents/SearchBar.vue'
import SearchSlider from './SearchComponents/SearchSlider.vue'
import { useStore } from 'vuex'
/* import SearchButton from './SearchButton.vue'
 */
export default {
  name:'searchComponent',
  components:{
    'search-bar':SearchBar,
    'search-slider':SearchSlider
  },
  setup(){
    var searchType = ref('distance')
    var heatmap = ref(false)
    const store = useStore()
    var selectedGeoData = ref(null)
    var selectedRadius = ref(null)
    
    const searchLoading = computed(()=>store.getters['getSearchLoading'])
    function getSelectedGeoData(value){
      selectedGeoData.value = value
    }
    function getSelectedRadius(value){
      selectedRadius.value = value
    }
    function startSearching(selectedGeoData,selectedRadius,heatmap){
      //limit all searches to rows=50 for now (back-end not fast enough??)
      store.dispatch('setCircleGeoData',{ radius:selectedRadius,circleCenter:selectedGeoData , heatmap: heatmap})        
      

      // adding search by commune ? irrelevant ?
     /*  if(searchType.value === 'geoshape'){
      store.dispatch('setGeoShape',selectedGeoData)          
      }  */
    }

    return{
      heatmap,
      searchType,
      selectedGeoData,
      selectedRadius,
      startSearching,
      searchLoading,
      getSelectedRadius,
      getSelectedGeoData,
    }
  }

 
}
</script>
