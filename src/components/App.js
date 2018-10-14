/** @flow */
import React from 'react'

import { reaction } from 'mobx'
import { inject, observer } from 'mobx-react'

import AppStore from '../stores/AppStore'

import ChordCard from './ChordCard'
import FormSelect from './FormSelect'

import Tone from 'tone'

var sampler = new Tone.Sampler(
  {
    C1: 'click1.wav',
    C2: 'click2.wav',
    C3: 'click2.wav',
  },
  {
    release: 1,
    baseUrl: '/',
  }
).toMaster()

var loop = new Tone.Sequence(
  function(time, col) {
    sampler.triggerAttack('C3', time)
  },
  [0, 1, 2, 3],
  '4n'
)

Tone.Transport.bpm.value = 90
Tone.Transport.start('+2')

type Props = {
  appStore: AppStore,
}

@inject('appStore')
@observer
class App extends React.Component<Props> {
  constructor(props: Props) {
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
          loop.start()
        } else {
          loop.stop()
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

export default App
