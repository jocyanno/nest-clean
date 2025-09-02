import { UniqueEntityID } from './unique-entity-id';

export class Entity<Props> {
  private _id: UniqueEntityID;
  protected props: Props;

  get id(): string {
    return this._id.toString();
  }

  get entityId(): UniqueEntityID {
    return this._id;
  }

  protected constructor(props: Props, id?: UniqueEntityID) {
    this.props = props;
    this._id = id ?? new UniqueEntityID();
  }

  public equals(entity: Entity<unknown>) {
    if (this === entity) {
      return true;
    }

    if (this._id.equals(entity.entityId)) {
      return true;
    }

    return false;
  }
}
