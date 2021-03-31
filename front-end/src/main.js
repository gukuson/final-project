import Vue from 'vue'
import App from './App.vue'
import router from './router'
import mock from './mock-data.js'

Vue.config.productionTip = false

let data = {
    weddingData: mock,
    filteredData: [],
}

new Vue({
    router,
    data,
    render: h => h(App),
    created: function() {
        if (this.filteredData.length === 0) {
            this.filteredData = this.weddingData;
        }
    }
}).$mount('#app')