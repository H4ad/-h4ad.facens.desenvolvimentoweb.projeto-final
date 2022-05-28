//#region Imports

import React, { useEffect, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';

import Header from '../../components/Header';
import IncidentItem from '../../components/IncidentItem';
import { IncidentProxy } from '../../models/proxies/incident.proxy';
import { getIncidents } from '../../services/api';

import './styles.css';

//#endregion

/**
 * O componente que representa a página de listagem de incidentes
 *
 * @constructor
 */
export default function ListIncidents() {
  //#region States

  const [error, setError] = useState('');
  const [listIncidents, setListIncidents] = useState<IncidentProxy[]>([]);

  //#endregion

  //#region Effects

  useEffect(() => {
    getIncidents().then(incidents => {
      if (typeof incidents === 'string')
        return void setError(incidents);

      setListIncidents(incidents);
    });
  }, []);

  //#endregion

  //#region Methods

  /**
   * Método que é executado quando o usuário deleta um incidente
   *
   * @param incidentId A identificação do incidente
   */
  function onClickDeleteIncident(incidentId: number): void {
    const list = listIncidents.filter(incident => incident.id !== incidentId);

    setListIncidents(list);
  }

  //#endregion

  return (
    <div className="list--container">
      <Header actionButtonText="Cadastrar novo caso" actionRoute={ `/incidents/create` } />
      <div className="list--body">
        <h1>Casos cadastrados</h1>
        <h3 className="form--error">{ error }</h3>
        <div className="list--body--grid">
          { listIncidents && listIncidents.map(incident => {
            return (
              <IncidentItem key={ incident.id } { ...incident } onClickDelete={ onClickDeleteIncident } />
            );
          }) }
        </div>
      </div>
    </div>
  );
}
