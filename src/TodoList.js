import React from 'react'

export default function TodoList(props) {
  return (
    <section>
      <h1>Дела</h1>
      <table className="table is-hoverable is-fullWidth">
        <tbody>
          {props.list.map((item) => (
            <tr key={item.key}>
              <td>
                {item.done && <del>{item.title}</del>}
                {!item.done && item.title}
              </td>
              <td>
                <button
                  className="button is-success"
                  title="Пометить как сделанное"
                  disabled={item.done}>&#9745;</button>
              </td>
              <td>
                <button
                  className='button is-danger'
                  title='удалить'>&#9746;</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}