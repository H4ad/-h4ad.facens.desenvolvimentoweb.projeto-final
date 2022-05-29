import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('users')
export class UserEntity {

  //#region Constructors

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  //#endregion

  /**
   * O id do usuário
   */
  @ObjectIdColumn()
  public id: ObjectID;

  /**
   * O nome da ong
   */
  @Column()
  public name: string;

  /**
   * O e-mail do usuário
   */
  @Column()
  public email: string;

  /**
   * O telefone da ong
   */
  @Column()
  public whatsapp: string;

  /**
   * A cidade da ong
   */
  @Column()
  public city: string;

  /**
   * O estado da ong
   */
  @Column()
  public uf: string;


}
