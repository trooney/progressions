/** @flow */
import React from 'react'

import { reaction } from 'mobx'
import { inject, observer } from 'mobx-react'

import ChordCard from './ChordCard'
import FormSelect from './FormSelect'

import * as Tone from 'tone'

var sampler = null
var loop = null

const C1 = new Tone.Buffer('click1.wav')
const C2 = new Tone.Buffer('click2.wav')
const C3 = new Tone.Buffer('click3.mp3')

document.querySelector('body').addEventListener('click', async () => {
  if (sampler || loop) {
    return
  }

  await Tone.start()
  sampler = new Tone.Sampler(
    {
      C1: C1,
      C2: C2,
      C3: C3,
    },
    {
      release: 1,
      baseUrl: '/',
    }
  ).toDestination()

  loop = new Tone.Sequence(
    function(time, col) {
      sampler.triggerAttack('C3', time)
    },
    [0, 1, 2, 3],
    '4n'
  )

  Tone.Transport.bpm.value = 90
  Tone.Transport.start()
})

const App = inject('appStore')(
  observer(
    class App extends React.Component {
      constructor(props) {
        super(props)

        reaction(
          () => props.appStore.bpm,
          bpm => {
            console.log(`bpm ${bpm}`)
            Tone.Transport.bpm.value = parseInt(bpm, 10)
          }
        )

        reaction(
          () => props.appStore.isPlaying,
          isPlaying => {
            console.log(`isPlaying ${isPlaying}`)

            if (isPlaying) {
              if (loop) loop.start()
            } else {
              if (loop) loop.stop()
            }
          }
        )
      }
      render() {
        const { appStore } = this.props

        const chordProgressions = appStore.getDisplayProgressions()

        return (
          <React.Fragment>
            <div className="MetronomeControls">
              <div className="MetronomePlayerControls">
                <div className="Bpm">
                  {appStore.bpm}
                  <small>bpm</small>
                </div>
                <div className="Play" onClick={e => appStore.togglePlaying()}>
                  {appStore.isPlaying ? (
                    <i className="fa fa-stop-circle" />
                  ) : (
                    <i className="fa fa-play-circle" />
                  )}
                </div>
              </div>
              <input
                className="custom-range"
                type="range"
                min="30"
                max="210"
                value={appStore.bpm}
                onChange={e => appStore.setField('bpm', e.currentTarget.value)}
              />
            </div>

            <div className="ChordCardList">
              {chordProgressions.map((cp, i) => (
                <ChordCard key={i} name={cp.displayName} progression={cp.numeral} />
              ))}
            </div>

            <form className="form-inline justify-content-center">
              <FormSelect
                options={appStore.musicKeys}
                value={appStore.key}
                onChange={e => appStore.setField('key', e.currentTarget.value)}
              />
              <FormSelect
                options={appStore.musicScales}
                value={appStore.scale}
                onChange={e => appStore.setField('scale', e.currentTarget.value)}
              />
              <select
                className="form-control custom-select"
                value={appStore.progression}
                onChange={e => appStore.setField('progression', e.currentTarget.value)}
                style={{ fontFamily: 'serif', textTransform: 'none' }}
              >
                {appStore.musicProgressions.map(({ name, progressions }) => (
                  <optgroup key={name} label={name}>
                    {progressions.map(val => (
                      <option key={val} value={val}>
                        {val}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </form>
          </React.Fragment>
        )
      }
    }
  )
)

export default App
