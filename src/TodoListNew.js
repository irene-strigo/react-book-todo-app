import React from 'react'



export default function TodoListNew(props) {

  return (
    <section>
      <h1>Дела</h1>
      <table>
        <tbody>
          {props.list.map((item) => props.render(item))}
        </tbody>
      </table>

    </section>

  );
}
