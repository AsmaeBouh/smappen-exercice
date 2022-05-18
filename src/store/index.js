
import { createStore } from "vuex";

import companiesStore from "./modules/companiesStore";
import geoDataStore from "./modules/geoDataStore"

export default createStore({
    modules:{companiesStore,geoDataStore}
})