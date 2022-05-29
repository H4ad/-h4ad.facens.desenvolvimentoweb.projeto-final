// #region Imports

import express from 'express';
import { MongoRepository } from 'typeorm';
import * as yup from 'yup';
import ValidationError from 'yup/lib/ValidationError';
import { UserEntity } from '../entities/user.entity';

// #endregion

const userSchema = yup.object()
  .shape({
    name: yup.string().max(128).required(),
    email: yup.string().max(256).required(),
    whatsapp: yup.string().max(16).required(),
    city: yup.string().max(256).required(),
    uf: yup.string().length(2).required(),
  });

/**
 * A classe que representa o controller para as rotas do usuário
 */
export class UserController {
  // #region Constructors

  /**
   * Construtor padrão
   */
  constructor(private readonly repository: MongoRepository<UserEntity>) {}

  // #endregion

  // #region Public Methods

  /**
   * Método que retorna as rotas que lidam com o usuário
   */
  public getRoutes(): express.Router {
    const router = express.Router();

    router.get('/users', this.listUsers.bind(this));
    router.post('/users', this.createUser.bind(this));
    router.get('/users/email/:email', this.getByEmail.bind(this));

    return router;
  }

  // #endregion

  // #region Private Methods

  /**
   * Método que lista todos os usuários
   */
  private async listUsers(req, res): Promise<void> {
    const users = await this.repository.find();

    res.json(users);
  }

  /**
   * Método que retorna um usuário pelo e-mail
   */
  private async getByEmail(req, res): Promise<void> {
    const user = await this.repository.findOne({
      where: {
        email: req.params.email,
      },
    });

    if (!user)
      return res.status(404).json({
        message: 'O usuário que você buscou não foi encontrado.',
      });

    res.json(user);
  }

  /**
   * Método que cria um novo usuário
   */
  private async createUser(req, res): Promise<void> {
    const [isSuccess, errors] = await userSchema.validate(req.body)
      .then(() => [true, null])
      .catch((error) => [false, error]);

    if (!isSuccess)
      return res.status(400).json({
        message: (errors as ValidationError).errors,
      });

    const alreadyHasEmail = await this.repository.findOne({ where: { email: req.body.email } });

    if (alreadyHasEmail) return res.json({ error: 'Email já cadastrado.' });

    const user = await this.repository.save(req.body);

    res.json(user);
  }

  // #endregion
}
