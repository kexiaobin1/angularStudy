import {Clazz} from './clazz';

export class Student {
  _checked = false;
  id: number;
  name: string;
  number: string;
  phone: string;
  email: string;
  clazz: Clazz;

  constructor(data = {} as {
    id?: number,
    name?: string,
    number?: string,
    phone?: string,
    email?: string,
    clazz?: Clazz
  }) {
    this.id = data.id as number;
    this.name = data.name as string;
    this.number = data.number as string;
    this.phone = data.phone as string;
    this.email = data.email as string;
    this.clazz = data.clazz as Clazz;
  }

  public onDeleteClick(): void {
    this._checked = !this._checked;
  }
}
