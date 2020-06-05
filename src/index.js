import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'

import { Provider } from 'mobx-react'
import AppStore from './stores/AppStore'
import App from './components/App'
import * as Tone from 'tone'
import { Note, Chord, Scale } from 'tonal'
import * as Key from 'tonal-key'
import './styles/all.scss'

console.log('NOTE: Click somewhere on the screen before trying to play the metronome')

window.Tone = Tone
window.Note = Note
window.Chord = Chord
window.Scale = Scale
window.Key = Key
window.AppStore = AppStore
const appStore = new AppStore()

ReactDOM.render(
  <Provider appStore={appStore}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
