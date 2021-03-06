/**
 * 合并多个 reducer 成一个大的reducer
 */

import {combineReducers} from 'redux'

import register from './register'
import auth from './authReducer'
import product from './product'
import order from './order'
import myOrders from './myOrders'
import chat from './chat'
import messageBox from './messageBox'

let rootReducer = combineReducers({
	register,
	auth,
  product,
  order,
  myOrders,
  chat,
  messageBox
});

export default rootReducer;
