export interface Servidor {
  nome: string;
  active: boolean;
  qtd_usuarios: number;
  qtd_usuarios_local: number;
  qtd_canais: number;
  serial: string;
  id: number;
}

export interface ServidorNew {
  nome: string;
  active: boolean;
  qtd_usuarios: number;
  qtd_usuarios_local: number;
  qtd_canais: number;
}

export interface ServidorTable {
  nome: string;
  active: boolean;
  qtd_usuarios: number;
  qtd_usuarios_local: number;
  qtd_canais: number;
}
