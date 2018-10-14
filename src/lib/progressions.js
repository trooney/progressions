/** @flow */
import { Scale } from 'tonal'

type ProgressionType = {
  note: string,
  interval: string,
  numeral: string,
  displayName: string,
}

const emptyProgression: ProgressionType = {
  note: '?',
  interval: '?',
  numeral: '?',
  displayName: '?',
}

const degrees = {
  major: {
    I: 'M',
    ii: 'm',
    iii: 'm',
    IV: 'M',
    V: 'M',
    vi: 'm',
    vii: 'm7',
  },
  minor: {
    i: 'm',
    ii: 'm',
    III: 'M',
    iv: 'm',
    V: 'M',
    VI: 'M',
    VII: 'M7',
  },
  'major pentatonic': {
    I: 'M',
    II: 'M',
    III: 'M',
    IV: 'M',
    V: 'M',
  },
  'minor pentatonic': {
    I: 'M',
    II: 'M',
    III: 'M',
    IV: 'M',
    V: 'M',
  },
  'major blues': {
    I: 'M',
    II: 'M',
    III: 'M',
    IV: 'M',
    V: 'M',
    VI: 'M',
  },
  'minor blues': {
    I: 'M',
    II: 'M',
    III: 'M',
    IV: 'M',
    V: 'M',
    VI: 'M',
  },
  'bebop dominant': {
    I: 'M',
    ii: 'm',
    iii: 'm',
    IV: 'M',
    V: 'M',
    vi: 'm',
    vii: 'M',
    viii: 'm',
  },
}

function displayName(note, interval) {
  const displayIntervals = {
    M: '',
    M7: '',
    m: 'm',
    m7: 'm7',
  }

  return `${note}${displayIntervals[interval]}`
}

function getAll(key: string, scale: string): ProgressionType[] {
  const notes = Scale.notes(key, scale)

  const intervals = Object.values(degrees[scale])
  const numerals = Object.keys(degrees[scale])

  return notes.map((note, idx) => {
    return {
      note: note,
      interval: intervals[idx],
      numeral: numerals[idx],
      displayName: displayName(note, intervals[idx]),
    }
  })
}

function get(key: string, scale: string, progression: string): Array<ProgressionType> {
  const allProgressions = getAll(key, scale)

  return progression.split(' ').map(numeral => {
    return (
      allProgressions.find(
        prog => prog['numeral'].toLowerCase() === numeral.toLowerCase()
      ) || emptyProgression
    )
  })
}

export { getAll, get }
