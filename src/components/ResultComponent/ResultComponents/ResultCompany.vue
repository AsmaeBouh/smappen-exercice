<template>
<div ref="input" class="q-pa-md">
    <q-card flat>    
                <q-card-section>
                <div class="text-h6">{{selectedCompnayInfos.denominationusuelleetablissement}}</div>
                <div class="text-subtitle2">{{selectedCompnayInfos.l1_adressage_unitelegale}}</div>
                <q-badge :color="selectedCompnayInfos.etatadministratifunitelegale == 'Active' ? 'secondary' : 'red'" multi-line>
                {{selectedCompnayInfos.etatadministratifunitelegale}}
                </q-badge>
        </q-card-section>       
    <q-list dense>
        <q-item>
            <q-item-section class="text-bold">Date de creéation de l'entreprise</q-item-section>
            <q-item-section>{{selectedCompnayInfos.datedebutetablissement}}</q-item-section>
        </q-item>
        <q-separator></q-separator>
        <q-item>
            <q-item-section class="text-bold">Forme juridique</q-item-section>
            <q-item-section>{{selectedCompnayInfos.naturejuridiqueunitelegale}}</q-item-section>
        </q-item>
        <q-separator></q-separator>
        <q-item>
            <q-item-section class="text-bold">Adresse postale</q-item-section>
            <q-item-section>    	{{selectedCompnayInfos.adresseetablissement+' '+
                selectedCompnayInfos.codepostaletablissement+' '+
                selectedCompnayInfos.libellecommuneetablissement}}
            </q-item-section>
        </q-item>
        <q-separator></q-separator>
        <q-item>
            <q-item-section class="text-bold">Forme juridique</q-item-section>
            <q-item-section>{{selectedCompnayInfos.naturejuridiqueunitelegale}}</q-item-section>
        </q-item>
        <q-item>
        <q-item-section class="bg-purple text-bold text-white">Numéros d'identification </q-item-section>
        </q-item>
        <q-item>
            <q-item-section class="text-bold">Numéro SIREN	</q-item-section>
            <q-item-section>{{selectedCompnayInfos.siren}}</q-item-section>
        </q-item>
        <q-separator></q-separator>
        <q-item>
            <q-item-section class="text-bold">Numéro SIRET (siège)</q-item-section>
            <q-item-section>{{selectedCompnayInfos.siretsiegeunitelegale}}</q-item-section>
        </q-item>
        <q-item>
        <q-item-section class="bg-purple text-bold text-white">Informations commerciales</q-item-section>
        </q-item>
            <q-item>
            <q-item-section class="text-bold">Catégorie</q-item-section>
            <q-item-section>{{selectedCompnayInfos.divisionetablissement}}</q-item-section>
        </q-item>
        <q-separator></q-separator>
        <q-item>
            <q-item-section class="text-bold">Activité</q-item-section>
            <q-item-section>{{selectedCompnayInfos.groupeetablissement}}</q-item-section>
        </q-item>
    </q-list>
    <q-card-actions align="right">
    <q-btn color="purple" >Add to folder</q-btn>
    </q-card-actions>
    </q-card> 
  </div>
</template>
<script >
import { computed, ref } from '@vue/runtime-core'
import { useStore } from 'vuex'
export default {
    setup() {
        const store = useStore()
        store.dispatch('getCompaniesList')
        const selectedCompnayInfos = computed(()=>store.getters['getCompanyResult'])
        return{
            selectedCompnayInfos,
            tab: ref('one')
        }
    },
}
</script>
