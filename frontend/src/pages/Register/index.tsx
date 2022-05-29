//#region Imports

import React, { useState } from 'react';

import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import beTheHero from '../../assets/logo.svg';

import { CreateUserPayload } from '../../models/payloads/create-user.payload';
import { LoginPayload } from '../../models/payloads/login.payload';
import { auth, createUser } from '../../services/api';

import './styles.css';

//#endregion

/**
 * A função que representa o componente que lida com o registro de usuários
 *
 * @constructor
 */
export default function Register() {

  //#region States

  const history = useHistory();
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  //#endregion

  //#region Methods

  /**
   * Método chamado quando o formulário é enviado
   *
   * @param event As informações do evento de envio de formulário
   */
  async function onSubmit(event: React.FormEvent): Promise<void> {
    event.preventDefault();

    const userPayload: CreateUserPayload = {
      email,
      name,
      city,
      uf,
      whatsapp,
    };

    if (!userPayload.name)
      return setError('É necessário digitar um nome válido.');

    if (!userPayload.email)
      return setError('É necessário digitar um e-mail válido.');

    if (!userPayload.city)
      return setError('É necessário digitar uma cidade válida.');

    if (!userPayload.whatsapp)
      return setError('É necessário digitar um número de telefone válido.');

    if (!userPayload.uf)
      return setError('É necessário digitar um UF válido.');

    const userResponse = await createUser(userPayload);

    if (typeof userResponse === 'string')
      return setError(userResponse);

    const loginPayload: LoginPayload = {
      username: email,
    };

    const authResponse = await auth(loginPayload);

    if (typeof authResponse === 'string')
      return setError(authResponse);

    history.push('/incidents');
  }

  //#endregion

  return (
    <section className="register--container">
      <div className="register--card">
        <div className="register--details">
          <div className="register--logo">
            <img src={ beTheHero } alt="A logo do Be The Hero." />
          </div>
          <h2>Cadastro</h2>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
          <div className="register--back">
            <Link to="/">
              <FiArrowLeft size={ 18 } color="#E02041" />
              <span>Voltar para o logon</span>
            </Link>
          </div>
        </div>
        <form noValidate={ true } onSubmit={ onSubmit } className="register--form">
          <h3 className="form--error">{ error }</h3>
          <input placeholder="Nome da ONG" type="text" value={ name } onChange={ e => setName(e.target.value) } />
          <input placeholder="E-mail" type="email" value={ email } onChange={ e => setEmail(e.target.value) } />
          <input placeholder="Whatsapp" type="text" value={ whatsapp } onChange={ e => setWhatsapp(e.target.value) } />
          <input placeholder="Cidade" type="text" value={ city } onChange={ e => setCity(e.target.value) } />
          <input placeholder="UF" type="text" maxLength={ 2 } value={ uf } onChange={ e => setUf(e.target.value) } />
          <button>Cadastrar</button>
          <div className="register--back">
            <Link to="/">
              <FiArrowLeft size={ 18 } color="#E02041" />
              <span>Voltar para o logon</span>
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
