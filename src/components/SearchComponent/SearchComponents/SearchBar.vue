<template>
  <div class="q-pa-sm" >
    <div class="q-gutter-sm">
      <!-- Best to use a back-end autocomplete ? -->
      <q-select 
      id="selectBar"
      @change="$emit('')"
      outlined 
      v-model="geoData" 
      :options="geoDataList" 
      label="Adresse" />
    </div>
  </div>
</template>

<script>
import {computed, ref, watch} from 'vue'
import {useStore} from 'vuex'

export default {
  setup(props,{emit}){
     const store = useStore()
    store.dispatch('getAllGeoData')
    const geoDataList = computed(()=>store.getters['getGeoDataList'])
     const geoData = ref({
        label: '',
        geo_shape: '',
        nom_comm: '',
        nom_dept: '',
        postal_code: '',
        value:''
      })

    watch(geoData ,()=> {
      emit('selected-geo-data',geoData.value)
      }
    )

    return{
      geoDataList,
      geoData
    }
  }
}
</script>
