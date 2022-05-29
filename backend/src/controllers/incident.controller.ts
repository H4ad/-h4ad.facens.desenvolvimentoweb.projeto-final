// #region Imports

import express from 'express';
import { MongoRepository } from 'typeorm';
import * as yup from 'yup';
import ValidationError from 'yup/lib/ValidationError';
import { IncidentEntity } from '../entities/incident.entity';

// #endregion

const incidentSchema = yup.object()
  .shape({
    title: yup.string().max(1024).required(),
    description: yup.string().max(2048).required(),
    value: yup.number().required(),
  });

/**
 * A classe que representa o controller para as rotas dos incidentes
 */
export class IncidentController {
  // #region Constructors

  /**
   * Construtor padrão
   */
  constructor(private readonly repository: MongoRepository<IncidentEntity>) {}

  // #endregion

  // #region Public Methods

  /**
   * Método que retorna as rotas que lidam com o usuário
   */
  public getRoutes(): express.Router {
    const router = express.Router();

    router.get('/incidents', this.listIncidents.bind(this));
    router.post('/incidents', this.createIncident.bind(this));
    router.delete('/incidents/:incidentId', this.deleteIncident.bind(this));

    return router;
  }

  // #endregion

  // #region Private Methods

  /**
   * Método que lista todos os incidentes
   */
  private async listIncidents(req, res): Promise<void> {
    const incidents = await this.repository.find();

    res.json(incidents);
  }

  /**
   * Método que cria um novo incidente
   */
  private async createIncident(req, res): Promise<void> {
    const [isSuccess, errors] = await incidentSchema.validate(req.body)
      .then(() => [true, null])
      .catch((error) => [false, error]);

    if (!isSuccess)
      return res.status(400).json({
        message: (errors as ValidationError).errors,
      });

    const incident = await this.repository.save(req.body);

    res.json(incident);
  }


  /**
   * Método que deleta um incidente
   */
  private async deleteIncident(req, res): Promise<void> {
    const incidentId = req.params.incidentId;

    await this.repository.delete(incidentId);

    res.status(204).send();
  }

  // #endregion
}
