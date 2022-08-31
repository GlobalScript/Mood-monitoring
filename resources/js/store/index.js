import { createStore } from 'vuex'
import authorizationModule from './modules/authorizationModule'
import startModule from './modules/startModule'
import noteModule from './modules/noteModule'
import balanceModule from './modules/balanceModule'
import chartModule from './modules/chartModule'
import historyBalanceModule from './modules/historyBalanceModule'
import historyChartModule from './modules/historyChartModule'

export default createStore({
  modules: {
    startModule,
    noteModule,
    authorizationModule,
    balanceModule,
    chartModule,
    historyBalanceModule,
    historyChartModule
  }
})

