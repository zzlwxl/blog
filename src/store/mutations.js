import { SET_TOKEN,DEL_TOKEN,SET_LOGINSTATE} from './mutation-types.js'
import { getStore, setStore ,removeStore} from '../utils/utils.js'
export default {
  //token存入vuex
  [SET_TOKEN](state, token) {
    state.token=token
  },
  //删除token
  [DEL_TOKEN](state){
    state.token=''
  },
  //修改登录状态
  [SET_LOGINSTATE](state,value){
    state.loginState = value
  }
}