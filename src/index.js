import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { composeWithDevTools } from '@redux-devtools/extension'
import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import reducers from './store/reducers/reducers'
import './index.css'
import App from './components/App'

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

const root = createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)