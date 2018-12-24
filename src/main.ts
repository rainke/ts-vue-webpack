import './main.less';
import main from './main.vue';
import Vue from 'vue';
console.log(main);

new Vue({
    render: h => h(main)
}).$mount('#root')