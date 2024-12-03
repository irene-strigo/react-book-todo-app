import React from 'react'
import { DeleteContext } from "./contexts";
//контекст в функциональном компоненте
export default function DeleteButton(props) {
  return (
    <DeleteContext.Consumer>
      {(value) => (
        <button title="удалить"
          onClick={(e) => value(props.item.key)}
        >
          &#9746;
        </button>
      )}
    </DeleteContext.Consumer>
  )
}