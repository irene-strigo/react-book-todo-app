import React from 'react'
import { Link, Navigate } from 'react-router-dom'
export default function TodoList(props) {
  if (!props.currentUser) {
    return <Navigate to='/login' replace />
  } else
    return (
      <section>
        <h1>Дела</h1>
        <table className="table is-hoverable is-fullWidth">
          <tbody>
            {props.list.map((item) => (
              <tr key={item.key}>
                <td>
                  <Link to={`/${item.key}`}>
                    {item.done && <del>{item.title}</del>}
                    {!item.done && item.title}
                  </Link>
                </td>
                <td>
                  <button
                    className="button is-success"
                    title="Пометить как сделанное"
                    disabled={item.done}
                    onClick={(evt) => props.setDone(item.key)}
                  >&#9745;</button>
                </td>
                <td>
                  <button
                    className='button is-danger'
                    onClick={(evt) => props.delete(item.key)}
                    title='удалить'>&#9746;</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    )
}