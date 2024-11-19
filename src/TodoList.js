import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { TitleContext, ThemeContext } from './contexts'
import DoneButton from './DoneButton'
import DeleteButton from './DeleteButton'


export default function TodoList(props) {
  const title = useContext(TitleContext)
  const themesValue = useContext(ThemeContext);
  console.log(themesValue)
  /* if (!props.currentUser) {
     return <Navigate to='/login' replace />
   } else*/
  return (

    <section style={themesValue}>

      <h1 style={themesValue}>{title}</h1>

      <table className="table is-hoverable is-fullWidth" style={themesValue}>
        <tbody>
          {props.list.map((item) => (

            <tr key={item.key}>
              <td>

                <Link to={`/${item.key}`} >
                  {item.done && <del>{item.title}</del>}
                  {!item.done && item.title}
                </Link>
              </td>
              <td>
                <DoneButton item={item} />

              </td>
              <td>
                <DeleteButton item={item} />

              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </section>

  )
}