import React, { Component } from 'react'

import { SetDoneContext, DeleteContext, ThemeContext } from './contexts'
import TodoList from './TodoList'
import TodoAdd from './TodoAdd'
import TodoDetail from './TodoDetail'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Register from './Register'
import Login from './Login'
import Logout from './Logout'
import firebaseApp from './firebase'
import { HashRouter, Routes, Route, NavLink } from 'react-router-dom'
import { getList } from './api'
import { setDone } from './api'
import { del } from './api'
import { themes } from './Themes'
import { Link } from 'react-router-dom'
import DoneButton from './DoneButton'
import DeleteButton from './DeleteButton'
import TodoListNew from './TodoListNew'
export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      showMenu: false,
      currentUser: undefined,
      currentTheme: themes.black,
    }
    this.authStateChanged = this.authStateChanged.bind(this)
    this.setDone = this.setDone.bind(this)
    this.delete = this.delete.bind(this)
    this.add = this.add.bind(this)
    this.showMenu = this.showMenu.bind(this)
    this.getDeed = this.getDeed.bind(this)
    this.changeTheme = this.changeTheme.bind(this)
  }
  async authStateChanged(user) {
    this.setState((state) => ({ currentUser: user }))
    if (user) {
      const newData = await getList(user);
      this.setState((state) => ({ data: newData }))
    } else {
      this.setState((state) => ({ data: [] }))
    }
  }
  componentDidMount() {
    onAuthStateChanged(getAuth(firebaseApp), this.authStateChanged)
  }

  getDeed(key) {

    return this.state.data.find((current) => current.key === key)
  }
  showMenu(evt) {
    evt.preventDefault()
    this.setState((state) => ({ showMenu: !state.showMenu }))
  }
  async setDone(key) {
    await setDone(this.state.currentUser, key)
    const deed = this.state.data.find((current) => current.key === key)
    if (deed)
      deed.done = true
    this.setState((state) => ({}))

  }
  async delete(key) {
    await del(this.state.currentUser, key)
    const newData = this.state.data.filter(
      (current) => current.key !== key
    )
    this.setState((state) => ({ data: newData }))

  }
  add(deed) {
    this.state.data.push(deed)
    this.setState((state) => ({}))
  }
  changeTheme(theme) {
    this.setState((state) => ({ currentTheme: theme }))

  }

  render() {

    return (
      <>
        <HashRouter>

          <nav className='navbar is-light'>

            <div className='navbar-brand'>
              <NavLink
                to='/'
                className={({ isActive }) =>
                  'navbar-item is-uppercase' +
                  (isActive ? 'is-active' : '')
                }
              >
                {this.state.currentUser ? this.state.currentUser.email : "Todos"}
              </NavLink>
              <a href='/'
                className={this.state.showMenu ? 'navbar-burger is-active' : 'navbar-burger'}
                onClick={this.showMenu}>
                <span></span>
                <span></span>
                <span></span>
              </a>
            </div>
            <button style={{ padding: '5px', margin: '5px', border: '1px solid black' }} onClick={(evt) => {
              evt.preventDefault()
              this.changeTheme(themes.white)
            }}>white</button>
            <button style={{ padding: '5px', margin: '5px', border: '1px solid black' }}
              onClick={(evt) => {
                evt.preventDefault()
                this.changeTheme(themes.black)
              }}
            >black</button>
            <button style={{ padding: '5px', margin: '5px', border: '1px solid black' }}
              onClick={(evt) => {
                evt.preventDefault()
                this.changeTheme(themes.grey)
              }}
            >grey</button>

            <div className={this.state.showMenu ? 'navbar-menu is-active' : 'navbar-menu'}
              onClick={this.showMenu}>

              <div className='navbar-start'>
                {this.state.currentUser && (
                  <NavLink
                    to='/add'
                    className={({ isActive }) =>
                      'navbar-item' +
                      (isActive ? 'is-active' : '')
                    }
                  >Создать дело
                  </NavLink>
                )}
                {!this.state.currentUser && (
                  <NavLink to="/register" className={({ isActive }) => 'navbar-item' + (isActive ? 'is-active' : '')}>
                    Зарегистрироваться
                  </NavLink>
                )}
                {!this.state.currentUser && (
                  <NavLink to="/login" className={({ isActive }) => 'navbar-item' + (isActive ? 'is-active' : '')}>
                    Вход
                  </NavLink>
                )}
              </div>
              {this.state.currentUser && (
                <div className='navbar-end'>
                  <NavLink to="/logout" className={({ isActive }) => 'navbar-item' + (isActive ? 'is-active' : '')}>
                    Выйти
                  </NavLink>
                </div>
              )}
            </div>
          </nav>
          <ThemeContext.Provider value={this.state.currentTheme}>
            <main className='content px-6 mt-6'>
              <SetDoneContext.Provider value={this.setDone}>
                <DeleteContext.Provider value={this.delete}>

                  <TodoList list={this.state.data} />
                  <TodoListNew list={this.state.data}
                    render={(item) => (
                      <tr key={item.key}>
                        <td>
                          {item.title}
                        </td>
                      </tr>
                    )}
                  />
                  <TodoListNew list={this.state.data}
                    render={(item) => (
                      <tr key={item.key}>
                        <td>
                          <Link to={`/${item.key}`}>
                            {item.done && <del>{item.title}</del>}
                            {!item.done && item.title}
                          </Link>
                        </td>
                        <td>
                          <DoneButton item={item} setDone={this.setDone} />
                        </td>
                        <td>
                          <DeleteButton item={item} delete={this.delete} />
                        </td>
                      </tr>)}
                  />
                </DeleteContext.Provider>
              </SetDoneContext.Provider>

              <Routes>
                <Route path='/' element={
                  <TodoList
                    list={this.state.data}
                    setDone={this.setDone}
                    delete={this.delete}
                    currentUser={this.state.currentUser} />
                } />
                <Route path='/add' element={
                  <TodoAdd add={this.add}
                    currentUser={this.state.currentUser}
                  />
                } />
                <Route path='/:key' element={
                  <TodoDetail
                    getDeed={this.getDeed}
                    currentUser={this.state.currentUser} />
                } />
                <Route path='/register' element={
                  <Register currentUser={this.state.currentUser} />
                }
                />
                <Route path='/logout' element={
                  <Logout currentUser={this.state.currentUser} />
                }
                />
                <Route path='/login' element={
                  <Login currentUser={this.state.currentUser} />
                }
                />

              </Routes>

            </main>
          </ThemeContext.Provider>

        </HashRouter >

      </>
    );
  }
}















