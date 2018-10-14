import React from 'react'

type Props = {
  name: string,
  progression: string,
}

export default class ChordCard extends React.Component<Props> {
  render () {
    const { name, progression } = this.props

    return (
      <div className="ChordCard">
        <div className="Name">{name}</div>
        <div className="Progression">{progression}</div>
      </div>
    )
  }
}