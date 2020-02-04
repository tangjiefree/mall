// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Router from 'vue-router'
import MintUI from 'mint-ui'
import setAxios from './setAxios';
import 'mint-ui/lib/style.css'
// import Swiper from 'swiper'
import store from './store';
import 'swiper/css/swiper.min.css';
Vue.use(MintUI);
import axios from 'axios';
setAxios();
Vue.config.productionTip = false
Vue.prototype.$http = axios;

const routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}


router.beforeEach((to,from,next) => {
  store.commit('setToken', localStorage.getItem('token'))
  if(to.meta.requireAuth) {
    if(store.state.token) {
      next();
    }
    else {
      next(
        {
          path: '/login',
          query: {redirect: to.fullPath}
        }
      )
    }
  }
  else {
    next();
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
