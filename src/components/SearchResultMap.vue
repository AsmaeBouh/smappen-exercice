
<template>
    <q-card v-show="false" ref="input"  flat>    
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
    <div 
    id="mapid"
    style="height:1000px;width:100%;z-index:10"
    ></div>
</template>
<script >
import leaflet from "leaflet";
import { computed, onMounted, ref, watch } from "vue";
import {useStore} from 'vuex'
import 'leaflet.heat/dist/leaflet-heat'
export default {
  setup() {
    let mymap;   
    const input = ref(null)
    const store = useStore()
    store.dispatch('getCompaniesList')
    const circleGeoData = computed(()=>store.getters['getCircleGeoData'])
    const companiesInCircle = computed(()=>store.getters['getCompaniesInCircle'])
    const selectedCompnayInfos = computed(()=>store.getters['getCompanyResult'])
    const heatMapData = computed(()=>store.getters['getHeatMapData'])
    const heatMapInclude = computed(()=>store.getters['getHeatMapInclude'])


    onMounted(() => {
      mymap = leaflet.map("mapid").setView([0, 0], 2);
      leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',            maxZoom: 18,
            minZoom:2,
          }
        )
        .addTo(mymap);
        mymap.removeControl(mymap.zoomControl)
        //add contain function checks in marker in circle (not used for now usinf geofilter instead)
        leaflet.Circle.include({
          contains: function (latLng) {
            return this.getLatLng().distanceTo(latLng) < this.getRadius();
          }
        });
    });
    

    watch(circleGeoData.value ,(newValue)=> {
          updateMap(newValue)
    }
    )
    
     
   function updateMap(){
     
     //Clear all layers from map at every search
     /*  mymap.removeLayer(circle)
      mymap.removeLayer(markers) */
     // ou pouvoir les cumuler mais empêcher les overlap ?
     var circle =  leaflet.circle(circleGeoData.value.circleCenter, {
        color: 'purple',
        fillColor: 'pink',
        fillOpacity: 0.5,
        radius: circleGeoData.value.radius*1000
      }).addTo(mymap);
      mymap.fitBounds(circle.getBounds())
      
     var markers =leaflet.geoJSON(companiesInCircle.value, {
        onEachFeature: onEachFeature
      }).bindPopup(()=>input.value.$el.innerHTML)
      markers.addTo(mymap);

      if(heatMapInclude.value === true){        
        //add button to toggle between heatmap and markers+circle ?
        //switch to Pinia to get access to all store ?
        console.log(heatMapData.value)
        var heat = leaflet.heatLayer(heatMapData.value,
        { minOpacity:0.5,
          blur :10,
          gradient : {0: 'blue', 0.65: 'lime', 1: 'red'}
        }
        )
        heat.addTo(mymap);
      }
   }      
   function onEachFeature(feature, layer) {
        layer.on('click', function() {
          store.dispatch('setCompanyResult',feature.properties)
      })
    } 
    return{
      selectedCompnayInfos,
      input
    }
  }

}
</script>
