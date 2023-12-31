export interface Servidor {
  nome: string;
  active: boolean;
  qtd_usuarios: number;
  qtd_usuarios_local: number;
  qtd_canais: number;
  serial: string;
  id: number;
  comentario:string | undefined;
  deleted_at: string | undefined;
  created_at: string | undefined;

}

export interface ServidorNew {
  nome: string;
  active: boolean;
  qtd_usuarios: number;
  qtd_usuarios_local: number;
  qtd_canais: number;
  comentario:string | undefined;
}
