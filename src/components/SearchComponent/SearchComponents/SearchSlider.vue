<template>
  <div class="q-pa-md">
    <div class="text-subtitle2">Distance<q-chip outline color="purple" square > {{ radius }} KM</q-chip></div>
    <q-slider 
    v-model="radius" 
    :min="0" 
    :max="100" 
    color="purple"/>
    
  </div>
</template>
<script>
import { ref, watch } from 'vue'

export default {
  setup (props,{emit}) {  
    var radius = ref(2)
    watch(radius ,()=> {
      emit('selected-radius',radius.value)
      }
    )

    return {
     radius
    }
  }
}
</script>