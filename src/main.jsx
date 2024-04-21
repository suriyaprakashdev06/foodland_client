import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store/Store.js'
import TodoList from './components/TodoList.jsx'
import Location from './components/Location.jsx'
import GeoLocation from './components/GeoLocation.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={store}>
      <div>
        <App />
      </div>
    </Provider>
  // </React.StrictMode>, 
)
