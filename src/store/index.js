import { createStore } from 'vuex'
import getters from './getters.js'
import actions from './action.js'
import mutations from './mutations.js'
export default createStore({
  state: {
    token:'',
    userName:'',
    loginState:false
  },
  getters,
	actions,
	mutations,
})
