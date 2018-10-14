/** @flow */

import { observable, action, computed } from 'mobx'

import { notes, scales, progressions, DEFAULT_PROGRESSION } from '../lib/knowledge'
import * as Progressions from '../lib/progressions'

export default class AppStore {
  @observable
  isPlaying: boolean = false

  @observable
  bpm:number = 90

  @observable
  key:string = 'c'

  @observable
  scale:string = 'major'

  @observable
  progression: string = DEFAULT_PROGRESSION

  @action
  setField(name: string, value: string | number) {
    (this: Object)[name] = value;
  }

  @action
  togglePlaying() {
    this.isPlaying = !this.isPlaying
  }

  getFormFieldKeys() {
    return notes
  }

  @computed.struct
  get musicKeys() {
    return notes;
  }

  @computed.struct
  get musicScales() {
    return scales
  }

  @computed.struct
  get musicProgressions() {
    return [
      {
        name: 'Scale',
        progressions: ['I ii iii IV V vi vii'],
      },
      {
        name: 'Pop',
        progressions: [
          'I V VI IV',
          'I IV V',
          'VI IV I V',
          'I IV VI V',
          'I VI II V'
        ],
      },
      {
        name: '12 Bar Blues',
        progressions: [
          'I I I I IV IV I I V IV I V',
          'I IV I I IV IV I I II V I V',
          'I I I I IV IV I I V V I I'
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
