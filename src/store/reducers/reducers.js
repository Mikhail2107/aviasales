import { combineReducers } from 'redux'

import reducerFilters from './reducerFilters'
import reducerTabs from './reducerTabs'
import reducerTickets from './reducerTickets'

const reducers = combineReducers({ reducerFilters, reducerTabs, reducerTickets })

export default reducers