//#region Imports

import React, { useState } from 'react';

import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import heroes from '../../assets/heroes.png';
import beTheHero from '../../assets/logo.svg';

import { LoginPayload } from '../../models/payloads/login.payload';
import { auth } from '../../services/api';

import './styles.css';

//#endregion

/**
 * O componente que representa a página de login
 *
 * @constructor
 */
export default function Logon() {

  //#region States

  const history = useHistory();
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');

  //#endregion

  //#region Methods

  /**
   * Método chamado quando o formulário é enviado
   *
   * @param event As informações do evento de envio de formulário
   */
  async function onSubmit(event: React.FormEvent): Promise<void> {
    event.preventDefault();

    const loginPayload: LoginPayload = {
      username: email,
    };

    if (!loginPayload.username)
      return setError('É necessário digitar um e-mail e uma senha válida.');

    const authResponse = await auth(loginPayload);

    if (typeof authResponse === 'string')
      return setError(authResponse);

    history.push('/incidents');
  }

  //#endregion

  return (
    <section className="logon--container">
      <form noValidate={ true } onSubmit={ onSubmit } className="logon--form">
        <div className="logon--form--logo">
          <img src={ beTheHero } alt="A logo do Be The Hero." />
        </div>
        <div className="logon--form--inputs">
          <h2>Faça seu logon</h2>
          <h3 className="form--error">{ error }</h3>
          <input placeholder="E-mail" type="email" value={ email } onChange={ e => setEmail(e.target.value) } />
          <button>Entrar</button>
          <div className="logon--form--register">
            <Link to="/register">
              <FiLogIn size={ 16 } color="#E02041" />
              <span>Não tenho cadastro</span>
            </Link>
          </div>
        </div>
      </form>
      <div className="logon--hero">
        <img src={ heroes } alt="Uma imagem com várias pessoas se abraçando." />
      </div>
    </section>
  );
}
