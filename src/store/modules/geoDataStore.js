import axios from "axios"
import { inject } from "vue"

export default{
    state:{
        heatMapInclude:false,
        searchType:'',
        totalPopulation:0,
        heatMapData:[],
        searchLoading:false,
        zoneInfosArray:[],
        geoDataList:[],
        geoShape:[],
        companiesListInCircle:[],
        circleGeoData : {   
            radius:0,
            circleCenter:[]
            },
        companiesInCircle:[],
        populationGraph:{
            chart: {
                type: 'column',
            },
            xAxis: {
                categories: [],
                crosshair: true
            },
            title: {
                text: 'Population'
            },
        
            yAxis: [{
                className: 'highcharts-color-0',
                title: {
                    text: 'Population'
                }
            }],
            credits:{enabled:false},
            exporting: {enabled: false},
            legend: {enabled: false},
          
            series: [{
                name:'Population',
                data: []
            }]
        },
        genderGraph:{
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: "Répartition Homme/Femme de la civilité de la personne physique"
            },
            tooltip: {
                pointFormat: ' <b>{point.percentage:.1f}%</b>'
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            credits:{enabled:false},
            exporting: {enabled: false},
            plotOptions: {
                pie: {
                    size:200,
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: '',
                colorByPoint: true,
                data: [{
                    name: 'Homme',
                    y: 0,
                    color:'navy'
        
                }, {
                    name: 'Femme',
                    y: 0,
                    color:'pink'
                }, ]
            }]
        }
        
    },
    mutations:{
        setGeoDataList(state,geodata){
            state.geoDataList = geodata
        },
        getCompaniesInCircle(state,companiesInCircle){
            for (let index = 0; index < companiesInCircle.length; index++) {
                state.companiesInCircle.push(    {
                    type: "Feature",
                    properties: companiesInCircle[index].fields,
                    geometry:companiesInCircle[index].geometry
                })
            }
            state.companiesListInCircle = companiesInCircle
        },
        setCircleInfos(state,circleInfos){
            state.searchLoading = false
            state.circleGeoData.circleCenter = [circleInfos.circleCenter.value.lat,circleInfos.circleCenter.value.lon]
            state.circleGeoData.radius = circleInfos.radius
        },
        setGraphData(state,graphData){
            state.searchLoading = false
            let population = graphData.map(x=>x.fields.population)
            //population graph
            state.populationGraph.xAxis.categories = graphData.map(x=>x.fields.nom_comm)
            state.populationGraph.series[0].data = population

            //somme de la population dasn la zonne
            const initialValue = 0;
            state.totalPopulation = population.reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            initialValue
            );

            //zone infos
            state.zoneInfosArray = graphData.map(x=>({
                insee_com : x.fields.insee_com,
                postal_code : x.fields.postal_code,
                nom_comm : x.fields.nom_comm 
            }))
        },
        setHeatMapData(state,graphData){
            //même fonction qua dans setgraphdata à regrouper
            let population = graphData.map(x=>x.fields.population)
             const initialValue = 0;
            let totalPopulation = population.reduce(
             (previousValue, currentValue) => previousValue + currentValue,
             initialValue
             );

            state.heatMapData = graphData.map(x=>([
                 x.geometry.coordinates[1],
                x.geometry.coordinates[0],
               ( x.fields.population/totalPopulation)*10]))
        },
        setCompaniesGraphs(state,graphData){
            if(graphData.length>0){
          let men = graphData.map(x=>x.sexeunitelegale === 'Masculin').length 
          let women = graphData.map(x=>x.sexeunitelegale === 'Féminin').length
          state.genderGraph.series[0].data[0].y =  men > 0 ? men/graphData.length : 0
          state.genderGraph.series[0].data[1].y =  women > 0 ?  women/graphData.length : 0
            }
        },
        setGeoShape(state,geoShape){
            state.searchLoading = false
            state.geoShape.push(geoShape)
        }
    
    },
    actions:{
        async getAllGeoData({commit}){
            axios.get(inject('geoDataUrl'), {
                headers: {
                  'Authorization': 'Apikey 6bdc3b09b5196669c0001b59af2005ec54b1ee456b98a5c9d38d4483'
                }
              })
            .then(res=>{
                const listgeoData = res.data.records.map( x=> ({
                     value:  x.record.fields.geo_point_2d,
                    geo_shape : x.record.fields.geo_shape,
                    nom_comm: x.record.fields.nom_comm,
                    nom_dept : x.record.fields.nom_dept,
                    postal_code :x.record.fields.postal_code,
                    label:x.record.fields.nom_comm+', '+x.record.fields.nom_dept+', '+x.record.fields.postal_code
                }  ))

                commit('setGeoDataList',listgeoData)
            })
        },
        async setGeoShape({commit,state},geoShapeInfo){

            state.searchLoading = true
            state.searchType = 'geoshape'
            let polygon =[]
            
            geoShapeInfo.geo_shape.geometry.coordinates[0].forEach(element => {
                polygon.push('(' + element.toString() + ')')
            });
            axios.get('https://data.opendatasoft.com/api/records/1.0/search/?dataset=sirene_v3%40public&q=&rows=50&sort=datederniertraitementetablissement&facet=statutdiffusionetablissement&facet=trancheeffectifsetablissement&facet=etablissementsiege&facet=libellecommuneetablissement&facet=etatadministratifetablissement&facet=nomenclatureactiviteprincipaleetablissement&facet=caractereemployeuretablissement&facet=departementetablissement&facet=regionetablissement&facet=sectionetablissement&facet=classeetablissement&facet=unitepurgeeunitelegale&facet=sexeunitelegale&facet=trancheeffectifsunitelegale&facet=categorieentreprise&facet=sectionunitelegale&facet=classeunitelegale&facet=naturejuridiqueunitelegale&&geofilter.polygon='+ polygon.toString(),
            {
                headers: {
                  'Authorization': 'Apikey 6bdc3b09b5196669c0001b59af2005ec54b1ee456b98a5c9d38d4483'
                }
            })
            .then(res=>{
                
                commit('getCompaniesInCircle',res.data.records)
                commit('setCompaniesGraphs',res.data.records)
            })
            .then(()=>commit('setGeoShape',geoShapeInfo.geo_shape))

        },
        async setCircleGeoData({commit,state},circleInfos){
            state.searchLoading = true
            state.searchType = 'distance'
            let radiusInMeter = circleInfos.radius*1000
            // Getting compinies within circle
            axios.get('https://data.opendatasoft.com/api/records/1.0/search/?dataset=sirene_v3%40public&q=&rows=50&sort=datederniertraitementetablissement&facet=statutdiffusionetablissement&facet=trancheeffectifsetablissement&facet=etablissementsiege&facet=libellecommuneetablissement&facet=etatadministratifetablissement&facet=nomenclatureactiviteprincipaleetablissement&facet=caractereemployeuretablissement&facet=departementetablissement&facet=regionetablissement&facet=sectionetablissement&facet=classeetablissement&facet=unitepurgeeunitelegale&facet=sexeunitelegale&facet=trancheeffectifsunitelegale&facet=categorieentreprise&facet=sectionunitelegale&facet=classeunitelegale&facet=naturejuridiqueunitelegale&geofilter.distance='+ circleInfos.circleCenter.value.lat+','+circleInfos.circleCenter.value.lon+','+radiusInMeter,
                {
                headers: {
                  'Authorization': 'Apikey 6bdc3b09b5196669c0001b59af2005ec54b1ee456b98a5c9d38d4483'
                }
              }
              )
            .then(res=>{
                commit('getCompaniesInCircle',res.data.records)
                commit('setCompaniesGraphs',res.data.records)
            })
            .then(()=>commit('setCircleInfos',circleInfos))
            .catch(err=>{
                //handle errors later add alert msg 
                console.log(err)
            })
            // getting communes within circle

            axios.get('https://data.opendatasoft.com/api/records/1.0/search/?dataset=correspondance-code-insee-code-postal%40public&q=&rows=50&facet=insee_com&facet=nom_dept&facet=nom_region&facet=statut&geofilter.distance='+circleInfos.circleCenter.value.lat+','+circleInfos.circleCenter.value.lon+','+radiusInMeter,
            {
                headers: {
                  'Authorization': 'Apikey 6bdc3b09b5196669c0001b59af2005ec54b1ee456b98a5c9d38d4483'
                }
            })
            .then(res=>{
                commit('setGraphData',res.data.records)
                if (circleInfos.heatmap === true) {
                    state.heatMapInclude = true
                    commit('setHeatMapData',res.data.records)
                }
                if (circleInfos.heatmap === false) {
                    state.heatMapInclude = false
                }
                
            })
            .catch(err=>{
                //handle errors , reinitilise population graph to skeleton and later add alert msg 
                console.log(err)
            })
        },

    },
    getters:{
        getGeoDataList(state){
            return state.geoDataList
        },
        getCircleGeoData(state){
            return state.circleGeoData
        },
        getCompaniesInCircle(state){
            return state.companiesInCircle
        },
        getSearchLoading(state){
            return state.searchLoading
        },
        getGraphXaxisCategories(state){
            return state.graphXaxisCategories
        },
        getPopulationGraph(state){
            return state.populationGraph
        },
        getGenderGraph(state){
             return state.genderGraph
        },
        getSearchType(state){
            return state.searchType
       },
       getGeoShapeData(state){
        return state.geoShape
       },
       getZoneInfosArray(state){
        return state.zoneInfosArray
       },
       getCompaniesListInCircle(state){
        return state.companiesListInCircle
       },
       getTotalPopulation(state){
       return state.totalPopulation
       },
       getHeatMapData(state){
       return state.heatMapData
       },
       getHeatMapInclude(state){
        return   state.heatMapInclude
       }

    }
}