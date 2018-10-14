import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'

// $FlowFixMe
import './styles/all.scss'

import { Provider } from 'mobx-react'
import AppStore from './stores/AppStore'
import App from './components/App'

import { Note, Chord, Scale } from 'tonal'
import * as Key from 'tonal-key'

window.Note = Note
window.Chord = Chord
window.Scale = Scale
window.Key = Key

const appStore = new AppStore()

ReactDOM.render(
  <Provider appStore={appStore}>
    <App />
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
