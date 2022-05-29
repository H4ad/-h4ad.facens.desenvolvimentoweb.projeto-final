import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('incidents')
export class IncidentEntity {

  //#region Constructors

  constructor(partial: Partial<IncidentEntity>) {
    Object.assign(this, partial);
  }

  //#endregion

  /**
   * O id do incidente
   */
  @ObjectIdColumn()
  public id: ObjectID;

  /**
   * O titulo desse incidente
   */
  @Column()
  public title: string;

  /**
   * A descrição desse incidente
   */
  @Column()
  public description: string;

  /**
   * O valor para ajudar esse incidente
   */
  @Column()
  public value: number;

}
