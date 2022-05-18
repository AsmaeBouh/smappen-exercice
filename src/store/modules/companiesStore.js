import axios from "axios"
import { inject } from "vue"

export default{
    state:{
        companiesList:[],
        showResult:false,
        companyResult:{}
    },
    mutations:{
        setCompanies(state,companies){
            state.companiesList = companies
        },
        setResult(state,result){
            state.companyResult = result
        },
    
    },
    actions:{
        setCompanyResult({commit,state},result){
            commit('setResult',result)
            state.showResult = true

        },
        async getCompaniesList({commit}){
            axios.get(inject('companiesURL'), {
                headers: {
                  'Authorization': 'Apikey 6bdc3b09b5196669c0001b59af2005ec54b1ee456b98a5c9d38d4483'
                }
              })
            .then(res=>{

                const listOfCompaniesRecords = res.data.records.map(x=>x.record.fields)
                commit('setCompanies',listOfCompaniesRecords)

            })
        }
    },
    getters:{
        getCompaniesList(state){
            return state.companiesList
        },
        getCompaniesGeoList(state){
            return state.companiesList.map(x=>x.geolocetablissement)
        },
        getCompanyResult(state){
            return state.companyResult
        },
        getShowResult(state){
            return state.showResult
        },

    }
}