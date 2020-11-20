import { environment } from '../../environments/environment';
import { Role } from '../enums/roles.enum';

const base_url = environment.base_url;

export class Usuario {

  constructor(
    public name: string,
    public lastname: string,
    public email: string,
    public role?: Role,
    public id?: number,
    public password?: string,
    public img?: string,
    public google?: boolean,
    public uid?: string
  ) { }

  get imagenUrl() {

    if (!this.img) {
      return `${base_url}/upload/usuarios/no-image`;
    } else if (this.img.includes('https')) {
      return this.img;
    } else if (this.img) {
      return `${base_url}/upload/usuarios/${this.img}`;
    } else {
      return `${base_url}/upload/usuarios/no-image`;
    }
  }
}

