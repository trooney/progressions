import * as Progressions from './progressions'


test('gets all progressions for scale', () => {
  var results = null

  results = Progressions.getAll('C', 'major')
  expect(results[0]['note']).toEqual('C')
  expect(results[0]['interval']).toEqual('M')
  expect(results[0]['displayName']).toEqual('C')

  results = Progressions.getAll('C', 'minor')
  expect(results[0]['note']).toEqual('C')
  expect(results[0]['interval']).toEqual('m')
  expect(results[0]['displayName']).toEqual('Cm')

  // console.log(results)
})

test('gets specified progressions for scale', () => {
  var results = null

  results = Progressions.get('C', 'major', 'V vi')
  expect(results[0]['note']).toEqual('G')
  expect(results[0]['interval']).toEqual('M')

  results = Progressions.get('C', 'major', 'V vi')
  expect(results[1]['note']).toEqual('A')
  expect(results[1]['interval']).toEqual('m')

  // console.log(results)
})
