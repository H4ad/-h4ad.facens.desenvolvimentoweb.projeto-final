//#region Imports

import React, { useState } from 'react';

import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import beTheHero from '../../assets/logo.svg';

import { CreateIncidentPayload } from '../../models/payloads/create-incident.payload';
import { createIncident } from '../../services/api';

import './styles.css';

//#endregion

/**
 * A função que representa o componente que lida com o registro de usuários
 *
 * @constructor
 */
export default function CreateIncident(props: any) {
  //#region States

  const history = useHistory();
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState(0);
  const [backUrl] = useState(`/incidents`);

  //#endregion

  //#region Methods

  /**
   * Método chamado quando o formulário é enviado
   *
   * @param event As informações do evento de envio de formulário
   */
  async function onSubmit(event: React.FormEvent): Promise<void> {
    event.preventDefault();

    const incidentPayload: CreateIncidentPayload = {
      title,
      description,
      value: Number(value),
    };

    const incidentResponse = await createIncident(incidentPayload);

    if (typeof incidentResponse === 'string')
      return setError(incidentResponse);

    history.push(backUrl);
  }

  //#endregion

  return (
    <section className="create-incident--container">
      <div className="create-incident--card">
        <div className="create-incident--details">
          <div className="create-incident--logo">
            <img src={ beTheHero } alt="A logo do Be The Hero." />
          </div>
          <h2>Cadastrar novo caso</h2>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
          <div className="create-incident--back">
            <Link to={ backUrl }>
              <FiArrowLeft size={ 18 } color="#E02041" />
              <span>Voltar para home</span>
            </Link>
          </div>
        </div>
        <form noValidate={ true } onSubmit={ onSubmit } className="create-incident--form">
          <h3 className="form--error">{ error }</h3>
          <input placeholder="Titulo do caso" value={ title } onChange={ e => setTitle(e.target.value) } />
          <textarea placeholder="Descrição" value={ description } onChange={ e => setDescription(e.target.value) } />
          <input placeholder="Valor em reais" type="number" value={ value } onChange={ e => setValue(+e.target.value) } />
          <button>Cadastrar</button>
          <div className="create-incident--back">
            <Link to="/incidents">
              <FiArrowLeft size={ 18 } color="#E02041" />
              <span>Voltar para home</span>
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
