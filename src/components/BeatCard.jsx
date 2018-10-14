import React from 'react'
import classNames from 'classnames'

type Props = {
  active: bool,
}

export default class BeatCard extends React.Component<Props> {
  render () {
    const { active } = this.props
 
    const elClasses = classNames('BeatCard', {
      active: active
    })

    return (
      <div className={elClasses} />
    )
  }
}