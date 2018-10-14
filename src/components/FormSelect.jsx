/** @flow */
import React from 'react'

type Props = {
  options: string[],
  value?: string | number,
  onChange?: (event: SyntheticEvent<HTMLInputElement>) => any
}

export default class ChordCard extends React.Component<Props> {
  render() {
    const { options, value, onChange } = this.props

    return (
      <select
        className="form-control custom-select"
        onChange={ onChange ? onChange : () => {} }
        value={ value }
      >
        {options.map(val => (
          <option key={val} value={val}>
            {val}
          </option>
        ))}
      </select>
    )
  }
}
