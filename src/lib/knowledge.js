/** @flow */
export const notes = 'c d e f g a b'.split(' ')

export const scales = [
  'major',
  'minor',
  'major pentatonic',
  'minor pentatonic',
  'major blues',
  'minor blues',
  'bebop dominant'
]


export const DEFAULT_PROGRESSION = 'I ii iii IV V vi vii'

export const progressions = [
  {
    name: 'Scale',
    progressions: [DEFAULT_PROGRESSION],
  },
  {
    name: 'Pop',
    progressions: ['I IV V'],
  },
  {
    name: 'Funk',
    progressions: ['VI VII I'],
  },
]