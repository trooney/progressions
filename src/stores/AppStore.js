import { observable, action, decorate } from 'mobx'

import { notes, scales, DEFAULT_PROGRESSION } from '../lib/knowledge'
import * as Progressions from '../lib/progressions'

class AppStore {
  isPlaying = false

  bpm = 90

  key = 'c'

  scale = 'major'

  progression = DEFAULT_PROGRESSION

  setField(name, value) {
    console.log('setField', name, value)
    this[name] = value
  }

  togglePlaying() {
    this.isPlaying = !this.isPlaying
  }

  getFormFieldKeys() {
    return notes
  }

  get musicKeys() {
    return notes
  }

  get musicScales() {
    return scales
  }

  get musicProgressions() {
    return [
      {
        name: 'Scale',
        progressions: ['I ii iii IV V vi vii'],
      },
      {
        name: 'Pop',
        progressions: ['I V VI IV', 'I IV V', 'VI IV I V', 'I IV VI V', 'I VI II V'],
      },
      {
        name: '12 Bar Blues',
        progressions: [
          'I I I I IV IV I I V IV I V',
          'I IV I I IV IV I I II V I V',
          'I I I I IV IV I I V V I I',
        ],
      },
    ]
  }

  getDisplayProgressions() {
    // return Progressions.getAll(this.key, this.scale)
    // return Progressions.get(this.key, this.scale, 'I ii iii IV V vi vii')
    return Progressions.get(this.key, this.scale, this.progression)
  }
}

decorate(AppStore, {
  isPlaying: observable,
  bpm: observable,
  key: observable,
  scale: observable,
  progression: observable,
  setField: action,
  togglePlaying: action,
  // getMusicKeys: computed({ equals: comparer.structural }),
  // musicScales: computed.struct,
  // musicProgressions: computed.struct,
})

export default AppStore
