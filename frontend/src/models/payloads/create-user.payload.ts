/**
 * A classe que representa o payload enviado para criar um usuário
 */
export interface CreateUserPayload {

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
