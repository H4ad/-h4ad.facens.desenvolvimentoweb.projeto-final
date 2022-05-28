//#region Imports

import { BaseCrudProxy } from './base.proxy';

//#endregion

/**
 * A classe que representa as informações que são enviadas pela API sobre um usuário
 */
export interface UserProxy extends BaseCrudProxy {

  /**
   * O nome da ong
   */
  name: string;

  /**
   * O e-mail do usuário
   */
  email: string;

  /**
   * O telefone da ong
   */
  whatsapp: string;

  /**
   * A cidade da ong
   */
  city: string;

  /**
   * O estado da ong
   */
  uf: string;

}
