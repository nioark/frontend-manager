import { Cargo } from "./cargos";

export interface UsuarioAction{
  usuario: Usuario
  acao: string;
  comentario: string;
}

export interface Usuario {
  id: number;
  nome: string;
  created_at: string;
  cargo: Cargo;
}

export interface UsuarioEdit extends Usuario {
  senha: string;
}
