<template>
    <SearchComponent class="searchComponent"/>
<!--     <result-company class="resultCompany"></result-company>
 -->    <div class="row">
        <div class="col">
            <search-result-map></search-result-map>
        </div>
        <div class="bg-grey-12 col-grow">
            <result-component></result-component>
        </div>
        
    </div>
</template>

<script >
import SearchResultMap from './components/SearchResultMap'
import SearchComponent from './components/SearchComponent/SearchComponent.vue'
import ResultComponent from './components/ResultComponent/ResultComponent'
export default {
  components: { SearchResultMap,SearchComponent,ResultComponent },
  setup(){

  }
}
</script>
<style scoped>
.searchComponent{  
    min-width: 481px;
    z-index: 20;
    position: fixed;
    }
.resultCompany
    {  
    min-width: 481px;
    z-index: 20;
    position: fixed;
    bottom: 0;
    left: 0;
    }
</style>
