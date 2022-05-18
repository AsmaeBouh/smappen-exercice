<template>
<div style="height: 100vh" class="row justify-center">
    <q-list dense  padding class="rounded-borders">
        <q-item>
        <q-item-section>
          <q-item-label class="text-bold">Code INSEE</q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label  class="text-bold">Code Postal</q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label  class="text-bold">Commune</q-item-label>
        </q-item-section>
        </q-item>
        <q-item v-for="(zone,index) in zoneInfos" :key="index">
        <q-item-section>
            <q-item-label>{{zone.insee_com}}</q-item-label>        
        </q-item-section>

        <q-item-section>
            <q-item-label>{{zone.postal_code}}</q-item-label>        
        </q-item-section>

        <q-item-section>
            <q-item-label>{{zone.nom_comm}}</q-item-label>        
        </q-item-section>
        </q-item>
    </q-list>
  </div>
    
</template>
<script >
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex'
export default {
    setup() {
        const store = useStore()
        const zoneInfos = computed(()=>store.getters['getZoneInfosArray'])
        return{
            zoneInfos
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