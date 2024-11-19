import React from 'react'
import { Component } from 'react'
import { SetDoneContext } from "./contexts";
//контекст в классовом компоненте
export default class DoneButton extends Component {
  static contextType = SetDoneContext
  render() {
    return (
      <button title="пометить как выполненное"
        onClick={(e) => this.context(this.props.item.key)}
      >
        &#9745;
      </button>
    )
  }
}