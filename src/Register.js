import React, { Component } from 'react';
import { Navigate } from "react-router-dom";
import { register } from './auth';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorEmail: '',
      errorPassword: '',
      errorPasswordConfirm: ''
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordConfirmChange = this.handlePasswordConfirmChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.clearFormData()
  }
  resetErrorMesages() {
    this.setState((state) => ({
      errorEmail: '',
      errorPassword: '',
      errorPasswordConfirm: ''
    }))
  }
  validate() {
    this.resetErrorMesages();
    if (!this.formData.email) {
      this.setState((state) => ({
        errorEmail: 'Адрес электронной почты не указан'
      }));
      return false
    }
    if (!this.formData.password) {
      this.setState((state) => ({
        errorPassword: 'Пароль не указан'
      }));
      return false
    }
    if (!this.formData.passwordConfirm) {
      this.setState((state) => ({
        errorPasswordConfirm: 'Повтор пароля не указан'
      }));
      return false
    }
    if (this.formData.password !== this.formData.passwordConfirm) {
      this.setState((state) => ({
        errorPassword: 'Введённые пароли не совпадают',
        errorPasswordConfirm: 'Введённые пароли не совпадают'
      }));
      return false
    }
    return true
  }
  showErrorMessage(code) {
    this.resetErrorMesages();
    if (code === 'auth/email-already-in-use') {
      this.setState((state) => ({
        errorEmail: 'Пользователь с таким адресом электронной почты уже зарегистрирован'
      }));
    } else if (code === 'auth/weak-password') {
      this.setState((state) => ({
        errorPassword: 'Слишком простой пароль',
        errorPasswordConfirm: 'Слишком простой пароль'
      }));
    }
  }
  clearFormData() {
    this.formData = {
      email: '',
      password: '',
      passwordConfirm: ''
    }
  }
  handlePasswordConfirmChange(evt) {
    this.formData.passwordConfirm = evt.target.value;
  }
  handleEmailChange(evt) {
    this.formData.email = evt.target.value;
  }
  handlePasswordChange(evt) {
    this.formData.password = evt.target.value;
  }
  async handleFormSubmit(evt) {
    evt.preventDefault()
    if (this.validate()) {
      const result = await register(this.formData.email, this.formData.password)
      if (typeof result !== 'object') {
        this.showErrorMessage(result)
      }
    }
  }

  render() {
    if (this.props.currentUser) {
      return <Navigate to="/" replace />
    }
    else {
      return (
        <section>
          <h1>Регистрация</h1>
          <form onSubmit={this.handleFormSubmit}>
            <div className='field'>
              <label className='label'>Адрес электронной почты</label>
              <div className='control'>

                <input type='email' className='input'
                  onChange={this.handleEmailChange} />
              </div>
              {this.state.errorEmail &&
                <p className='help is-danger'>{this.state.errorEmail}</p>
              }
            </div>

            <div className='field'>
              <label className='label'>Пароль</label>
              <div className='control'>
                <input type='password' className='input'
                  onChange={this.handlePasswordChange} />
              </div>
              {this.state.errorPassword &&
                <p className='help is-danger'>{this.state.errorPassword}</p>
              }
            </div>
            <div className='field'>
              <label className='label'>Повтор пароля</label>
              <div className='control'>
                <input type='password' className='input'
                  onChange={this.handlePasswordConfirmChange} />
              </div>
              {this.state.errorPasswordConfirm &&
                <p className='help is-danger'>{this.state.errorPasswordConfirm}</p>
              }
            </div>
            <div className='field is-grouped is-grouped-right'>
              <div className='control'>
                <input type='reset' className='button is-link is-light' value="сброс" />
              </div>
              <div className='control'>
                <input type='submit' className='button is-primary' value="Зарегистрироваться" />
              </div>
            </div>
          </form>
        </section>
      )
    }
  }
}