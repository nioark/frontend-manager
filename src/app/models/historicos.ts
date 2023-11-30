export interface Historico {
  id: number;
  usuario_id: string;
  name: string;
  action: string;
  comment: string;
  created_at: string;
  time_ago: string | undefined;
}
