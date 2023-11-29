import { Cargo } from "./cargos";

export interface UsuarioAction{
  usuario: Usuario
  acao: string;
  comentario: string;
}

export interface Usuario {
  id: number;
  name: string;
  cargo: Cargo;
  email: string;
}

export interface UsuarioNew{
  name: string;
  password: string;
  cargo: Cargo;
  email: string;
}


export interface UsuarioEdit extends Usuario {
  password: string;
}
