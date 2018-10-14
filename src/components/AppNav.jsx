import React from 'react'

export default class AppNav extends React.Component {
  render() {
    return (
      <div>
        AppNav
        {this.props.children}
      </div>
    )
  }
}
