<template>  
<div style="height: 100vh">   
     <q-card   v-for="(company,index)  in companiesListInCircle" :key="index" class="my-card q-mx-auto q-my-sm" flat bordered>   
<q-item>    
        <q-item-section>    
          <q-item-label class="text-bold">{{company.fields.denominationusuelleetablissement}}</q-item-label>    
          <q-item-label >   
            {{company.fields.l1_adressage_unitelegale}} 
          </q-item-label>   
        </q-item-section>   
    
</q-item>   
<q-separator></q-separator> 
      <q-card-section horizontal>   
        <q-card-section>    
            <q-item-label class="text-bold">Numéro SIREN	</q-item-label> 
            <q-item-label>{{company.fields.siren}}</q-item-label>   
            
            <q-item-label class="text-bold">Numéro SIRET (siège)</q-item-label> 
            <q-item-label>{{company.fields.siretsiegeunitelegale}}</q-item-label>   
        
    
      </q-card-section>    <q-separator vertical />    <q-card-section class="col-4">   
            <q-badge :color="company.fields.etatadministratifunitelegale == 'Active' ? 'secondary' : 'red'" multi-line> 
            {{company.fields.etatadministratifunitelegale}} 
            </q-badge>  
            <q-item-label>{{company.fields.datedebutetablissement}}</q-item-label>  
            <q-item-label class="text-bold">Adresse postale</q-item-label>  
            <q-item-label>    	{{company.fields.adresseetablissement+' '+  
                company.fields.codepostaletablissement+' '+ 
                company.fields.libellecommuneetablissement}}    
            </q-item-label> 
       </q-card-section>    
      </q-card-section> 
    
    </q-card>   
    
  </div>    
</template> 
<script >   
import { computed } from '@vue/runtime-core'    
import { useStore } from 'vuex' 
export default {    
    setup() {   
        const store = useStore()    
        const companiesListInCircle = computed(()=>store.getters['getCompaniesListInCircle'])   
        return{ 
            companiesListInCircle   
        }   
    },  
}   
</script>   
<style scoped>
.my-card{
    border-radius: 30px;
    max-width:500px;
    
}
</style>
