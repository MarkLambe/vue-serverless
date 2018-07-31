import Vue from 'vue'
import App from './App.vue'
import User from './components/User.vue'
import LandingPage from './components/LandingPage.vue'
import ResetPassword from './components/ResetPassword.vue'
import ChangePassword from './components/ChangePassword.vue'
import ResendConfMail from './components/ResendConfMail.vue'
import SetNewPassword from './components/SetNewPassword.vue'
import EnterVerificationCode from './components/EnterVerificationCode.vue'
import "vue-material-design-icons/styles.css"
import VueRouter from 'vue-router'
import VueResource from'vue-resource';
import Popover from 'vue-js-popover';

Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Popover);

import store from './store';

const routes = [
  { path: '/', redirect: '/login'},
  { path: '/login/', component: LandingPage },
  { path: '/login/:verified', component: LandingPage },
  { path: '/user/:id', component: User },
  { path: '/resetPassword', component: ResetPassword },
  { path: '/changePassword', component: ChangePassword },
  { path: '/resendConfMail', component: ResendConfMail },
  { path: '/setNewPassword/:email', component: SetNewPassword },
  { path: '/verifyEmail/:email', component: EnterVerificationCode }
]

const router = new VueRouter({
  routes
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.http.options.root = 'https://no3xf5rurb.execute-api.eu-west-1.amazonaws.com/cv_prod';
